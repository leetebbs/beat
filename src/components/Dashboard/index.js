"use client";
import { GlobalContext } from "@/context/context";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { IoMdPlay } from "react-icons/io";

export const DashboardView = () => {
  const { isAdmin, isArtist, nftLength, setNftLenght } = GlobalContext();
  const nftEndpointUrl = "https://d-beats-server-8095.onrender.com/allNfts";
  const [nfts, setNfts] = useState([]);
  const [audio, setAudio] = useState(false);
  const account = useAccount();
  const userAddress = account.address;

  useEffect(() => {
    const getAllNfts = async () => {
      console.log("getting all nfts");
      try {
        const response = await axios.get(nftEndpointUrl);
        console.log(response.data);

        // Filter the NFTs where the artistAddress matches the userAddress
        const filteredNfts = response.data.filter(
          (nft) => nft.artistAddress === userAddress
        );
        setNftLenght(filteredNfts?.length);

        // Update the state with the filtered data
        setNfts(filteredNfts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllNfts();
  }, [userAddress]);
  return (
    <div className="mt-16">
     
      <div className="mt-10 w-full mb-[190px] flex flex-wrap h-auto">
        {nfts.map((student, index) => (
          <>
            <div
              key={index}
              className="h-[500px] ml-8 mr-8  w-[400px] py-2 px-2 mt-5 mb-5  rounded-2xl bg-black/25"
            >
              <div className="w-[95%] ml-auto mr-auto rounded-2xl bg-white/55 h-[60%]">
                <img
                  src="./assets/headphone.png"
                  className="w-[90%] ml-auto mr-auto h-[98%]"
                />
              </div>
              <div className="flex w-[95%]">
                <div className="w-full py-2 px-3 flex">
                  <div>{`Name:  ${student.name}`}</div>
                </div>
                <div className="w-full py-2 px-2 flex">
                  <div>{`Price:  ${student.price}`}</div>
                </div>
              </div>
              <div className="w-full mt-2 mb-2 flex">
                <button className="h-8 w-[130px] rounded-2xl bg-blue-600/85 ml-auto mr-4">List</button>
                
              </div>
              <div
                className="w-full flex
              "
              >
                {
                  audio &&
                  <audio
                  className="w-[90%] ml-auto mr-auto mt-5 mb-2"
                  controls
                  autoplay
                >
                  <source src="horse.ogg" type="audio/ogg" />
                  <source src="horse.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                }
                {
                  !audio && 
                  <div className="ml-5 py-5">
                    <div onClick={() => {
                      setAudio(true)
                    }} className="bg-blue-400 h-12 w-12 rounded-full py-3 px-4">
                    <IoMdPlay className="text-white mt-0.5 text-xl"/>
                  </div>
                  </div>
                  
                }
               
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
