

package com.email.email_writer_sb.app;

public class EmailRequest {
    private String emailContent;
    private String tone;

    // Default constructor
    public EmailRequest() {}

    // Constructor with parameters
    public EmailRequest(String emailContent, String tone) {
        this.emailContent = emailContent;
        this.tone = tone;
    }

    // Getters
    public String getEmailContent() {
        return emailContent;
    }

    public String getTone() {
        return tone;
    }

    // Setters
    public void setEmailContent(String emailContent) {
        this.emailContent = emailContent;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    @Override
    public String toString() {
        return "EmailRequest{" +
                "emailContent='" + emailContent + '\'' +
                ", tone='" + tone + '\'' +
                '}';
    }
}