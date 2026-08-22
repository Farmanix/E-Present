const SS_ID = "1oPbNziD1q9DahbXxYmfghXTbfqCHtw4wPExFkxEr_4Q";
const APP_VERSION = "1.0.0";

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getAppVersion() {
  return APP_VERSION;
}

function sendRegistrationOtp(data) {

  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName("Students");

  const rows = sheet.getDataRange().getValues();

  const roll = String(data.roll).trim();
  const name = String(data.name).trim();
  const gmail = String(data.gmail).trim().toLowerCase();
  const device = String(data.device).trim();

  // =========================
  // BASIC VALIDATION
  // =========================

  if (!roll || !name || !gmail || !device) {
    return {
      ok: false,
      msg: "Please fill all fields"
    };
  }

  // Gmail format check
  if (!/^[^\s@]+@gmail\.com$/i.test(gmail)) {
    return {
      ok: false,
      msg: "Please enter a valid Gmail address"
    };
  }

  // =========================
  // DUPLICATE CHECKS
  // =========================

  for (let i = 1; i < rows.length; i++) {

    // Roll already registered
    if (String(rows[i][0]).trim() === roll) {
      return {
        ok: false,
        msg: "Roll number is already registered"
      };
    }

    // Gmail already registered
    if (String(rows[i][2]).trim().toLowerCase() === gmail) {
      return {
        ok: false,
        msg: "Gmail address is already registered"
      };
    }

    // Device already registered
    if (String(rows[i][3]).trim() === device) {
      return {
        ok: false,
        msg: "This device is already registered"
      };
    }
  }

  // =========================
  // RATE LIMIT
  // =========================

  const cache = CacheService.getScriptCache();

  const cooldownKey = "OTP_COOLDOWN_" + gmail;

  if (cache.get(cooldownKey)) {
    return {
      ok: false,
      msg: "Please wait before requesting another code"
    };
  }

  // =========================
  // GENERATE OTP
  // =========================

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // OTP valid for 5 minutes
  cache.put(
    "REG_OTP_" + gmail,
    JSON.stringify({
      otp: otp,
      roll: roll,
      name: name,
      device: device,
      attempts: 0
    }),
    300
  );

  // Prevent repeated OTP requests for 60 seconds
  cache.put(
    cooldownKey,
    "1",
    60
  );

  // =========================
  // SEND EMAIL
  // =========================

  MailApp.sendEmail({
    to: gmail,
    subject: "E-PRESENT Gmail Verification Code",
    htmlBody:
      '<div style="font-family:Arial,sans-serif;padding:20px;">' +
      '<h2 style="color:#00a8cc;">E-PRESENT</h2>' +
      '<p>Your Gmail verification code is:</p>' +
      '<div style="font-size:32px;font-weight:bold;letter-spacing:6px;">' +
      otp +
      '</div>' +
      '<p>This code is valid for <b>5 minutes</b>.</p>' +
      '<p>If you did not request this code, you can safely ignore this email.</p>' +
      '</div>'
  });

  return {
    ok: true,
    msg: "Verification code sent"
  };
}


function verifyRegistrationOtp(data) {

  const gmail = String(data.gmail).trim().toLowerCase();
  const enteredOtp = String(data.otp).trim();

  if (!gmail || !enteredOtp) {
    return {
      ok: false,
      msg: "Enter the verification code"
    };
  }

  const cache = CacheService.getScriptCache();
  const key = "REG_OTP_" + gmail;

  const stored = cache.get(key);

  if (!stored) {
    return {
      ok: false,
      msg: "Code expired. Please request a new code"
    };
  }

  const otpData = JSON.parse(stored);

  // =========================
  // ATTEMPT LIMIT
  // =========================

  if (otpData.attempts >= 5) {

    cache.remove(key);

    return {
      ok: false,
      msg: "Too many incorrect attempts. Please request a new code"
    };
  }

  // =========================
  // OTP CHECK
  // =========================

  if (enteredOtp !== otpData.otp) {

    otpData.attempts++;

    cache.put(
      key,
      JSON.stringify(otpData),
      300
    );

    return {
      ok: false,
      msg: "Incorrect verification code"
    };
  }

  // =========================
  // FINAL DUPLICATE CHECK
  // =========================

  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName("Students");

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {

    if (String(rows[i][0]).trim() === otpData.roll) {
      cache.remove(key);

      return {
        ok: false,
        msg: "Roll number is already registered"
      };
    }

    if (String(rows[i][2]).trim().toLowerCase() === gmail) {
      cache.remove(key);

      return {
        ok: false,
        msg: "Gmail address is already registered"
      };
    }

    if (String(rows[i][3]).trim() === otpData.device) {
      cache.remove(key);

      return {
        ok: false,
        msg: "This device is already registered"
      };
    }
  }

  // =========================
  // REGISTER STUDENT
  // =========================

  sheet.appendRow([
    otpData.roll,
    otpData.name,
    gmail,
    otpData.device
  ]);

  // OTP can no longer be reused
  cache.remove(key);

  return {
    ok: true,
    msg: "Registration successful"
  };
}

