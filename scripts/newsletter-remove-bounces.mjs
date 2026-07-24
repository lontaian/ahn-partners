import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  fetchAllResendEmails,
  fetchResendAudienceContacts,
  deleteResendContacts,
} from './newsletter-api.mjs';
import {
  collectUniqueBouncedRecipients,
  selectSafeBounceContacts,
} from './newsletter-analytics-lib.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(
  fs.readFileSync(path.join(root, 'config', 'newsletter-analytics.json'), 'utf8'),
);
const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) throw new Error('RESEND_API_KEY is required');

const apply = process.argv.includes('--apply');
const subjects = config.campaigns.map(({ subject }) => subject);
const [emails, gmailContacts, subscriberContacts] = await Promise.all([
  fetchAllResendEmails({ apiKey }),
  fetchResendAudienceContacts({
    apiKey,
    audienceId: config.audiences.gmail,
  }),
  fetchResendAudienceContacts({
    apiKey,
    audienceId: config.audiences.subscribers,
  }),
]);

const bouncedRecipients = collectUniqueBouncedRecipients(emails, subjects);
const contacts = selectSafeBounceContacts(
  bouncedRecipients,
  gmailContacts,
  subscriberContacts,
);
const timestamp = new Date().toISOString().replaceAll(':', '-');
const privateDir = path.join(
  root,
  'exports',
  'newsletter-analytics',
  'private',
);
fs.mkdirSync(privateDir, { recursive: true });
const backupPath = path.join(privateDir, `bounce-backup-${timestamp}.json`);
fs.writeFileSync(
  backupPath,
  `${JSON.stringify(
    {
      createdAt: new Date().toISOString(),
      mode: apply ? 'apply' : 'dry-run',
      bouncedRecipients,
      contacts,
    },
    null,
    2,
  )}\n`,
  'utf8',
);

console.log(`backup=${backupPath}`);
console.log(`unique_bounced=${bouncedRecipients.length}`);
console.log(`safe_to_delete=${contacts.length}`);
console.log(`subscriber_addresses_excluded=${bouncedRecipients.length - contacts.length}`);

if (!apply) {
  console.log('dry_run=true');
  process.exit(0);
}

const deleted = await deleteResendContacts({ apiKey, contacts });
const remainingGmailContacts = await fetchResendAudienceContacts({
  apiKey,
  audienceId: config.audiences.gmail,
});
const remaining = new Set(
  remainingGmailContacts.map(({ email }) => String(email).toLowerCase()),
);
const failed = deleted.filter(({ email }) => remaining.has(email.toLowerCase()));
if (failed.length > 0) {
  throw new Error(`Bounce deletion verification failed for ${failed.length} contacts`);
}
console.log(`deleted=${deleted.length}`);
console.log('verified_remaining=0');
