import ServiceTemplate from './ServiceTemplate'

function CateringServices() {
  return (
    <ServiceTemplate
      title="Catering Coordination"
      image="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80"
      breadcrumb="Home > Services > Catering Coordination"
      overview={[
        'Dining is one of the most memorable parts of any celebration. We treat catering as a curated hospitality moment that supports the wider event narrative.',
        'We collaborate with culinary partners to design menus, tasting processes and service formats that suit the mood and guest profile.',
        'Our coordination covers staff briefings, service pacing, dietary planning and presentation so guests enjoy food that feels effortless and well-timed.',
        'Event Foundation ensures catering complements the event rhythm and becomes a highlight rather than a logistical worry.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
      included={[
        { icon: '🍽️', title: 'Menu Planning', text: 'Seasonal menus and plated or buffet formats tailored to the guest list.' },
        { icon: '🥗', title: 'Tasting Support', text: 'Guided tastings and menu refinements with clear pricing and options.' },
        { icon: '🧑‍🍳', title: 'Service Flow', text: 'Course timing and staffing plans that keep service smooth and warm.' },
        { icon: '🥂', title: 'Beverage Coordination', text: 'Beverage pairing, bar setup and responsible service planning.' },
        { icon: '🪑', title: 'Setup Planning', text: 'Service areas and guest access designed for efficiency and atmosphere.' },
        { icon: '✅', title: 'Vendor Sync', text: 'Full coordination between kitchen teams and event production for on-time execution.' },
      ]}
      features={[
        { title: 'Curated Tastings', text: 'We structure tastings to reflect event flow and guest preferences—followed by clear proposal documents.' },
        { title: 'Dietary Management', text: 'Allergies and preferences are accounted for with transparent communication to the culinary team.' },
        { title: 'Service Style Expertise', text: 'Plated, family-style or buffet — we recommend the format that best supports the event energy.' },
      ]}
      styleVariant="catering"
      gallery={[
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80',
      ]}
    />
  )
}

export default CateringServices
