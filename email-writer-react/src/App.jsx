

"use client"

import { useState } from "react"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import Paper from "@mui/material/Paper"
import axios from "axios"
import "./App.css"

function App() {
  const [emailContent, setEmailContent] = useState("")
  const [tone, setTone] = useState("")
  const [generatedReply, setGeneratedReply] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    setError("")
    setSuccess(false)

    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
      })

      setGeneratedReply(typeof response.data === "string" ? response.data : JSON.stringify(response.data))
      setSuccess(true)
    } catch (error) {
      console.error("Error details:", error)
      if (error.code === "ERR_NETWORK") {
        setError("Cannot connect to server. Please make sure your Spring Boot application is running on port 8080.")
      } else if (error.response) {
        setError(`Server error: ${error.response.status} - ${error.response.data || "Unknown error"}`)
      } else {
        setError("Failed to generate email reply. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedReply)
      alert("Copied to clipboard!")
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Email Reply Generator
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 2 }}
            placeholder="Paste the email you want to reply to here..."
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select value={tone} label="Tone (Optional)" onChange={(e) => setTone(e.target.value)}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
              <MenuItem value="formal">Formal</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" onClick={handleSubmit} disabled={!emailContent || loading} fullWidth size="large">
            {loading ? <CircularProgress size={24} color="inherit" /> : "Generate Reply"}
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Email reply generated successfully!
          </Alert>
        )}
      </Paper>

      {generatedReply && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={8}
            variant="outlined"
            value={generatedReply}
            InputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />
          <Button variant="outlined" onClick={handleCopyToClipboard} fullWidth>
            Copy to Clipboard
          </Button>
        </Paper>
      )}
    </Container>
  )
}

export default App
