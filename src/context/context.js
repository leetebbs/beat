'use client'
import { createContext, useContext, useState } from "react";


export const beatContext = createContext({});

export const BeatContextProvider = ({children}) => {
    const [address, setAddress] = useState('');
    const [isArtist,setIsArtist] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [nftLength,setNftLenght] = useState(0)
    
    const value = {
        address,
        setAddress,
        isArtist,
        setIsArtist,
        isAdmin,
        setIsAdmin,
        nftLength,
        setNftLenght
    }
    return(
    <beatContext.Provider value={value}>
       {children}
    </beatContext.Provider>)
}


export const GlobalContext = () => useContext(beatContext)