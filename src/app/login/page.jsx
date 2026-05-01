"use client";

import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client"; // আপনার auth-client পাথ ঠিক আছে কি না নিশ্চিত হয়ে নিন
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LogInPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // FormData ব্যবহার করা ডাটা নেওয়ার জন্য সবথেকে নিরাপদ উপায়
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      // Better Auth-এ 'login' নয়, 'signIn' ব্যবহার করতে হয়
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/", // লগইন সফল হলে যেখানে পাঠাতে চান
      });

      if (error) {
        console.error("Login Error:", error);
        alert(error.message || "Something went wrong. Please check your credentials.");
      } else {
        console.log("Login successful:", data);
        router.push("/"); // ম্যানুয়ালি রিডাইরেক্ট করার জন্য
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      
      {/* 🧊 Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 rounded-2xl bg-[#111827] border border-gray-700 shadow-xl">
          
          <h1 className="text-center text-3xl font-bold text-white mb-6">
            Log In
          </h1>

          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            {/* Email Field */}
            <TextField isRequired name="email" type="email">
              <Label className="text-gray-400 text-sm mb-1 block">Email</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                placeholder="john@example.com"
              />
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Password Field */}
            <TextField isRequired name="password" type="password">
              <Label className="text-gray-400 text-sm mb-1 block">Password</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 transition"
                placeholder="Enter your password"
              />
              <Description className="text-gray-500 text-xs mt-1">
                Must be at least 8 characters
              </Description>
              <FieldError className="text-red-400 text-xs mt-1" />
            </TextField>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-3">
              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                {!loading && <Check className="w-5 h-5" />}
                {loading ? "Logging in..." : "Log In"}
              </Button>

              <Button
                type="reset"
                className="w-full bg-transparent text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white transition"
              >
                Reset
              </Button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-4">
              Don't have an account?{" "}
              <a href="/signup" className="text-green-400 hover:underline">
                Sign Up
              </a>
            </p>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

