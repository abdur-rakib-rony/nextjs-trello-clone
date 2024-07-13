import { FC } from "react";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
import { Button } from "@/components/ui/button";

const Register: FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-800 to-pink-400 md:flex md:items-center md:justify-center">
      <div className="container mx-auto flex flex-col space-y-4 py-10 md:flex-row md:space-y-0">
        <div className="flex flex-1 flex-col justify-center px-4 py-8 md:px-8">
          <h1 className="mb-4 text-2xl font-bold leading-snug tracking-wide text-white md:text-4xl md:leading-tight">
            Trenny brings all your
            <br />
            tasks, teammates, and tools
            <br />
            together
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-white md:text-xl">
            Keep everything in the same place—even if your team isn&apos;t.
          </p>
          <Link href="/">
            <Button>Login Now</Button>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
