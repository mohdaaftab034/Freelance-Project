import ServiceTemplate from './ServiceTemplate'

function EntertainmentServices() {
  return (
    <ServiceTemplate
      title="Celebrity Events"
      image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
      breadcrumb="Home > Services > Celebrity Events"
      overview={[
        'High-profile events require a blend of discretion, immaculate production and guest-focused hospitality. We specialise in delivering occasions where privacy and polish are equally important.',
        'Our team plans red-carpet arrivals, private green rooms, secure circulation and VIP hospitality so talent and high-value guests enjoy a calm, efficient experience.',
        'We coordinate security-friendly logistics, quick-change moments, and production cues to keep programs running precisely on time.',
        'Event Foundation brings a low-profile presence and high-impact delivery to celebrity and bespoke events alike.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80"
      included={[
        { icon: '🔒', title: 'Discreet Planning', text: 'Confidential logistics and communication protocols for sensitive events.' },
        { icon: '🚘', title: 'VIP Movement', text: 'Secure arrival plans, chauffeur coordination and protected circulation routes.' },
        { icon: '🎙️', title: 'Protocol Support', text: 'Hospitality and protocol that respects privacy while remaining gracious.' },
        { icon: '🧩', title: 'Show Control', text: 'Technical direction and run-of-show management for flawless timing.' },
        { icon: '🤝', title: 'Talent Coordination', text: 'Advance liaison with agents and handlers to streamline arrivals and requests.' },
        { icon: '✨', title: 'Premium Hospitality', text: 'Guest-facing experiences with elevated service and attention to detail.' },
      ]}
      features={[
        { title: 'Privacy-First Production', text: 'Discrete staging, off-camera holding areas and controlled guest flow for peace of mind.' },
        { title: 'Concierge-Level Hospitality', text: 'Dedicated VIP teams, bespoke riders and white-glove service options.' },
        { title: 'Crisis & Contingency Planning', text: 'Rapid-response plans for time-sensitive, high-stakes situations.' },
      ]}
      styleVariant="celebrity"
      gallery={[
        'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=80',
        'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&q=80',
        'https://images.unsplash.com/photo-1496337589254-7e19d01cec44?w=700&q=80',
        'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700&q=80',
      ]}
    />
  )
}

export default EntertainmentServices
