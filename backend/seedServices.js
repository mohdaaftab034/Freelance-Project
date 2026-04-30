const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');

dotenv.config();

const services = [
  {
    title: 'Wedding Planning',
    slug: 'wedding-planning',
    description: 'End-to-end wedding planning for ceremonies, receptions, and every pre-wedding detail.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&q=80',
    breadcrumb: 'Home > Services > Wedding Planning',
    overview: [
      'Weddings are the rare occasions where two lives, two families, and countless memories meet. At Event Foundation we curate each celebration so it reads like a single, seamless story — designed around the people, the place, and the moments that matter.',
      'Our approach begins with listening: we discover what matters most to you, then translate that intent into a confident plan that prioritizes guest experience, ceremony flow, and visual impact.',
      'Whether you imagine an intimate garden gathering or a multi-day destination celebration, our team assembles and manages the right vendors, timelines, and logistics so you can be present on the day itself.',
      'We balance creative direction with operational rigor: from mood boards and floral concepts to site diagrams and contingency schedules, every detail is accounted for.',
      'Event Foundation’s wedding planning goes beyond checklists — we craft atmospheres. The result is polished, personal, and unmistakably yours.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80',
    included: [
      { icon: '🗓️', title: 'Timeline Design', text: 'A moment-by-moment schedule that keeps each event running smoothly.' },
      { icon: '🤝', title: 'Vendor Coordination', text: 'Preferred vendor selection and contract management for reliability and quality.' },
      { icon: '📍', title: 'Venue Matchmaking', text: 'We recommend venues that fit your vision, guest count and logistical needs.' },
      { icon: '🎨', title: 'Creative Direction', text: 'Concept development, styling, and décor direction to ensure a cohesive visual language across the weekend.' },
      { icon: '📋', title: 'Guest Experience', text: 'Seating, transportation, and accessibility planning to ensure guest comfort.' },
      { icon: '✨', title: 'On-Day Execution', text: 'An experienced production team handles timing, deliveries and on-site coordination.' },
    ],
    features: [
      { title: 'Bespoke Venue Curation', text: 'We visit and evaluate venues for ambience, service standards, daylight, and layout — then recommend the best fit for your priorities.' },
      { title: 'Design-Led Planning', text: 'Our designers create mood boards, color palettes and fabric selections to ensure a cohesive visual language across the weekend.' },
      { title: 'Guest-Centric Logistics', text: 'From welcome moments to farewell transport, we anticipate guest needs and smooth transitions between functions.' },
      { title: 'Stress-Free Coordination', text: 'We negotiate vendor agreements, confirm timelines, and run rehearsals so you only focus on meaningful moments.' },
    ],
    timelineSteps: ['Vision & Discovery', 'Concept & Curation', 'Production & Precision', 'Celebration Day'],
    styleVariant: 'wedding',
    gallery: [
      'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=700&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=700&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=700&q=80',
    ]
  },
  {
    title: 'Corporate Events',
    slug: 'corporate-events',
    description: 'Premium corporate productions, conferences, launches, and leadership gatherings.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&q=80',
    breadcrumb: 'Home > Services > Corporate Events',
    overview: [
      'Corporate events are an extension of your brand identity; we produce gatherings that are strategically aligned, visually polished, and operationally perfect.',
      'From conferences and summits to product launches and leadership retreats, we prioritize efficiency, technical precision, and meaningful networking environments.',
      'Our team handles logistics, technology integration, hospitality flow and on-site management so your message takes center stage.',
      'Event Foundation brings editorial aesthetics to the corporate world — ensuring professional environments feel inspiring and well-considered.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1505373633560-82d6ef23618f?w=900&q=80',
    included: [
      { icon: '💻', title: 'Tech Integration', text: 'Seamless AV, sound, and stage management for clear, impactful delivery.' },
      { icon: '📅', title: 'Program Design', text: 'Pacing and flow that respects schedules while maximizing engagement.' },
      { icon: '🏙️', title: 'Venue Selection', text: 'Strategic location scouting for logistics, capacity, and brand alignment.' },
      { icon: '🍴', title: 'Hospitality', text: 'Efficient catering and break flow designed for professional environments.' },
      { icon: '🏷️', title: 'Brand Styling', text: 'Visual environments that consistently reflect your corporate identity.' },
      { icon: '⚡', title: 'Live Execution', text: 'Real-time production control to ensure a zero-defect experience.' },
    ],
    features: [
      { title: 'Strategic Logistics', text: 'We plan for high-volume flow, security, and technical redundancy so everything runs like clockwork.' },
      { title: 'Brand-Aligned Visuals', text: 'Our designers ensure that the event environment reinforces your organizational story and values.' },
      { title: 'Professional Hospitality', text: 'We prioritize service speed and quality to keep attendees focused on the agenda.' },
    ],
    timelineSteps: ['Strategy & Scoping', 'Planning & Production', 'The Live Event', 'Post-Event Review'],
    styleVariant: 'corporate',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?w=700&q=80',
      'https://images.unsplash.com/photo-1540575861501-7c00117fb3c9?w=700&q=80',
      'https://images.unsplash.com/photo-1505373633560-82d6ef23618f?w=700&q=80',
      'https://images.unsplash.com/photo-1475721027187-402ad2989a38?w=700&q=80',
    ]
  },
  {
    title: 'Birthday & Private Parties',
    slug: 'birthday-private-parties',
    description: 'Stylish milestone celebrations and intimate private events designed around your guests.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1000&q=80',
    breadcrumb: 'Home > Services > Birthday & Private Parties',
    overview: [
      'Personal celebrations are an opportunity to reflect individuality; we design private events that feel curated, effortless, and full of personality.',
      'From milestone birthdays to intimate dinners and surprise parties, our team ensures the tone, pacing and details align with your intention for the day.',
      'We handle entertainment booking, bespoke styling, hospitality flow and unexpected moments so hosts can enjoy the celebration alongside their guests.',
      'Event Foundation elevates private gatherings with refined production, considerate service, and playful moments that guests remember.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=900&q=80',
    included: [
      { icon: '🎉', title: 'Party Styling', text: 'Custom themes, color palettes and tablescapes that feel modern and intentional.' },
      { icon: '🎵', title: 'Entertainment', text: 'Curated DJs, live acts or interactive moments suited to the guest profile.' },
      { icon: '🍰', title: 'Celebration Flow', text: 'A flexible program that balances surprises, speeches and dancefloor time.' },
      { icon: '🪑', title: 'Guest Comfort', text: 'Seating, climate and circulation planned to maximise enjoyment.' },
      { icon: '🥂', title: 'Hospitality', text: 'Polished service styles and menu pacing designed for the format of your party.' },
      { icon: '📷', title: 'Memory Moments', text: 'Photo-ready moments and lighting for images you’ll want to keep.' },
    ],
    features: [
      { title: 'Format & Flow Design', text: 'We design the sequence of moments — arrival, highlights, and wind-down — to keep energy consistent.' },
      { title: 'Guest Experience Layering', text: 'Thoughtful touches like welcome sips, lounge areas and late-night bites make the evening feel considered.' },
      { title: 'Tailored Entertainment', text: 'We match talent and programming to the guest list and desired energy level.' },
    ],
    timelineSteps: ['Dream & Define', 'Plan & Personalize', 'Set & Style', 'Party Time'],
    styleVariant: 'social',
    gallery: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=700&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=80',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80',
    ]
  },
  {
    title: 'Celebrity Events',
    slug: 'celebrity-events',
    description: 'High-discretion planning for VIP arrivals, premium hospitality, and red-carpet moments.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80',
    breadcrumb: 'Home > Services > Celebrity Events',
    overview: [
      'Celebrity events require a unique blend of high-impact visual design and absolute logistical discretion. We specialize in managing environments that are as secure as they are spectacular.',
      'From red carpets and media launches to private VIP dinners, we prioritize privacy protocols, movement control and premium hospitality.',
      'Our team understands the pace of public appearances and the need for seamless, low-friction transitions between arrivals, moments and exits.',
      'Event Foundation brings a sophisticated, editorial lens to high-profile gatherings — where design excellence meets professional discipline.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&q=80',
    included: [
      { icon: '🛡️', title: 'Privacy Protocols', text: 'Discreet planning and secure access management for all high-profile guests.' },
      { icon: '📸', title: 'Media Management', text: 'Coordinated red carpets, lighting and press environments that look impeccable.' },
      { icon: '🚗', title: 'Logistics Control', text: 'Seamless arrival and departure choreography for VIPs and talent.' },
      { icon: '💎', title: 'Premium Service', text: 'Highly trained hospitality teams accustomed to high-standard environments.' },
      { icon: '🎭', title: 'Atmosphere Design', text: 'Immersive visual styling that feels exclusive and tailored.' },
      { icon: '⏱️', title: 'Precision Timing', text: 'Minute-by-minute scheduling to ensure smooth transitions between moments.' },
    ],
    features: [
      { title: 'Movement Choreography', text: 'We plan every step of the VIP journey to ensure security and comfort without compromising energy.' },
      { title: 'Discreet Logistics', text: 'Vendor management and back-of-house operations are handled with total confidentiality.' },
      { title: 'High-Impact Styling', text: 'We create visually arresting environments that reflect the prestige of the occasion.' },
    ],
    timelineSteps: ['Privacy & Strategy', 'Design & Protocol', 'Execution & Security', 'Post-Event Wrap'],
    styleVariant: 'entertainment',
    gallery: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=700&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=700&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=700&q=80',
    ]
  },
  {
    title: 'Destination Events',
    slug: 'destination-events',
    description: 'Travel-ready celebrations with logistics, guest care, and destination styling.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1000&q=80',
    breadcrumb: 'Home > Services > Destination Events',
    overview: [
      'A destination event is more than a party; it is a multi-day journey for your guests. We manage the complexity of remote planning with local insight and travel logistics.',
      'From selecting the perfect international venue to managing guest hospitality, transportation and local vendor networks, we ensure the experience is seamless.',
      'We balance the logistics of travel with the artistry of design — creating celebrations that feel grounded in their location but elevated by our standards.',
      'Event Foundation brings a global perspective to your celebration, ensuring that distance never compromises detail or delivery.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=900&q=80',
    included: [
      { icon: '✈️', title: 'Travel Logistics', text: 'Coordination of guest arrivals, transfers and on-site hospitality.' },
      { icon: '🌍', title: 'Local Partnerships', text: 'Managing local vendor networks alongside our trusted core team.' },
      { icon: '🏰', title: 'Venue Management', text: 'On-site technical and logistical control in remote or international settings.' },
      { icon: '🧳', title: 'Guest Concierge', text: 'A dedicated point of contact for guest needs throughout the itinerary.' },
      { icon: '🌅', title: 'Site Selection', text: 'Expert scouting for venues that offer both beauty and logistical viability.' },
      { icon: '🥂', title: 'Itinerary Design', text: 'Curating multi-day experiences from welcome drinks to farewell brunches.' },
    ],
    features: [
      { title: 'Global Planning Network', text: 'We use our connections to secure the best local services while maintaining our signature quality.' },
      { title: 'Remote Precision', text: 'Our planning systems ensure that every detail is locked in before we even touch down.' },
      { title: 'Cultural Integration', text: 'We weave local flavors and traditions into our luxury design language for a sense of place.' },
    ],
    timelineSteps: ['Scouting & Strategy', 'Logistics & Guest Care', 'On-Site Production', 'Destination Memories'],
    styleVariant: 'destination',
    gallery: [
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=700&q=80',
      'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=700&q=80',
      'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=700&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=80',
    ]
  },
  {
    title: 'Floral & Decoration',
    slug: 'floral-decoration',
    description: 'Bespoke decor, floral installations, and immersive visual styling for every event.',
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1000&q=80',
    breadcrumb: 'Home > Services > Floral & Decoration',
    overview: [
      'Visual storytelling is at the heart of every great event. We create immersive environments through bespoke floral design, custom decor and artistic installations.',
      'Our approach is editorial: we prioritize texture, scale, lighting and spatial rhythm to ensure that the setting enhances the occasion without overwhelming it.',
      'We source premium blooms and custom materials to create unique visual moments that serve as the backdrop for your memories.',
      'Event Foundation’s design team transforms spaces into atmospheres — where every element is intentional and every detail is polished.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80',
    included: [
      { icon: '🌸', title: 'Floral Artistry', text: 'Custom arrangements and installations using premium, seasonal blooms.' },
      { icon: '🎭', title: 'Set Design', text: 'Bespoke stage, backdrop and entrance designs that create impact.' },
      { icon: '💡', title: 'Lighting Design', text: 'Atmospheric lighting that enhances mood and highlights design details.' },
      { icon: '🍽️', title: 'Tablescaping', text: 'Detailed place settings, linens and centerpieces for a cohesive dining look.' },
      { icon: '🎨', title: 'Concept Boards', text: 'Visual presentations to ensure our design vision matches yours.' },
      { icon: '🛠️', title: 'On-Site Styling', text: 'Meticulous installation and finishing by our professional design team.' },
    ],
    features: [
      { title: 'Editorial Design Lens', text: 'We use a refined aesthetic to ensure that decor feels modern, luxe and timeless.' },
      { title: 'Custom Fabrication', text: 'When off-the-shelf won’t work, we design and build custom elements for your event.' },
      { title: 'Spatial Harmony', text: 'We plan layouts that balance visual drama with guest flow and comfort.' },
    ],
    timelineSteps: ['Mood & Concept', 'Design & Sourcing', 'Creation & Prep', 'Installation & Reveal'],
    styleVariant: 'decor',
    gallery: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=700&q=80',
      'https://images.unsplash.com/photo-1513279922550-250c2129b13a?w=700&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700&q=80',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=700&q=80',
    ]
  },
  {
    title: 'Catering Coordination',
    slug: 'catering-coordination',
    description: 'Menu planning, service flow, and hospitality coordination for smooth dining experiences.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=1000&q=80',
    breadcrumb: 'Home > Services > Catering Coordination',
    overview: [
      'Food and drink are often the most remembered part of an event. We manage the hospitality layer to ensure that menus are inspired and service is flawless.',
      'We work with premium chefs and caterers to design menus that reflect your taste and the tone of the occasion, prioritizing flavor, presentation and flow.',
      'Our team coordinates the timing of service, manages staffing standards and ensures that the dining experience is a highlight of the day.',
      'Event Foundation brings a hospitality focus to planning — where great food meets professional service in an elegant setting.',
    ],
    overviewImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=900&q=80',
    included: [
      { icon: '🥘', title: 'Menu Design', text: 'Collaborative planning with chefs to create balanced, inspired menus.' },
      { icon: '🍷', title: 'Beverage Curation', text: 'Expert pairing and bar management for a complete drink experience.' },
      { icon: '🧑‍🍳', title: 'Service Flow', text: 'Meticulous timing of courses and service to maintain event energy.' },
      { icon: '🤵', title: 'Staffing Standards', text: 'Briefing and managing service teams to ensure high professional standards.' },
      { icon: '📋', title: 'Dietary Care', text: 'Considerate planning and execution for all guest dietary requirements.' },
      { icon: '🍽️', title: 'Service Styling', text: 'Ensuring that food presentation and plating aligns with the event aesthetic.' },
    ],
    features: [
      { title: 'Inspired Menu Pacing', text: 'We design the rhythm of the meal to keep guests engaged and energized.' },
      { title: 'Quality Control', text: 'We maintain high standards for temperature, presentation and service speed.' },
      { title: 'Seamless Hospitality', text: 'Our team acts as the bridge between the kitchen and the dining room for a smooth experience.' },
    ],
    timelineSteps: ['Palate & Planning', 'Tasting & Refinement', 'Service Production', 'The Dining Experience'],
    styleVariant: 'catering',
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?w=700&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=700&q=80',
      'https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=700&q=80',
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=700&q=80',
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services.');
    
    // Insert new services
    await Service.insertMany(services);
    console.log('Successfully seeded services!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
