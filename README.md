# 🤖 Email Writer Assistant

An AI-powered email reply generator that integrates seamlessly with Gmail through a Chrome extension, includes a standalone React web application, and is powered by a robust Spring Boot backend using Google's Gemini AI.

## ✨ Features

- **🔌 Chrome Extension**: Direct Gmail integration with one-click AI reply generation
- **🌐 React Web App**: Standalone web application for email reply generation
- **⚡ Spring Boot API**: High-performance backend service powered by Google's Gemini AI
- **🎨 Multiple Tones**: Professional, casual, friendly, and formal reply options
- **📱 Responsive Design**: Works across all devices and screen sizes
- **🔒 Secure**: Environment-based API key management

## 🏗️ Project Structure

\`\`\`
email-writer-assistant/
├── chrome-extension/          # Chrome extension for Gmail integration
│   ├── manifest.json         # Extension configuration
│   ├── content.js           # Gmail integration script
│   └── icons/               # Extension icons
├── react-frontend/           # React web application
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styling
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Dependencies
│   └── index.html           # HTML template
├── spring-boot-backend/      # Spring Boot API server
│   ├── src/main/java/
│   │   └── com/email/email_writer_sb/
│   │       ├── EmailWriterSbApplication.java
│   │       ├── app/
│   │       │   ├── EmailGeneratorController.java
│   │       │   ├── EmailGeneratorService.java
│   │       │   └── EmailRequest.java
│   │       └── config/
│   │           └── CorsConfig.java
│   ├── pom.xml              # Maven dependencies
│   └── application.properties # Configuration
├── README.md                # This file
└── .gitignore              # Git ignore rules
\`\`\`

## 🚀 Quick Start

### Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Node.js 18+** (for React frontend)
- **Chrome Browser** (for extension)
- **Google Gemini API Key** 

### 1. Backend Setup (Spring Boot)

\`\`\`bash
cd spring-boot-backend

# Configure API key in application.properties
# gemini.api.key=YOUR_GEMINI_API_KEY

# Run the application
./mvnw spring-boot:run
# OR on Windows
mvnw.cmd spring-boot:run
\`\`\`

**Backend runs on**: http://localhost:8080

### 2. Frontend Setup (React)

\`\`\`bash
cd react-frontend

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

**Frontend runs on**: http://localhost:5173

### 3. Chrome Extension Setup

1. Open Chrome and navigate to \`chrome://extensions/\`
2. Enable **"Developer mode"** (toggle in top right)
3. Click **"Load unpacked"**
4. Select the \`chrome-extension\` folder
5. The extension will appear in your browser toolbar

## ⚙️ Configuration

### API Key Setup

1. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Update \`spring-boot-backend/src/main/resources/application.properties\`:

\`\`\`properties
gemini.api.key=YOUR_ACTUAL_API_KEY_HERE
\`\`\`

### Environment Variables (Recommended for Production)

\`\`\`bash
# Set environment variable
export GEMINI_API_KEY="your-api-key-here"

# Or on Windows
set GEMINI_API_KEY=your-api-key-here
\`\`\`

## 🎯 Usage

### Chrome Extension Usage

1. **Open Gmail** in Chrome
2. **Open any email** you want to reply to
3. **Click "Reply"** to open the compose window
4. **Look for the "🤖 AI Reply" button** in the toolbar
5. **Click the button** and wait for AI to generate a response
6. **Review and send** the generated reply

### Web Application Usage

1. **Open** http://localhost:5173 in your browser
2. **Paste the original email content** in the text area
3. **Select a tone** (optional): Professional, Casual, Friendly, or Formal
4. **Click "Generate Reply"**
5. **Copy the generated response** to your clipboard
6. **Paste into your email client**

## 🛠️ API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | \`/\` | API information and status |
| GET | \`/health\` | Simple health check |
| GET | \`/actuator/health\` | Detailed health information |
| GET | \`/api/status\` | API status and endpoints |
| POST | \`/api/email/generate\` | Generate email reply |

### Example API Request

\`\`\`bash
curl -X POST http://localhost:8080/api/email/generate \\
  -H "Content-Type: application/json" \\
  -d '{
    "emailContent": "Hi, I hope this email finds you well. I wanted to ask about our meeting schedule.",
    "tone": "professional"
  }'
\`\`\`

## 🧪 Testing

### Test Backend Health

\`\`\`bash
# Test if backend is running
curl http://localhost:8080/health

# Expected response:
# {"status":"UP","message":"Email Writer Service is running",...}
\`\`\`

### Test API Endpoint

\`\`\`bash
# Test email generation
curl -X POST http://localhost:8080/api/email/generate \\
  -H "Content-Type: application/json" \\
  -d '{"emailContent":"Hello, how are you?","tone":"professional"}'
\`\`\`

## 🔧 Development

### Backend Development

\`\`\`bash
cd spring-boot-backend

# Run in development mode with auto-reload
./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-Dspring.profiles.active=dev"
\`\`\`

### Frontend Development

\`\`\`bash
cd react-frontend

# Start with hot reload
npm run dev

# Build for production
npm run build
\`\`\`

### Extension Development

1. Make changes to extension files
2. Go to \`chrome://extensions/\`
3. Click reload button on your extension
4. Refresh Gmail to test changes

## 🚨 Troubleshooting

### Common Issues

**Backend not starting:**
- Check if Java 17+ is installed: \`java -version\`
- Verify API key is set in \`application.properties\`
- Check if port 8080 is available: \`netstat -an | grep 8080\`

**Frontend not connecting:**
- Ensure backend is running on port 8080
- Check browser console for CORS errors
- Verify API endpoints are accessible

**Chrome extension not working:**
- Check if extension is loaded and enabled
- Open browser console in Gmail for error messages
- Ensure backend is running and accessible
- Try reloading the extension

**API Key Issues:**
- Verify your Gemini API key is valid
- Check API key permissions and quotas
- Ensure no extra spaces in the API key

## 📊 Performance

- **Backend**: Handles concurrent requests efficiently
- **Frontend**: Optimized React build with code splitting
- **Extension**: Minimal memory footprint, non-blocking UI

## 🔒 Security

- API keys stored in environment variables
- CORS configured for specific origins
- No sensitive data logged
- Secure HTTPS communication with Gemini API

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: \`git checkout -b feature/amazing-feature\`
3. **Commit** your changes: \`git commit -m 'Add amazing feature'\`
4. **Push** to the branch: \`git push origin feature/amazing-feature\`
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful language generation
- **Spring Boot** for robust backend framework
- **React** for dynamic frontend development
- **Chrome Extensions API** for seamless Gmail integration

## 📞 Support

If you encounter any issues or have questions:

1. **Check** the troubleshooting section above
2. **Search** existing issues on GitHub
3. **Create** a new issue with detailed information
4. **Include** error messages and system information

## 🔄 Version History

- **v1.0.0** - Initial release with Chrome extension, React frontend, and Spring Boot backend
- **v1.0.1** - Bug fixes and improved error handling
- **v1.1.0** - Added multiple tone options and enhanced UI

---

**Made with ❤️ by [Your Name]**

**⭐ Star this repository if you find it helpful!**
