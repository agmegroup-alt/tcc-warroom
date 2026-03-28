// THE COFFEE CODE — Daily Reporter v2
// Now includes full task names — not just counts
// Runs daily at 6AM Colombia time via GitHub Actions

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const RESEND_KEY   = process.env.RESEND_KEY;
const TWILIO_SID   = process.env.TWILIO_SID;
const TWILIO_TOKEN = process.env.TWILIO_TOKEN;
const TWILIO_FROM  = process.env.TWILIO_WHATSAPP_FROM;
const EMAIL_A      = process.env.EMAIL_ALEJANDRO;
const EMAIL_X      = process.env.EMAIL_ALEX;
const PHONE_A      = process.env.PHONE_ALEJANDRO;
const PHONE_X      = process.env.PHONE_ALEX;

const CUM = [23,158,496,1284,2559,4434,6984,14724,24084,35244,48204,62604,77304,92454,108354,126354,146354,170254];
const PKS = [3,18,45,105,170,250,340,430,520,620,720,800,800,800,800,800,800,800];
const GRN = [0,0,0,0,0,0,0,0,0,0,0,0,200,500,1000,1800,2800,3800];
const PRF = [23,135,338,788,1275,1875,2550,7740,9360,11160,12960,14400,14700,15150,15900,18000,20000,23900];
const DAYS = ['MON','TUE','WED','THU','FRI','SAT','SUN'];

