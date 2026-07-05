const { jsonResponse, parseRequestBody, syncNewsletterSubmission } = require('./_newsletter-sync-core.cjs');

exports.handler = async function newsletterSyncTest(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'method_not_allowed' });
  }
  const secret = process.env.NEWSLETTER_SYNC_TEST_SECRET || '';
  const supplied = event.headers['x-newsletter-sync-secret'] || event.headers['X-Newsletter-Sync-Secret'] || '';
  if (!secret || supplied !== secret) {
    return jsonResponse(401, { ok: false, error: 'unauthorized' });
  }

  const data = parseRequestBody(event);
  try {
    const result = await syncNewsletterSubmission(
      {
        'form-name': 'newsletter',
        email: data.email,
        name: data.name || 'Ahn Sync Test',
        consent_newsletter: 'yes',
      },
      { requireFormName: true, requireConsent: true },
    );
    return jsonResponse(200, result);
  } catch (error) {
    console.error('newsletter-sync-test failed', {
      message: error.message,
      code: error.code,
      details: error.details,
    });
    return jsonResponse(500, { ok: false, error: 'spread_sync_failed', details: error.details || null });
  }
};
