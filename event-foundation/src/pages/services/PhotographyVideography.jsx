import ServiceTemplate from './ServiceTemplate'

function PhotographyVideography() {
  return (
    <ServiceTemplate
      title="Floral & Decoration"
      image="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&q=80"
      breadcrumb="Home > Services > Floral & Decoration"
      overview={[
        'Floral design and decoration translate emotion into atmosphere. We compose color, texture and form to create visual moments that feel natural and elevated.',
        'Our creative process starts with intent — understanding the tone you want to set and designing floral and décor that supports that story.',
        'From delicate table arrangements to large-scale installations, we balance craftsmanship with practicality so installations look exceptional and perform reliably.',
        'Event Foundation delivers decoration that complements programming, photography needs and guest circulation to create unforgettable frames across the day.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80"
      included={[
        { icon: '🌸', title: 'Floral Concepts', text: 'Seasonal palettes and botanical choices selected for longevity and visual depth.' },
        { icon: '🕯️', title: 'Mood Styling', text: 'Material selection, textures and lighting that establish atmosphere.' },
        { icon: '🎀', title: 'Focal Styling', text: 'Stage and altar treatments designed for photographs and sightlines.' },
        { icon: '🪷', title: 'Tablescapes', text: 'Table décor planned for comfort, sightlines and photo composition.' },
        { icon: '✨', title: 'Installations', text: 'Durable statement pieces that create immersive moments without overwhelming the site.' },
        { icon: '📐', title: 'Layout Coordination', text: 'Placement and flow optimized for guest movement and visual impact.' },
      ]}
      features={[
        { title: 'Photography-Ready Styling', text: 'We design with lenses and angles in mind so key moments translate beautifully on camera.' },
        { title: 'Sustainable Sourcing', text: 'Where possible we prioritise seasonal and locally-grown materials to reduce impact.' },
        { title: 'Installation Management', text: 'We plan safe install and strike schedules that respect venue rules and timing.' },
      ]}
      styleVariant="floral"
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
