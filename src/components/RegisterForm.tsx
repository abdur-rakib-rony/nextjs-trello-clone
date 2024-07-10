"use client";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { registerSchema } from "@/schemas/zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
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

      router.push("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white p-8 shadow-md md:w-96">
      <h2 className="mb-6 text-2xl font-semibold">Register your Account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label
              htmlFor="first_name"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="first_name"
              {...register("first_name")}
              placeholder="First Name"
              className="w-full rounded border p-2"
            />
            {errors.first_name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.first_name.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="last_name"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="last_name"
              {...register("last_name")}
              placeholder="Last Name"
              className="w-full rounded border p-2"
            />
            {errors.last_name && (
              <p className="mt-1 text-xs text-red-500">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
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

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full items-center justify-center rounded bg-blue-600 py-2 text-white"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Register Now"
          )}
        </button>
      </form>

      <div className="mt-5 flex items-center justify-center text-sm">
        <div className="ml-6 flex-grow border-t border-gray-300"></div>
        <span className="mx-2 text-gray-500">or sign up with</span>
        <div className="mr-6 flex-grow border-t border-gray-300"></div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-2 text-center text-sm">
        <span>Already have an account?</span>
        <Link href="/" className="font-semibold text-blue-600">
          Login here
        </Link>
      </div>
    </div>
  );
}
