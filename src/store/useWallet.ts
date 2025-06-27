import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type WalletState = {
  address: `0x${string}` | undefined;
  activeWallet: string | null;
  walletLoading: boolean;
  setAddress: (address: `0x${string}` | undefined) => void;
  setActiveWallet: (wallet: string | null) => void;
  setWalletLoading: (loading: boolean) => void;
};

const useWallet = create<WalletState>()(
  persist(
    (set) => ({
      // Initial state values
      address: undefined,
      activeWallet: null,
      walletLoading: false,
      // State update actions
      setAddress: (address) => set({ address }),
      setActiveWallet: (wallet) => set({ activeWallet: wallet }),
      setWalletLoading: (loading) => set({ walletLoading: loading }),
    }),
    {
      name: "yommex-wallet-storage",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        address: state.address,
        activeWallet: state.activeWallet,
      }),
    }
  )
);

export default useWallet;
