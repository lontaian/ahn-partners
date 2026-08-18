/**
 * 구독 신청 직후 보내는 환영 메일 (2026-08-18)
 *
 * 왜 만드나: 신청자가 받는 피드백이 성공 화면 한 장뿐이었다. 다음 발송까지
 * 최대 5일을 기다려야 첫 메일이 도착하고, 그 사이 신청한 사실을 잊는다.
 * 이메일을 잘못 적었어도 본인이 알 방법이 없었다.
 *
 * 발송 잠금: WELCOME_EMAIL_ENABLED 가 'true' 일 때만 실제로 나간다.
 * 문안 승인 전까지 잠가 둔다. 잠긴 상태에서는 skipped 를 돌려주고 구독 자체는 정상 처리된다.
 */

const FROM = "Ahn's Newsletter <newsletter@ahn-partners.net>";
const REPLY_TO = 'hello@ahn-partners.net';
const SITE = 'https://ahn-partners.net';

// GA4 최근 30일 페이지뷰 상위에서 골랐다(2026-08-18 실측: 43, 36, 35).
// 필러가 겹치지 않게 권한, 지표, 사람으로 갈랐다.
const STARTER_POSTS = [
  {
    href: `${SITE}/insights/approval-boundary.html`,
    title: 'AI는 샀는데 결재판은 그대로인 회사',
    desc: 'AI 도입의 병목은 답변 속도가 아니라 답변을 행동으로 바꾸는 권한입니다.',
  },
  {
    href: `${SITE}/insights/dashboard-decision-gap.html`,
    title: '대시보드는 늘어나는데 결정은 그대로인 이유',
    desc: '지표에 주인과 주기, 임계값과 행동이 붙어야 작동합니다. 차량 관제센터를 직접 운영하며 배운 것입니다.',
  },
  {
    href: `${SITE}/insights/quiet-exit.html`,
    title: '에이스는 퇴사 통보 전에 먼저 조용해집니다',
    desc: '사직서는 마지막 신호입니다. 마음이 떠나는 시점은 몇 달 전이고, 신호는 그때부터 보입니다.',
  },
];

const SUBJECT = '구독해 주셔서 감사합니다. 가장 많이 읽힌 글 3편을 먼저 보냅니다';

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml({ name }) {
  const greeting = name ? `${escapeHtml(name)}님, 안녕하세요.` : '안녕하세요.';
  const cards = STARTER_POSTS.map((p) => `
      <tr><td style="padding:0 0 18px">
        <a href="${p.href}" style="text-decoration:none;color:inherit">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e6e6e6;border-radius:10px">
            <tr><td style="padding:18px 20px">
              <div style="font-size:16px;line-height:1.5;font-weight:700;color:#111">${escapeHtml(p.title)}</div>
              <div style="font-size:14px;line-height:1.6;color:#666;margin-top:7px">${escapeHtml(p.desc)}</div>
            </td></tr>
          </table>
        </a>
      </td></tr>`).join('');

  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(SUBJECT)}</title></head>
<body style="margin:0;padding:0;background:#f5f5f5">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#fff;border-radius:14px;overflow:hidden;font-family:'Pretendard Variable',Pretendard,-apple-system,BlinkMacSystemFont,'Malgun Gothic',sans-serif">

        <tr><td style="background:#111;padding:26px 32px">
          <div style="color:#2dd4bf;font-size:11px;letter-spacing:.14em;font-weight:700">AHN PARTNERS</div>
        </td></tr>

        <tr><td style="padding:34px 32px 8px">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:#111">${greeting}</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.85;color:#333">
            Ahn's Executive Brief를 신청해 주셔서 감사합니다. 이 메일이 도착했다면 주소가 제대로 등록된 것입니다.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.85;color:#333">
            화요일과 목요일 아침에 한 편씩 보내드립니다. AI 전환과 기술경영, 신사업 실행을 다룹니다.
            일반론은 쓰지 않습니다. 27년간 현장에서 직접 집행하고 실패해 본 것만 씁니다.
          </p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.85;color:#333">
            다음 발송까지 기다리지 않으셔도 되게, 지난 글 중 가장 많이 읽힌 3편을 먼저 보냅니다.
          </p>
        </td></tr>

        <tr><td style="padding:0 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cards}</table>
        </td></tr>

        <tr><td style="padding:14px 32px 34px">
          <p style="margin:0;font-size:15px;line-height:1.85;color:#333">
            읽으시다가 생각이 다르거나 물어보고 싶은 게 있으면 이 메일에 그대로 답장해 주세요. 제가 직접 읽습니다.
          </p>
          <p style="margin:18px 0 0;font-size:15px;line-height:1.85;color:#333">Chris Ahn 드림</p>
        </td></tr>

        <tr><td style="background:#fafafa;padding:20px 32px;border-top:1px solid #eee">
          <p style="margin:0;font-size:12px;line-height:1.7;color:#999">
            Ahn Partners. 이 메일은 <a href="${SITE}/newsletter" style="color:#666">Ahn's Executive Brief</a> 신청자에게 발송됩니다.
            더 받고 싶지 않으시면 <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#666">여기</a>를 눌러 주세요.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body></html>`;
}

async function sendWelcomeEmail({ email, name }) {
  if (String(process.env.WELCOME_EMAIL_ENABLED || '').toLowerCase() !== 'true') {
    return { sent: false, skipped: true, reason: 'welcome_email_disabled' };
  }

  const apiKey = String(process.env.RESEND_API_KEY || '').trim();
  if (!apiKey) return { sent: false, skipped: true, reason: 'missing_resend_api_key' };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: FROM,
      to: [email],
      reply_to: REPLY_TO,
      subject: SUBJECT,
      html: buildHtml({ name }),
      headers: { 'List-Unsubscribe': `<${SITE}/newsletter>` },
    }),
  });

  const text = await response.text();
  let payload = null;
  try { payload = text ? JSON.parse(text) : null; } catch (_) { payload = { raw: text }; }

  if (!response.ok) {
    const error = new Error('Welcome email send failed');
    error.details = { status: response.status, payload };
    throw error;
  }

  return { sent: true, id: payload && payload.id || null };
}

module.exports = { sendWelcomeEmail, buildHtml, SUBJECT, STARTER_POSTS };
