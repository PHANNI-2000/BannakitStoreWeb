import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Drawer,
  Input,
  Button,
  Navbar,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ArchiveBoxIcon,
  ShoppingCartIcon,
  TagIcon,
  CubeTransparentIcon,
  InboxIcon,
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  SquaresPlusIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ProfileMenu from "./ProfileMenu";

export default function Sidebar() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  //   const [openAlert, setOpenAlert] = React.useState(true);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return (
    <>
      {/* Sidebar for PC */}
      <div className="hidden md:block text-white h-full p-4">
        <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl overflow-y-auto shadow-blue-gray-900/5">
          <div className="mb-2 flex items-center gap-4 p-4">
            <img
              src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
              alt="brand"
              className="h-8 w-8"
            />
            <Typography variant="h5" color="blue-gray">
              Sidebar
            </Typography>
          </div>
          <div className="p-2">
            <Input
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search"
            />
          </div>
          <List>
            {/* <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Dashboard
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Analytics
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Reporting
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Projects
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion> */}
            {/* <Accordion
              open={open === 2}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 2 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 2}>
                <AccordionHeader
                  onClick={() => handleOpen(2)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <ShoppingBagIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    E-Commerce
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Orders
                  </ListItem>
                  <ListItem>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    Products
                  </ListItem>
                </List>
              </AccordionBody>
            </Accordion> */}
            <ListItem>
              <ListItemPrefix>
                <PresentationChartBarIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Inbox
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>
            <Link to="/brand">
              <ListItem>
                <ListItemPrefix>
                  <TagIcon className="h-5 w-5" />
                </ListItemPrefix>
                Brand
              </ListItem>
            </Link>
            <Link to="/product">
              <ListItem>
                <ListItemPrefix>
                  <CubeTransparentIcon className="h-5 w-5" />
                </ListItemPrefix>
                Products
              </ListItem>
            </Link>
            <ListItem>
              <ListItemPrefix>
                <SquaresPlusIcon className="h-5 w-5" />
              </ListItemPrefix>
              Category
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ArchiveBoxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Stock
            </ListItem>
            <ListItem>
              <ListItemPrefix>
                <ShoppingCartIcon className="h-5 w-5" />
              </ListItemPrefix>
              Orders
            </ListItem>
            <hr className="my-2 border-blue-gray-50" />
            <Link to="/management">
              <ListItem>
                <ListItemPrefix>
                  <UserGroupIcon className="h-5 w-5" />
                </ListItemPrefix>
                Management
              </ListItem>
            </Link>
          </List>
        </Card>
      </div>

      {/* Burger button and Drawer for mobile */}
      <div className="md:hidden p-2 text-white">
        <Navbar className="mx-auto p-2 flex justify-between">
          <IconButton variant="text" size="lg" onClick={openDrawer}>
            {isDrawerOpen ? (
              <XMarkIcon className="h-8 w-8 stroke-2" />
            ) : (
              <Bars3Icon className="h-8 w-8 stroke-2" />
            )}
          </IconButton>

          <div className="flex justify-end">
            <Button size="sm" variant="text">
              <BellIcon className="h-5 w-5 text-blue-gray-500" />
            </Button>
            <ProfileMenu />
          </div>
        </Navbar>
        <Drawer open={isDrawerOpen} onClose={closeDrawer} className="md:hidden">
          <Card className="h-[calc(100vh-2rem)] w-full p-4 shadow-xl">
            <div className="mb-2 flex items-center gap-4 p-4">
              <img
                src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
                alt="brand"
                className="h-8 w-8"
              />
              <Typography variant="h5" color="blue-gray">
                Sidebar
              </Typography>
            </div>
            <div className="p-2">
              <Input
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                label="Search"
              />
            </div>
            <List>
              <Accordion open={open === 1}>
                <ListItem className="p-0">
                  <AccordionHeader
                    onClick={() => handleOpen(1)}
                    className="border-b-0 p-3"
                  >
                    <ListItemPrefix>
                      <PresentationChartBarIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography color="blue-gray" className="mr-auto">
                      Dashboard
                    </Typography>
                    <ChevronDownIcon
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  </AccordionHeader>
                </ListItem>
                <AccordionBody className="py-1">
                  <List className="p-0">
                    <ListItem>Analytics</ListItem>
                    <ListItem>Reporting</ListItem>
                  </List>
                </AccordionBody>
              </Accordion>
            </List>
          </Card>
        </Drawer>
      </div>
    </>
  );
}
