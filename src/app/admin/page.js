"use client"
import React, { useEffect, useState } from 'react';
import { Hero } from "@/components/Hero";
import { ethers } from 'ethers';
import { Navbar } from "@/components/Navbar";
import { AdminView } from "@/components/Admin"; // Make sure this path is correct
import { useAccount } from "wagmi";
import { adminAddresses } from "@/config/data";
import { GlobalContext } from '@/context/context';
import Image from "next/image";

export default function AdminPage() {
    const { isAdmin, setIsAdmin} = GlobalContext()
    const { address } = useAccount(); 
   


    useEffect(() => {

        if (adminAddresses.includes(address)) {
            setIsAdmin(true);
        }
        console.log("Address:", address); 
    }, [address, adminAddresses]); 

 return (
    <main className="flex min-h-screen flex-col items-center lg:text-black/90 text-black/85">
      <Navbar />
      {isAdmin && <AdminView />}
    </main>
 );
}
