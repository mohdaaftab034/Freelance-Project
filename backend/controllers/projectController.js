const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
exports.getProjects = async (req, res, next) => {
  try {
    let projects = await Project.find().sort('-createdAt');
    
    if (projects.length === 0) {
      // Seed initial data from the website's workProjects
      const initialProjects = [
        {
          slug: 'royal-vows-night-lucknow',
          title: 'Royal Vows Night',
          category: 'Weddings',
          location: 'Taj Mahal, Lucknow',
          year: '2025',
          guests: '450 Guests',
          services: 'Venue Styling, Hospitality, Entertainment',
          summary: 'A grand evening wedding with a regal decor language, custom lighting design, and seamless guest-flow coordination.',
          overviewParagraphs: [
            'Every case study is shaped as a tightly orchestrated editorial story, balancing planning precision, premium styling, guest flow, and production discipline.',
            'This project reflects the same dark luxury language used throughout the site: minimal hierarchy, gold accents, high-contrast imagery, and a refined sense of spatial rhythm.'
          ],
          executionHighlightsText: 'This project was delivered through a tightly coordinated planning model, blending premium design direction with on-ground operational control and hospitality excellence.',
          executionHighlightsList: [
            'End-to-end vendor and logistics orchestration',
            'Experience-focused guest journey mapping',
            'Real-time production, styling, and quality supervision'
          ],
          coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
          images: [
            'https://images.unsplash.com/photo-1519741497674-611481863552?w=1400&q=80',
            'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1400&q=80',
            'https://images.unsplash.com/photo-1587271339318-2e78b7c86088?w=1400&q=80'
          ]
        },
        {
          slug: 'leadership-summit-noida',
          title: 'Leadership Summit',
          category: 'Corporate',
          location: 'Noida Expo Centre, Noida',
          year: '2024',
          guests: '900 Delegates',
          services: 'Stage Production, AV, Guest Experience',
          summary: 'A two-day corporate summit focused on brand storytelling, precision scheduling, and impactful keynote staging.',
          overviewParagraphs: [
            'Our corporate execution focuses on high-impact visual storytelling and seamless logistics for large-scale delegate movements.',
            'The leadership summit required a perfect balance of tech-forward staging and executive-level hospitality.'
          ],
          executionHighlightsText: 'Precision timing and technical excellence were the cornerstones of this large-scale corporate event.',
          executionHighlightsList: [
            'Custom stage design and AV integration',
            'Complex delegate movement and registration management',
            'Branded hospitality and VIP experience curation'
          ],
          coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1200&q=80',
          images: [
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1400&q=80',
            'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1400&q=80'
          ]
        },
        {
          slug: 'destination-bliss-goa',
          title: 'Destination Bliss',
          category: 'Destination',
          location: 'Candolim Coast, Goa',
          year: '2025',
          guests: '280 Guests',
          services: 'Destination Planning, Logistics, Decor',
          summary: 'A sunset celebration at a beachside venue featuring curated guest itineraries and premium hospitality touchpoints.',
          overviewParagraphs: [
            'Planning events across borders requires a specialized logistics model and a deep understanding of destination aesthetics.',
            'This Goa project focused on creating a relaxed yet premium experience for global guests.'
          ],
          executionHighlightsText: 'Remote logistics management and coastal styling were at the heart of this destination project.',
          executionHighlightsList: [
            'Inter-city guest logistics and hospitality',
            'Weather-proof coastal decor design',
            'Local vendor management and quality control'
          ],
          coverImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80',
          images: [
            'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1400&q=80',
            'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1400&q=80'
          ]
        }
      ];
      projects = await Project.create(initialProjects);
    }

    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
exports.createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, data: project });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
