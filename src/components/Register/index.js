"use client";

import { useState } from "react";

export const RegisterView = () => {
  const [isChecked, setIsCheck] = useState(false);
  const [xHandle, setXhandle] = useState('');

  const ValidateXhandle = () => {
    if(xHandle.length > 5) {
      setIsCheck(true)
    }
    else {
      setIsCheck(false)
    }
    
  }
 // send twitter handle and wallet address to database
  return (
    <div className="mt-32 py-8 px-8 w-[90%] text-black">
      <h1 className="text-center text-2xl mt-5 mb-5">Register</h1>
      <div className="bg-white/20 py-8 px-8 rounded-3xl">
      <p className="mt-4 py-5 px-3 text-xl">
      We&apos;re thrilled that you&apos;re interested in joining Beats as an artist! Please fill out the below information to help us verify your identity (to protect our collectors from bots and fake accounts!).
      </p>
      <div className=" ml-auto mr-auto w-[50%] mt-[4px] h-[100px]">
            <div className="h-[50%] mt-auto mb-auto py-2 px-2 rounded-full bg-white/35 text-sm flex flex-row w-[95%] ml-auto mr-auto">
             
              <input
                className="h-[100%] w-[100%] outline-none bg-transparent py-3 px-3"
                type="text"
                required
                value={xHandle}
                placeholder="Enter Your Twitter Handle"
                onChange={(e) => {
                  setXhandle(e.target.value);
                  ValidateXhandle()
                }}
              />
              { isChecked && <img className="w-8 h-8" src="./assets/blue.png" />}
            </div>
          </div>
      <p className="mt-1 py-2 px-3 text-xl">Once we have verified your twitter account you will recieve an exclusive artist NFT that will allow access to the artist portal where you can upload your colletions.</p>
      <div className="w-full mt-3 flex">
      <button onClick={() => {
        alert('Submitted Sucessfully');
        setXhandle('')
      }} className="bg-[#3396FF]/75 hover:bg-[#3396FF] text-white h-10 text-xl ml-auto mr-auto rounded-full w-[150px]">Register</button>
      </div>
      </div>
    </div>
    
  );
};
