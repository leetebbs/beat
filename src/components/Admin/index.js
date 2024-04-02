import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWriteContract } from 'wagmi' 
import { IoMdAt ,IoIosSearch } from "react-icons/io";
import {
  DBeatsFactoryAddress,
  DBeatsFactoryAbi,
  artistNftAddress,
  artistNftAbi,
  artistNFTURI,
} from "@/config/data";
import { useAccount } from "wagmi";
export const AdminView = () => {
  const {data:hash , writeContract } = useWriteContract()
  const [verifyAddress, setVerifyAddress] = useState("");
  const [error, setError] = useState(""); // State to handle error messages
  const role =
    "0xa49807205ce4d355092ef5a8a18f56e8913cf4a201fbe287825b095693c21775"; //ADMIN_ROLE

  async function setVerified() {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const factoryContract = new ethers.Contract(
          DBeatsFactoryAddress,
          DBeatsFactoryAbi,
          signer
        );

        const tx = await factoryContract.grantRole(role, verifyAddress);
        await tx.wait();
        console.log("tx done");
      } else {
        console.log("Ethereum object not found, install Metamask.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const setVerify = async () => {
    try {
      console.log('starting')
      writeContract({
        address: DBeatsFactoryAddress, 
        DBeatsFactoryAbi, 
        functionName: 'grantRole', 
        args: [role,verifyAddress]
      })
      console.log('middle')
    } catch (error) {
      console.log(error);
      alert('err',error)
    }
  }

  async function mintArtistNFT() {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const artistContract = new ethers.Contract(
        artistNftAddress,
        artistNftAbi,
        signer
      );

      const tx = await artistContract.safeMint(verifyAddress, artistNFTURI);
      await tx.wait();
      console.log("tx done");
    } else {
      console.log("Ethereum object not found, install Metamask.");
    }
  }

  return (
<div className="mt-32 w-full flex flex-col items-center justify-center">
 
  <div className="admin_container flex flex-col items-center">
    <div className="text-center py-3 px-3 flex my-10">
      <img src="./assets/blue.png" className="w-8 h-8"/>
      <p className="py-1 px-2 font-bold">Verify Artist Address</p>
    </div>
    <div className=" ml-auto mr-auto w-[610px] mt-[40px] h-24">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white text-xl flex flex-row w-[95%] ml-auto mr-auto">
              <input
                className=" h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                placeholder="Enter Artist Address"
                onChange={(e) => setVerifyAddress(e.target.value)}
              />
            </div>
          </div>
    <div className="flex items-center gap-4 my-10">
      <button className="bg-blue-500 hover:bg-blue-700 text-white w-32 font-bold py-2 px-4 rounded-full " onClick={setVerified}>
        Verify
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 w-32 text-white font-bold py-2 px-4 rounded-full" onClick={mintArtistNFT}>
        Mint
      </button>
    </div>
    {error && <p className="text-center">{error}</p>}
  </div>
</div>
  );
};
