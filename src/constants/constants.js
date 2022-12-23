import { Network } from "alchemy-sdk";

export const SETTINGS = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
