import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { createWallet } from "thirdweb/wallets";

import { BiSolidUpArrow } from "react-icons/bi";
import { PiWalletFill } from "react-icons/pi";

import { client } from "../../config/third-web";

const HeaderWalletConnect: React.FC = () => {
  const account = useActiveAccount();

  return (
    <div className="relative">
      <ConnectButton
        client={client}
        chains={[sepolia]}
        detailsModal={{
          hideSendFunds: true,
          hideBuyFunds: true,
          hideReceiveFunds: true,
          assetTabs: [],
          manageWallet: {
            allowLinkingProfiles: false,
          },
          showBalanceInFiat: "USD",
          hideSwitchWallet: true,
          hiddenWallets: [],
        }}
        wallets={[
          createWallet("io.metamask"),
          createWallet("com.coinbase.wallet"),
        ]}
        theme="dark"
        connectButton={{
          label: (
            <PiWalletFill
              color="#8A939B"
              className="text-3xl md:text-[40px] p-1 md:p-2 bg-[#262831] rounded-full cursor-pointer"
            />
          ),
          style: {
            all: "unset",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            padding: 0,
            cursor: "pointer",
          },
        }}
        appMetadata={{
          name: "Yommex Genesis",
          url: "https://web3-gaming-frontend.vercel.app/",
        }}
        detailsButton={{
          render() {
            return (
              <PiWalletFill
                color="#8A939B"
                className="text-3xl md:text-[40px] p-1 md:p-2 bg-[#262831] rounded-full cursor-pointer"
              />
            );
          },
        }}
      />

      {!account?.address && (
        <div className="absolute -bottom-10 -right-[10px] md:-bottom-14 md:-right-[5px]">
          <BiSolidUpArrow className="text-[#31323E] absolute -top-3 right-4" />
          <div className="bg-[#31323E] py-[6px] px-[2px] md:py-2 rounded-lg w-[120px] md:w-[200px] md:px-2">
            <h3 className="font-semibold text-center text-[6px] md:text-[10px]">
              Welcome to Yommex Genesis!
            </h3>
            <p className="mt-[2px] md:mt-1 text-[5px] text-center md:text-[8px]">
              To create or play games,{" "}
              <span className="text-[#CCE919] font-semibold">
                Connect your wallet
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderWalletConnect;
