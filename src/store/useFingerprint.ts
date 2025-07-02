import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface FingerprintState {
  fingerprint: string | null;
  setFingerprint: (fp: string | null) => void;
}

const useFingerprint = create<FingerprintState>()(
  persist(
    (set) => ({
      fingerprint: null,
      setFingerprint: (fp) => set({ fingerprint: fp }),
    }),
    {
      name: "yommex-genesis-web3-game-fingerprint-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useFingerprint;
