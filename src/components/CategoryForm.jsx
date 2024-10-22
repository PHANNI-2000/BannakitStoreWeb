import { Form } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Button,
  Checkbox,
} from "@material-tailwind/react";
import { ListTodo } from "lucide-react";

function CategoryForm() {
  const cssInput =
    "w-full h-10 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md";

  return (
    <div className="flex justify-center items-center m-6">
      <Form method="POST" className="w-11/12" autoComplete="off">
        <Card className="rounded">
          <CardBody>
            <h1 className="mb-2 flex text-gray-600">
              <ListTodo />
              &nbsp;&nbsp;ประเภทสินค้า
            </h1>
            <hr />

            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-4">
              <div className="col-span-1"></div>
              <div className="col-span-5">
                <label className="block mb-1 text-sm text-slate-800">
                  ชื่อประเภทสินค้า (ไทย)
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="text"
                    id="categoryNameTh"
                    name="categoryNameTh"
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-5">
                <label className="block mb-1 text-sm text-slate-800">
                  ชื่อประเภทสินค้า (อังกฤษ)
                </label>
                <div className="relative mt-2 rounded-md flex items-center">
                  <input
                    type="text"
                    id="categoryNameEn"
                    name="categoryNameEn"
                    className={cssInput}
                    required
                  />
                </div>
              </div>
              <div className="col-span-1"></div>
            </div>

            <div className="grid xs:grid-cols-12 grid-cols-12 gap-4 mt-4">
              <div className="col-span-11 flex justify-end">
                <Checkbox color="blue" label="สถานะใช้งาน" id="activeStatus" name="activeStatus" />
                <div className="col-span-1"></div>
              </div>
            </div>
          </CardBody>

          <CardFooter className="grid grid-cols-12 gap-4">
            <div className="col-span-11 flex justify-end">
              <Button className="rounded-sm mx-2">cancel</Button>
              <Button type="submit" className="btn-success">
                save
              </Button>
            </div>
            <div className="col-span-1"></div>
          </CardFooter>
        </Card>
      </Form>
    </div>
  );
}

export default CategoryForm;
