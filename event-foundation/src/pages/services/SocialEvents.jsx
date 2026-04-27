import ServiceTemplate from './ServiceTemplate'

function SocialEvents() {
  return (
    <ServiceTemplate
      title="Social Events"
      image="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80"
      breadcrumb="Home > Services > Social Events"
      overview={[
        'Social events are milestones filled with emotion, tradition, and shared joy. We design each celebration to feel deeply personal and beautifully styled.',
        'Whether it is a birthday, anniversary, festive gathering, or private party, our planners curate immersive experiences with thoughtful details.',
        'We blend theme design, decor, entertainment, and guest hospitality to build moments that feel effortless and elevated.',
        'Our team handles complete planning, scheduling, and coordination so hosts can be fully present and enjoy their special day.',
        'With Event Foundation, your social celebrations become unforgettable stories that guests remember for years.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&q=80"
      included={[
        { icon: '🎈', title: 'Theme Development', text: 'Customized themes aligned with event personality.' },
        { icon: '🌺', title: 'Decor Styling', text: 'Visual planning from entrance to stage focal points.' },
        { icon: '🎶', title: 'Music Curation', text: 'DJ, live artists, and playlist mood management.' },
        { icon: '🍸', title: 'Hospitality', text: 'Guest reception and premium service experience.' },
        { icon: '🧑‍🍳', title: 'Food Coordination', text: 'Tailored menu planning and service supervision.' },
        { icon: '📷', title: 'Moments Capture', text: 'Photo and video teams preserving every highlight.' },
      ]}
      gallery={[
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
        'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=700&q=80',
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=80',
        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80',
      ]}
    />
  )
}

export default SocialEvents
