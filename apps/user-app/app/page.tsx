import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";
import HomePage from "../components/LandingPage";
import { div } from "framer-motion/client";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  }
  return(
    <>
    <HomePage/> 
    <div></div></>
     
  )
}

