const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to check the link
app.post('/api/check-link', async (req, res) => {
  const { url } = req.body;
  const apiKey = 'YOUR_BOLSTER_API_KEY'; // Replace with your actual API key

  try {
    // Make the request to the Bolster API
    const response = await axios.post(
      'https://developers.bolster.ai/api/neo/scan',
      {
        apiKey,
        urlInfo: { url },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Fetch the scan results
    const jobID = response.data.jobID;
    const scanResults = await axios.post(
      'https://developers.bolster.ai/api/neo/scan/status',
      {
        apiKey,
        jobID,
        insights: 'basic',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(scanResults.data);
  } catch (error) {
    console.error('Error scanning URL:', error);
    res.status(500).json({ error: 'Error scanning URL' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
