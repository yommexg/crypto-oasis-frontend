import { useContext } from "react";
import { FingerprintContext } from "./context";

export const useFingerPrint = () => {
  const context = useContext(FingerprintContext);
  if (!context) {
    throw new Error("useFingerPrint must be used within a FingerPrintProvider");
  }
  return context;
};
