import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  DBeatsFactoryAddress,
  DBeatsFactoryAbi,
  artistNftAddress,
  artistNftAbi,
  artistNFTURI,
} from "@/config/data";
import { useAccount } from "wagmi";
export const AdminView = () => {
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
<div className="my-[150px] flex flex-col items-center justify-center">
  <h1 className="text-3xl text-black text-center">Admin</h1>
  <div className="admin_container flex flex-col items-center">
    <h2 className="text-center my-10">Verify Artist Address</h2>
    <form className="flex flex-col items-center">
      <label>
        <input
          className="text-black w-[375px] text-center"
          type="text"
          placeholder="Enter verified address"
          onChange={(e) => setVerifyAddress(e.target.value)}
        />
      </label>
    </form>
    <div className="flex items-center gap-4 my-10">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={setVerified}>
        Verify
      </button>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={mintArtistNFT}>
        Mint
      </button>
    </div>
    {error && <p className="text-center">{error}</p>}
  </div>
</div>
  );
};
