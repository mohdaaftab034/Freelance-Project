import LegalPage from './LegalPage'
import '../styles/legal-pages.css'

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    paragraphs: [
      'By accessing or using the Event Foundation website and services, you agree to be bound by these Terms and Conditions. If you do not agree, please discontinue use of the site and our services.',
      'These terms apply to all visitors, clients, vendors, and other parties who interact with our website, proposals, communications, and event planning services.',
    ],
  },
  {
    id: 'services',
    title: 'Scope of Services',
    paragraphs: [
      'Event Foundation provides event planning, coordination, design, and related concierge services. The exact scope, deliverables, timelines, and fees for any engagement will be defined in a separate proposal, agreement, or confirmation exchanged with the client.',
      'We may update, refine, or discontinue parts of the website or service descriptions at any time to reflect current offerings and operational improvements.',
    ],
  },
  {
    id: 'bookings',
    title: 'Bookings and Payments',
    paragraphs: [
      'All booking requests are subject to availability, venue approvals, budget confirmation, and written acceptance by Event Foundation. A booking is considered confirmed only when the required advance payment has been received and acknowledged.',
      'Payment schedules, milestones, vendor coordination, and cancellation terms will be communicated in the engagement agreement. Late payments may result in delayed deliverables or suspension of services until dues are cleared.',
    ],
  },
  {
    id: 'client-duties',
    title: 'Client Responsibilities',
    paragraphs: [
      'Clients are responsible for providing accurate event details, timely approvals, and any information required for venue coordination, vendor communication, guest management, or statutory permissions.',
      'Event Foundation is not liable for delays, losses, or service interruptions caused by incomplete information, failure to secure third-party approvals, or changes requested after final sign-off.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    paragraphs: [
      'All original content on this website, including text, graphics, branding, imagery, and layout, is owned by or licensed to Event Foundation unless stated otherwise. You may not copy, reproduce, distribute, or exploit such material without prior written permission.',
      'Any concepts, designs, or planning material shared during the course of engagement remain subject to the ownership, licensing, and usage terms outlined in the applicable agreement.',
    ],
  },
  {
    id: 'liability',
    title: 'Limitations of Liability',
    paragraphs: [
      'Event Foundation acts as a planning and coordination partner and may rely on third-party vendors, venues, and service providers. We are not responsible for failure, delay, or loss caused by circumstances beyond our reasonable control, including force majeure events and third-party non-performance.',
      'To the fullest extent permitted by law, our liability for any claim connected to our website or services will be limited to the amount paid by the client for the specific service giving rise to the claim.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    paragraphs: [
      'We may revise these Terms and Conditions periodically to reflect changes in our services, legal obligations, or business operations. The updated version will be posted on this page with a new effective date.',
      'Continued use of the website or services after changes are posted constitutes acceptance of the revised terms.',
    ],
  },
]

function TermsAndConditions() {
  return (
    <LegalPage
      title="Terms and Conditions"
      breadcrumb="HOME / TERMS AND CONDITIONS"
      intro="Clear terms that guide how our website and event planning services are used, booked, and delivered."
      updatedAt="April 29, 2026"
      sections={sections}
    />
  )
}

export default TermsAndConditions
