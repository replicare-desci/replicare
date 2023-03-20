import { Dispatch, SetStateAction } from "react";
export type ContextType = {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    emailID: string;
    walletAddress: string;
    isVerified: boolean;
  };
};
export interface ContextInterface {
  store: ContextType;
  setStore: Dispatch<SetStateAction<ContextType>>;
  // setStore: (store: ContextType) => void;
}
