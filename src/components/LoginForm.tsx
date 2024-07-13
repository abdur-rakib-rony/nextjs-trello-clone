"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/create-project");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-6 shadow-md md:w-96">
      <h2 className="mb-6 text-2xl font-semibold">Login to your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </Label>
          <Input
            id="email"
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="w-full rounded border p-2"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your Password"
            className="w-full rounded border p-2"
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {error && (
          <p className="mt-1 text-xs text-red-500">
            {error === "CredentialsSignin" ? "Invalid Credentials" : error}
          </p>
        )}

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="mt-5 flex items-center justify-center text-sm">
        <div className="ml-6 flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="mr-6 flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-2 flex items-center justify-center text-center text-sm">
        <span>Don&apos;t have an account?</span>
        <Link href="/register" className="font-semibold">
          <Button variant="link">Register Now</Button>
        </Link>
      </div>
    </div>
  );
}
