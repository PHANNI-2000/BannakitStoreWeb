import { useState } from "react";
import {
  Form,
  useActionData,
  useNavigate, // useNavigate ใข้เพื่อเปลี่ยนเส้นทางจากฟังก์ชัน JS ใน component
} from "react-router-dom";
import Logo from "../assets/light-logo.svg";

import { Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

function AuthForm() {
  const [passwordShow, setPasswordShow] = useState(false);

  const data = useActionData();
  const navigate = useNavigate(); // navigate(นำทาง)

  // const [searchParams] = useSearchParams();
  // const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigate.state === "submitting";

  const togglePasswordVisiblity = () => setPasswordShow((cur) => !cur);

  return (
    <Form
      method="POST"
      className="h-full w-full content-center"
      style={{ background: "linear-gradient(#222c31, #111d32)" }}
      autoComplete="off"
    >
      <div className="flex justify-center sm:p-4">
        <div className="bg-white content-center rounded xs:p-1 p-6">
          <div className="flex justify-center xs:mt-6">
            <img className="max-w-[50%] h-auto pt-4" src={Logo} alt="" />
          </div>

          <h2 className="mt-6 text-center text-2xl text-primary">
            Login to your account
          </h2>
          <div className="flex flex-col gap-6 mt-6 xs:p-6">
            <Input label="Username" type="text" name="username" required />
            <Input
              label="Password"
              name="password"
              maxLength="20"
              type={passwordShow ? "text" : "password"}
              icon={
                <i onClick={() => togglePasswordVisiblity()}>
                  {passwordShow ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
              required
            />
            <Button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              Login
            </Button>
            {data && data.message && (
              <ul>
                {Object.values(data.message).map((err) => {
                  <li key={err}>{err}</li>;
                })}
              </ul>
            )}
            <div className="flex justify-end">
              <a href="#" className="text-blue-500 hover:underline text-sm">
                Forgot password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default AuthForm;
