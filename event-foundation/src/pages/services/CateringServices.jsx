import ServiceTemplate from './ServiceTemplate'

function CateringServices() {
  return (
    <ServiceTemplate
      title="Catering Services"
      image="https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=80"
      breadcrumb="Home > Services > Catering Services"
      overview={[
        'Exceptional food is central to every successful event. Event Foundation curates premium catering experiences that delight guests and enhance your celebration.',
        'We collaborate with trusted culinary partners to design menus that match your event type, cultural preferences, and service style.',
        'From elegant plated dinners and buffet stations to live counters and artisanal desserts, each menu is crafted for taste and presentation.',
        'Our teams oversee tasting sessions, service flow, hygiene standards, and guest comfort for a flawless dining journey.',
        'With thoughtful planning and refined execution, we turn every meal into a memorable highlight of your event.',
      ]}
      overviewImage="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
      included={[
        { icon: '🍴', title: 'Menu Planning', text: 'Cuisine combinations tailored to audience preferences.' },
        { icon: '👨‍🍳', title: 'Chef Collaboration', text: 'Specialized culinary teams for every event format.' },
        { icon: '🥗', title: 'Dietary Options', text: 'Vegetarian, vegan, and custom meal choices available.' },
        { icon: '🔥', title: 'Live Counters', text: 'Interactive food stations with controlled service flow.' },
        { icon: '🧼', title: 'Hygiene Control', text: 'Strict standards across preparation and service areas.' },
        { icon: '🍰', title: 'Dessert Concepts', text: 'Signature sweet experiences and curated presentation.' },
      ]}
      gallery={[
        'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=700&q=80',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80',
        'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=700&q=80',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&q=80',
      ]}
    />
  )
}

export default CateringServices
