import { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Box, Button, CircularProgress, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply);
    toast.success('Copied to clipboard!', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <ToastContainer />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
            Email Reply Generator
          </Typography>
          <Button
            variant="outlined"
            onClick={toggleTheme}
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Box>

        <Box sx={{ 
          mx: 3, 
          p: 4, 
          borderRadius: 2, 
          boxShadow: 3, 
          backgroundColor: 'background.paper',
          animation: 'fadeIn 0.5s ease-in-out',
        }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent || ''}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone || ''}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!emailContent || loading}
            fullWidth
            sx={{ 
              py: 1.5, 
              fontWeight: 'bold', 
              backgroundColor: 'primary.main', 
              '&:hover': { backgroundColor: 'primary.dark' },
              animation: loading ? 'pulse 1.5s infinite' : 'none',
            }}
          >
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
            {error}
          </Typography>
        )}

        {generatedReply && (
          <Box sx={{ 
            mt: 4, 
            p: 4, 
            borderRadius: 2, 
            boxShadow: 3, 
            backgroundColor: 'background.paper',
            animation: 'slideIn 0.5s ease-in-out',
          }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              Generated Reply:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              value={generatedReply || ''}
              inputProps={{ readOnly: true }}
              sx={{ mb: 2 }}
            />

            <Button
              variant="outlined"
              fullWidth
              onClick={handleCopyToClipboard}
              sx={{ 
                py: 1.5, 
                fontWeight: 'bold', 
                color: 'primary.main', 
                borderColor: 'primary.main', 
                '&:hover': { borderColor: 'primary.dark', color: 'primary.dark' },
                animation: 'bounce 1s infinite',
              }}
            >
              Copy to Clipboard
            </Button>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;