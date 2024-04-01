'use client'
import { createContext, useContext, useState } from "react";


export const beatContext = createContext({});

export const BeatContextProvider = ({children}) => {
    const [address, setAddress] = useState('');
    const [isArtist,setIsArtist] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    
    const value = {
        address,
        setAddress,
        isArtist,
        setIsArtist,
        isAdmin,
        setIsAdmin
    }
    return(
    <beatContext.Provider value={value}>
       {children}
    </beatContext.Provider>)
}


export const GlobalContext = () => useContext(beatContext)