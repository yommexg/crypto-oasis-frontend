import { useEffect, useState, type ReactNode } from "react";
import { WalletContext } from "./context";

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletLoading, setWalletLoading] = useState(false);

  const [address, setAddress] = useState<`0x${string}` | undefined>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("walletAddress") as `0x${string}` | undefined;
    }
    return undefined;
  });

  const [activeWallet, setActiveWallet] = useState<string | null>(null);

  useEffect(() => {
    if (address) {
      localStorage.setItem("walletAddress", address);
    } else {
      localStorage.removeItem("walletAddress");
    }
  }, [address]);

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
