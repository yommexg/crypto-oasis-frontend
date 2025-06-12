import { createContext } from "react";

type WalletContextType = {
  address: `0x${string}` | undefined;
  setAddress: (address: `0x${string}` | undefined) => void;
  activeWallet: string | null;
  setActiveWallet: (walletName: string | null) => void;
  walletLoading: boolean;
  setWalletLoading: (loading: boolean) => void;
};

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);
