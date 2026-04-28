import ServiceTemplate from './ServiceTemplate'

function WeddingVenues() {
  return (
    <ServiceTemplate
      title="Wedding Planning"
      image="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
      breadcrumb="Home > Services > Wedding Planning"
      overview={[
        'Weddings are the rare occasions where two lives, two families, and countless memories meet. At Event Foundation we curate each celebration so it reads like a single, seamless story — designed around the people, the place, and the moments that matter.',
        'Our approach begins with listening: we discover what matters most to you, then translate that intent into a confident plan that prioritizes guest experience, ceremony flow, and visual impact.',
        'Whether you imagine an intimate garden gathering or a multi-day destination celebration, our team assembles and manages the right vendors, timelines, and logistics so you can be present on the day itself.',
        'We balance creative direction with operational rigor: from mood boards and floral concepts to site diagrams and contingency schedules, every detail is accounted for.',
        'Event Foundation’s wedding planning goes beyond checklists — we craft atmospheres. The result is polished, personal, and unmistakably yours.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80"
      included={[
        { icon: '🗓️', title: 'Timeline Design', text: 'A moment-by-moment schedule that keeps each event running smoothly.' },
        { icon: '🤝', title: 'Vendor Coordination', text: 'Preferred vendor selection and contract management for reliability and quality.' },
        { icon: '📍', title: 'Venue Matchmaking', text: 'We recommend venues that fit your vision, guest count and logistical needs.' },
        { icon: '🎨', title: 'Creative Direction', text: 'Concept development, styling, and décor direction to ensure a cohesive visual language across the weekend.' },
        { icon: '📋', title: 'Guest Experience', text: 'Seating, transportation, and accessibility planning to ensure guest comfort.' },
        { icon: '✨', title: 'On-Day Execution', text: 'An experienced production team handles timing, deliveries and on-site coordination.' },
      ]}
      features={[
        { title: 'Bespoke Venue Curation', text: 'We visit and evaluate venues for ambience, service standards, daylight, and layout — then recommend the best fit for your priorities.' },
        { title: 'Design-Led Planning', text: 'Our designers create mood boards, color palettes and fabric selections to ensure a cohesive visual language across the weekend.' },
        { title: 'Guest-Centric Logistics', text: 'From welcome moments to farewell transport, we anticipate guest needs and smooth transitions between functions.' },
        { title: 'Stress-Free Coordination', text: 'We negotiate vendor agreements, confirm timelines, and run rehearsals so you only focus on meaningful moments.' },
      ]}
      timelineSteps={[
        'Vision & Discovery',
        'Concept & Curation',
        'Production & Precision',
        'Celebration Day',
      ]}
      styleVariant="wedding"
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
