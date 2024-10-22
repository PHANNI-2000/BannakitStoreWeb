import { useState, useEffect } from "react";
import { useSubmit, Form, json, redirect } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  TrashIcon,
  PencilIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Option,
  Select,
} from "@material-tailwind/react";
import TablePagination from "@mui/material/TablePagination";

import { getAuthToken } from "../util/auth";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Unactive",
    value: "unactive",
  },
];

const TABLE_HEAD = [
  "Brand name (TH)",
  "Brand name (EN)",
  "Status",
  "Category",
  "",
];

function BrandList({ brands = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredBrands, setFilteredBrands] = useState(brands);

  // Modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBrand, setCurrentBrand] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false); // State to track if adding or editing

  // const submit = useSubmit();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const filtered = brands.filter((brand) => {
      const matchesSearch =
        brand.brandNameTh.includes(searchQuery) ||
        brand.brandNameEn.includes(searchQuery);
      const matchesTab =
        activeTab === "all" ||
        (activeTab === "active" && brand.activeStatus) ||
        (activeTab === "unactive" && !brand.activeStatus);
      return matchesSearch && matchesTab;
    });
    setFilteredBrands(filtered);
  }, [brands, searchQuery, activeTab]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  const handleDeleteClick = async (brandId) => {
    const result = await Swal.fire({
      title: "คุณแน่ใจว่าต้องการลบแบรนด์นี้?",
      text: "การลบจะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบ!",
      cancelButtonText: "ยกเลิก",
    });

    if (result.isConfirmed) {
      const token = getAuthToken();
      const response = await fetch(
        `https://localhost:44306/api/v1/BrandAPI/deleteBrand?id=${brandId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "DELETE",
        }
      );

      if (response.ok) {
        toast.success("ลบแบรนด์สำเร็จ");
        const newBrands = brands.filter((brand) => brand.brandId !== brandId);
        setFilteredBrands(newBrands);
      } else {
        toast.error("เกิดข้อผิดพลาดในการลบแบรนด์");
      }
    }
  };

  // Compute the paginated rows based on the current page and rows per page
  // const paginatedRows = filteredBrands.slice(
  //   page * rowsPerPage,
  //   page * rowsPerPage + rowsPerPage
  // );

  const handleEditClick = (brand) => {
    setCurrentBrand(brand);
    setIsAddingNew(false);
    setEditModalOpen(true);
  };

  const handleAddNewClick = () => {
    setCurrentBrand({
      brandId: "",
      brandNameTh: "",
      brandNameEn: "",
      categoryId: "",
    });
    setIsAddingNew(true);
    setEditModalOpen(true);
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   submit(event.target);
  // };

  return (
    <Card className="h-full w-full">
      <ToastContainer />
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              style={{ fontFamily: "Kanit, sans-serif" }}
            >
              Brand List แบรนด์
            </Typography>
            <Typography
              color="gray"
              className="mt-1 font-normal"
              style={{ fontFamily: "Kanit, sans-serif" }}
            >
              See information about all brands
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={handleAddNewClick}
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Brand
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setActiveTab(value)}
                >
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    style={{ fontFamily: "Kanit, sans-serif" }}
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredBrands
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((brand, index) => {
                const isLast = index === filteredBrands.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={brand.brandId}>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{ fontFamily: "Kanit, sans-serif" }}
                        >
                          {brand.brandNameTh}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{ fontFamily: "Kanit, sans-serif" }}
                        >
                          {brand.brandNameEn}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={brand.activeStatus ? "ใช้งาน" : "ไม่ใช้งาน"}
                          color={brand.activeStatus ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                          style={{ fontFamily: "Kanit, sans-serif" }}
                        >
                          {brand.category.categoryNameTh}
                        </Typography>
                      </div>
                    </td>
                    <td className={`${classes} flex justify-center`}>
                      <IconButton
                        variant="text"
                        className="mr-3 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-full"
                        onClick={() => handleEditClick(brand)}
                      >
                        <PencilIcon className="h-4 w-4 text-white" />
                      </IconButton>
                      <IconButton
                        variant="text"
                        className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full"
                        onClick={() => handleDeleteClick(brand.brandId)}
                      >
                        <TrashIcon className="h-4 w-4 text-white" />
                      </IconButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredBrands.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardBody>

      <Dialog
        size="sm"
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        className="p-4"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {isAddingNew ? "New Brand" : "Update Brand"}
          </Typography>
          <Typography className="mt-1 font-normal text-gray-600">
            Keep your records up-to-date and organized.
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={() => setEditModalOpen(false)}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <Form method="POST" autoComplete="off" action="/brand/list">
          <DialogBody className="space-y-4 pb-6">
            <div>
              <input
                type="hidden"
                name="brandId"
                value={currentBrand?.brandId || ""}
              />
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Brand name (Th)
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="brandNameTh"
                defaultValue={currentBrand?.brandNameTh || ""}
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mt-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-1 font-medium"
              >
                Brand name (En)
              </Typography>
              <Input
                color="gray"
                size="lg"
                name="brandNameEn"
                defaultValue={currentBrand?.brandNameEn || ""}
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
            <div className="mt-2">
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 text-left font-medium"
              >
                Category
              </Typography>
              <Select
                className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                placeholder="1"
                labelProps={{
                  className: "hidden",
                }}
              >
                <Option>Clothing</Option>
                <Option>Fashion</Option>
                <Option>Watches</Option>
              </Select>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button className="ml-auto" type="submit">
              {isAddingNew ? "Add" : "Save"} Brand
            </Button>
          </DialogFooter>
        </Form>
      </Dialog>
    </Card>
  );
}

export default BrandList;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  // input filed
  const brandId = params.brandId;
  const brandData = {
    brandNameTh: data.get("brandNameTh"),
    brandNameEn: data.get("brandNameEn"),
    activeStatus: data.get("activeStatus") ?? true,
    categoryId: data.get("categoryId") ?? 2,
  };
  const token = getAuthToken();
  let response;

  if (brandId) {
    response = await fetch(
      `https://localhost:44306/api/v1/BrandAPI/updateBrand?${brandId}`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      }
    );
  } else {
    response = await fetch(
      `https://localhost:44306/api/v1/BrandAPI/saveBrand`,
      {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(brandData),
      }
    );
  }

  if (response.ok) {
    return { success: true };
  } else {
    return { success: false };
  }
}
