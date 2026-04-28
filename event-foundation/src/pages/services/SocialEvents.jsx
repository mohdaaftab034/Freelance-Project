import ServiceTemplate from './ServiceTemplate'

function SocialEvents() {
  return (
    <ServiceTemplate
      title="Birthday & Private Parties"
      image="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80"
      breadcrumb="Home > Services > Birthday & Private Parties"
      overview={[
        'Personal celebrations are an opportunity to reflect individuality; we design private events that feel curated, effortless, and full of personality.',
        'From milestone birthdays to intimate dinners and surprise parties, our team ensures the tone, pacing and details align with your intention for the day.',
        'We handle entertainment booking, bespoke styling, hospitality flow and unexpected moments so hosts can enjoy the celebration alongside their guests.',
        'Event Foundation elevates private gatherings with refined production, considerate service, and playful moments that guests remember.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&q=80"
      included={[
        { icon: '🎉', title: 'Party Styling', text: 'Custom themes, color palettes and tablescapes that feel modern and intentional.' },
        { icon: '🎵', title: 'Entertainment', text: 'Curated DJs, live acts or interactive moments suited to the guest profile.' },
        { icon: '🍰', title: 'Celebration Flow', text: 'A flexible program that balances surprises, speeches and dancefloor time.' },
        { icon: '🪑', title: 'Guest Comfort', text: 'Seating, climate and circulation planned to maximise enjoyment.' },
        { icon: '🥂', title: 'Hospitality', text: 'Polished service styles and menu pacing designed for the format of your party.' },
        { icon: '📷', title: 'Memory Moments', text: 'Photo-ready moments and lighting for images you’ll want to keep.' },
      ]}
      features={[
        { title: 'Format & Flow Design', text: 'We design the sequence of moments — arrival, highlights, and wind-down — to keep energy consistent.' },
        { title: 'Guest Experience Layering', text: 'Thoughtful touches like welcome sips, lounge areas and late-night bites make the evening feel considered.' },
        { title: 'Tailored Entertainment', text: 'We match talent and programming to the guest list and desired energy level.' },
      ]}
      styleVariant="social"
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
