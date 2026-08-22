# E-PRESENT

Webapp link - https://script.google.com/macros/s/AKfycbz0DNLMsu8GRttRqgBqe3j9Z4QH8b5iGZX-8tueESzWbOc69bOmSGKjN6TSucQaAlNr/exec

E-PRESENT is a web-based smart attendance management system developed as a college project to simplify and digitize the traditional attendance process.

The application allows students to register their profiles and mark attendance using their roll number and a lecture code. During attendance marking, the application requests the student's GPS location and sends the location data along with attendance information for verification.

The system also provides dedicated panels for faculty and administrators to manage lectures, students, attendance records, and reports.

## Features

### 👨‍🎓 Student Features

- Student registration using:
  - Roll number
  - Full name
  - Gmail address
- Gmail verification using OTP
- Device identification for registered students
- GPS-based attendance marking
- Lecture-code based attendance
- Attendance percentage checking
- Student profile section
- E-Card section planned for future development

### 👨‍🏫 Faculty Panel

- Faculty access authentication
- Generate lecture codes
- Select subject, lecture slot, and teacher
- Give remarks to students
- Suspend students
- Manage lecture-related attendance activities

### 🛡️ Admin Dashboard

- Admin authentication
- View registered students
- Search students by roll number
- Manual attendance entry
- Remove registered students
- Export attendance reports
- Student management

### 📊 Attendance & Reports

- Record attendance digitally
- Store attendance information
- GPS location verification
- Attendance status handling
- Subject/lecture-based attendance records
- Attendance percentage calculation
- PDF attendance report export

## Technology Used

- HTML5
- CSS3
- JavaScript
- Google Apps Script
- Google Sheets
- Google Apps Script Services
- Browser Geolocation API

## How It Works

1. A student registers using their roll number, name, and Gmail.
2. The system sends a verification code to the provided Gmail address.
3. After successful verification, the student profile is created.
4. Faculty generates a lecture code for a particular subject and lecture slot.
5. The student enters their roll number and lecture code.
6. The browser requests the student's current GPS location.
7. Attendance information and location data are sent to the backend for verification.
8. The attendance record is stored digitally.
9. Students can later check their attendance percentage.
10. Faculty and administrators can manage attendance and generate reports.

## Project Status

The project is currently functional and was developed as a college project.

Some features are still under development and may be improved in future versions, including more advanced location verification, stronger authentication, and additional student features.

## Limitations

GPS accuracy depends on the device, browser, network conditions, and available location services. Therefore, the system should not be considered a completely precise location-tracking solution.

This project is intended for educational and demonstration purposes.

## Future Improvements

- Improved GPS/location validation
- Stronger authentication and authorization
- Better database architecture
- Attendance analytics and graphical dashboards
- Complete digital E-Card functionality
- Improved security mechanisms
- Cloud-based database integration
- Responsive UI improvements
- Automated attendance notifications

## Project Purpose

The main objective of E-PRESENT is to demonstrate how web technologies and location-based services can be combined to create a digital attendance management system that reduces manual work and makes attendance records easier to manage.

---

**E-PRESENT — Smart, Digital & Location-Based Attendance Management System**
