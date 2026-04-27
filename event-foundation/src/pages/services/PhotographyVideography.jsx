import ServiceTemplate from './ServiceTemplate'

function PhotographyVideography() {
  return (
    <ServiceTemplate
      title="Photography & Videography"
      image="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=1920&q=80"
      breadcrumb="Home > Services > Photography & Videography"
      overview={[
        'Every celebration deserves visual storytelling that captures emotion, detail, and atmosphere. Our photography and videography services focus on preserving your most meaningful moments.',
        'We curate teams of photographers, cinematographers, and editors who specialize in weddings, social celebrations, and premium events.',
        'From candid emotions to grand decor details and cinematic highlights, every frame is captured with aesthetic precision.',
        'Our planning includes shot lists, event-wise coverage flow, drone permissions, and coordinated editing timelines for smooth delivery.',
        'The final output is timeless visual content that lets you relive your event with the same emotion and elegance.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&q=80"
      included={[
        { icon: '📷', title: 'Photo Coverage', text: 'Comprehensive still photography across event functions.' },
        { icon: '🎥', title: 'Cinematic Films', text: 'Narrative event films with curated visual storytelling.' },
        { icon: '🛸', title: 'Drone Shots', text: 'Aerial captures for grand venues and outdoor moments.' },
        { icon: '🧩', title: 'Editing Suite', text: 'Color grading, teaser edits, and premium final cuts.' },
        { icon: '📁', title: 'Digital Delivery', text: 'Organized cloud delivery with secure access links.' },
        { icon: '🖼️', title: 'Album Concepts', text: 'Luxury printed albums with design-led layouts.' },
      ]}
      gallery={[
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700&q=80',
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=700&q=80',
        'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=700&q=80',
        'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=700&q=80',
      ]}
    />
  )
}

export default PhotographyVideography
