Email Writer Assistant
An AI-powered email reply generator that integrates seamlessly with Gmail through a Chrome extension, includes a standalone React web application, and is powered by a robust Spring Boot backend using Google's Gemini AI.

Features
** Chrome Extension**: Direct Gmail integration with one-click AI reply generation
** React Web App**: Standalone web application for email reply generation
** Spring Boot API**: High-performance backend service powered by Google's Gemini AI
** Multiple Tones**: Professional, casual, friendly, and formal reply options
** Responsive Design**: Works across all devices and screen sizes
** Secure**: Environment-based API key management
Project Structure
email-writer-assistant/ ├── chrome-extension/ # Chrome extension for Gmail integration │ ├── manifest.json # Extension configuration │ ├── content.js # Gmail integration script │ └── icons/ # Extension icons ├── react-frontend/ # React web application │ ├── src/ │ │ ├── App.jsx # Main React component │ │ ├── App.css # Styling │ │ └── main.jsx # Entry point │ ├── package.json # Dependencies │ └── index.html # HTML template ├── spring-boot-backend/ # Spring Boot API server │ ├── src/main/java/ │ │ └── com/email/email_writer_sb/ │ │ ├── EmailWriterSbApplication.java │ │ ├── app/ │ │ │ ├── EmailGeneratorController.java │ │ │ ├── EmailGeneratorService.java │ │ │ └── EmailRequest.java │ │ └── config/ │ │ └── CorsConfig.java │ ├── pom.xml # Maven dependencies │ └── application.properties # Configuration ├── README.md # This file └── .gitignore # Git ignore rules

Quick Start
Prerequisites
Java 17+ (for Spring Boot backend)
Node.js 18+ (for React frontend)
Chrome Browser (for extension)
Google Gemini API Key (Get it here)
1. Backend Setup (Spring Boot)
cd spring-boot-backend

# Configure API key in application.properties
# gemini.api.key=YOUR_GEMINI_API_KEY

# Run the application
./mvnw spring-boot:run
# OR on Windows
mvnw.cmd spring-boot:run
