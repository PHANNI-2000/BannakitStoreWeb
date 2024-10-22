import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  ShoppingBasket,
  SquareChartGantt,
  Package,
  ListTodo,
  Settings,
  LogOut,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../components/Sidebar_backup";

function HomePage() {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบ path ปัจจุบัน
  const path = ["/", "/product", "/category", "/management"];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <>
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="หน้าหลัก" alert />
          <SidebarItem
            icon={<LayoutDashboard size={20} />}
            text="แดชบอร์ด"
            active={location.pathname === path[0]}
          />
          <SidebarItem
            icon={<SquareChartGantt size={20} />}
            text="รายการขาย"
            alert
          />
          {/* <SidebarItem icon={<Calendar size={20} />} text="Orders" />
          <SidebarItem icon={<Layers size={20} />} text="Order History" /> */}
          {/* <SidebarItem icon={<Flag size={20} />} text="Issued Items" /> */}
          <Link to="/product">
            <SidebarItem
              icon={<ShoppingBasket size={20} />}
              text="สินค้า"
              active={location.pathname === path[1]}
            />
          </Link>
          <Link to="/category">
            <SidebarItem
              icon={<ListTodo size={20} />}
              text="ประเภทสินค้า"
              active={location.pathname === path[2]}
            />
          </Link>
          <SidebarItem icon={<Package size={20} />} text="คลังสินค้า" />
          <hr className="my-3" />
          <Link to="/management">
            <SidebarItem
              icon={<Settings size={20} />}
              text="จัดการผู้ใช้"
              active={location.pathname === path[3]}
            />
          </Link>
          <Link to="/logout">
            <SidebarItem icon={<LogOut size={20} />} text="ออกจากระบบ" />
          </Link>
          {/* <SidebarItem icon={<LifeBuoy size={20} />} text="" /> */}
        </Sidebar>
      </>
    </>
  );
}

export default HomePage;
