"use client";
import { useState } from "react";
import { useCheckArtist } from "@/hooks/useCheckArtist";
import { useAccount } from "wagmi";
import Link from "next/link";
import { CustomButton } from "../Buttons/CustomButton";
import { UserPages, ArtistPages } from "./Pages";


export const Navbar = () => {
    
    const [isModal, setIsModal] = useState(false)
    const { isConnected } = useAccount()
    const isArtist = useCheckArtist()
    const handleClick = () => {
      setIsWalletModal(true);
      //alert('clicked')
    };
  
  
    const handleCopy = (value) => {
      navigator.clipboard.writeText(value).then(
        () => {
          // Successfully copied to clipboard
          setCopy(true);
          setTimeout(  () => 
            setCopy(false),
            1000)
          alert('address copied to clip Board')
        },
        (err) => {
          // Failed to copy to clipboard
          console.error('Could not copy address: ', err);
        }
      );
    }
    const handleCopy2 = (value) => {
      navigator.clipboard.writeText(value).then(
        () => {
          // Successfully copied to clipboard
          console.log('Address copied to clipboard');
          alert('address copied to clip Board')
          
        },
        (err) => {
          // Failed to copy to clipboard
          console.error('Could not copy address: ', err);
        }
      );
    }
    return (
      <>
        {/**for mobile view **/}
        <div
           style={{ "backdrop-filter": "blur(12px)" }}
          className=" backdrop-blur-3xl bg-clip-padding bg-opacity-60 z-10  fixed drop-shadow-glow text-black sm:flex w-[100%] h-20 lg:hidden md:hidden"
        >
          <div className="w-[98%] flex flex-row mt-1 py-2 px-2 ml-auto mr-auto h-[90%]">
            <div className="ml-0 mr-auto mt-auto mb-auto">
              <Link href={"/"}>
                <div className="text-xl font-semibold flex">
                 {/**<img className="w-[52px] h-[52px]" src="./assets/body.png" />**/}
                 <p className="text-black/55 text-2xl flex font-bold ml-1"><img src='./assets/headphone.png' className="w-10 mr-2 h-10" /><span className="">Beat</span></p>
                </div>
              </Link>
            </div>
            <div className="mr-auto ml-20 mt-auto mb-auto">
            <div onClick={handleClick} className="w-[250px] ml-auto mr-2">
             
            </div>
            </div>
          </div>
          
        </div>
        {/**for desktop view **/}
        <div
          style={{ "backdrop-filter": "blur(12px)" }}
          className="mb-5 bg-transaparent backdrop-blur-3xl bg-clip-padding bg-opacity-60 fixed z-10 text-black lg:flex md:flex hidden w-[100%] h-20"
        >
          <div className="py-5 px-5  mt-auto mb-auto ml-auto mr-auto w-[98%] flex flex-row  h-[90%]">
            <div className="ml-0 mr-auto">
              <Link href={"/"}>
                <div className="text-sm flex">
                  <p className="text-black/55 flex text-3xl font-thin ml-1"><img className="h-9 mr-2 w-9" src="./assets/headphone.png"/><span className=" font-extrabold">Beat</span></p>
                </div>
              </Link>
            </div>
            <div className="py-2 px-1">
              {
                
                isArtist ? 
                <ArtistPages />
                :
                <UserPages />
              }
              </div>
            <div className="mr-4 ml-auto px-2 py-0">
              <CustomButton />
            </div>
            
          </div>          
        </div>
      </>
    );
  };