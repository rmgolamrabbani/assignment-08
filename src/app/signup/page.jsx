"use client";

import { motion } from "framer-motion";
import { Check } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
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

export default function SignUpPage() {
  const onSubmit = async (e) => {
    e.preventDefault();

        // 👉 Get form data
    const name = e.target.name.value;
    const image = e.target.image.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const {data, error} = await authClient.signUp.email({
        name,
        image,
        email,
        password
    })
    console.log("Signup response:", { data, error });


  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      
      {/* 🧊 Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 rounded-2xl bg-[#111827] border border-gray-700 shadow-xl">
          
          <h1 className="text-center text-3xl font-bold text-white mb-6">
            Create Account ✨
          </h1>

          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            
            {/* Name */}
            <TextField isRequired name="name">
              <Label className="text-gray-400 text-sm">Name</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Enter your name"
              />
              <FieldError />
            </TextField>

            {/* Image */}
            <TextField isRequired name="image">
              <Label className="text-gray-400 text-sm">Image URL</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Image URL"
              />
              <FieldError />
            </TextField>

            {/* Email */}
            <TextField isRequired name="email" type="email">
              <Label className="text-gray-400 text-sm">Email</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="john@example.com"
              />
              <FieldError />
            </TextField>

            {/* Password */}
            <TextField isRequired name="password" type="password">
              <Label className="text-gray-400 text-sm">Password</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Enter your password"
              />
              <Description className="text-gray-500 text-xs">
                At least 8 characters, 1 uppercase & 1 number
              </Description>
              <FieldError />
            </TextField>

            {/* Buttons */}
            <div className="flex gap-3 pt-3">
              <Button
                type="submit"
                className="w-full bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Check />
                Sign Up
              </Button>

              <Button
                type="reset"
                className="w-full bg-transparent text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white transition"
              >
                Reset
              </Button>
            </div>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

