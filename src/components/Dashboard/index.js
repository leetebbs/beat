"use client";
import { GlobalContext } from "@/context/context";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";

export const DashboardView = () => {
  const { isAdmin, isArtist } = GlobalContext();
  const nftEndpointUrl = "https://d-beats-server-8095.onrender.com/allNfts";
  const [nfts, setNfts] = useState([]);
  const account = useAccount();
  const userAddress = account.address;

  useEffect(() => {
    const getAllNfts = async () => {
      console.log("getting all nfts");
      try {
        const response = await axios.get(nftEndpointUrl);
        console.log(response.data);

        // Filter the NFTs where the artistAddress matches the userAddress
        const filteredNfts = response.data.filter(nft => nft.artistAddress === userAddress);

        // Update the state with the filtered data
        setNfts(filteredNfts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllNfts();
 }, [userAddress]);
  return (
    <div className="mt-32 bg-red-300">
      {isAdmin && <p>admin</p>} {isArtist && <p>he is also artist</p>}
      {nfts.map((nft, index) => (
        <div key={index}>
          {/* Assuming each NFT has a name property */}
          <p>{nft.name}</p>
        </div>
      ))}
    </div>
  );
};
