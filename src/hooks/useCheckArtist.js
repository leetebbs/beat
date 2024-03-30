import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { artistNftAddress, artistNftAbi } from "@/config/data.js";
import { useAccount, useReadContract } from "wagmi";

export function useCheckArtist() {
    const {address, isConnected , chainId} = useAccount()
    //const { address, chainId, isConnected } = useWeb3ModalAccount();
    const [isArtist, setIsArtist] = useState(false);

    useEffect(() => {
        if (isConnected) {
            const check = async () => {
                try {
                    const provider = new ethers.JsonRpcProvider('https://sepolia-rollup.arbitrum.io/rpc')
                    const contract = new ethers.Contract(artistNftAddress, artistNftAbi, provider);
                    const result = await contract.balanceOf(address);
                    console.log('check res',result.toString());
                    if (result) {
                        setIsArtist(true);
                    }
                } catch (error) {
                    console.error("Error checking artist status:", error);
                }
            };
            check();
        }
    }, [address, isConnected]);

    return isArtist;
}
