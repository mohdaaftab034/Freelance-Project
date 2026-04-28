import ServiceTemplate from './ServiceTemplate'

function DestinationWedding() {
  return (
    <ServiceTemplate
      title="Destination Events"
      image="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80"
      breadcrumb="Home > Services > Destination Events"
      overview={[
        'Destination events are about place as much as people — we design celebrations that connect with the location and remove friction for travelling guests.',
        'From group transfers and welcome logistics to local vendor management and cultural sensitivity, we manage the on-ground complexities so guests can relax and enjoy.',
        'Our creative direction adapts to each setting, ensuring décor, lighting and flow respond to natural light, terrain and local service rhythms.',
        'Event Foundation plans destination celebrations with detailed itineraries, generous guest communications, and contingency plans to keep everything on track.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80"
      included={[
        { icon: '✈️', title: 'Travel Planning', text: 'Group transfer coordination, arrival windows and transport logistics.' },
        { icon: '🏨', title: 'Stay Coordination', text: 'Rooming lists, welcome amenities and guest communications managed end-to-end.' },
        { icon: '🧭', title: 'Local Logistics', text: 'Site readiness, route assessments and local permits handled in advance.' },
        { icon: '🎨', title: 'Creative Consistency', text: 'Styling adapted to environment, materials and local suppliers for authentic results.' },
        { icon: '🧾', title: 'Vendor Management', text: 'Regional partners contracted and briefed with clear standards and timelines.' },
        { icon: '🛡️', title: 'Contingency Support', text: 'Weather, travel or supplier fallbacks planned with practical alternatives.' },
      ]}
      features={[
        { title: 'Guest Itinerary Design', text: 'We build clear, helpful itineraries that answer travel questions and set expectations.' },
        { title: 'Local Partner Network', text: 'We source trusted local vendors to preserve quality and reduce lead-time risks.' },
        { title: 'Cultural & Legal Guidance', text: 'We advise on local customs, permits and regulations to keep your event compliant and respectful.' },
      ]}
      styleVariant="destination"
      gallery={[
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=700&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=80',
        'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=700&q=80',
      ]}
    />
  )
}

export default DestinationWedding
