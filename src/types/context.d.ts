import { Dispatch, SetStateAction } from "react";
import { paperData } from "../types";

export type authUserType = {
  id: string;
  // firstName?: string;
  // lastName: string;
  // emailID: string;
  walletAddress: string;
  chain: string;
  isVerified: boolean;
};

export type ContextType = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    emailID: string;
    walletAddress: string;
    chain: string;
    isVerified: boolean;
  };
  paperData: paperData;
};
export interface ContextInterface {
  store: ContextType;
  setStore: Dispatch<SetStateAction<ContextType>>;
  // setStore: (store: ContextType) => void;
}
