"use client";
import React, { useState } from "react";
import Image from "next/image";
import { DBeatsFactoryAddress, DBeatsFactoryAbi } from "@/config/data";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import { NFTStorage, File } from "nft.storage";

export const CreateView = () => {
  const client = new NFTStorage({
    token: process.env.NEXT_PUBLIC_NFT_STORAGE_KEY,
  });
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [imageFile, setimageFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [artistName, setArtistName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [numberOfCopies, setNumberOfCopies] = useState(0);
  const [nftSymbol, setNftSymbol] = useState("");
//   const [tokenURI, setTokenURI] = useState("");
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const account = useAccount();
  const userAddress = account.address;
  let imageIpfsUrl;
  let musicUrl;
  let uriData;
  let tokenURI;
  const handleFileChange = (e) => {
    const files = e.target.files;
    setFiles(files);
  };
  const handleImageChange = (e) => {
    const imageFile = e.target.files[0]; // Assuming you want to handle only one image for simplicity
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile);
      setimageFile(imageFile);
      setImageInput(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUploadImageToIpfs();
    handleUploadMusicToIpfs();
    setTimeout(async () => {
      storeExampleNFT();
      setTimeout(async () => {
        mintNFTonFactory()
      },25000);
    }, 15000);
    // getExampleImage();
  };

  const handleUploadImageToIpfs = async () => {
    try {
      if (!imageFile) return;
      console.log("uploading image to ipfs");
      const content = new Blob([imageFile]);
      const cid = await client.storeBlob(content);
      imageIpfsUrl = `https://ipfs.io/ipfs/${cid}`;
      console.log("Uploaded image:", imageIpfsUrl);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadMusicToIpfs = async () => {
    try {
      console.log("uploading music to ipfs");
      const music = new Blob([files[0]]);
      const cid2 = await client.storeBlob(music);
      const url = `https://ipfs.io/ipfs/${cid2}`;
      musicUrl = url;
      console.log("Uploaded music:", musicUrl);
    } catch (error) {
      console.log(error);
    }
  };
  async function getExampleImage() {
    const imageOriginUrl = imageIpfsUrl;
    const r = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
    }
    return r.blob();
  }

  async function storeExampleNFT() {
    const image = await getExampleImage();
    const nft = {
      image, 
      name: name,
      description: description,
      animation_url: musicUrl,
    };

    const metadata = await client.store(nft);

    console.log("NFT data stored!");
    console.log("Metadata URI: ", metadata.url);
    // setTokenURI(metadata.url);
    tokenURI = metadata.url;
  }

  async function mintNFTonFactory() {
    try {
      if (window.ethereum) {
        console.log(tokenURI)
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const factoryContract = new ethers.Contract(
          DBeatsFactoryAddress,
          DBeatsFactoryAbi,
          signer
        );
        const tx = await factoryContract.createNFT(
          DBeatsFactoryAddress,
          userAddress,
          tokenURI,
          numberOfCopies,
          name,
          nftSymbol
        );
        await tx.wait();
        console.log("tx done", tx.hash);
      } else {
        console.log("Ethereum object not found, install Metamask.");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[60%] text-black mt-24 flex flex-col justify-center items-center">
      <h1>Create</h1>
      <div className="w-[85%] ml-auto mr-auto py-12 h-auto bg-blue-200 p-10 flex justify-evenly rounded">
        <div className="w-[40%] items-center bg-white p-3">
          <form onSubmit={handleSubmit} className=" items-center">
            <input
              className="w-[90%] h-10 rounded-lg mt-3"
              type="text"
              placeholder="Enter Artist Name"
              required
              onChange={(e) => setArtistName(e.target.value)}
            />
            <input
              className="w-[90%] h-10 rounded-lg mt-3"
              type="text"
              placeholder="Enter Track Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-[90%] h-10 rounded-lg mt-3"
              type="text"
              placeholder="Enter Description"
              required
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-[90%] h-10 rounded-lg mt-3"
              type="text"
              placeholder="Enter Sale Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              className="w-[90%] h-10 rounded-lg mt-3"
              type="number"
              placeholder="Number of copies"
              required
              //   min="1" // Ensure the input starts at 1
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value > 1) {
                  setNumberOfCopies(value);
                } else {
                  // Option 1: Reset the input to 1
                  e.target.value = 1;
                  setNumberOfCopies(1);
                }
              }}
            />
            <input
              className="w-[90%] h-10 rounded-lg mt-3"
              type="text"
              placeholder="NFT Symbol"
              required
              onChange={(e) => setNftSymbol(e.target.value)}
            />

            <select
              className="w-[90%] h-10 rounded-lg mt-3"
              value={selectedGenre}
              required
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Select a Genre</option>
              <option value="Electronic">Electronic</option>
              <option value="Classical">Classical</option>
              <option value="Pop">Pop</option>
            </select>
            <div className="bg-blue-500 p-2 w-[265px] rounded mt-3 text-white">
              <h1>Upload Cover image</h1>
              <input
                className="w-[90%] h-10 rounded-lg mt-3 font"
                type="file"
                placeholder="Upload Cover image"
                accept=".jpg,.jpeg,.png,.gif"
                required
                onChange={handleImageChange}
              />
            </div>
            <div className="bg-blue-500 p-2 w-[265px] rounded mt-3 text-white">
              <h1>Upload Track</h1>
              <p className="text-xs">files accepted: .mp3 .wav .ogg</p>
              <input
                className="w-[90%] h-10 rounded-lg mt-3"
                type="file"
                placeholder="Upload files"
                // multiple
                required
                accept=".mp3,.wav,.ogg"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
              Create
            </button>
          </form>
        </div>
        <div>
          {imageInput ? (
            <Image src={imageInput} alt="Preview" width={200} height={200} />
          ) : (
            <Image
              src="/assets/placeholder.png"
              alt="Placeholder"
              width={200}
              height={200}
            />
          )}
          {artistName && <p>Artist Name: {artistName}</p>}
          {name && <p>Name: {name}</p>}
          {description && <p>Description: {description}</p>}
          {price && <p>Price: {price} ETH</p>}
        </div>
      </div>
    </div>
  );
};
