import useDocumentTitle from '../hooks/useDocumentTitle'
import LegalPage from './LegalPage'
import '../styles/legal-pages.css'

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    paragraphs: [
      'We may collect information you voluntarily submit through contact forms, enquiry requests, phone calls, WhatsApp messages, email correspondence, and event brief submissions.',
      'This may include your name, contact details, event dates, budget preferences, venue information, and any other details you choose to share with us while discussing an engagement.',
    ],
  },
  {
    id: 'how-we-use-information',
    title: 'How We Use Information',
    paragraphs: [
      'The information we collect is used to respond to enquiries, prepare proposals, coordinate services, manage bookings, communicate with you about your event, and improve the quality of our client experience.',
      'We may also use limited information to maintain internal records, monitor website performance, and support customer service and operational planning.',
    ],
  },
  {
    id: 'sharing',
    title: 'Sharing Information',
    paragraphs: [
      'We do not sell your personal information. We may share relevant details with trusted vendors, venue partners, or service providers only when required to plan, coordinate, or deliver your event.',
      'Where possible, we limit shared information to the minimum needed for execution and expect our partners to handle it responsibly and for the agreed purpose only.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and Analytics',
    paragraphs: [
      'Our website may use cookies or similar technologies to understand how visitors interact with pages, improve navigation, and measure site performance. You can control cookie settings through your browser preferences.',
      'Any analytics data we review is used in aggregate form to improve content, usability, and the overall digital experience of the website.',
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    paragraphs: [
      'We take reasonable administrative and technical steps to protect the information you share with us. However, no online transmission or storage method can be guaranteed to be completely secure.',
      'We recommend that you avoid sending highly sensitive information through unsecured channels and contact us directly if you have concerns about how your data is being handled.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights and Choices',
    paragraphs: [
      'You may request access, correction, or deletion of the personal information we hold about you, subject to applicable law and reasonable business requirements.',
      'You may also opt out of non-essential communications by contacting us through the details listed on the website.',
    ],
  },
  {
    id: 'policy-updates',
    title: 'Policy Updates',
    paragraphs: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or service offerings. Any revisions will be posted on this page with an updated date.',
      'Please review this page periodically to stay informed about how we protect and use your information.',
    ],
  },
]

function LegalPrivacy() {
  useDocumentTitle('Privacy Policy')
  return (
    <LegalPage
      title="Privacy Policy"
      breadcrumb="HOME / PRIVACY POLICY"
      intro="How we collect, use, store, and protect information shared with Event Foundation."
      updatedAt="April 29, 2026"
      sections={sections}
    />
  )
}

export default LegalPrivacy
