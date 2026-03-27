// ─────────────────────────────────────────────────────────────────────────────
// THE COFFEE CODE — Daily Reporter
// Runs every morning at 6AM (Colombia time = 11AM UTC)
// Reads task progress from Supabase, sends report via email + WhatsApp
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_KEY   = process.env.RESEND_KEY;
const TWILIO_SID   = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const TWILIO_FROM  = process.env.TWILIO_WHATSAPP_FROM; // whatsapp:+14155238886
const EMAIL_A      = process.env.EMAIL_ALEJANDRO;
const EMAIL_X      = process.env.EMAIL_ALEX;
const PHONE_A      = process.env.PHONE_ALEJANDRO;      // whatsapp:+57XXXXXXXXXX
const PHONE_X      = process.env.PHONE_ALEX;           // whatsapp:+57XXXXXXXXXX

// ── PROJECTION DATA ──────────────────────────────────────────────────────────
const CUM  = [23,158,496,1284,2559,4434,6984,14724,24084,35244,48204,62604,77304,92454,108354,126354,146354,170254];
const PKS  = [3,18,45,105,170,250,340,430,520,620,720,800,800,800,800,800,800,800];
const GRN  = [0,0,0,0,0,0,0,0,0,0,0,0,200,500,1000,1800,2800,3800];
const PRF  = [23,135,338,788,1275,1875,2550,7740,9360,11160,12960,14400,14700,15150,15900,18000,20000,23900];
const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

// ── FULL TASK DATA (abbreviated - same structure as the whiteboard) ───────────
// We import the same W object from the whiteboard data
// Here we define a helper that returns task counts per person per day per week
function getTasksForDay(wk, person, day) {
  // This mirrors the W object in index.html
  // Returns array of task text strings for that week/person/day
  // We use a simplified version here — the real source of truth is Supabase
  return [];
}

