import { FiX } from "react-icons/fi";
import { motion } from "framer-motion";

import braveIcon from "../../assets/wallets/brave.png";
import coinbaseIcon from "../../assets/wallets/coinbase.png";
import fortmaticIcon from "../../assets/wallets/fortmatic.png";
import metamaskIcon from "../../assets/wallets/metamask.png";
import portisIcon from "../../assets/wallets/portis.png";
import rainbowIcon from "../../assets/wallets/rainbow.png";
import trustIcon from "../../assets/wallets/trust.png";
import walletConnectIcon from "../../assets/wallets/wallet-connect.png";

type HeaderWalletProps = {
  onCloseWallet: () => void;
};

const wallets = [
  {
    name: "MetaMask",
    logo: metamaskIcon,
    connectorId: "injected",
  },
  {
    name: "WalletConnect",
    logo: walletConnectIcon,
    connectorId: "walletConnect",
  },
  {
    name: "Coinbase Wallet",
    logo: coinbaseIcon,
    connectorId: "coinbaseWallet",
  },
  {
    name: "Trust Wallet",
    logo: trustIcon,
    connectorId: "injected",
  },
  {
    name: "Rainbow",
    logo: rainbowIcon,
    connectorId: "walletConnect",
  },
  {
    name: "Brave Wallet",
    logo: braveIcon,
    connectorId: "injected",
  },
  {
    name: "Fortmatic",
    logo: fortmaticIcon,
    connectorId: "injected",
  },
  {
    name: "Portis",
    logo: portisIcon,
    connectorId: "injected",
  },
];

const HeaderWallet: React.FC<HeaderWalletProps> = ({ onCloseWallet }) => {
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
        className="absolute bg-white text-black top-12 md:top-16 right-1 w-[250px] md:w-[350px] py-1 rounded-2xl z-50">
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
              key={item.connectorId + index + item.name}
              className="bg-white shadow rounded-lg px-3 py-1 flex items-center justify-between cursor-pointer hover:border-2 hover:border-[#cc8aaf]">
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