// Full task data for weeks 1-3 (explicit), weeks 4-18 (via smart generics)
const TASKS = {
1:{a:{
MON:['File U.S. LLC online — Delaware or Wyoming','Research contract roasters: confirm price/lb, MOQ, lead time','Buy domain and set up professional email','Create Google Sheet: DM Tracker / Order Tracker / P&L','Map full supply chain from farm to door','List all documents needed to open a U.S. bank account'],
TUE:['Apply for EIN at IRS.gov — free, instant','Call top 3 contract roasters — request pricing sheet','Begin Colombia SAS research: call notary in Andes','Set up Google Drive folder structure: Legal/Finance/Operations/Green/BCorp','Research 2–3 packaging suppliers: bags must show harvest + roast date','Write your founder story in 3 sentences'],
WED:['Open U.S. business bank account at Mercury.com','Place first roasted coffee order — enough for 50–100 packs','Set up shipping station: boxes, scale, tape gun, packing slips','Order packaging bags — confirm harvest date + roast date field on bag','Set up Google Sheet P&L tab: week/packs/revenue/COGS/net','Draft simple product spec sheet: bag size, weight, roast profile, origin'],
THU:['Draft founder operating agreement: roles, equity, decision authority','Search USPTO trademark: "The Coffee Code" — identify conflicts','Identify backup contract roaster — need 2 options before orders begin','Create supply chain documentation: farm → mill → roaster → ship','Set up Wave (free) or QuickBooks: chart of accounts ready','Read B Corp BIA overview at bcorporation.net — understand 5 impact areas'],
FRI:['Begin Colombia SAS registration: schedule notary appointment in Antioquia','Confirm first coffee order on track — get written confirmation from roaster','Set up COGS spreadsheet: $56.50/pack — coffee, bag, ship, affiliate','Build top 100 U.S. specialty roaster contact list: name, city, IG, email','Research ICA Colombia: requirements for phytosanitary coffee export cert','Write 3 versions of influencer DM pitch — A/B test all 3 next week'],
SAT:['Set up Stripe — connect to ClickFunnels, confirm tax settings','Identify 3 strongest B Corp impact pillars: farming, worker pay, transparency','Document farmer relationships: names, farms, price paid vs FNC base','Add 50 more roasters to target list — want 100 before Week 8','Research freight forwarder options for Colombia → Miami route','Write brand positioning: who you are, for whom, what makes you different'],
SUN:['⭐ REVIEW: LLC filed ✓ EIN received ✓ Bank open ✓ First order placed ✓','Update Google Sheet: all Week 1 legal tasks logged with next action','Confirm coffee delivery date and plan Week 3 inventory needs','Review COGS model — does $56.50/pack hold with all costs factored in?','Plan Week 2 priorities: SAS, sample kits, first influencer DMs','Write this week\'s lessons learned — what took longer than expected?']},
x:{
MON:['Verify ClickFunnels funnel end-to-end: offer → order → bump → upsell → thank you','Connect Stripe to ClickFunnels — run $1 test charge and refund immediately','Confirm pixel fires on purchase confirmation page','Test abandoned cart email — place and abandon an order, confirm email arrives in 1hr','Enable Sticky Cookie — test 1 complete affiliate click-to-purchase flow','Set up email automation: welcome (day 0) → follow-up (day 3) → subscription (day 7)'],
TUE:['Build first DM list: 300 micro-influencers, coffee niche, 5K–80K, 3.5%+ engagement','Write 3 personalized DM openers referencing each target\'s actual content','Send first 35 personalized DMs — no templates','Create DM tracker: handle, date sent, reply status, follow-up date','Set up Wave or QuickBooks: chart of accounts with COGS, affiliate fees, shipping','Verify ClickFunnels order confirmation email arrives correctly'],
WED:['Send 35 DMs — new targets, different opening lines, log all results','Review Monday DM replies — respond to every reply within 2 hours','For any influencer who accepted: send affiliate link + 1-page content brief','Confirm ClickFunnels upsell fires post-purchase on mobile and desktop','Check welcome email open rate — is it above 30%?','Build influencer content brief: talking points, what to say, what not to say'],
THU:['Send 35 DMs — refine opener based on which version got replies Mon/Tue','Review all replies: Interested / Needs follow-up / No — log each in tracker','Test ClickFunnels checkout on mobile — fast load? Easy form?','Set COGS in accounting: $56.50/pack — coffee, bag, shipping, affiliate %','Write influencer welcome email: what they get, how link works, payment schedule','Research which 5 accounts have the most engaged espresso audiences'],
FRI:['Send 35 DMs — weekend coming, send today for Friday/Saturday replies','Log DM stats: total sent, reply rate, interested %, converted to affiliate','ClickFunnels: A/B test offer page headline — set up version A and version B','Confirm ClickFunnels subscription product: monthly billing, correct price','Review Stripe settings: tax collection enabled, payout schedule confirmed','Build Week 2 DM batch: 300 new targets queued and organized by niche'],
SAT:['Send 35 DMs — Saturday engagement 20% higher, capitalize on it','Respond to all DM replies within 1 hour — speed is your advantage','Review Week 1 ClickFunnels analytics: sessions, CTR, conversions — where is drop-off?','Set up referral program on thank-you page: bonus for customer referrals','Create social proof folder in Google Drive — for every influencer post that goes live','Write 3-paragraph brand story for ClickFunnels offer page — authentic and specific'],
SUN:['⭐ REVIEW: Funnel live ✓ Stripe working ✓ Total DMs 200+ this week','Log P&L: Week 1 revenue ($0–$50 is normal), COGS, net','Analyze DM results: which opening line had highest reply rate?','Queue Week 2 DM list: 300 new targets ready, organized, in tracker','Plan Week 2: A/B test continues, first kit ships, first order expected','Write top 3 learnings from Week 1 — what to do differently']}}
};

