const { jsonResponse, parseRequestBody, syncNewsletterSubmission } = require('./_newsletter-sync-core.cjs');

exports.handler = async function newsletterSubscribe(event) {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { ok: false, error: 'method_not_allowed' });
  }

  const data = parseRequestBody(event);

  try {
    const result = await syncNewsletterSubmission(data, { requireFormName: false, requireConsent: true });
    return jsonResponse(200, result);
  } catch (error) {
    console.error('newsletter-subscribe sync failed', {
      message: error.message,
      code: error.code,
      details: error.details,
    });
    // Netlify Forms keeps the submission even if Resend is temporarily unavailable.
    // Keep the browser success path stable, and surface the sync state for diagnostics.
    return jsonResponse(202, { ok: true, synced: false, queued: false, error: 'resend_sync_failed' });
  }
};
