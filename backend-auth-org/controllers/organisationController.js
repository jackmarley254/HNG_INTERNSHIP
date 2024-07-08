const { Organisation } = require('../models').default;

exports.getAllOrganisations = async (req, res) => {
  try {
    const organisations = await Organisation.findAll();
    res.status(200).json({
      status: 'success',
      message: 'Fetched all organisations',
      data: { organisations }
    });
  } catch (error) {
    console.error('Error fetching organisations:', error);
    res.status(500).json({ error: 'An error occurred while fetching organisations.' });
  }
};

// Other organisation-related controller functions here as per your requirements
