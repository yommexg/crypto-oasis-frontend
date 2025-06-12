import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";
import { useConnect } from "wagmi";
import Fortmatic from "fortmatic";
import Web3 from "web3";
import Portis from "@portis/web3";

import { useWallet } from "../../context/Wallet";
import { wallets, type walletType } from "../../utils/walletArray";

type HeaderWalletProps = {
  onCloseWallet: () => void;
};

const HeaderWallet: React.FC<HeaderWalletProps> = ({ onCloseWallet }) => {
  const { connect } = useConnect();

  const { activeWallet } = useWallet();

  const handleWalletClicked = (wallet: walletType) => {
    if (wallet.connector) {
      connect({ connector: wallet.connector });
      onCloseWallet();
    }

    if (wallet.name == "Fortmatic") {
      const fm = new Fortmatic("YOUR_API_KEY");
      window.ethereum = new Web3(fm.getProvider());
      // setActiveWallet(wallet.name);
    }

    if (wallet.name == "Portis") {
      const portis = new Portis("YOUR_DAPP_ID", "mainnet");
      const web3 = new Web3(portis.provider);
      console.log(web3);
      // setActiveWallet(wallet.name);

      // web3.eth
      //   .getAccounts()
      //   .then((accounts) => {
      //     if (accounts.length > 0) {
      //       console.log("Connected Portis account:", accounts[0]);
      //     } else {
      //       console.log("No Portis account found.");
      //     }
      //   })
      //   .catch(console.error)
    }
  };

  return (
    <div className="fixed inset-0 z-40">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 bg-black z-40"
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="absolute bg-white text-black top-12 md:top-16 right-1 w-[300px] md:w-[350px] py-1 rounded-2xl z-50">
        <div className="flex items-center justify-between bg-white shadow py-2 px-4 rounded-t-2xl">
          <h3 className="text-sm font-semibold">Connect to Wallet</h3>
          <FiX
            size={16}
            className="cursor-pointer"
            onClick={onCloseWallet}
          />
        </div>
        <div className="flex flex-col my-4 gap-2 px-6">
          {wallets.map((item, index) => (
            <div
              onClick={() => handleWalletClicked(item)}
              key={index + item.name}
              className={`bg-white shadow rounded-lg px-3 py-1 flex items-center justify-between cursor-pointer 
                ${
                  activeWallet === item.name
                    ? "border-2 border-[#cc8aaf]"
                    : "hover:border-2 hover:border-[#cc8aaf]"
                }`}>
              <p className="text-xs font-bold">{item.name}</p>
              <div className="w-8 h-8">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs px-8 mt-2 mb-4">
          New to ethereum ?{" "}
          <span className="text-[#a74979] hover:underline cursor-pointer font-semibold">
            Learn more about wallet
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default HeaderWallet;
