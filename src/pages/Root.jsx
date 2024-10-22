import { useEffect } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";

import HomePage from "./HomePage";
import { getTokenDuration } from "../util/auth";
import { ComplexNavbar } from "../components/ComplexNavbar";

function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
      return;
    }

    const tokenDuration = getTokenDuration();
    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <div className="md:flex md:h-screen">
      <HomePage />

      <div className="flex-1 p-4 overflow-y-auto">
        <ComplexNavbar />
        <div className="mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
