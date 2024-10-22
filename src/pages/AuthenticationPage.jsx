import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {  
  // • new URL(request.url): สร้างอ็อบเจกต์ URL ใหม่จาก URL ของคำขอที่เข้ามา
  // • .searchParams: ดึงข้อมูลพารามิเตอร์การค้นหาจาก URL ซึ่งจะอยู่ในรูปแบบของอ็อบเจกต์ URLSearchParams ที่ให้คุณสามารถเข้าถึงค่าต่างๆ ได้ง่ายๆ
  //   const searchParams = new URL(request.url).searchParams;
  //   const mode = searchParams.get("mode") || "login";

  //   if (mode !== "login" && mode !== "register") {
  //     throw json({ message: "Unsupportd mode." }, { status: 422 });
  //   }

  // console.log("Start action");

  const data = await request.formData();
  const authData = {
    username: data.get("username"),
    password: data.get("password"),
  };
  
// debugger;
  const response = await fetch("https://localhost:44306/api/UsersAuth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
    // credentials: "include" // for session
  });  

  if (response.status === 400 || response === 404) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  // soon: manage that token
  const resData = await response.json();
  
  const token = resData.result.token;

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