// Smart generic tasks for weeks 2-18 that haven't been hardcoded
function genericTasks(wk, person, day) {
  const isA = person === 'a';
  const wkGreenActive = wk >= 8;
  const wkDualRevenue = wk >= 13;
  const g = {
    MON: isA ? [
      `Daily fulfillment — ship all orders, confirm tracking (expected: ${Math.round(PKS[wk-1]/7)} orders/day)`,
      wkGreenActive ? '35 green roaster DMs — log every reply in green coffee tracker' : 'Confirm inventory on hand vs orders incoming this week',
      'Legal task of the week — action it first thing this morning',
      'Quality control: cup test any new coffee lot before accepting',
      'B Corp documentation update: supply chain log, impact data',
      wkDualRevenue ? 'Confirm green coffee shipment documentation is complete and correct' : 'Plan Week inventory: confirm supply secured for projected pack volume'
    ] : [
      'Send 35 personalized DMs to micro-influencers — no copy-paste, reference their content',
      'Review ClickFunnels analytics: CTR, opt-ins, conversions — fix top drop-off',
      'Check Stripe dashboard — reconcile weekend revenue and affiliate payouts',
      'Send weekly influencer newsletter: results, leaderboard, this week\'s content theme',
      'Brief active influencers: this week\'s hook and content calendar',
      'B Corp financial tracking: wages paid, sourcing costs, community investment'
    ],
    TUE: isA ? [
      'Fulfill Tuesday orders by 2PM — zero backlog into Wednesday',
      'Reorder roasted coffee if below 3-week forward supply buffer',
      'Follow up on this week\'s legal task — confirm progress or escalate',
      wkGreenActive ? '35 green roaster DMs — new targets plus Day 2 follow-ups' : 'Prepare green coffee sample kits for Week 8 outreach',
      'Update P&L: Week actuals vs projection — flag any variance over 10%',
      'B Corp: update Workers section with Coordinadora de Campo data'
    ] : [
      'Send 35 DMs + follow up all warm leads from last 3 weeks',
      `Weekly P&L: actual vs $${PRF[wk-1].toLocaleString()} weekly target — flag variances`,
      'ClickFunnels: A/B test or top funnel improvement this week',
      'Update influencer leaderboard: posts, clicks, sales, commissions',
      'CAC analysis: cost per activated influencer — improving week over week?',
      'Review subscription churn rate — target under 5% per month'
    ],
    WED: isA ? [
      'Fulfill Wednesday orders',
      'Pack influencer sample kits — maintain 20 kits ready at all times',
      wkGreenActive ? 'Ship green coffee samples to new roaster batch — include cupping notes' : 'Update green coffee one-pager with latest SCA scores',
      'B Corp: update environmental impact data — solar %, water use, chemicals avoided',
      wkDualRevenue ? 'Confirm green coffee order 48-hour response protocol is being followed' : 'Research: top 50 U.S. roasters to add to outreach list',
      'Review Coordinadora de Campo field report (Week 9+) or prep job listing (before)'
    ] : [
      'Send 35 DMs + brief all active influencers: this week\'s content hook',
      'ClickFunnels: email sequence performance — open rates, clicks, subscription conversion',
      'Review influencer posts live this week: views, clicks, Stripe revenue',
      'Track subscription % of total orders — target 35%+ by Week 12',
      wk >= 8 ? 'ClickFunnels: green coffee B2B page performance — roaster leads generated' : 'Build next week DM target list: 300 new accounts ready',
      'Collect and organize all UGC from this week into social proof folder'
    ],
    THU: isA ? [
      'Fulfill Thursday orders by 2PM',
      wkGreenActive ? '35 green roaster DMs — follow up all this week\'s contacts' : 'Add 25 more roasters to outreach list — running total toward 100',
      'Update weekly P&L — actual vs projection',
      'Legal follow-up: is this week\'s task 100% complete? Escalate if not.',
      'B Corp: estimate current BIA score — what is gap to 80 points?',
      wkDualRevenue ? 'Green coffee logistics: confirm shipment tracking and customs on track' : 'Document supply chain for B Corp: every lot logged with farm and date'
    ] : [
      'Send 35 DMs. Weekly P&L check vs cumulative target',
      'Stripe: reconcile all payouts and affiliate commissions — any errors?',
      '1099 tracker: log all influencer commission payouts this week',
      'ClickFunnels: subscription retention — any cancellations? Find out why.',
      'LTV calculation update: subscribers at current month vs previous',
      'Review influencer ROI: revenue generated vs commission paid per partner'
    ],
    FRI: isA ? [
      'Fulfill all orders — zero backlog entering weekend',
      'Confirm next week supply: is inventory secured for projected pack volume?',
      wkGreenActive ? '35 green roaster DMs — Friday push before weekend' : 'Finalize green coffee sample kit preparation for Week 8',
      'Legal: confirm all this week\'s filings are submitted and confirmed',
      'Pack all Monday orders in advance — ship first thing Monday',
      wkDualRevenue ? 'Confirm green coffee next shipment: volume, documentation, freight booked' : 'Review green coffee pipeline: which roasters are closest to ordering?'
    ] : [
      `Send 35 DMs. ${PKS[wk-1].toLocaleString()} packs this week — confirm pace mid-day`,
      'ClickFunnels: full analytics review — CTR, AOV, LTV, subscription %',
      'Stripe: weekly payout confirmed and reconciled for all revenue streams',
      'Build next week DM list: 300 new targets organized and ready',
      'Prepare next week influencer content brief: theme and talking points',
      'Review: subscription % of total revenue — on track for 35%+ target?'
    ],
    SAT: isA ? [
      wkGreenActive ? '35 green roaster DMs — Saturday craft roasters highly active on IG' : 'Build roaster contact list: add 25 more names toward 100 total',
      'B Corp: environmental data quantified — solar kWh, water reused, CO2 avoided',
      'Pack and prepare Monday orders in advance',
      'Supply chain documentation: all this week\'s lots fully logged for B Corp',
      wkDualRevenue ? 'Review green coffee margin at current volume — improving with scale?' : 'Prepare green coffee sample kits: 10 kits vacuum sealed, labeled, cupping notes',
      'Review and update B Corp impact report with this week\'s data'
    ] : [
      'Send 35 DMs — Saturday peak engagement, maximize outreach',
      'Engage publicly with every active influencer post this week',
      'Collect all UGC: screenshot, save, request repost permission',
      'Review: best-performing influencer this week — what are they doing differently?',
      'Write 3 new DM opener variations to test next week',
      'ClickFunnels: mobile UX audit — checkout, upsell, thank-you on mobile'
    ],
    SUN: isA ? [
      '⭐ SUNDAY REVIEW: fulfillment ✓ inventory ✓ legal ✓ B Corp update ✓',
      `Update P&L: actual vs $${PRF[wk-1].toLocaleString()} weekly target`,
      'Legal checklist: all this week\'s tasks 100% completed?',
      wkGreenActive ? 'Plan next week green coffee outreach: who to follow up, who to target fresh' : 'Confirm next week inventory: supply chain secured for all projected orders',
      'B Corp: estimated BIA score this week — gap to 80 points?',
      'Confirm next week supply chain: coffee ✓ logistics ✓ documentation ✓'
    ] : [
      '⭐ REVIEW: DMs sent ✓ packs target on track ✓ Stripe reconciled ✓ P&L closed ✓',
      'Send influencer weekly newsletter: results, leaderboard, next week theme',
      'P&L close: subscription %, CAC, LTV, gross margin — all documented',
      'Queue next week DM list: 300 targets ready by Monday 8AM',
      'Plan next week: pack target, content theme, funnel improvements',
      'Update B Corp financial tracker: wages, sourcing, community investment'
    ]
  };
  return g[day] || g['MON'];
}

