# E-PRESENT

Webapp link - https://script.google.com/macros/s/AKfycbz0DNLMsu8GRttRqgBqe3j9Z4QH8b5iGZX-8tueESzWbOc69bOmSGKjN6TSucQaAlNr/exec

E-PRESENT is a web-based smart attendance management system developed as a college project to simplify and digitize the traditional attendance process.

The system primarily uses **GPS-based location verification** to verify whether a student is attending a lecture from the expected location. Students mark attendance using their roll number and a lecture code, while their current GPS coordinates are sent to the backend for verification.

The system also includes an **optional location-anomaly check** that can compare a student's location with the majority location of students who have already marked attendance. This can help flag unusual or suspicious locations for review, but it is an additional verification mechanism and not the primary attendance criterion.

The application provides dedicated panels for students, faculty, and administrators to manage attendance, lectures, students, remarks, and reports.

## Features

### 👨‍🎓 Student Features

- Student registration using:
  - Roll number
  - Full name
  - Gmail address
- Gmail verification using OTP
- Device identification for registered students
- **GPS-based attendance verification**
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

### 📍 Location-Based Attendance

GPS is the **primary attendance verification mechanism** in E-PRESENT.

During attendance marking:

1. The browser requests the student's current location.
2. Latitude and longitude are obtained through the Browser Geolocation API.
3. The location is sent to the Google Apps Script backend.
4. The backend verifies the student's location against the configured attendance area.
5. Attendance is marked according to the verification result.

The system can also use an **optional majority-location/anomaly check**. After multiple students have marked attendance, their locations can be used to determine the common classroom location. A significantly different location can then be flagged as suspicious for review.

This majority-location check is an additional feature and does not replace the primary GPS/geofence verification.

## Attendance & Reports

- Digital attendance recording
- GPS location verification
- Optional location-anomaly detection
- Attendance status handling
- Subject/lecture-based attendance records
- Lecture-code validation
- Attendance percentage calculation
- PDF attendance report export
- Manual attendance entry for administrators

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
3. After successful verification, the student profile is created and associated with the device.
4. Faculty generates a lecture code for a particular subject and lecture slot.
5. The student enters their roll number and lecture code.
6. The browser requests the student's current GPS location.
7. The GPS coordinates are sent to the backend along with the attendance information.
8. The backend performs the primary location verification.
9. An optional majority-location check can additionally identify unusual attendance locations.
10. The attendance record is stored digitally.
11. Students can check their attendance percentage.
12. Faculty and administrators can manage students, attendance, and reports.

## Project Status

The project is currently functional and was developed as a college project.

The core attendance system, including GPS-based attendance verification, lecture-code validation, student registration, faculty management, administrator management, attendance percentage calculation, and report export, is functional.

Some features can be improved in future versions, including more advanced location verification, stronger authentication, analytics, and additional student services.

## Limitations

GPS accuracy depends on the device, browser, network conditions, and available location services. Therefore, GPS-based verification should not be considered a completely precise location-tracking solution.

The majority-location/anomaly check is an additional detection mechanism and may also be affected by GPS inaccuracies or incorrect location readings.

The project is intended primarily for educational and demonstration purposes.

## Future Improvements

- Improved GPS and geofence validation
- More advanced location-anomaly detection
- Stronger authentication and authorization
- Better database architecture
- Attendance analytics and graphical dashboards
- Complete digital E-Card functionality
- Improved security mechanisms
- Cloud-based database integration
- Automated attendance notifications
- Better administrative controls

## Project Purpose

The main objective of E-PRESENT is to demonstrate how web technologies, GPS-based location services, device identification, and cloud-based services can be combined to create a digital attendance management system.

The primary goal is to reduce manual attendance work while adding **location-based verification** to make the attendance process more structured and reliable.

---

**E-PRESENT — Smart, Digital & GPS-Based Attendance Management System**