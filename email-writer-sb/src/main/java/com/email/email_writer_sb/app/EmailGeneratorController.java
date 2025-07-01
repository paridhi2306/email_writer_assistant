

package com.email.email_writer_sb.app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

        import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class EmailGeneratorController {

    private final EmailGeneratorService emailGeneratorService;

    @Autowired
    public EmailGeneratorController(EmailGeneratorService emailGeneratorService) {
        this.emailGeneratorService = emailGeneratorService;
    }

    // Root endpoint - This was missing!
    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> root() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "Email Writer API");
        response.put("status", "Running");
        response.put("version", "1.0.0");
        response.put("description", "AI-powered email reply generator");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("endpoints", new String[]{
                "/api/email/generate",
                "/health",
                "/api/status",
                "/actuator/health"
        });
        return ResponseEntity.ok(response);
    }

    // Simple health check endpoint
    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> health() {
        Map<String, Object> response = new HashMap<>();
        response.put("status", "UP");
        response.put("message", "Email Writer Service is running");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("service", "email-writer-sb");
        return ResponseEntity.ok(response);
    }

    // API status endpoint
    @GetMapping("/api/status")
    public ResponseEntity<Map<String, Object>> apiStatus() {
        Map<String, Object> response = new HashMap<>();
        response.put("api", "Email Generator API");
        response.put("status", "Active");
        response.put("endpoints", new String[]{
                "POST /api/email/generate",
                "GET /health",
                "GET /api/status",
                "GET /actuator/health"
        });
        response.put("timestamp", LocalDateTime.now().toString());
        return ResponseEntity.ok(response);
    }

    // Original email generation endpoint
    @PostMapping("/api/email/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest) {
        try {
            String response = emailGeneratorService.generateEmailReply(emailRequest);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    // Test endpoint for debugging
    @GetMapping("/api/test")
    public ResponseEntity<Map<String, Object>> test() {
        Map<String, Object> response = new HashMap<>();
        response.put("message", "API is working correctly");
        response.put("timestamp", LocalDateTime.now().toString());
        response.put("test", "success");
        return ResponseEntity.ok(response);
    }
}

