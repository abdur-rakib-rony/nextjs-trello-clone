import Link from "next/link";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  return (
    <nav className="bg-white px-4 py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1>Trenny</h1>
          <div className="flex space-x-4">
            <Link href="/projects">Projects</Link>
          </div>
          <Link
            href="/create-project"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Create
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <button className="rounded p-2 text-gray-600 hover:bg-gray-100">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>

          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
