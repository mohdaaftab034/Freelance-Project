import ServiceTemplate from './ServiceTemplate'

function DestinationWedding() {
  return (
    <ServiceTemplate
      title="Destination Wedding"
      image="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80"
      breadcrumb="Home > Services > Destination Wedding"
      overview={[
        'Destination weddings are about immersive experiences, where every event feels like a curated getaway for your loved ones. We plan destination celebrations with precision and heart.',
        'From selecting cities, resorts, and travel-friendly venues to coordinating rooming, transport, and guest itineraries, our team manages every moving part.',
        'We craft cohesive themes across all functions so your destination wedding feels visually unified and emotionally memorable.',
        'Our planning process covers hospitality desks, artist lineup, local vendor management, and weather-ready backup logistics.',
        'With Event Foundation, your destination wedding becomes a stress-free and luxurious journey from arrival to farewell.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=900&q=80"
      included={[
        { icon: '✈️', title: 'Travel Coordination', text: 'Guest transfers, schedules, and route support.' },
        { icon: '🏨', title: 'Resort Booking', text: 'Rooming plans and hospitality mapping by guest groups.' },
        { icon: '🎨', title: 'Theme Design', text: 'One unified creative language across all events.' },
        { icon: '🎤', title: 'Entertainment', text: 'Artist curation and live-performance management.' },
        { icon: '🧾', title: 'Vendor Control', text: 'Local and external vendor integration on timelines.' },
        { icon: '🛡️', title: 'Backup Planning', text: 'Contingency plans for weather and travel changes.' },
      ]}
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
