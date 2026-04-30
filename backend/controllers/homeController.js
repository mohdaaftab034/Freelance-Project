const HomeContent = require('../models/HomeContent');

// @desc    Get home page content
// @route   GET /api/home
// @access  Public
exports.getHomeContent = async (req, res, next) => {
  try {
    let content = await HomeContent.findOne();
    
    if (!content) {
      // Seed initial data if none exists
      content = await HomeContent.create({
        heroSlides: [
          {
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
            label: '#WeddingPlanning #FloralDecoration',
            title: 'Wedding Planning and Floral Design for Signature Celebrations',
            description: 'We design elegant weddings with cohesive planning, thoughtful decor, and smooth coordination from first consultation to final farewell.',
            ctaText: 'Contact Us',
            ctaLink: '/contact-us',
          },
          {
            image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80',
            label: '#CorporateEvents #CelebrityEvents',
            title: 'Corporate Events and VIP Experiences Planned with Precision',
            description: 'From boardroom launches to high-profile occasions, we deliver polished events with discretion, structure, and impact.',
            ctaText: 'Our Services',
            ctaLink: '/#services',
          },
          {
            image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80',
            label: '#BirthdayPrivateParties #DestinationEvents #CateringCoordination',
            title: 'Private Parties and Destination Events with Seamless Hospitality',
            description: 'We coordinate intimate celebrations, destination gatherings, and guest-ready hospitality with a refined touch.',
            ctaText: 'Explore Our Work',
            ctaLink: '/our-work',
          }
        ],
        partners: [
          'Golden Tulip', 'Taj Hotel', 'Radisson Blu', 'Vivanta', 
          'The Grand JBR', 'Piccadily', 'Hyatt Regency', 'Holiday Inn'
        ],
        counters: [
          { value: '10k+', label: 'Events' },
          { value: '5k+', label: 'Celebrity Events' },
          { value: '3k+', label: 'Sweet Couples' },
          { value: '8k+', label: 'Best Bouquets' }
        ]
      });
    }

    res.status(200).json({
      success: true,
      data: {
        heroSlides: content.heroSlides || [],
        partners: content.partners || [],
        counters: content.counters || [],
        _id: content._id
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Update home page content
// @route   PUT /api/home
// @access  Private (Admin)
exports.updateHomeContent = async (req, res, next) => {
  try {
    console.log('UPDATING HOME CONTENT:', JSON.stringify(req.body, null, 2));
    const content = await HomeContent.findOneAndUpdate(
      {}, // Empty filter gets the first document
      req.body,
      {
        new: true,
        upsert: true, // Create if doesn't exist
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: content,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
