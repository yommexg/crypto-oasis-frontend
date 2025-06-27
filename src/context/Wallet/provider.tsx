import { useState, type ReactNode } from "react";
import { WalletContext } from "./context";

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletLoading, setWalletLoading] = useState(false);
  const [address, setAddress] = useState<`0x${string}` | undefined>(undefined);
  const [activeWallet, setActiveWallet] = useState<string | null>(null);

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
