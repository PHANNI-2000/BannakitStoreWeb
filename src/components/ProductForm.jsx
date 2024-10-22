import {
  Form,
  json,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Card, CardBody, CardFooter, Button } from "@material-tailwind/react";
import { ShoppingBasket } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Select from "react-select";

import DefaultSpinner from "./DefaultSpinner";
import { fetchCategory } from "../http";
import { getAuthToken } from "../util/auth";
import { isValidText, showAlert } from "../util/global";

const options = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "banana", label: "Banana" },
  { value: "grape", label: "Grape" },
];

export default function ProductForm() {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/product"); // navigate การส่งฟอร์มหรือการคลิกปุ่ม
  };

  return (
    <div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <DefaultSpinner />
          </div>
        }
      >
        <ProductEntryForm onCancel={handleCancel} />
      </Suspense>
    </div>
  );
}

function ProductEntryForm({ onCancel }) {
  const [isCategory, setIsCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    async function selectedCategory() {
      try {
        const categories = await fetchCategory();
        const formattedCategories = categories.map((category) => ({
          value: category.category_id,
          label: category.category_name_th,
        }));

        setIsCategory(formattedCategories);
      } catch (err) {
        setError({ message: err.message || "Failed to fetch user places." });
      }
    }

    selectedCategory();
  }, []);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const cssInput =
    "w-full h-10 font-light bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md";

  return (
    <div className="flex justify-center items-center">
      <Form className="w-full" method="POST" autoComplete="off">
        <Card className="rounded">
          <CardBody>
            <h1 className="mb-2 flex text-gray-600">
              <ShoppingBasket />
              &nbsp;&nbsp;รายการสินค้า
            </h1>
            <hr />
            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-6">
              <div className="col-span-1"></div>
              <div className="col-span-10">
                <label className="block mb-1 text-sm text-slate-800">
                  ประเภทสินค้า<span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <Select
                    isClearable
                    id="categoryId"
                    name="categoryId"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    options={isCategory}
                    className="basic-single font-light w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    // classNamePrefix="select"
                    placeholder=""
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderStyle: "none",
                        boxShadow: "none",
                      }),
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>

            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-4">
              <div className="col-span-1"></div>
              <div className="col-span-5">
                <label className="block mb-1 text-sm text-slate-800">
                  ชื่อสินค้า (ไทย)<span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="text"
                    id="prodNameTh"
                    name="prodNameTh"
                    // value={formData.prodNameTh}
                    // onChange={handleInputChange}
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-5">
                <label className="block mb-1 text-sm text-slate-800">
                  ชื่อสินค้า (อังกฤษ)
                  <span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="text"
                    id="prodNameEn"
                    name="prodNameEn"
                    // value={formData.prodNameEn}
                    // onChange={handleInputChange}
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>

            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-4">
              <div className="col-span-1"></div>
              <div className="col-span-5">
                <label className="block mb-1 text-sm text-slate-800">
                  รายละเอียด (ไทย)
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="text"
                    id="descTh"
                    name="descTh"
                    className={cssInput}
                  />
                </div>
              </div>
              <div className="col-span-5">
                <label className="block mb-1 text-sm text-slate-800">
                  รายละเอียด (อังกฤษ)
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="text"
                    id="descEn"
                    name="descEn"
                    className={cssInput}
                  />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>

            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-4">
              <div className="col-span-1"></div>
              <div className="col-span-3">
                <label className="block mb-1 text-sm text-slate-800">
                  ราคา<span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="number"
                    id="prodCost"
                    name="prodCost"
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-sm text-slate-800">
                  จำนวน<span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="number"
                    id="quatity"
                    name="quatity"
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-3">
                <label className="block mb-1 text-sm text-slate-800">
                  คงเหลือ<span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center text-right">
                  <input
                    type="number"
                    id="available"
                    name="available"
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-sm text-slate-800">
                  ภาษี (%)<span className="text-red-600">&nbsp;*</span>
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="number"
                    id="tax"
                    name="tax"
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>

            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-4">
              <div className="col-span-1"></div>
              <div className="col-span-10">
                <label className="block mb-1 text-sm text-slate-800">
                  หมายเหตุ
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <textarea
                    className={cssInput}
                    id="remark"
                    name="remark"
                  ></textarea>
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>
          </CardBody>
          <CardFooter className="grid grid-cols-12 gap-4">
            <div className="col-span-11 flex justify-end">
              <Button className="rounded-sm mx-2" onClick={onCancel}>
                ยกเลิก
              </Button>
              <Button
                type="submit"
                className="btn-primary"
                // disabled={isSubmitting}
                // onClick={handleSubmit}
              >
                บันทึก
                {/* {isSubmitting ? "กำลังบันทึก..." : "บันทึก"} */}
              </Button>
            </div>
            <div className="col-span-1"></div>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  // const method = request.method;
  const formData = await request.formData(); // "await" important
  const data = Object.fromEntries(formData);

  const result = await showAlert({
    title: "Confirm Submitting",
    text: "Are you sure you want to submit?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  });

  if (result.isConfirmed) {
    try {
      let url = "http://localhost:3000/api/product";

      // if (method === "PATCH") {
      //   const prodId = params.prodId;
      //   url = "http://localhost:3000/api/product?" + prodId;
      // }

      const token = getAuthToken();
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await showAlert({
          title: "Success!",
          text: "Your data has been submitted.",
          icon: "success",
        });
        return redirect("/product");
      } else {
        const errorResponse = await response.json();

        if (response.status === 409) {
          await showAlert({
            title: "Warning!",
            text: errorResponse.message || "Product already exists.",
            icon: "warning",
          });
          return json({ error: errorResponse.message }, { status: 409 }); // ส่งผลลัพธ์กลับเพื่อให้จัดการต่อ
        }

        // ถ้าสถานะเป็นข้อผิดพลาดอื่นๆ
        const errorMessage = errorResponse.message || "Failed to submit data"; // รับ message จาก API
        throw new Error(errorMessage); // ส่งต่อข้อผิดพลาด
      }
    } catch (error) {
      await showAlert({
        title: "Error!",
        text:
          JSON.parse(error.message).message ||
          "There was an error submitting your data.",
        icon: "error",
      });
      return json({ error: error.message }, { status: 500 });
    }
  } else {
    await showAlert({
      title: "Cancelled",
      text: "Your submission was cancelled.",
      icon: "info",
    });
    return json({ cancelled: true }, { status: 200 });
  }
}

// export async function action({ request }) {
//   console.log("Start action ProductForm");

//   // const method = request.method;
//   const data = request.formData();

//   const productData = {
//     categoryId: data.get("categoryId"),
//     prodNameTh: data.get("prodNameTh"),
//     prodNameEn: data.get("prodNameEn"),
//     descTh: data.get("descTh"),
//     descEn: data.get("descEn"),
//     prodCost: data.get("prodCost"),
//     quatity: data.get("quatity"),
//     available: data.get("available"),
//     tax: data.get("tax"),
//     remark: data.get("remark"),
//   };

//   console.log("productData: ", productData);

//   let url = "http://localhost:3000/api/product";

//   // if (method === "PATCH") {
//   //   const prodId = params.prodId;
//   //   url = "http://localhost:3000/api/product?" + prodId;
//   // }

//   const token = getAuthToken();
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(productData),
//   });

//   if (response.status === 422) {
//     return response;
//   }

//   if (!response.ok) {
//     throw json({ message: "Could not save event" }, { status: 500 });
//   }

//   return redirect("/product");
// }
