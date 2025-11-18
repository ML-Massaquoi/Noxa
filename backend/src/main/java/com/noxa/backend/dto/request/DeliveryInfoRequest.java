package com.noxa.backend.dto.request;

public class DeliveryInfoRequest {
    // Matches TypeScript: streetAddress
    private String streetAddress;
    // Matches TypeScript: aptSuite
    private String aptSuite;
    // Matches TypeScript: city
    private String city;
    // Matches TypeScript: zipCode
    private String zipCode;
    // Matches TypeScript: specialInstructions
    private String specialInstructions;

    // Getters and Setters
    public String getStreetAddress() { return streetAddress; }
    public void setStreetAddress(String streetAddress) { this.streetAddress = streetAddress; }
    public String getAptSuite() { return aptSuite; }
    public void setAptSuite(String aptSuite) { this.aptSuite = aptSuite; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getZipCode() { return zipCode; }
    public void setZipCode(String zipCode) { this.zipCode = zipCode; }
    public String getSpecialInstructions() { return specialInstructions; }
    public void setSpecialInstructions(String specialInstructions) { this.specialInstructions = specialInstructions; }
}
