export const handoffLine = "I'm going to have our life specialist reach out this week. It'll come up as our life insurance division, so pick up when you see it.";

export const sendFields = [
  "Client's first and last name",
  'Phone number',
  'Email address',
  'State',
  'Date of birth',
  'Amount of insurance needed, if they said',
  'Your name, so the credit finds you',
];

export const goodFit = [
  { title: 'Married, young kids, a mortgage', body: 'Income replacement and debt protection in one conversation. Our highest close rate.' },
  { title: 'Business owner with a partner', body: 'Buy-sell funding. Without insurance the operating agreement is a promise, not a plan.' },
  { title: 'A business where one person carries the revenue', body: 'Key-person coverage. Lenders and investors often ask before you do.' },
  { title: 'High earner with a non-working spouse', body: 'One income carries the household and group coverage never closes the gap.' },
  { title: 'Maxed out 401(k) and Roth, cash left over', body: 'Wants tax-advantaged growth with a floor. A retirement conversation, not a death conversation.' },
  { title: 'Term policy within two years of expiring', body: 'The level period ends and the premium jumps. Far easier to solve before the rate change.' },
  { title: 'Bank or SBA loan in progress', body: 'Coverage is routinely a funding condition. This one has a deadline attached.' },
  { title: 'Recently divorced, or a new baby', body: 'Court-ordered coverage is common, and the beneficiary on file is frequently an ex or a parent.' },
];

export const badFit = [
  { title: 'Under 25, single, renting, no debt', body: 'Nothing to protect yet. Keep the name and call us when that changes.' },
  { title: 'Retired with no dependents and no estate need', body: 'No income to replace and no heirs to equalize.' },
  { title: 'Students or unemployed young adults', body: 'No income and usually no premium capacity.' },
  { title: 'Living paycheck to paycheck with no surplus', body: 'A policy that lapses in month four helps nobody. Revisit when cash flow steadies.' },
  { title: 'Significant assets, no heirs, no charitable intent', body: 'Self-insured with nowhere for the benefit to go.' },
  { title: 'Government agencies, public schools, large public corporations', body: "Commercial life concepts don't apply — ownership is diversified or coverage is institutional." },
  { title: 'Anyone who told you no', body: "Don't submit it. The relationship is worth more than the case." },
];

export const personas = [
  {
    id: 'protector',
    icon: 'hugeicons:user-love-01',
    name: 'The Protector',
    cue: 'Leads with family',
    tell: 'Talks about their kids before they talk about money. Bought the house for the school district. Responds to responsibility, not returns.',
    script: "Congratulations again on the house. One thing I always bring up — that mortgage is the biggest bill your family would be left with if something happened to you. We have a life team that handles this for our clients. Want me to have them give you a call? No cost, no pressure.",
    avoid: "Rate-of-return talk. They don't care about the yield, they care who writes the check.",
  },
  {
    id: 'numbers',
    icon: 'hugeicons:calculator-01',
    name: 'The Numbers Person',
    cue: 'Wants the math',
    tell: 'Asks what it costs before they ask what it does. Comparison shops everything. Skeptical of anything that sounds like a pitch.',
    script: "Most people are covered for one or two times their salary through work, and the actual number needed is usually closer to twenty times income minus what's already there. Our team will run that number with you in about fifteen minutes and show you what the market prices it at. No obligation on either side.",
    avoid: 'Emotional framing. Give them the arithmetic and let it do the work.',
  },
  {
    id: 'owner',
    icon: 'hugeicons:store-01',
    name: 'The Business Owner',
    cue: 'Thinks in risk',
    tell: 'Already insures buildings, vehicles, liability, and data. Has never insured the two people the whole business runs on.',
    script: "Quick question on the business side — if something happened to you or your partner tomorrow, is there anything in place to fund the buyout? Same question for whoever carries most of the revenue. Our life team does buy-sell and key man work for our commercial clients. Worth a fifteen-minute call?",
    avoid: 'Personal-protection language. Frame it as continuity and control of the business.',
  },
  {
    id: 'accumulator',
    icon: 'hugeicons:chart-increase',
    name: 'The Accumulator',
    cue: 'Retirement-minded',
    tell: 'Maxed the 401(k) and the Roth, still has cash, and is tired of watching the market swing. Wants safe growth and predictable income later.',
    script: "You mentioned you've already maxed out your retirement accounts. There's a category most people never get shown — growth with a floor under it and predictable income later, without the market risk. Our team walks through it in fifteen minutes. Want me to set that up?",
    avoid: 'Calling it life insurance up front. This is an income and tax conversation.',
  },
  {
    id: 'procrastinator',
    icon: 'hugeicons:hourglass',
    name: 'The Procrastinator',
    cue: 'Agrees, never acts',
    tell: 'Has been meaning to do this for three years. Will say yes to the idea and no to the calendar. Needs the decision taken off their plate.',
    script: "You've mentioned this before, so let me just make it easy — I'll hand your name to our life team and they'll call you. Fifteen minutes, no paperwork on your end, and if the timing's wrong they'll leave it alone. Fair?",
    avoid: "Asking them to call someone or fill something out. You do it for them or it doesn't happen.",
  },
  {
    id: 'covered',
    icon: 'hugeicons:briefcase-01',
    name: 'The Already-Covered',
    cue: '“I have it through work”',
    tell: 'The single most common objection by a wide margin. Usually one to two times salary, and it ends the day the job does.',
    script: "That's a good start. Two things worth knowing: it usually ends the day you leave the job, and it's often only one or two times salary. It costs nothing to have our team look at what you've got and tell you whether there's a gap. Want me to set that up?",
    avoid: "Telling them they're wrong. Agree first, then add the two facts they've never been told.",
  },
];

