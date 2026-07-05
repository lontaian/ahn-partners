import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { syncNewsletterSubmission } = require('./_newsletter-sync-core.cjs');

export default {
  async formSubmitted(event) {
    try {
      await syncNewsletterSubmission(
        {
          'form-name': 'newsletter',
          ...(event?.data || {}),
        },
        { requireFormName: false, requireConsent: true },
      );
    } catch (error) {
      console.error('formSubmitted newsletter sync failed', {
        message: error.message,
        code: error.code,
        details: error.details,
      });
    }
  },
};