// ── SUPABASE FETCH ────────────────────────────────────────────────────────────
async function fetchDoneState() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/warroom?key=eq.tasks&select=value`,
    {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    }
  );
  const rows = await res.json();
  return (rows && rows[0]) ? JSON.parse(rows[0].value) : {};
}

// ── CALCULATE PROGRESS ───────────────────────────────────────────────────────
function getCurrentWeek() {
  // Week 1 started on the Monday of the deployment week
  // We store the start date in env, or default to calculating from first Monday
  const startDate = process.env.START_DATE
    ? new Date(process.env.START_DATE)
    : new Date('2025-03-31'); // Update this to your actual Week 1 Monday
  const now = new Date();
  const diffMs = now - startDate;
  const diffWeeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000));
  return Math.min(Math.max(diffWeeks + 1, 1), 18);
}

function getCurrentDayKey() {
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  return days[new Date().getDay()];
}

function getYesterdayKey() {
  const days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
  const idx = new Date().getDay();
  return days[idx === 0 ? 6 : idx - 1];
}

function calcProgress(done, wk, person) {
  let total = 0, doneCount = 0;
  DAYS.forEach(day => {
    // Count all tasks that exist as keys in done state
    for (let i = 0; i < 6; i++) {
      const k = `${wk}-${person}-${day}-${i}`;
      // We count any key that exists in done (regardless of value)
      // Total = all possible task slots this week
      total++;
      if (done[k]) doneCount++;
    }
  });
  return { total, doneCount, pct: total ? Math.round(doneCount / total * 100) : 0 };
}

function getTodayTasks(done, wk, person, day) {
  const completed = [], pending = [];
  for (let i = 0; i < 6; i++) {
    const k = `${wk}-${person}-${day}-${i}`;
    if (done[k]) {
      completed.push(i + 1);
    } else {
      pending.push(i + 1);
    }
  }
  return { completed, pending };
}

function getYesterdayPending(done, wk, person, yesterday) {
  const pending = [];
  for (let i = 0; i < 6; i++) {
    const k = `${wk}-${person}-${yesterday}-${i}`;
    if (!done[k]) pending.push(i + 1);
  }
  return pending;
}

// ── FORMAT EMAIL HTML ─────────────────────────────────────────────────────────
function buildEmailHTML(wk, day, yesterday, done) {
  const progA = calcProgress(done, wk, 'a');
  const progX = calcProgress(done, wk, 'x');
  const todayA = getTodayTasks(done, wk, 'a', day);
  const todayX = getTodayTasks(done, wk, 'x', day);
  const pendA  = getYesterdayPending(done, wk, 'a', yesterday);
  const pendX  = getYesterdayPending(done, wk, 'x', yesterday);
  const packs  = PKS[wk-1].toLocaleString();
  const profit = `$${PRF[wk-1].toLocaleString()}`;
  const green  = GRN[wk-1] > 0 ? `${GRN[wk-1].toLocaleString()} lbs` : '—';
  const cumul  = `$${CUM[wk-1].toLocaleString()}`;

  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
  body { font-family: -apple-system, sans-serif; background: #F8F6F2; margin:0; padding:20px; color:#2C2418; }
  .container { max-width:600px; margin:0 auto; }
  .header { background:#B07D2A; color:white; padding:20px 24px; border-radius:8px 8px 0 0; }
  .header h1 { font-size:20px; margin:0; letter-spacing:2px; }
  .header p { font-size:12px; margin:4px 0 0; opacity:0.8; }
  .kpi-row { display:flex; background:#fff; border:1px solid #E4DDD2; border-top:none; }
  .kpi { flex:1; padding:12px; text-align:center; border-right:1px solid #E4DDD2; }
  .kpi:last-child { border-right:none; }
  .kpi-val { font-size:20px; font-weight:700; color:#B07D2A; }
  .kpi-lbl { font-size:10px; color:#8A7D68; text-transform:uppercase; letter-spacing:1px; }
  .section { background:#fff; border:1px solid #E4DDD2; border-top:none; padding:16px 20px; }
  .section-title { font-size:11px; letter-spacing:2px; text-transform:uppercase; color:#8A7D68; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid #E4DDD2; }
  .person-block { margin-bottom:16px; }
  .person-name { font-size:14px; font-weight:700; margin-bottom:8px; }
  .person-name.a { color:#B07D2A; }
  .person-name.x { color:#2076A8; }
  .progress-bar { background:#E4DDD2; height:6px; border-radius:3px; margin-bottom:4px; }
  .progress-fill { height:100%; border-radius:3px; }
  .progress-fill.a { background:#B07D2A; }
  .progress-fill.x { background:#2076A8; }
  .progress-text { font-size:11px; color:#8A7D68; margin-bottom:10px; }
  .task-list { list-style:none; padding:0; margin:0; }
  .task-list li { font-size:12px; padding:4px 0; border-bottom:1px solid #F0EBE3; display:flex; gap:8px; }
  .task-list li:last-child { border-bottom:none; }
  .done-dot { color:#2E7D45; font-size:14px; }
  .pending-dot { color:#C05A18; font-size:14px; }
  .warn-dot { color:#C03828; font-size:14px; }
  .footer { background:#F0EBE3; border:1px solid #E4DDD2; border-top:none; padding:12px 20px; border-radius:0 0 8px 8px; text-align:center; font-size:11px; color:#8A7D68; }
  .footer a { color:#B07D2A; text-decoration:none; font-weight:600; }
</style>
</head>
<body>
<div class="container">
  <div class="header">
    <h1>☕ THE COFFEE CODE</h1>
    <p>Daily Report · Week ${wk} · ${day} · ${new Date().toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'})}</p>
  </div>

  <div class="kpi-row">
    <div class="kpi"><div class="kpi-val">${packs}</div><div class="kpi-lbl">Packs/Wk</div></div>
    <div class="kpi"><div class="kpi-val">${profit}</div><div class="kpi-lbl">Profit Target</div></div>
    <div class="kpi"><div class="kpi-val">${green}</div><div class="kpi-lbl">Green Coffee</div></div>
    <div class="kpi"><div class="kpi-val">${cumul}</div><div class="kpi-lbl">Cumulative</div></div>
  </div>

  <div class="section">
    <div class="section-title">📊 Weekly Progress</div>

    <div class="person-block">
      <div class="person-name a">ALEJANDRO — Operations · Legal · B Corp</div>
      <div class="progress-bar"><div class="progress-fill a" style="width:${progA.pct}%"></div></div>
      <div class="progress-text">${progA.doneCount} of ${progA.total} tasks completed this week (${progA.pct}%)</div>
    </div>

    <div class="person-block">
      <div class="person-name x">ALEX — DMs · ClickFunnels · Stripe · Accounting</div>
      <div class="progress-bar"><div class="progress-fill x" style="width:${progX.pct}%"></div></div>
      <div class="progress-text">${progX.doneCount} of ${progX.total} tasks completed this week (${progX.pct}%)</div>
    </div>
  </div>

  ${pendA.length > 0 || pendX.length > 0 ? `
  <div class="section">
    <div class="section-title">⚠️ Pending From Yesterday (${yesterday})</div>
    ${pendA.length > 0 ? `
    <div class="person-block">
      <div class="person-name a">ALEJANDRO — ${pendA.length} task${pendA.length > 1 ? 's' : ''} not completed</div>
      <ul class="task-list">
        ${pendA.map(n => `<li><span class="warn-dot">●</span> Task ${n} from ${yesterday} — complete today</li>`).join('')}
      </ul>
    </div>` : '<p style="font-size:12px;color:#2E7D45">✅ Alejandro completed all tasks yesterday</p>'}
    ${pendX.length > 0 ? `
    <div class="person-block">
      <div class="person-name x">ALEX — ${pendX.length} task${pendX.length > 1 ? 's' : ''} not completed</div>
      <ul class="task-list">
        ${pendX.map(n => `<li><span class="warn-dot">●</span> Task ${n} from ${yesterday} — complete today</li>`).join('')}
      </ul>
    </div>` : '<p style="font-size:12px;color:#2E7D45">✅ Alex completed all tasks yesterday</p>'}
  </div>` : `
  <div class="section">
    <div class="section-title">✅ Yesterday (${yesterday})</div>
    <p style="font-size:13px;color:#2E7D45;font-weight:600">Both completed all tasks yesterday. Keep it up.</p>
  </div>`}

  <div class="section">
    <div class="section-title">📋 Today's Tasks (${day}) — Check off at the War Room</div>

    <div class="person-block">
      <div class="person-name a">ALEJANDRO</div>
      <ul class="task-list">
        ${[0,1,2,3,4,5].map(i => {
          const k = `${wk}-a-${day}-${i}`;
          const isDone = !!done[k];
          return `<li><span class="${isDone ? 'done-dot' : 'pending-dot'}">${isDone ? '✓' : '●'}</span> Task ${i+1} ${isDone ? '(done)' : '(pending)'}</li>`;
        }).join('')}
      </ul>
    </div>

    <div class="person-block">
      <div class="person-name x">ALEX</div>
      <ul class="task-list">
        ${[0,1,2,3,4,5].map(i => {
          const k = `${wk}-x-${day}-${i}`;
          const isDone = !!done[k];
          return `<li><span class="${isDone ? 'done-dot' : 'pending-dot'}">${isDone ? '✓' : '●'}</span> Task ${i+1} ${isDone ? '(done)' : '(pending)'}</li>`;
        }).join('')}
      </ul>
    </div>
  </div>

  <div class="footer">
    <a href="https://project-mnv5i.vercel.app">Open War Room →</a>
    &nbsp;·&nbsp; The Coffee Code · Daily Report · Week ${wk} of 18
  </div>
</div>
</body>
</html>`;
}