function registerStudent(data) {

  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName("Students");

  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {

    // Roll check
    if (String(rows[i][0]) === String(data.roll)) {
      return "Roll number already registered";
    }

    // Gmail check
    if (String(rows[i][2]).toLowerCase() === String(data.gmail).toLowerCase()) {
      return "Gmail already registered";
    }

    // Device check
    if (String(rows[i][3]) === String(data.device)) {
      return "This device is already registered";
    }
  }

  // Save new student
  sheet.appendRow([
    data.roll,
    data.name,
    data.gmail,
    data.device
  ]);

  return "Registered";
}

function generateLectureCode(data) {

 

  const ss = SpreadsheetApp.openById(SS_ID);
  const codesSheet = ss.getSheetByName("Codes");

  // Generate unique 4-digit code
 // Generate unique subject + alphanumeric code
let code;
let exists = true;

while (exists) {

  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let rand = "";

  for (let i = 0; i < 4; i++) {
    rand += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  code = data.subject + "-" + rand;

  const rows = codesSheet.getDataRange().getValues();

  exists = rows.some((r,i) => i > 0 && String(r[0]) === code);
}

  // Create sheet name
  const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const slotClean = data.slot.replace(/[: ]/g,"").replace(/-/g,"_");

  const sheetName = `${data.subject}_${data.teacher}_${date}_${slotClean}`;

  // Create lecture sheet if not exists
  let lectureSheet = ss.getSheetByName(sheetName);

  if (!lectureSheet) {

    lectureSheet = ss.insertSheet(sheetName);

    lectureSheet.appendRow([
  "Roll",
  "Name",
  "Subject",
  "Teacher",
  "Slot",
  "Date",
  "Marked Time",
  "DeviceID",
  "Latitude",
  "Longitude"
]);

// Header formatting
const headerRange = lectureSheet.getRange(1, 1, 1, 10);

headerRange
  .setFontWeight("bold")
  .setHorizontalAlignment("center")
  .setBackground("#B4C7E7"); // Light Cornflower Blue 3

// Center align all data rows
lectureSheet.getRange(2, 1, lectureSheet.getMaxRows()-1, 10)
  .setHorizontalAlignment("center");

  }

  // Save code mapping
  codesSheet.appendRow([
    code,
    data.subject,
    data.teacher,
    data.slot,
    date,
    sheetName
  ]);

  return {
    ok:true,
    code:code,
    sheet:sheetName
  };
}


function getStudents() {

  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName("Students");

  const rows = sheet.getDataRange().getValues();

  const data = [];

  for (let i = 1; i < rows.length; i++) {

    data.push({
      roll: rows[i][0],
      name: rows[i][1],
      gmail: rows[i][2],
      device: rows[i][3]
    });

  }

  return data;
}
function markAttendance(data){

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {

    const ss = SpreadsheetApp.openById(SS_ID);

    const students = ss.getSheetByName("Students").getDataRange().getValues();
    const codes    = ss.getSheetByName("Codes").getDataRange().getValues();

    // Find student
    let student = null;

    for(let i=1;i<students.length;i++){

      if(String(students[i][0]) === String(data.roll)){

        student = students[i];
        break;
      }
    }

    if(!student){
      return {ok:false, msg:"Student not registered"};
    }

    // Device check
    if(String(student[3]) !== String(data.device)){
      return {ok:false, msg:"Wrong device"};
    }

    // Find lecture code
    let sheetName = null;
    let codeRow = null;

    for(let i=1;i<codes.length;i++){

      if(String(codes[i][0]).toUpperCase() === String(data.code).toUpperCase()){

        codeRow = codes[i];
        sheetName = codes[i][5];
        break;
      }
    }

    if(!sheetName){
      return {ok:false, msg:"Invalid lecture code"};
    }

    // ===== TIME CHECK =====
const slot = String(codeRow[3]).trim(); // e.g. "2:00 PM - 3:00 PM"

const endPart = slot.split("-")[1].trim(); // "3:00 PM"

function toMinutes12Hour(t){

  const [time, ampm] = t.split(" ");

  let [h, m] = time.split(":").map(Number);

  if(ampm === "PM" && h !== 12) h += 12;
  if(ampm === "AM" && h === 12) h = 0;

  return h * 60 + m;
}

const now = new Date();
const nowMinutes = now.getHours() * 60 + now.getMinutes();

const endMinutes = toMinutes12Hour(endPart) + 10; // 10 min grace

if(nowMinutes > endMinutes){
  return {
    ok:false,
    msg:"Lecture time is over"
  };
}
// ===== END TIME CHECK =====

    // GPS radius check
    const COLLEGE_LAT = 18.968100;
    const COLLEGE_LNG = 72.831324;
    const ALLOWED_RADIUS = 40;

    function distanceMeters(lat1, lon1, lat2, lon2) {

      const R = 6371000;

      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;

      const a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c;
    }

    const distance = distanceMeters(
      COLLEGE_LAT,
      COLLEGE_LNG,
      data.lat,
      data.lng
    );

    // TEMPORARY TEST MODE (ghar se testing)
    if(distance > ALLOWED_RADIUS){
      return {
        ok:false,
        msg:"Outside college area"
      };
    }

    const lectureSheet = ss.getSheetByName(sheetName);
    const attendanceSheet = ss.getSheetByName("Attendance");

    if(!lectureSheet){
      return {ok:false, msg:"Lecture sheet not found"};
    }

    // Duplicate check
    const rows = lectureSheet.getDataRange().getValues();

    for(let i=1;i<rows.length;i++){

      if(String(rows[i][0]) === String(data.roll)){

        return {ok:false, msg:"Attendance already marked"};
      }
    }

    // Date & Time
    

    const date = Utilities.formatDate(
      now,
      Session.getScriptTimeZone(),
      "yyyy-MM-dd"
    );

    const currentTime = Utilities.formatDate(
      now,
      Session.getScriptTimeZone(),
      "HH:mm:ss"
    );

    // Save attendance in temporary lecture sheet
    lectureSheet.appendRow([
      data.roll,
      data.name,
      codeRow[1], // Subject
      codeRow[2], // Teacher
      codeRow[3], // Slot
      date,
      currentTime,
      data.device,
      data.lat,
      data.lng
    ]);

    // Save attendance in permanent Attendance sheet
    attendanceSheet.appendRow([
      data.code,
      codeRow[1], // Subject
      codeRow[2], // Teacher
      codeRow[3], // Slot
      data.roll,
      data.name,
      date,
      currentTime,
      data.lat,
      data.lng,
      "AUTO"
    ]);

    return {ok:true};

  } finally {

    lock.releaseLock();

  }
}


function exportAttendancePdf(code){

  const ss = SpreadsheetApp.openById(SS_ID);
  const codes = ss.getSheetByName("Codes").getDataRange().getValues();

  let sheetName = null;

  for(let i=1;i<codes.length;i++){

    if(String(codes[i][0]).toUpperCase() === String(code).toUpperCase()){

      sheetName = codes[i][5];
      break;
    }
  }

  if(!sheetName){
    return "Invalid lecture code";
  }

  const sheet = ss.getSheetByName(sheetName);

  if(!sheet){
    return "Lecture sheet not found";
  }

  const gid = sheet.getSheetId();

  // FORCE ONLY THIS SHEET AS PDF
  const url =
    "https://docs.google.com/spreadsheets/d/" + SS_ID +
    "/export?format=pdf" +
    "&gid=" + gid +
    "&single=true" +
    "&size=A4" +
    "&portrait=true" +
    "&fitw=true" +
    "&sheetnames=false" +
    "&printtitle=false" +
    "&pagenumbers=false" +
    "&gridlines=true" +
    "&fzr=false";

  return url;
}


function getPercentage(roll){

  const ss = SpreadsheetApp.openById(SS_ID);

  const students = ss.getSheetByName("Students").getDataRange().getValues();
  const attendance = ss.getSheetByName("Attendance").getDataRange().getValues();
  const codes = ss.getSheetByName("Codes").getDataRange().getValues();

  // Find student
  let student = null;

  for(let i=1;i<students.length;i++){

    if(String(students[i][0]) === String(roll)){

      student = students[i];
      break;
    }
  }

  if(!student){
    return {ok:false, msg:"Student not found"};
  }

  // Total lectures generated
  const total = codes.length - 1;

  // Present count
  let present = 0;

  for(let i=1;i<attendance.length;i++){

    if(String(attendance[i][4]) === String(roll)){ // Roll column

      present++;
    }
  }

  const percentage = total > 0
    ? ((present / total) * 100).toFixed(2)
    : "0.00";

  return {
    ok:true,
    roll: roll,
    name: student[1],
    present: present,
    total: total,
    percentage: percentage
  };
}
