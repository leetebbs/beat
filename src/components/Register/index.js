"use client";

export const RegisterView = () => {
 // send twitter handle and wallet address to database
  return (
    <div className="mt-32 text-black">
      <h1>Register</h1>
      <p>
      We&apos;re thrilled that you&apos;re interested in joining Beats as an artist! Please fill out the below information to help us verify your identity (to protect our collectors from bots and fake accounts!).
      </p>
      <input type="text" placeholder="Twitter handle" />
      <p>Once we have verified your twitter account you will recieve an exclusive artist NFT that will allow access to the artist portal where you can upload your colletions.</p>
      <button className="bg-[#3396FF] text-white h-11 text-xl rounded-full w-[150px]">Register</button>
    </div>
    
  );
};
