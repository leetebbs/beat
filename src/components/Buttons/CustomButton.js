import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { FaArrowDown19 } from "react-icons/fa6";
export const CustomButton = () => {
    return (
        <section className='flex items-center gap-[0.62rem] justify-end w-full  '>
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          const ready = mounted && authenticationStatus !== "loading";
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === "authenticated");

          return (
            <div
              {...(!ready && {
                "aria-hidden": true,
                style: {
                  opacity: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className='rounded-[3.125rem] w-[200px] h-10 bg-[#3396FF] text-white border-[#424242]'
                    >
                      Connect Wallet
                    </button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <button
                      onClick={openChainModal}
                      type="button"
                      className="rounded-[3.125rem] p-[0.62rem] border-[0.5px] w-fit h-10 bg-[#9e2f2f] text-white border-[#424242]"
                    >
                      Wrong network
                    </button>
                  );
                }

                return (
                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={openChainModal}
                      style={{ display: "flex", alignItems: "center" }}
                      type="button"
                      className="bg-[#3396FF]/45 text-white p-[0.825rem] h-10 rounded-[3.125rem] flex items-center gap-[0.62rem]"
                    >
                      {chain.hasIcon && (
                        <div
                          className="w-auto h-auto xl:w-7 xl:h-7"
                          style={{
                            background: chain.iconBackground,
                            borderRadius: 999,
                            overflow: "hidden",
                            marginRight: 4,
                          }}
                        >
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              height={5}
                              width={5}
                              src={chain.iconUrl}
                              className="w-auto h-auto xl:w-7 xl:h-7"
                            />
                          )}
                        </div>
                      )}
                      {chain.name}
                      <FaArrowDown19
                        width={10}
                        height={10}
                        className="hidden xl:inline-block"
                        src="https://github.com/Jay035/Solimax-v2/blob/main/public/icons/chevron-down.svg"
                        alt="chevron-down"
                      />
                    </button>

                    <button
                      onClick={openAccountModal}
                      type="button"
                      className="bg-[#3396FF]/45 text-white p-[0.725rem] px-6 h-10 rounded-[3.125rem] flex items-center gap-[0.62rem]"
                    >
                      {account.displayName}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </section>
    )
} 