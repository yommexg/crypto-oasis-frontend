import { useState, type ReactNode } from "react";
import { FingerprintContext } from "./context";

export const FingerprintProvider = ({ children }: { children: ReactNode }) => {
  const [fingerprint, setFingerprint] = useState<string>("");

  return (
    <FingerprintContext.Provider
      value={{
        fingerprint,
        setFingerprint,
      }}>
      {children}
    </FingerprintContext.Provider>
  );
};
