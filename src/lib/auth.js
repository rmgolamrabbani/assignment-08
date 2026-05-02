import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("qurbani-hat");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),


  trustedOrigins: [
    "http://localhost:3000",
    "https://assignment-08-flame.vercel.app", 
    "https://assignment-08-9gmdd1eiz-rmgolamrabbanis-projects.vercel.app" 
  ],

  emailAndPassword: {
    enabled: true,
  },
  
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,   
    }
  }
});


