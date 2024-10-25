'use client'
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter()
  const { data, status } = useSession()

  const handleLogout = async (e) => {
    e.preventDefault();

  await signOut()
};

useEffect(()=>{
  if(data) router.replace('/dashboard')
},[data])

  if(status=='loading') return(<div>Loading</div>)

  return (
   <div onClick={handleLogout} >Hello</div>
  );
}
