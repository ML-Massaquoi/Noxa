package com.noxa.backend.dto.request;

public class CustomerInfoRequest {
    // Matches TypeScript: fullName
    private String fullName;
    // Matches TypeScript: email
    private String email;
    // Matches TypeScript: phoneNumber
    private String phoneNumber;

    // Getters and Setters
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
}
