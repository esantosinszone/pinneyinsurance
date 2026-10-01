import manifest from './images.json';

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

// Placeholder photography (Unsplash License), optimised to local WebP by
// scripts/optimize-images.mjs. Each entry carries src, srcset, width and height;
// components add the `sizes` that matches their layout. Replace with licensed
// brand photography before launch.
type Photo = (typeof manifest)[keyof typeof manifest] & { alt: string };
const photo = (name: keyof typeof manifest, alt: string): Photo => ({ ...manifest[name], alt });

export const img = {
  advisor: photo('advisor', 'An insurance advisor smiling in a bright office'),
  family: photo('family', 'A father outdoors with his two young children'),
  owner: photo('owner', 'A small business owner working behind the counter of her shop'),
  conversation: photo('conversation', 'Two colleagues reviewing coverage options at a desk'),
  signing: photo('signing', 'A client signing an insurance application'),
  home: photo('home', 'A modern family home at dusk'),
  team: photo('team', 'An agency team gathered around a laptop'),
  meeting: photo('meeting', 'Colleagues in a training session in an office'),
  officeBg: photo('officeBg', ''),
  office: photo('office', 'A presenter speaking to colleagues in a bright office'),
  producer: photo('producer', 'An advisor on a call from his laptop'),
  paperwork: photo('paperwork', 'Policy paperwork and a calculator on a desk'),
  success: photo('success', 'Two colleagues celebrating at work'),
  couple: photo('couple', 'Friends looking at a tablet together'),
};
