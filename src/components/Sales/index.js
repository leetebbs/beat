import { FaSearchengin, FaSear } from "react-icons/fa6";
import { IoIosSearch } from "react-icons/io";
export const SalesView = () => {
  return (
    <>
      <div className="w-full text-black mt-24">
        <div className="w-[85%] ml-auto mr-auto py-12 h-[190px]">
          <div className="py-2 px-28">
            <p className="text-6xl text-start font-light">Sales</p>
            <p className="mt-5 text-lg text-start  font-mono">
              Explore Genres from Your Favourite artist
            </p>
            <p className="mt-1 text-lg font-mono text-start ">
              Buy and Earn while Listening to what you want.
            </p>
          </div>
          {/** Search Bar Implemenrtation  */}
          <div className=" ml-auto mr-auto w-[91%] mt-[40px] h-24">
            <div className="h-[50%] mt-auto mb-auto rounded-full bg-white text-xl flex flex-row w-[95%] ml-auto mr-auto">
            <IoIosSearch className="mt-3 text-2xl mr-3 ml-4"/>
              <input
                className=" h-[100%] w-[90%] outline-none bg-transparent py-3 px-3"
                type="text"
                placeholder="Search Genres/artists"
              />
            </div>
          </div>
          {/** Cards Response Implemenrtation  */}
          <div className="mt-10 w-full mb-[190px] flex flex-wrap h-auto">
            <div className="h-[460px] w-[400px] mt-5 mb-5 ml-auto mr-auto rounded-2xl bg-black"></div>
            <div className="h-[460px] w-[400px] mt-5 mb-5 ml-auto mr-auto rounded-2xl bg-black"></div>
            <div className="h-[460px] w-[400px] mt-5 mb-5 ml-auto mr-auto rounded-2xl bg-black"></div>
            <div className="h-[460px] w-[400px] mt-5 mb-5 ml-auto mr-auto rounded-2xl bg-black"></div>
            <div className="h-[460px] w-[400px] mt-5 mb-5 ml-auto mr-auto rounded-2xl bg-black"></div>
           
          </div>
        </div>
      </div>
    </>
  );
};
