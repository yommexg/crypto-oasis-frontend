import { useState, type ReactNode } from "react";
import { WalletContext } from "./context";

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletLoading, setWalletLoading] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  return (
    <WalletContext.Provider
      value={{ address, setAddress, walletLoading, setWalletLoading }}>
      {children}
    </WalletContext.Provider>
  );
};
