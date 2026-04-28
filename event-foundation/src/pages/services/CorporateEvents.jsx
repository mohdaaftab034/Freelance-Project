import ServiceTemplate from './ServiceTemplate'

function CorporateEvents() {
  return (
    <ServiceTemplate
      title="Corporate Events"
      image="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80"
      breadcrumb="Home > Services > Corporate Events"
      overview={[
        'Corporate events require precision, brand alignment, and flawless operational control. Event Foundation creates high-impact events that elevate your business presence.',
        'We manage conferences, product launches, award ceremonies, annual meets, and executive engagements with strategic planning and polished execution.',
        'Our team coordinates stage design, guest registration, AV setup, branding touchpoints, and hospitality for a seamless attendee experience.',
        'We work closely with your internal stakeholders and vendors to ensure every timeline is met without compromising quality.',
        'From concept to post-event wrap-up, we deliver corporate events that look premium and perform with measurable impact.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&q=80"
      included={[
        { icon: '🧠', title: 'Event Strategy', text: 'Goal-based planning with audience-centric formatting.' },
        { icon: '🪪', title: 'Registration Setup', text: 'Professional onboarding and attendee flow systems.' },
        { icon: '🎬', title: 'Stage Production', text: 'Branded sets, lighting, and show direction support.' },
        { icon: '🔊', title: 'AV Management', text: 'Audio, visual, and presentation control handled end-to-end.' },
        { icon: '🍽️', title: 'Hospitality', text: 'Curated food service and guest comfort management.' },
        { icon: '📈', title: 'Execution Control', text: 'On-ground team supervision and timeline compliance.' },
      ]}
      features={[
        { title: 'Brand-Led Design', text: 'We translate your brand story into event moments—signage, stage sets, and immersive touchpoints that reinforce your message.' },
        { title: 'Sponsor & Partner Management', text: 'Sponsor packages, partner activations and contractual coordination handled with care.' },
        { title: 'Custom Tech Integration', text: 'Interactive experiences, live polling, hybrid streaming and bespoke AV setups to keep audiences engaged.' },
        { title: 'Measurement & Reporting', text: 'Post-event analytics and attendee feedback reports to measure impact and ROI.' },
      ]}
      styleVariant="corporate"
      gallery={[
        'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=700&q=80',
        'https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=700&q=80',
        'https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80',
        'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=700&q=80',
      ]}
    />
  )
}

export default CorporateEvents
