"use client";

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

export default function SignUpPage() {

  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

  
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

    
    if (error) {
        alert(error.message || "Something went wrong. Please try again.");
    } else {
        alert("Signup successful! Please log in.");
        router.push("/login");
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
        provider: 'google'
    })
  };

  const handleGithubSignup = async () => {
    await authClient.signIn.social({
        provider: 'github'
    })
  }



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      
     
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 rounded-2xl bg-[#111827] border border-gray-700 shadow-xl">
          
          <h1 className="text-center text-3xl font-bold text-white mb-6">
            Create Account 
          </h1>

          <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
            
         
            <TextField isRequired name="name">
              <Label className="text-gray-400 text-sm">Name</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Enter your name"
              />
              <FieldError />
            </TextField>

         
            <TextField isRequired name="image">
              <Label className="text-gray-400 text-sm">Image URL</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="Image URL"
              />
              <FieldError />
            </TextField>

            
            <TextField isRequired name="email" type="email">
              <Label className="text-gray-400 text-sm">Email</Label>
              <Input
                className="bg-[#1f2937] border border-gray-600 text-white placeholder:text-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                placeholder="john@example.com"
              />
              <FieldError />
            </TextField>

            
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
            <p className="text-center text-gray-500 text-sm mt-4">
              Or sign up with
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                type="button"
                className="bg-transparent text-gray-300 border border-blue-600 hover:bg-blue-700 hover:text-white transition p-2 rounded-lg flex items-center gap-2"
                onClick={handleGoogleSignup}
              >
                Google
              </Button>
              <Button
                type="button"
                className="bg-transparent text-gray-300 border border-blue-600 hover:bg-blue-700 hover:text-white transition p-2 rounded-lg flex items-center gap-2"
                onClick={handleGithubSignup}
              >
                GitHub
              </Button>
            </div>
        </Card>
      </motion.div>
    </div>
  );
}

