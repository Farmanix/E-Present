# E-PRESENT

**Web App:** https://script.google.com/macros/s/AKfycbz0DNLMsu8GRttRqgBqe3j9Z4QH8b5iGZX-8tueESzWbOc69bOmSGKjN6TSucQaAlNr/exec

E-PRESENT is a web-based smart attendance management system developed as a college project to digitize and simplify the traditional attendance process.

The system allows students to register using their roll number, name, and Gmail address, verify their identity through Gmail OTP, and mark attendance using a lecture code and browser-based GPS location.

The application also provides separate Faculty and Admin panels for managing lecture codes, student remarks, student status, attendance records, manual attendance, and attendance reports.

## Features

### 👨‍🎓 Student Features

- Student registration using:
  - Roll number
  - Full name
  - Gmail address
- Gmail OTP verification
- Device identification during registration
- GPS-based attendance marking
- Lecture-code based attendance
- Attendance percentage checking
- Student profile section
- E-Card option planned for future development

### 👨‍🏫 Faculty Panel

- Faculty access authentication
- Generate lecture codes
- Select:
  - Subject
  - Lecture slot
  - Teacher
- Give remarks to students
- Suspend students
- Manage lecture-related attendance activities

### 🛡️ Admin Dashboard

- Admin access authentication
- View registered students
- Search students by roll number
- Manual attendance entry
- Remove registered students
- Export attendance reports
- Student management

### 📍 Attendance System

- Lecture-code based attendance
- Browser GPS location collection
- Location verification during attendance
- Device-based student identification
- Duplicate and validity checks handled by the backend
- Attendance status handling
- Digital attendance records
- Suspicious-location flagging for review

> GPS-based verification is intended as an additional attendance check. Location accuracy can vary depending on the device, browser, network conditions, and available location services.

### 📊 Attendance & Reports

- Digital attendance records
- Subject/lecture-based attendance
- Attendance percentage calculation
- Lecture-wise attendance management
- PDF attendance report export
- Manual attendance entry for administrators

## How It Works

1. A student opens the E-PRESENT web application.
2. The student registers using their roll number, name, and Gmail address.
3. A verification code is sent to the provided Gmail address.
4. After successful OTP verification, the student profile is registered along with device identification.
5. Faculty generates a lecture code by selecting the subject, lecture slot, and teacher.
6. The student enters their roll number and lecture code.
7. The browser requests the student's current location.
8. The location and attendance information are sent to the backend for verification.
9. After verification, the attendance record is stored digitally.
10. Students can check their attendance percentage through the Profile section.
11. Faculty can generate lecture codes, give student remarks, and suspend students.
12. Administrators can view/manage students, enter manual attendance, remove students, and export attendance reports.

## Technology Used

- HTML5
- CSS3
- JavaScript
- Google Apps Script
- Google Sheets
- Google Apps Script Services
- Browser Geolocation API

The frontend is served as a Google Apps Script web app and communicates with server-side Apps Script functions for application operations. 1

## Project Architecture

```text
Student / Faculty / Admin
          │
          ▼
     E-PRESENT Web UI
       HTML / CSS / JS
          │
          ▼
   Google Apps Script
       Backend
          │
     ┌────┴────┐
     ▼         ▼
Google Sheets  Gmail
   Data       OTP