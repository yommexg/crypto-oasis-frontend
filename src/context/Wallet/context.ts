import { createContext } from "react";

type WalletContextType = {
  address: string | null;
  setAddress: (address: string | null) => void;
  walletLoading: boolean;
  setWalletLoading: (loading: boolean) => void;
};

export const WalletContext = createContext<WalletContextType | undefined>(
  undefined
);
