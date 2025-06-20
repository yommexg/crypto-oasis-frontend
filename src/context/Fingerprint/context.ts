import { createContext } from "react";

type FingerprintContextType = {
  fingerprint: string;
  setFingerprint: (fingerprint: string) => void;
};

export const FingerprintContext = createContext<
  FingerprintContextType | undefined
>(undefined);
