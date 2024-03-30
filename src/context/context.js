'use client'
import { createContext, useContext, useState } from "react";


export const beatContext = createContext({});

export const BeatContextProvider = ({children}) => {
    const [address, setAddress] = useState('');
    
    const value = {
        address,
        setAddress
    }
    return(
    <beatContext.Provider value={value}>
       {children}
    </beatContext.Provider>)
}


export const GlobalContext = () => useContext(beatContext)