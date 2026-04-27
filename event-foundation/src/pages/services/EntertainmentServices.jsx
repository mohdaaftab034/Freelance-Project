import ServiceTemplate from './ServiceTemplate'

function EntertainmentServices() {
  return (
    <ServiceTemplate
      title="Entertainment Services"
      image="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920&q=80"
      breadcrumb="Home > Services > Entertainment Services"
      overview={[
        'Entertainment defines the mood and energy of every successful event. Event Foundation curates memorable performances that match your audience and occasion.',
        'From celebrity appearances and live bands to anchors, dancers, and interactive acts, we source the right talent for each celebration.',
        'Our team handles artist contracts, technical riders, rehearsals, show flow, and stage transitions with absolute professionalism.',
        'We design entertainment schedules that maintain momentum while balancing speeches, ceremonies, and hospitality touchpoints.',
        'The result is a dynamic event atmosphere that keeps your guests engaged from start to finish.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=900&q=80"
      included={[
        { icon: '🎤', title: 'Artist Curation', text: 'Shortlisted performers aligned with event profile.' },
        { icon: '📝', title: 'Contract Support', text: 'Negotiation and closure with transparent terms.' },
        { icon: '🎛️', title: 'Technical Rider', text: 'Sound, light, and stage requirements managed.' },
        { icon: '🕒', title: 'Show Scheduling', text: 'Performance flow synchronized with event agenda.' },
        { icon: '🎭', title: 'On-Site Coordination', text: 'Live show transitions and backstage team management.' },
        { icon: '✨', title: 'Audience Engagement', text: 'Interactive experiences that elevate guest connection.' },
      ]}
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
