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
    "https://assignment-08-c8u2ktrxe-rmgolamrabbanis-projects.vercel.app/" 
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


