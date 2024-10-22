import dotenv from "dotenv";
dotenv.config();

export default {
  secret: process.env.TOKEN_KEY || "mySecretKey",
  resave: false, // ไม่บันทึก session ใหม่ ถ้า session ไม่ได้มีการเปลี่ยนแปลง
  saveUninitialized: true, // ไม่สร้าง session ที่ยังไม่มีข้อมูล
  cookie: {
    secure: false, // เปลี่ยนเป็น true เมื่อใช้ HTTPS
    maxAge: 120000, // อายุของ session cookie (2 นาที)
  },
};