// Call outline. Text inside [brackets] renders as a fill-in slot set at kickoff.
export const beats = [
  { title: 'Introduction', quote: 'Hello [client], this is [advisor] with the life insurance division at [your agency]. [Your producer] asked me to reach out. Did I catch you at a bad time?', note: 'Your agency is named first, your producer second. That is what gets the call answered instead of screened.' },
  { title: 'Purpose', quote: "I'm calling to take a few minutes to go over your information, get you a quote, and walk you through how the application and approval process works.", note: 'Calls are recorded for quality assurance and the client is told so.' },
  { title: 'Who we are', quote: 'What we do is gather your information and bring you free quotes from top-rated carriers — Prudential, Mutual of Omaha, Banner Life, John Hancock, to name a few.', note: 'Carrier names do the credibility work. No unfamiliar brokerage enters the conversation.' },
  { title: 'Establish the need', quote: "First of all — what's come up in your life that's prompting you to look at life insurance right now?", note: "Uncovers who they're protecting. Everything after this is built on the answer." },
  { title: 'Set expectations', quote: "It's three simple steps: a few health and lifestyle questions, a no-cost mini exam, and underwriting — usually four to six weeks to approval.", note: 'Said up front, so the exam and the wait never become the surprise that stalls the case.' },
  { title: 'Verify the basics', quote: 'Let me verify a few basics — name, address, phone, email, date of birth, height and weight. And have you used any form of tobacco or nicotine in the past five years?', note: 'Clean data at the front is the difference between a four-week case and a twelve-week one.' },
  { title: 'Needs analysis', quote: "Based on what you've told me, I'd recommend around [amount] — replacing your income for [years] years, paying off debt, and crediting your existing coverage and savings. How does that sound?", note: 'The number is derived on the call, in front of the client, from their own figures.' },
  { title: 'Health and lifestyle', quote: "Other than what we've discussed, are you taking any other prescription medications? Any other reason you might not qualify for the best rates?", note: 'Where impaired-risk cases get caught early and routed to our underwriter before a carrier ever sees the file.' },
  { title: 'Deliver the rate', quote: 'The carrier with the best rate for you is [carrier] — how familiar are you with them? For [amount] of [term] level term, the premium is [premium]. How does that sound?', note: 'Carrier rating and years in business are quoted alongside the number.' },
  { title: 'Handle objections and apply', quote: "That's a great start — most employer policies are limited. Let me show you how to build coverage that stays with you no matter where you work.", note: 'Objections are answered, not argued with, and the application is taken on the same call wherever possible.' },
];

export const standards = [
  { icon: 'hugeicons:settings-02', title: 'Before you start', body: 'Set the white-label intro line your clients will hear, and name a referral owner on your side.' },
  { icon: 'hugeicons:target-02', title: 'Make it a standard', body: 'One to five referrals per producer per week, and one life question added to every quote.' },
  { icon: 'hugeicons:chart-line-data-02', title: 'Track it weekly', body: 'Put the number somewhere visible and read it out loud. That is the whole management system.' },
];
