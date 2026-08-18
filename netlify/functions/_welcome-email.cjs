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

// 첫인상용 3편. 필러가 겹치지 않게 고른다.
const STARTER_POSTS = [
  {
    href: `${SITE}/insights/hydrogen-new-business-execution.html`,
    title: '100억 수소충전소에서 배운 신사업 실행의 순서',
    desc: '기술 검토는 전체 일의 2할이었습니다. 죽는 조건을 먼저 쓰지 않으면 신사업 계획은 낙관론의 나열입니다.',
  },
  {
    href: `${SITE}/insights/decision-log.html`,
    title: '회의록에는 있는데 회사에는 없는 것',
    desc: '발언은 남고 결정은 사라집니다. 선택하지 않은 이유까지 기록해야 같은 회의를 반복하지 않습니다.',
  },
  {
    href: `${SITE}/insights/restore-drill.html`,
    title: '백업 성공 알림은 복구 성공 증명이 아닙니다',
    desc: '파일이 저장됐다는 초록불보다 실제 운영자가 목표 시간 안에 서비스를 되살리는 시험이 먼저입니다.',
  },
];

const SUBJECT = '구독해 주셔서 감사합니다. 먼저 읽어보실 글 3편을 보냅니다';

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
          <div style="color:#2dd4bf;font-size:11px;letter-spacing:.14em;font-weight:700">AHN'S NEWSLETTER</div>
        </td></tr>

        <tr><td style="padding:34px 32px 8px">
          <p style="margin:0 0 18px;font-size:16px;line-height:1.75;color:#111">${greeting}</p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.85;color:#333">
            Ahn's Newsletter를 신청해 주셔서 감사합니다. 이 메일이 도착했다면 주소가 제대로 등록된 것입니다.
          </p>
          <p style="margin:0 0 18px;font-size:15px;line-height:1.85;color:#333">
            화요일과 목요일 아침에 한 편씩 보내드립니다. AI 전환과 기술경영, 신사업 실행을 다룹니다.
            일반론은 쓰지 않습니다. 27년간 현장에서 직접 집행하고 실패해 본 것만 씁니다.
          </p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.85;color:#333">
            다음 발송까지 기다리지 않으셔도 되게, 그동안 반응이 좋았던 3편을 먼저 보냅니다.
          </p>
        </td></tr>

        <tr><td style="padding:0 32px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${cards}</table>
        </td></tr>

        <tr><td style="padding:14px 32px 34px">
          <p style="margin:0;font-size:15px;line-height:1.85;color:#333">
            읽으시다가 생각이 다르거나 물어보고 싶은 게 있으면 이 메일에 그대로 답장해 주세요. 제가 직접 읽습니다.
          </p>
          <p style="margin:18px 0 0;font-size:15px;line-height:1.85;color:#333">안병선 드림</p>
        </td></tr>

        <tr><td style="background:#fafafa;padding:20px 32px;border-top:1px solid #eee">
          <p style="margin:0;font-size:12px;line-height:1.7;color:#999">
            Ahn Partners. 이 메일은 <a href="${SITE}/newsletter" style="color:#666">Ahn's Newsletter</a> 신청자에게 발송됩니다.
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
