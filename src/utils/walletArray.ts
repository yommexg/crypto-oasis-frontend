import {
  coinbaseWallet,
  injected,
  metaMask,
  walletConnect,
} from "wagmi/connectors";

import coinbaseIcon from "../assets/wallets/coinbase.png";
import fortmaticIcon from "../assets/wallets/fortmatic.png";
import metamaskIcon from "../assets/wallets/metamask.png";
import portisIcon from "../assets/wallets/portis.png";
import walletConnectIcon from "../assets/wallets/wallet-connect.png";

import { walletConnectProjectID } from "../config/env";

export type walletType = {
  name: string;
  logo: string;
  connector?:
    | ReturnType<typeof metaMask>
    | ReturnType<typeof walletConnect>
    | ReturnType<typeof coinbaseWallet>
    | ReturnType<typeof injected>;
};

export const wallets: walletType[] = [
  {
    name: "MetaMask",
    logo: metamaskIcon,
    connector: metaMask(),
  },

  {
    name: "WalletConnect",
    logo: walletConnectIcon,
    connector: walletConnect({
      projectId: walletConnectProjectID,
      showQrModal: true,
    }),
  },

  {
    name: "Coinbase Wallet",
    logo: coinbaseIcon,
    connector: coinbaseWallet({ appName: "Yommex Genesis" }),
  },

  {
    name: "Fortmatic",
    logo: fortmaticIcon,
  },

  {
    name: "Portis",
    logo: portisIcon,
  },
];
