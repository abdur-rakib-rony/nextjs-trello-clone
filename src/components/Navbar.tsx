import Link from "next/link";
import ProfileMenu from "./ProfileMenu";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white py-2 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Trenny</h1>
        <div className="flex items-center">
          <Link href="/create-project">
            <Button variant="link">Create New</Button>
          </Link>
          <Link href="/projects">
            <Button variant="link">Projects</Button>
          </Link>
        </div>
        <ProfileMenu />
      </div>
    </nav>
  );
};

export default Navbar;
