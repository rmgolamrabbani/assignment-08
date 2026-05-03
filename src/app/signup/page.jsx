"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
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
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const [form, setForm] = useState({
    name: "",
    image: "",
    email: "",
    password: "",
  });

  //  Live validation
  const isValidEmail = form.email.includes("@");
  const isValidPassword =
    form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /\d/.test(form.password);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await authClient.signUp.email(form);

    setLoading(false);

    if (error) {
      toast.error(error.message || "Signup failed");
    } else {
      toast.success("Account created successfully!");
      router.push("/login");
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({ provider: "google" });
  };

  const handleGithubSignup = async () => {
    await authClient.signIn.social({ provider: "github" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4 relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-3xl rounded-full top-10 left-10"></div>
      <div className="absolute w-[400px] h-[400px] bg-emerald-500/20 blur-3xl rounded-full bottom-10 right-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
          
          <h1 className="text-center text-3xl font-bold text-white mb-6">
            Create Account 
          </h1>

          <Form onSubmit={onSubmit} className="flex flex-col gap-5">

            {/* Name */}
            <TextField isRequired name="name">
              <Label className="text-gray-300 mr-4">Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white rounded-xl w-full p-2"
                placeholder="Enter your name"
              />
            </TextField>

            {/* Image */}
            <TextField isRequired name="image">
              <Label className="text-gray-300 mr-4">Image URL</Label>
              <Input
                value={form.image}
                onChange={(e) =>
                  setForm({ ...form, image: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white rounded-xl w-full p-2"
                placeholder="Paste image URL"
              />
            </TextField>

            {/* Email */}
            <TextField
              isRequired
              name="email"
              validationState={
                form.email
                  ? isValidEmail
                    ? "valid"
                    : "invalid"
                  : "default"
              }
            >
              <Label className="text-gray-300 mr-4">Email</Label>
              <Input
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                className="bg-white/10 border-white/20 text-white rounded-xl w-full p-2"
                placeholder="john@example.com"
              />
              {!isValidEmail && form.email && (
                <Description className="text-red-400 text-xs">
                  Invalid email format
                </Description>
              )}
            </TextField>

            {/* Password */}
            <TextField
              isRequired
              name="password"
              validationState={
                form.password
                  ? isValidPassword
                    ? "valid"
                    : "invalid"
                  : "default"
              }
            >
              <Label className="text-gray-300 mr-4">Password</Label>

              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="bg-white/10 border-white/20 text-white rounded-xl pr-10 w-full p-2"
                  placeholder="Enter password"
                />

                {/*  Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Description className="text-gray-400 text-xs">
                8+ chars, 1 uppercase & 1 number
              </Description>

              {!isValidPassword && form.password && (
                <Description className="text-red-400 text-xs">
                  Weak password
                </Description>
              )}
            </TextField>

            {/* Buttons */}
            <div className="flex gap-3 pt-3">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <Check /> Sign Up
                  </>
                )}
              </Button>

              <Button
                type="reset"
                onClick={() =>
                  setForm({ name: "", image: "", email: "", password: "" })
                }
                className="w-full bg-white/5 text-gray-300 border border-white/10 rounded-xl"
              >
                Reset
              </Button>
            </div>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleGoogleSignup}
              className="bg-white/5 border border-white/10 text-white rounded-xl"
            >
              Continue with Google
            </Button>

            <Button
              onClick={handleGithubSignup}
              className="bg-white/5 border border-white/10 text-white rounded-xl"
            >
              Continue with GitHub
            </Button>
          </div>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-green-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </Card>
      </motion.div>
    </div>
  );
}

