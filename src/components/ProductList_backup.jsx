import { Form, Link } from "react-router-dom";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { Plus, ShoppingBasket } from "lucide-react";
import Select from "react-select";
import { Pencil, Trash2 } from "lucide-react";

import DataTable from "../datatable/DataTable";

const columns = [
  {
    field: "prod_id",
    headerName: "ID",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  { field: "prod_name_th", headerName: "ชื่อสินค้า(ไทย)", flex: 2 },
  { field: "prod_name_en", headerName: "ชื่อสินค้า(อังกฤษ)", flex: 2 },
  {
    field: "desc_th",
    headerName: "รายละเอียด(ไทย)",
    flex: 1,
  },
  {
    field: "desc_en",
    headerName: "รายละเอียด(อังกฤษ)",
    flex: 1,
  },
  {
    field: "prod_cost",
    headerName: "ราคาสินค้า",
    type: "number",
    flex: 1,
  },
  {
    field: "quatity",
    headerName: "จำนวน",
    type: "number",
    flex: 1,
  },
  {
    field: "available",
    headerName: "คลัง",
    type: "number",
    flex: 1,
  },
  {
    field: "tax",
    headerName: "ภาษี(%)",
    type: "number",
    flex: 1,
  },
  {
    field: "action",
    headerName: "Actions",
    flex: 2,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <div className="flex justify-center">
        <div className="content-center ">
          <Button
            className="mx-1 transition ease-in-out delay-150 rounded-r-sm bg-yellow-700 hover:bg-yellow-800 shadow-none"
            // className="bg-inherit shadow-none hover:shadow-none p-2"
            size="sm"
            onClick={() => handleEdit(params.row.prod_id)}
          >
            <Pencil size={15} />
          </Button>
          <Button
            className="mx-1 transition ease-in-out delay-150 rounded-l-sm bg-red-700 hover:bg-red-800 shadow-none"
            // className="bg-inherit shadow-none hover:shadow-none p-2"
            size="sm"
            onClick={() => handleDelete(params.row.prod_id)}
          >
            <Trash2 size={15} />
          </Button>
        </div>
      </div>
    ),
  },

  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   flex: 3,
  //   valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  // },
];

function handleEdit(id) {
  // เขียนโค้ดสำหรับการแก้ไขข้อมูลที่มี id นั้น
  console.log("แก้ไข ID:", id);
  // เช่น เรียก API เพื่อโหลดข้อมูลที่ต้องการแก้ไข
}

function handleDelete(id) {
  // เขียนโค้ดสำหรับการลบข้อมูลที่มี id นั้น
  console.log("ลบ ID:", id);
  // เช่น เรียก API เพื่อทำการลบข้อมูล
}

const options = [
  { value: "apple", label: "Apple" },
  { value: "orange", label: "Orange" },
  { value: "banana", label: "Banana" },
  { value: "grape", label: "Grape" },
];

export default function ProductList({ products }) {
  // const [selectedOptions, setSelectedOptions] = useState([]);
  const cssInput =
    "w-full h-10 font-light bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md";

  // const handleChange = (selected) => {
  //   if (selected.length <= 3) {
  //     setSelectedOptions(selected);
  //   }
  // };
  return (
    <div className="flex justify-center items-center">
      <Form className="w-full">
        <Card className="rounded">
          <CardBody>
            <h1 className="mb-2 flex text-gray-600">
              <ShoppingBasket />
              &nbsp;&nbsp;รายการสินค้า
            </h1>
            <hr />

            <div className="grid xs:grid-cols-12 grid-cols-4 gap-4 mt-6">
              <div className="block md:block xs:col-span-10">
                <label className="block mb-1 text-sm text-slate-800">
                  ค้นหา
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input type="text" className={cssInput} />
                </div>
              </div>

              <div className="hidden md:block">
                <label className="block mb-1 text-sm text-slate-800">
                  ประเภทสินค้า
                </label>
                <div className="relative mt-2 rounded-md">
                  <Select
                    // isMulti
                    // value={selectedOptions}
                    isClearable
                    options={options}
                    // className="basic-multi-select font-light w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    className="basic-single font-light w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    classNamePrefix="select"
                    placeholder=""
                    // onChange={handleChange}
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderStyle: "none", // แก้ไข border-style ตรงนี้
                        boxShadow: "none", // ถ้าต้องการลบเงาด้วย
                      }),
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-2 flex items-end md:justify-end">
                {/* <button className="flex items-center bg-gray-200 h-10 px-2 hover:bg-gray-300 rounded">
                  <SlidersHorizontal />
                </button> */}
                <div className="flex md:justify-end md:items-end text-white xs:hidden">
                  <Link to="/product/entry">
                    <Button className="btn-success flex">
                      <Plus size={15} />
                      &nbsp;เพิ่มสินค้า
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <DataTable rows={products} columns={columns} />
            </div>
          </CardBody>
        </Card>
      </Form>
    </div>
  );
}
