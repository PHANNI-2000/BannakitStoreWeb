import { Suspense } from "react";
import {
  useLoaderData,
  json,
  defer,
  Await,
} from "react-router-dom";
import ManagementList from "../components/ManagementList";
import { getAuthToken } from "../util/auth";

function ManagementPage() {
  const { managements } = useLoaderData(); // useLoaderData ดึงข้อมูลที่ถูกโหลดผ่าน loader ของเส้นทางปัจจุบัน

  return (
    // Suspense ใช้กำหนด fallback UI
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={managements}>
        {(loadedManagements) => (
          <ManagementList managements={loadedManagements} />
        )}
      </Await>
    </Suspense>
  );
}

export default ManagementPage;

async function loadManagements() {
  const token = getAuthToken();
  const response = await fetch("https://localhost:44306/api/v1/Management/allManagement", {
    headers: {
      Authorization: `Bearer ${token}`, // ใช้ token ใน header
    },
  });
debugger;
  if (!response.ok) {
    throw json({ message: "Could not fetch users." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.result;
  }
}

export function loader() {
  // defer ใช้เพื่อกำหนดข้อมูลบางส่วนที่ควรโหลดและแสดงผลทันที และข้อมูลบางส่วนที่สามารถโหลดในภายหลังได้
  return defer({
    managements: loadManagements(),
  });
}
