export const casePath = [
  { lane: 'you', title: 'Send the name', note: '6 fields, 2 minutes', when: 'Day 0' },
  { lane: 'us', title: 'We call', note: 'As your life division', when: 'Within 24 hrs' },
  { lane: 'us', title: 'We quote & sell', note: 'Needs analysis, health screen, rate on the call', when: 'Days 1–14' },
  { lane: 'us', title: 'We underwrite', note: 'Exams, records, requirements, offers', when: 'Weeks 1–6' },
  { lane: 'us', title: 'We place it', note: 'Delivered, in force, reported back to you', when: 'On issue' },
  { lane: 'you', title: 'You get paid', note: '50/50 split on placed business', when: 'On placement' },
] as const;

export const insideStages = [
  { title: 'Case arrives', body: 'A referral or a drop ticket lands with a licensed advisor and a named case manager.' },
  { title: 'We quote it', body: 'Shopped across 60+ carriers for the one whose underwriting actually likes the case.' },
  { title: 'Underwriter reviews', body: 'Our in-house underwriter makes the best-placement call before anything is submitted.' },
  { title: 'Case management', body: 'Exams, medical records, and carrier requirements are chased daily until it issues.' },
  { title: 'It pays out', body: 'The policy is in force, the client is onboarded, and you get paid.' },
];

export const metrics = [
  { value: '+20%', title: 'Average placement ratio lift', body: 'What having an underwriter on staff does to the share of submitted applications that end up in force.' },
  { value: '24 hrs', title: 'To the first call', body: 'Every referral, no exceptions. Speed to lead is the single biggest predictor of whether a case ever happens.' },
  { value: '2×', title: 'What one placed policy can become', body: 'Beneficiary onboarding sends the people named on the policy through the same process — and back to you.' },
];

export const buckets = [
  {
    id: 'placement',
    label: 'Placement',
    question: 'Will the case actually close?',
    items: [
      { icon: 'hugeicons:globe-02', title: 'Licensed in every state, across every line', body: 'Life, disability, long-term care, annuities, and retirement. No case gets turned away for geography or product.' },
      { icon: 'hugeicons:stethoscope', title: 'An underwriter on staff', body: 'Impaired risk pre-screened before submission — cardiac, diabetes, cancer history, build, prescription flags. Worth about 20 points of placement ratio.' },
      { icon: 'hugeicons:incognito', title: 'Informal inquiries on hard cases', body: "We shop a difficult case anonymously across carriers first, so a decline never lands on your client's record." },
      { icon: 'hugeicons:drawing-compass', title: 'Case designers', body: 'Buy-sell, key person, executive benefits, estate equalization, retirement income. The structure gets built before the application goes out.' },
      { icon: 'hugeicons:task-done-02', title: 'Case managers who chase requirements', body: 'Exams, medical records, carrier requirements, and offers worked daily through the long turnarounds until the policy issues.' },
      { icon: 'hugeicons:user-group', title: 'A named team, not a queue', body: 'A named advisor, case manager, and brokerage manager. When a case gets complicated, you know exactly who to call.' },
    ],
  },
  {
    id: 'leverage',
    label: 'Leverage',
    question: 'How much of this lands on my desk?',
    items: [
      { icon: 'hugeicons:dashboard-square-02', title: 'Our own CRM, free', body: 'Automated email and phone drips built in. Your client stays engaged without another follow-up task on your calendar.' },
      { icon: 'hugeicons:call-outgoing-01', title: 'First call within 24 hours', body: 'On every referral. No name sits in an inbox waiting for someone to get to it.' },
      { icon: 'hugeicons:calendar-03', title: 'A 14-day contact strategy', body: 'Twenty-plus calls, texts, and emails before anyone gives up on a name you sent.' },
      { icon: 'hugeicons:file-edit', title: "App Assist when you'd rather sell it", body: 'You close, we take the application. Two minutes of your time instead of twenty.' },
      { icon: 'hugeicons:legal-01', title: 'Licensing and compliance handled', body: 'Referral compensation is regulated state by state. We do that analysis so the way you get paid is structured correctly from day one.' },
      { icon: 'hugeicons:message-notification-01', title: 'You always hear back', body: 'Placed, declined, or withdrawn — every referral gets an answer. No black hole after submission.' },
    ],
  },
  {
    id: 'multiplier',
    label: 'Multiplier',
    question: 'Does this actually grow my agency?',
    items: [
      { icon: 'hugeicons:book-open-02', title: 'Beneficiary onboarding and claims packages', body: "The people your client's policy protects get educated on what the policy is and exactly what to do if it's ever needed." },
      { icon: 'hugeicons:user-multiple-02', title: 'The Pinney Client Multiplier', body: 'Those same beneficiaries go through the process themselves. One placed policy can double the business that comes out of it.' },
      { icon: 'hugeicons:user-add-01', title: 'Referrals collected on the application call', body: 'We ask while we have the client, and the names come back to you. One client, three referral opportunities.' },
      { icon: 'hugeicons:analytics-01', title: 'Book analysis before you commit', body: "Send an extract from your AMS and we'll tell you how much life revenue is already sitting in your book. Costs you nothing." },
      { icon: 'hugeicons:calendar-check-out-01', title: 'Term conversion mining', body: 'We find the policies coming up on a conversion deadline. Revenue with a date already attached to it.' },
      { icon: 'hugeicons:heart-handshake', title: 'Claims advocacy', body: "When a client dies, our team runs the claim with the family. You're the one who made sure they were covered." },
    ],
  },
];

