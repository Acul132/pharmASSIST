# pharmASSIST

A live demo of this prototype can be found at joshuarenelli.com/pharmASSIST

# Prototype Summary 
This application is used to allow a pharmasist or pharmacy technician an easier way to calculate the total dosage of a prednisone taper prescriptions. Generally a prescription for prednisone is not given to a pharmacy in one complete dosage (i.e. 10mg a day * 7 days, 70mg total), it's instead given as a tapered schedule (15mg daily for 7 days -> 10mg daily for 7 days -> 5mg daily for 7 days, 15 days total) which the pharmacy technician must use to determine the total dosage. This tool allows the pharmacy technician to enter that taper schedule, and the total dosage amount will be displayed.

As a secondary feature (and probably more useful), the pharmacy technician has the ability to generate a pdf document of a calendar which contains the amount of prednisone tablets that should be taken each day until the prescription is done. This calendar would thus be printed out and handed to the patient.

This prototype is actually currently being used in a pharmacy right now, as prednisone prescription can be very tricky to manage correctly as a patient, and having a calendar to help track the tapering schedule can sometimes be crucial to a patients success with correctly following it.

## Technologies Used
This application is entirely a frontend application.
It uses a very basic ReactJs setup, with google's Material Design for the UI.
In order to make the PDF's, they are drawn directly with a library called jspdf.
