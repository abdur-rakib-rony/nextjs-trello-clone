"use client";
import { z } from "zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { registerSchema } from "@/schemas/zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const validatedData = registerSchema.parse(data);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md md:w-96">
      <h2 className="mb-6 text-2xl font-semibold">Register your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <Label htmlFor="first_name">First Name</Label>
            <Input
              id="first_name"
              {...register("first_name")}
              placeholder="First Name"
              className="w-full"
            />
            {errors.first_name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Label htmlFor="last_name">Last Name</Label>
            <Input
              id="last_name"
              {...register("last_name")}
              placeholder="Last Name"
              className="w-full"
            />
            {errors.last_name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your Password"
            className="w-full"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Register Now"
          )}
        </Button>
      </form>

      <div className="mt-5 flex items-center justify-center text-sm">
        <div className="ml-6 flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="mr-6 flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-2 flex items-center justify-center text-center text-sm">
        <span>Already have an account?</span>
        <Link href="/" className="font-semibold">
          <Button variant="link">Login Now</Button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