function getTasksForDay(wk, person, day) {
  if (TASKS[wk] && TASKS[wk][person] && TASKS[wk][person][day]) {
    return TASKS[wk][person][day];
  }
  return genericTasks(wk, person, day);
}

// ── SUPABASE ──────────────────────────────────────────────────────────────────
async function fetchDoneState() {
  try {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/warroom?key=eq.tasks&select=value`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } });
    const rows = await r.json();
    return (rows && rows[0]) ? JSON.parse(rows[0].value) : {};
  } catch(e) { return {}; }
}

// ── TIMING ────────────────────────────────────────────────────────────────────
function getCurrentWeek() {
  const start = process.env.START_DATE ? new Date(process.env.START_DATE) : new Date('2025-03-31');
  const weeks = Math.floor((new Date() - start) / (7 * 24 * 60 * 60 * 1000));
  return Math.min(Math.max(weeks + 1, 1), 18);
}
function getDayKey(offset = 0) {
  const d = new Date(); d.setDate(d.getDate() + offset);
  return ['SUN','MON','TUE','WED','THU','FRI','SAT'][d.getDay()];
}

// ── ANALYSIS ──────────────────────────────────────────────────────────────────
function calcProgress(done, wk, person) {
  let total = 0, doneCount = 0;
  DAYS.forEach(day => {
    getTasksForDay(wk, person, day).forEach((_, i) => {
      total++;
      if (done[`${wk}-${person}-${day}-${i}`]) doneCount++;
    });
  });
  return { total, doneCount, pct: total ? Math.round(doneCount / total * 100) : 0 };
}

function getDayStatus(done, wk, person, day) {
  const tasks = getTasksForDay(wk, person, day);
  const completed = [], pending = [];
  tasks.forEach((text, i) => {
    if (done[`${wk}-${person}-${day}-${i}`]) completed.push(text);
    else pending.push(text);
  });
  return { completed, pending };
}

// ── WHATSAPP ──────────────────────────────────────────────────────────────────
function buildWhatsApp(wk, day, yesterday, done, person) {
  const name = person === 'a' ? 'ALEJANDRO' : 'ALEX';
  const prog = calcProgress(done, wk, person);
  const today = getDayStatus(done, wk, person, day);
  const yest  = getDayStatus(done, wk, person, yesterday);
  const green = GRN[wk-1] > 0 ? ` · 🌱 ${GRN[wk-1].toLocaleString()} lbs green` : '';

  let msg = `☕ *THE COFFEE CODE*\n`;
  msg += `Week ${wk} · ${day} · Daily Report\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
  msg += `*${name}* — ${prog.pct}% this week (${prog.doneCount}/${prog.total})\n`;
  msg += `📦 ${PKS[wk-1]} packs · 💰 $${PRF[wk-1].toLocaleString()} profit${green}\n\n`;

  if (yest.pending.length > 0) {
    msg += `⚠️ *${yest.pending.length} PENDING FROM ${yesterday} — DO THESE FIRST:*\n`;
    yest.pending.forEach((t, i) => { msg += `${i+1}. ${t}\n`; });
    msg += `\n`;
  } else {
    msg += `✅ All ${yesterday} tasks done!\n\n`;
  }

  if (today.completed.length > 0) {
    msg += `*Already done today (${today.completed.length}):*\n`;
    today.completed.forEach(t => { msg += `✓ ${t}\n`; });
    msg += `\n`;
  }

  if (today.pending.length > 0) {
    msg += `*📋 Still to do today (${today.pending.length}):*\n`;
    today.pending.forEach((t, i) => { msg += `${i+1}. ${t}\n`; });
  } else {
    msg += `🎯 *All today\'s tasks are done!*\n`;
  }

  msg += `\n👉 project-mnv5i.vercel.app`;
  return msg;
}

// ── EMAIL ─────────────────────────────────────────────────────────────────────
function buildEmail(wk, day, yesterday, done) {
  const progA = calcProgress(done, wk, 'a');
  const progX = calcProgress(done, wk, 'x');
  const tA = getDayStatus(done, wk, 'a', day);
  const tX = getDayStatus(done, wk, 'x', day);
  const yA = getDayStatus(done, wk, 'a', yesterday);
  const yX = getDayStatus(done, wk, 'x', yesterday);
  const green = GRN[wk-1] > 0 ? `${GRN[wk-1].toLocaleString()} lbs` : '—';

  const taskList = (status, accent) => {
    let h = '';
    status.completed.forEach(t => { h += `<li style="color:#9CA3AF;text-decoration:line-through;padding:4px 0;font-size:12px;border-bottom:1px solid #F9FAFB">✓ ${t}</li>`; });
    status.pending.forEach(t => { h += `<li style="padding:4px 0;font-size:12px;border-bottom:1px solid #F3F4F6;display:flex;gap:6px;align-items:flex-start"><span style="color:${accent};font-weight:700;flex-shrink:0;margin-top:1px">→</span><span>${t}</span></li>`; });
    return h;
  };

  const pendList = (status) => status.pending.map(t =>
    `<li style="color:#92400E;padding:4px 0;font-size:12px;border-bottom:1px solid #FEF3C7;display:flex;gap:6px;align-items:flex-start"><span style="flex-shrink:0">⚠</span><span>${t}</span></li>`
  ).join('');

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#F9FAFB;margin:0;padding:16px;color:#111827">
<div style="max-width:600px;margin:0 auto">
<div style="background:#78350F;color:white;padding:20px 24px;border-radius:8px 8px 0 0">
  <div style="font-size:10px;letter-spacing:3px;opacity:0.7;margin-bottom:4px">THE COFFEE CODE</div>
  <div style="font-size:22px;font-weight:700">Daily Report · Week ${wk} · ${day}</div>
  <div style="font-size:12px;opacity:0.8;margin-top:4px">${new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</div>
</div>
<div style="display:flex;background:white;border:1px solid #E5E7EB;border-top:none">
  <div style="flex:1;padding:12px 8px;text-align:center;border-right:1px solid #E5E7EB"><div style="font-size:18px;font-weight:700;color:#78350F">${PKS[wk-1].toLocaleString()}</div><div style="font-size:9px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px">Packs/Wk</div></div>
  <div style="flex:1;padding:12px 8px;text-align:center;border-right:1px solid #E5E7EB"><div style="font-size:18px;font-weight:700;color:#78350F">$${PRF[wk-1].toLocaleString()}</div><div style="font-size:9px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px">Profit</div></div>
  <div style="flex:1;padding:12px 8px;text-align:center;border-right:1px solid #E5E7EB"><div style="font-size:18px;font-weight:700;color:#78350F">${green}</div><div style="font-size:9px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px">Green</div></div>
  <div style="flex:1;padding:12px 8px;text-align:center"><div style="font-size:18px;font-weight:700;color:#78350F">$${CUM[wk-1].toLocaleString()}</div><div style="font-size:9px;color:#9CA3AF;text-transform:uppercase;letter-spacing:1px">Cumulative</div></div>
</div>

<div style="background:white;border:1px solid #E5E7EB;border-top:none;padding:16px 20px">
  <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#9CA3AF;margin-bottom:12px">📊 WEEK ${wk} PROGRESS</div>
  <div style="margin-bottom:10px">
    <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:700;color:#78350F">ALEJANDRO</span><span style="font-size:12px;color:#78350F;font-weight:700">${progA.pct}% — ${progA.doneCount}/${progA.total}</span></div>
    <div style="background:#F3F4F6;height:6px;border-radius:3px"><div style="background:#78350F;height:6px;border-radius:3px;width:${progA.pct}%"></div></div>
  </div>
  <div>
    <div style="display:flex;justify-content:space-between;margin-bottom:4px"><span style="font-size:12px;font-weight:700;color:#1D4ED8">ALEX</span><span style="font-size:12px;color:#1D4ED8;font-weight:700">${progX.pct}% — ${progX.doneCount}/${progX.total}</span></div>
    <div style="background:#F3F4F6;height:6px;border-radius:3px"><div style="background:#1D4ED8;height:6px;border-radius:3px;width:${progX.pct}%"></div></div>
  </div>
</div>

${(yA.pending.length > 0 || yX.pending.length > 0) ? `
<div style="background:#FFFBEB;border:1px solid #FDE68A;border-top:none;padding:16px 20px">
  <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#92400E;margin-bottom:12px">⚠️ PENDING FROM ${yesterday} — COMPLETE THESE FIRST TODAY</div>
  ${yA.pending.length > 0 ? `
  <div style="margin-bottom:12px">
    <div style="font-size:12px;font-weight:700;color:#78350F;margin-bottom:6px">ALEJANDRO — ${yA.pending.length} pending</div>
    <ul style="list-style:none;padding:0;margin:0">${pendList(yA)}</ul>
  </div>` : `<p style="font-size:12px;color:#15803D;margin:0 0 8px">✅ Alejandro completed all ${yesterday} tasks</p>`}
  ${yX.pending.length > 0 ? `
  <div>
    <div style="font-size:12px;font-weight:700;color:#1D4ED8;margin-bottom:6px">ALEX — ${yX.pending.length} pending</div>
    <ul style="list-style:none;padding:0;margin:0">${pendList(yX)}</ul>
  </div>` : `<p style="font-size:12px;color:#15803D;margin:0">✅ Alex completed all ${yesterday} tasks</p>`}
</div>` : `
<div style="background:#F0FDF4;border:1px solid #BBF7D0;border-top:none;padding:12px 20px">
  <p style="font-size:13px;color:#15803D;font-weight:600;margin:0">✅ Both completed all ${yesterday} tasks. Perfect execution.</p>
</div>`}

<div style="background:white;border:1px solid #E5E7EB;border-top:none;padding:16px 20px">
  <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#9CA3AF;margin-bottom:16px">📋 TODAY (${day}) — TAP TO OPEN WAR ROOM AND CHECK OFF</div>
  <div style="margin-bottom:16px">
    <div style="font-size:13px;font-weight:700;color:#78350F;margin-bottom:6px">ALEJANDRO · ${tA.pending.length} to do · ${tA.completed.length} done ✓</div>
    <ul style="list-style:none;padding:0;margin:0">${taskList(tA,'#78350F')}</ul>
  </div>
  <div>
    <div style="font-size:13px;font-weight:700;color:#1D4ED8;margin-bottom:6px">ALEX · ${tX.pending.length} to do · ${tX.completed.length} done ✓</div>
    <ul style="list-style:none;padding:0;margin:0">${taskList(tX,'#1D4ED8')}</ul>
  </div>
</div>

<div style="background:#F3F4F6;border:1px solid #E5E7EB;border-top:none;padding:14px 20px;border-radius:0 0 8px 8px;text-align:center">
  <a href="https://project-mnv5i.vercel.app" style="color:#78350F;text-decoration:none;font-weight:700;font-size:14px">Open War Room → project-mnv5i.vercel.app</a>
  <div style="font-size:10px;color:#9CA3AF;margin-top:6px">The Coffee Code · Daily Report · Week ${wk} of 18 · Sent automatically at 6AM Colombia</div>
</div>
</div></body></html>`;
}

// ── SEND ──────────────────────────────────────────────────────────────────────
async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method:'POST',
    headers:{'Authorization':`Bearer ${RESEND_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({from:'The Coffee Code <onboarding@resend.dev>',to:[to],subject,html})
  });
  const d = await res.json();
  console.log(`Email → ${to}:`, d.id ? '✅ sent' : '❌ '+JSON.stringify(d));
}

async function sendWhatsApp(to, body) {
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,{
    method:'POST',
    headers:{
      'Authorization':'Basic '+Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString('base64'),
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:new URLSearchParams({From:TWILIO_FROM,To:to,Body:body})
  });
  const d = await res.json();
  console.log(`WhatsApp → ${to}:`, d.sid ? '✅ sent' : '❌ '+JSON.stringify(d));
}

// ── MAIN ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('☕ The Coffee Code Daily Reporter v2 — starting...');
  const done = await fetchDoneState();
  const wk   = getCurrentWeek();
  const day  = getDayKey(0);
  const yest = getDayKey(-1);
  console.log(`Week ${wk} | Today: ${day} | Yesterday: ${yest} | Completed: ${Object.keys(done).filter(k=>done[k]).length} tasks`);

  const subject = `☕ TCC Report · Wk ${wk} · ${day} · ${new Date().toLocaleDateString('en-US',{month:'short',day:'numeric'})}`;
  const html = buildEmail(wk, day, yest, done);

  await sendEmail(EMAIL_A, subject, html);
  await sendEmail(EMAIL_X, subject, html);
  await sendWhatsApp(PHONE_A, buildWhatsApp(wk, day, yest, done, 'a'));
  await sendWhatsApp(PHONE_X, buildWhatsApp(wk, day, yest, done, 'x'));

  console.log('✅ Reports sent to Alejandro + Alex');
}

main().catch(err => { console.error('❌ Reporter failed:', err); process.exit(1); });
