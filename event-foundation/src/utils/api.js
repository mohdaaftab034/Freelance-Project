export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const submitEnquiry = async (enquiryData) => {
  console.log('Sending Enquiry:', enquiryData);
  try {
    const response = await fetch(`${API_BASE_URL}/enquiries`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(enquiryData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    return data;
  } catch (error) {
    console.error('Submission Failed:', error.message);
    return { success: false, error: error.message };
  }
};

export const getHomeContent = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/home?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Home Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};
export const getProjects = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Projects Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};

export const getServices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/services?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Services Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};

export const getServiceBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/services/${slug}?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Service Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};
export const getProjectBySlug = async (slug) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects?slug=${slug}&t=${Date.now()}`);
    const data = await response.json();
    // Since our backend returns an array for GET /, we filter it or find it
    if (data.success) {
      const project = data.data.find(p => p.slug === slug);
      return { success: true, data: project };
    }
    return data;
  } catch (error) {
    console.error('Fetch Project Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};

export const getTestimonials = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/testimonials?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Testimonials Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};

export const getSettings = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/settings?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Settings Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};

export const getTeamMembers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/team?t=${Date.now()}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Team Error:', error);
    return { success: false, error: 'Connection failed' };
  }
};


