import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckLink = () => {
    setLoading(true);
    setTimeout(() => {
      let feedback;
      if (!url.startsWith('http')) {
        feedback = { disposition: 'bad', message: '⚠️ Link must start with http or https.' };
      } else if (url.length > 100) {
        feedback = { disposition: 'too_long', message: '⚠️ Link is too long.' };
      } else if (!url.includes('.')) {
        feedback = { disposition: 'not_a_link', message: '⚠️ This does not look like a valid link.' };
      } else {
        feedback = { disposition: 'clean', message: '✔️ Legitimate Link' };
      }
      setResult(feedback);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Scam or Legit? Check Your Link
      </Typography>
      <TextField
        label="Paste your link here"
        variant="outlined"
        fullWidth
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginBottom: '1rem', maxWidth: '500px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckLink}
        disabled={loading}
        style={{ marginBottom: '1rem' }}
      >
        {loading ? 'Checking...' : 'Check Link'}
      </Button>
      {result && (
        <Paper style={{ marginTop: '2rem', padding: '1rem', maxWidth: '500px' }}>
          <Typography variant="h6">
            {result.disposition === 'clean'
              ? '✔️ Legitimate Link'
              : `⚠️ ${result.disposition.replace('_', ' ').toUpperCase()}`}
          </Typography>
          <Typography>{result.message}</Typography>
        </Paper>
      )}
    </Container>
  );
}

export default App;
