export const lanes = [
  {
    icon: 'hugeicons:home-09',
    kicker: 'Personal Lines',
    title: 'Your account managers already know',
    body: 'They hear it first when a client buys a home, has a baby, or changes coverage. We turn that into a referral without asking an account manager to become a life agent.',
  },
  {
    icon: 'hugeicons:building-03',
    kicker: 'Commercial P&C',
    title: 'Business owners create bigger cases',
    body: 'Buy-sell funding, key-person, succession, executive benefits, estate planning. Your team spots it, our specialists take it from opportunity to placed.',
  },
  {
    icon: 'hugeicons:briefcase-dollar',
    kicker: 'Benefits & Financial Services',
    title: 'The conversation is already open',
    body: 'You are already talking about compensation, retention, and risk. Individual life, disability income, and long-term care sit one question away.',
  },
];

export const differentiators = [
  {
    kicker: 'Nobody else has this',
    title: 'The Client Multiplier',
    body: 'Every other brokerage takes names out of your book. Beneficiary onboarding and claims education put names back in — one placed policy can return two to three new households to you.',
  },
  {
    kicker: 'Since 1972',
    title: '50+ years and licensed everywhere',
    body: 'Licensed agents across every line in every state, 60+ carrier appointments, an underwriter on staff, and case designers who structure the complicated ones before they go out.',
  },
  {
    kicker: 'Built, not bought',
    title: 'Our own technology',
    body: 'Our CRM with automated email and phone drips, 100% digital submission, e-signatures, and e-policy delivery — free to partners, and the reason nothing sits waiting on a person.',
  },
];

// Who does each task under each route. 'p' = Pinney, 'y' = you.
export const routes = [
  { n: 1, name: 'Refer & Earn', flow: ['You refer', 'We sell'], pay: '50%', payNote: 'of your normal commission', detail: '50/50 compensation split' },
  { n: 2, name: 'App Assist', flow: ['You sell', 'We complete the app'], pay: '100%', payNote: 'of your normal commission', detail: 'Drop the ticket and save time' },
  { n: 3, name: 'Self-Service', flow: ['You sell', 'You complete the app'], pay: '100%', payNote: 'of your normal commission', detail: 'Run the application yourself on our contracts' },
];

export const routeTasks: { task: string; who: ('p' | 'y')[] }[] = [
  { task: 'Needs analysis', who: ['p', 'y', 'y'] },
  { task: 'Health screening', who: ['p', 'y', 'y'] },
  { task: 'Provide quotes', who: ['p', 'y', 'y'] },
  { task: 'Make the sale', who: ['p', 'y', 'y'] },
  { task: 'Application processing', who: ['p', 'p', 'y'] },
  { task: 'Case management', who: ['p', 'p', 'y'] },
  { task: 'Policy delivery', who: ['p', 'p', 'y'] },
  { task: 'Policy placement', who: ['p', 'p', 'y'] },
];

export const selfServiceIncludes = [
  'Complete the application directly',
  'Stay hands-on through submission',
  'Move quickly with no handoff',
  'Use our free CRM and quoting tools',
  'Keep our underwriting desk on call',
];

export const faqs = [
  {
    q: 'What does this cost our agency?',
    a: "Nothing. There is no platform fee, no minimum production requirement, no exclusivity, and no charge for the CRM, the quoting engine, case management, case design, or underwriting support. We're paid out of the same commission you are, which means we only make money when your client's policy actually places.",
  },
  {
    q: 'Do our producers need a life license?',
    a: "Not to refer. Your producer notices an opening, asks one question, and passes a name — that's the whole job. Referral compensation to unlicensed persons is regulated state by state, and we do that analysis with you during onboarding so the way you get paid is structured correctly from day one. If a producer is licensed and wants to write the case themselves, App Assist and Self-Service are there for that.",
  },
  {
    q: 'How and when do we get paid?',
    a: "A 50/50 split of the commission on placed business. No placed business, no commission — we take the risk on the cases that don't close. Payment mechanics and timing are set out in your partner agreement, which we walk through at kickoff before you send a single name.",
  },
  {
    q: 'What does our client actually hear when you call?',
    a: "They hear the life insurance division of your agency. Your agency is named first and your producer second, outbound email comes from an @lifeinsurancedivision address, and no unfamiliar brokerage name enters the conversation. The referral playbook has the full call outline, sentence by sentence. You're also welcome to sit in on the first several calls before you trust us with the rest of the book — ask for it at kickoff.",
    link: { href: '/playbook#on-the-call', label: 'Read the call outline' },
  },
  {
    q: "How fast do you call, and what if they don't answer?",
    a: "First call within 24 hours of receiving the referral. After that, a 14-day contact strategy: twenty-plus calls, texts, and emails, heavy in the first four days and tapering after. If the client engages at any point the cadence stops and the case moves to a real conversation. If they never respond, the file closes as withdrawn and you're told — you're never left wondering what happened to a name you sent.",
    link: { href: '/how-it-works#contact-strategy', label: 'See the 14-day schedule' },
  },
  {
    q: 'Is there a minimum case size?',
    a: 'No. Send the small ones. A $250,000 term policy on a young family takes the same fifteen-minute call as a large case, and those households are the ones that stay with your agency for twenty years.',
  },
  {
    q: 'What if the client has health issues?',
    a: "That's when this is worth the most to you. We have an underwriter on staff who pre-screens impaired risk before submission — cardiac history, diabetes, cancer history, build, prescription flags. On difficult cases we can shop informally and anonymously across carriers first, so a decline never lands on your client's record. Send the hard ones rather than writing them off.",
  },
  {
    q: 'How long does a case take?',
    a: 'Typically four to six weeks from application to approval, then delivery and placement. Exams, medical records, carrier requirements, and offer negotiation are chased daily by a named case manager, which is the difference between a case that issues and a case that quietly dies in requirements.',
  },
  {
    q: 'We already have a life carrier relationship. Does this conflict?',
    a: "No exclusivity is required. Plenty of partners use us for the cases they don't want to work and keep whatever they already have in place. Start by sending one name and compare the experience against your current path.",
  },
  {
    q: "Can you tell us what's already in our book before we commit?",
    a: "Yes, and it costs nothing. Send an extract from your AMS and we'll come back with an estimate of how much life revenue is sitting in your existing book — households with mortgages, business owners with partners, term policies approaching a conversion deadline. It's the cheapest way to find out whether this is worth your time.",
  },
  {
    q: 'How do we get our team to actually do it?',
    a: "Make it a standard rather than a suggestion. The teams that succeed with this set a target of one to five referrals per producer per week, add one life question to every quote and renewal, track the number somewhere visible, and read it out loud weekly. One agency built the habit in three weeks and now runs 29 to 30 referrals a month off a nine-person team. We'll help you run the kickoff.",
  },
];
