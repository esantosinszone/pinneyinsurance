// Site-wide settings, contacts, and navigation.
//
// The referral inbox is configurable: set PUBLIC_REFERRAL_INBOX in .env to the
// desk that should receive client details. It falls back to brokerage sales support.

const partnerships = 'brokeragesalessupport@pinneyinsurance.com';

export const contact = {
  partnerships,
  referrals: import.meta.env.PUBLIC_REFERRAL_INBOX || partnerships,
  contracting: 'contracting@pinneyinsurance.com',
  annuities: 'premium@pinneyinsurance.com',
  phone: { label: '(916) 409-6166', href: 'tel:19164096166' },
  tollFree: { label: '(800) 823-4852', href: 'tel:18008234852' },
  address: ['2266 Lava Ridge Court, Suite 200', 'Roseville, CA 95661'],
};

export const links = {
  portalSignup: 'https://pinney.insureio.com/signup',
  directForm: 'https://marketing.pinneyinsurance.com/inszonequote',
  mainSite: 'https://pinneyinsurance.com/',
  trainingVideoId: '1dKH28a7L58',
  formEmbedId: 'uszospXcpa6TYCAfo5TK',
};

const mailto = (to: string, subject: string, body?: string) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;

export const mail = {
  setupFirm: mailto(
    partnerships,
    'Looking To Refer Leads - P&C',
    'I am interested in setting my firm up to do referrals - can we meet? I have time on my calendar on [DAY AND TIME].\n\nAgency:\nName:\nPhone:\n',
  ),
  clientInfo: mailto(
    contact.referrals,
    'New Life Referral - Client Information',
    'Name:\nEmail:\nPhone number:\nState:\nBirthday:\nAmount of insurance needed:\n\nReferred by:\nAgency:\n',
  ),
  bookAnalysis: mailto(partnerships, 'Book analysis request'),
  partnerships: mailto(partnerships, 'Looking To Refer Leads - P&C'),
  contracting: mailto(contact.contracting, 'Carrier appointment request'),
  annuities: mailto(contact.annuities, 'Annuity request'),
};

export const nav = [
  { href: '/', label: 'Overview' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/playbook', label: 'Referral playbook' },
  { href: '/submit', label: 'Submit a client' },
];

export const stats = [
  { value: '50/50', label: 'Commission split' },
  { value: '$0', label: 'Cost to your agency' },
  { value: '60+', label: 'Carriers shopped' },
  { value: '24 hrs', label: 'To the first call' },
];

// Placeholder photography (Unsplash). Swap the `src` values for licensed brand imagery.
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const img = {
  advisor: { src: u('1573496359142-b8d87734a5a2', 1200), alt: 'A Pinney life insurance advisor in the office' },
  family: { src: u('1609220136736-443140cffec6'), alt: 'A father outdoors with his two young children' },
  owner: { src: u('1556740738-b6a63e27c4df'), alt: 'A small business owner working behind the counter of her shop' },
  conversation: { src: u('1551836022-d5d88e9218df'), alt: 'Two colleagues reviewing coverage options at a desk' },
  signing: { src: u('1450101499163-c8848c66ca85'), alt: 'A client signing an insurance application' },
  home: { src: u('1600585154340-be6161a56a0c'), alt: 'A newly purchased family home at dusk' },
  team: { src: u('1531545514256-b1400bc00f31'), alt: 'An agency team gathered around a laptop' },
  meeting: { src: u('1542744173-8e7e53415bb0'), alt: 'Producers in a training session at an agency office' },
  office: { src: u('1577962917302-cd874c4e31d2'), alt: 'A case manager presenting to colleagues in a bright office' },
  producer: { src: u('1611095973763-414019e72400'), alt: 'An advisor on a call with a client from his laptop' },
  paperwork: { src: u('1554224155-6726b3ff858f'), alt: 'Policy paperwork and a calculator on a desk' },
  success: { src: u('1600880292203-757bb62b4baf'), alt: 'Two agency partners celebrating a placed case' },
  couple: { src: u('1543269865-cbf427effbad'), alt: 'A couple reviewing their coverage together on a tablet' },
};
