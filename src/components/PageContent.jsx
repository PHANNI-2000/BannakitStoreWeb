import { Link } from "react-router-dom";

function PageContent({ title, children }) {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mt-4 text-gray-600">{title}</h1>
      {children}
      <Link
        to="/"
        className="mt-4 px-6 py-2 text-white rounded-lg hover:color-secondary transition color-secondary"
      >
        Go Back Home
      </Link>
    </div>
  );
}

export default PageContent;