// ── FORMAT WHATSAPP MESSAGE ───────────────────────────────────────────────────
function buildWhatsAppMessage(wk, day, yesterday, done, person) {
  const name = person === 'a' ? 'ALEJANDRO' : 'ALEX';
  const prog = calcProgress(done, wk, person);
  const pend = getYesterdayPending(done, wk, person, yesterday);
  const today = getTodayTasks(done, wk, person, day);
  const packs  = PKS[wk-1].toLocaleString();
  const profit = `$${PRF[wk-1].toLocaleString()}`;

  let msg = `☕ *THE COFFEE CODE*\n`;
  msg += `Daily Report · Wk ${wk} · ${day}\n\n`;
  msg += `*${name}*\n`;
  msg += `Week progress: ${prog.pct}% (${prog.doneCount}/${prog.total} tasks)\n\n`;
  msg += `*This week's targets:*\n`;
  msg += `📦 ${packs} packs · 💰 ${profit} profit\n\n`;

  if (pend.length > 0) {
    msg += `⚠️ *${pend.length} task(s) pending from ${yesterday}*\n`;
    msg += `Complete these first today.\n\n`;
  } else {
    msg += `✅ All yesterday's tasks done. Great work.\n\n`;
  }

  const remaining = today.pending.length;
  msg += `*Today (${day}): ${remaining} task(s) remaining*\n`;
  if (today.completed.length > 0) {
    msg += `Done: ${today.completed.length} ✓\n`;
  }
  msg += `\n👉 project-mnv5i.vercel.app`;

  return msg;
}

// ── SEND EMAIL ────────────────────────────────────────────────────────────────
async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'The Coffee Code <reports@thecoffeecode.app>',
      to: [to],
      subject,
      html
    })
  });
  const data = await res.json();
  console.log(`Email to ${to}:`, data.id ? '✅ sent' : '❌ ' + JSON.stringify(data));
}

// ── SEND WHATSAPP ─────────────────────────────────────────────────────────────
async function sendWhatsApp(to, body) {
  const params = new URLSearchParams({
    From: TWILIO_FROM,
    To:   to,
    Body: body
  });
  const res = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params
    }
  );
  const data = await res.json();
  console.log(`WhatsApp to ${to}:`, data.sid ? '✅ sent' : '❌ ' + JSON.stringify(data));
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 The Coffee Code Daily Reporter — starting...');

  const done      = await fetchDoneState();
  const wk        = getCurrentWeek();
  const day       = getCurrentDayKey();
  const yesterday = getYesterdayKey();

  console.log(`Week: ${wk} | Day: ${day} | Yesterday: ${yesterday}`);
  console.log(`Tasks completed: ${Object.keys(done).filter(k => done[k]).length}`);

  const html    = buildEmailHTML(wk, day, yesterday, done);
  const subject = `☕ TCC Daily Report · Week ${wk} · ${day} · ${new Date().toLocaleDateString('en-US', {month:'short', day:'numeric'})}`;

  // Send emails
  await sendEmail(EMAIL_A, subject, html);
  await sendEmail(EMAIL_X, subject, html);

  // Send WhatsApp — personalized per person
  await sendWhatsApp(PHONE_A, buildWhatsAppMessage(wk, day, yesterday, done, 'a'));
  await sendWhatsApp(PHONE_X, buildWhatsAppMessage(wk, day, yesterday, done, 'x'));

  console.log('✅ Daily report sent to Alejandro + Alex');
}

main().catch(err => {
  console.error('❌ Reporter failed:', err);
  process.exit(1);
});
