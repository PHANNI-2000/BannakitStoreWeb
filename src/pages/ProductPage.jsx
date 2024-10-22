import { Suspense } from "react";
import { useLoaderData, json, defer, Await, redirect } from "react-router-dom";

import ProductList from "../components/ProductList";
import { getAuthToken } from "../util/auth";
import DefaultSpinner from "../components/DefaultSpinner";

// Await: เป็น component ที่ใช้ภายใน Suspense เพื่อรอการ resolve ข้อมูลแบบ asynchronous ก่อนที่จะแสดงผลข้อมูลนั้น

function ProductPage() {
  const { products } = useLoaderData(); // useLoaderData ดึงข้อมูลที่ถูกโหลดผ่าน loader ของเส้นทางปัจจุบัน ข้อมูลนี้จะถูกโหลดก่อนที่หน้าจะถูก render

  return (
    // Suspense ช่วยจัดการแสดง Spinner ในขณะที่ข้อมูลกำลังโหลด
    // fallback: เป็น prop ที่กำหนดว่าอะไรจะถูกแสดงในขณะที่กำลังรอโหลดข้อมูล
    // resolve: prop นี้รับข้อมูลที่ยังไม่ถูกโหลด (เช่น Promise) และรอให้ข้อมูลนี้เสร็จสิ้นก่อนจะส่งไป render
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <DefaultSpinner />
        </div>
      }
    >
      {/* Await ใช้เพื่อรอการโหลดข้อมูลจาก deferred loader */}
      <Await resolve={products}>
        {(loadedProducts) => <ProductList products={loadedProducts} />}
      </Await>
    </Suspense>
  );
}

export default ProductPage;

async function loadProducts() {
  try {
    const token = getAuthToken();

    // if (token === "EXPIRED") {
    //   return redirect("/login");
    // }

    const response = await fetch("https://localhost:44306/api/productAPI/allProduct", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw json({ message: "Could not fetch products." }, { status: 500 });
    } else {
      const resData = await response.json();
      return resData.result;
    }
  } catch (err) {
    console.error(err.message);
  }
}

export function loader() {
  // defer(): เป็นวิธีการจัดการโหลดข้อมูลแบบ asynchronous โดยช่วยให้เราโหลดบางส่วนของข้อมูลและเริ่ม render หน้าได้เลยในขณะที่ข้อมูลส่วนอื่นยังโหลดอยู่
  return defer({
    products: loadProducts(),
  });
}
