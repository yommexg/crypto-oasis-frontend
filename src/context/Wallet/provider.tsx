import { useEffect, useState, type ReactNode } from "react";
import { WalletContext } from "./context";
import { useLocation } from "react-router-dom";

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletLoading, setWalletLoading] = useState(false);
  const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);

  const location = useLocation();

  useEffect(() => {
    setAddress(address);
    setActiveWallet(activeWallet);
  }, [address, activeWallet, location]);

  return (
    <WalletContext.Provider
      value={{
        address,
        setAddress,
        walletLoading,
        setWalletLoading,
        activeWallet,
        setActiveWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
