import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError(); // useRouteError ดึงข้อผิดพลาดที่เกิดขึ้นในระหว่างการโหลดหรือการแสดงผลเส้นทาง

  let title = "An error occured!";
  // let message = "Something went wrong!";

  // console.log(error.message);
  

  // if (error.status === 500) {
  //   message = error.data.message;
  // }

  // if (error.status === 400) {
  //   title = "Not found";
  //   message = "Could not find resource or page.";
  // }

  return (
    <PageContent title={title}>
      <p className="text-lg mt-2 text-gray-600">{error.statusText || error.message}</p>
    </PageContent>
  );
}

export default ErrorPage;