// 14-day cadence. c = calls, t = texts, e = emails.
export const cadence = [
  { day: 1, c: 3, t: 1, e: 1, status: 'hot' },
  { day: 2, c: 2, t: 0, e: 0, status: 'hot' },
  { day: 3, c: 2, t: 1, e: 0, status: 'hot' },
  { day: 4, c: 2, t: 0, e: 0, status: 'warm' },
  { day: 5, c: 1, t: 0, e: 1, status: 'cool' },
  { day: 6, c: 1, t: 0, e: 0, status: 'cool' },
  { day: 7, c: 1, t: 0, e: 1, status: 'cool' },
  { day: 8, c: 1, t: 0, e: 0, status: 'cool' },
  { day: 9, c: 1, t: 0, e: 0, status: 'cool' },
  { day: 10, c: 0, t: 0, e: 0, status: 'cool' },
  { day: 11, c: 1, t: 0, e: 0, status: 'cool' },
  { day: 12, c: 0, t: 0, e: 0, status: 'cool' },
  { day: 13, c: 1, t: 0, e: 0, status: 'cool' },
  { day: 14, c: 1, t: 0, e: 1, status: 'closed' },
] as const;

export const cadenceTable = [
  { day: 'Day 1', attempts: 'First call within 24 hours, then two more — midday and PM', pattern: 'Voicemail on the first and third; text and personalized email follow the first attempt', status: 'hot' },
  { day: 'Day 2', attempts: 'Two calls — AM and PM', pattern: 'Message on the afternoon attempt only', status: 'hot' },
  { day: 'Day 3', attempts: 'Two calls — AM and PM', pattern: 'Message on the morning attempt; text immediately after', status: 'hot' },
  { day: 'Day 4', attempts: 'Two calls — AM and PM', pattern: 'Message on the afternoon attempt', status: 'warm' },
  { day: 'Days 5–8', attempts: 'One call per day, alternating AM and PM', pattern: 'Message every other day', status: 'cool' },
  { day: 'Days 8–13', attempts: 'One call every other day, alternating AM and PM', pattern: 'No messages — attempts only', status: 'cool' },
  { day: 'Day 14', attempts: 'Final call', pattern: 'Final message: the file goes on hold until we hear back', status: 'closed' },
] as const;

export const statusStyle: Record<string, { label: string; dot: string; text: string }> = {
  hot: { label: 'Hot', dot: 'bg-hot', text: 'text-hot' },
  warm: { label: 'Warm', dot: 'bg-warm', text: 'text-warm-ink' },
  cool: { label: 'Cool', dot: 'bg-blue', text: 'text-blue-600' },
  closed: { label: 'Closed', dot: 'bg-muted', text: 'text-muted' },
};

export const products = [
  { icon: 'hugeicons:shield-user', label: 'Life insurance' },
  { icon: 'hugeicons:money-bag-02', label: 'Annuities' },
  { icon: 'hugeicons:health', label: 'Disability income' },
  { icon: 'hugeicons:elder', label: 'Long-term care' },
  { icon: 'hugeicons:flower', label: 'Final expense & burial' },
  { icon: 'hugeicons:chess-02', label: 'Advanced planning strategies' },
];

export const carriers = [
  'Accordia Life', 'American Continental Insurance', 'American Equity', 'American Memorial Life', 'American National',
  'Americo', 'Assurity Life', 'Athene', 'Baltimore Life', 'Banner Life', 'Cincinnati Life', 'Companion Life (NY only)',
  'Corebridge Financial', 'Pan-American Life', 'Equitable', 'EquiTrust Life', 'Fidelity & Guaranty Life', 'Fidelity Investments',
  'Foresters Life', 'Forethought Financial', 'Genworth', 'Gerber Life', 'Globe Life Insurance (NY only)', 'Great American Financial',
  'Great Western Insurance', 'Guarantee Trust Life', 'Integrity Life', 'John Hancock Life', 'Legal & General America', 'LifeSecure',
  'Life Insurance Company of the SW', 'Lincoln National', 'MassMutual', 'MedAmerica', 'MetLife', 'Minnesota Life',
  'Mutual Trust Financial Group', 'National Western Life', 'Nationwide Life', 'New York Life', 'North American Co', 'OneAmerica',
  'Oxford Life', 'Pacific Life', 'Peterson Financial / Lloyds', 'Principal Financial Group', 'Protective Life', 'Pruco Life',
  'Reliance Standard', 'Royal Neighbors of America', 'Sagicor', 'Savings Bank Life', 'Securian (NY only)', 'Sons of Norway',
  'Standard Life', 'State Life / OneAmerica', 'Symetra', 'Transamerica', 'United American', 'United Home Life Insurance',
  'United of Omaha', 'US Life (NY only)', 'Vantis Life', 'Voya', 'William Penn (NY only)', 'Zurich American Life',
].sort((a, b) => a.localeCompare(b));
