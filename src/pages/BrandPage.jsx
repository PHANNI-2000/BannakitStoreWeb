import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";
import BrandList from "../components/BrandList";
import DefaultSpinner from "../components/DefaultSpinner";

function BrandPage() {
  const { brands } = useLoaderData();

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <DefaultSpinner />
        </div>
      }
    >
      <Await resolve={brands}>
        {(loadedBrands) => <BrandList brands={loadedBrands} />}
      </Await>
    </Suspense>
  );
}

export default BrandPage;

async function loadBrands() {
  try {
    const response = await fetch(
      "https://localhost:44306/api/v1/BrandAPI/allBrand"
    );

    if (!response.ok) {
      throw json({ message: "Could not fetch brand." }, { status: 500 });
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
    brands: loadBrands(),
  });
}
