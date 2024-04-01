import { useState, useEffect } from "react";
import { GlobalContext } from "@/context/context";
import { useAccount } from "wagmi";
import { adminAddresses } from "@/config/data";
export function useCheckAdmin() {
    const {address, isConnected , chainId} = useAccount()
    //const { address, chainId, isConnected } = useWeb3ModalAccount();
    const {isAdmin, setIsAdmin} = GlobalContext();

    useEffect(() => {

        if (adminAddresses.includes(address)) {
            setIsAdmin(true);
        }
        console.log("Address:", address); 
    }, [address, isConnected, adminAddresses]); 

    return isAdmin;
}
