import ServiceTemplate from './ServiceTemplate'

function WeddingVenues() {
  return (
    <ServiceTemplate
      title="Wedding Venues"
      image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      breadcrumb="Home > Services > Wedding Venues"
      overview={[
        'Finding the perfect venue is the foundation of every extraordinary wedding celebration. At Event Foundation, we help you choose spaces that align with your guest count, aesthetic, budget, and ceremony flow.',
        'Our team shortlists luxurious hotels, lawns, heritage properties, and destination-worthy venues in and around Lucknow for every wedding style.',
        'We evaluate logistics, availability, hospitality quality, banquet policies, and technical setup requirements before finalizing recommendations.',
        'From venue walkthroughs and negotiation support to final booking and layout planning, we ensure every decision is informed and strategic.',
        'With our venue planning expertise, your wedding begins with a setting that feels iconic and deeply personal.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80"
      included={[
        { icon: '🏛️', title: 'Venue Curation', text: 'Shortlisted options based on style, scale, and budget.' },
        { icon: '📍', title: 'Location Review', text: 'Accessibility checks for guests, vendors, and logistics.' },
        { icon: '🤝', title: 'Negotiations', text: 'Booking support with optimized pricing and terms.' },
        { icon: '🗓️', title: 'Date Blocking', text: 'Timely reservation management for key wedding dates.' },
        { icon: '🛋️', title: 'Layout Planning', text: 'Space usage plans for each ceremony and guest movement.' },
        { icon: '📋', title: 'Compliance Check', text: 'Venue policy and vendor guidelines managed in advance.' },
      ]}
      gallery={[
        'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=700&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=80',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
        'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=700&q=80',
      ]}
    />
  )
}

export default WeddingVenues
