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

export type formDataType = {
  reproductionPackageAvailable: boolean;
  authorContacted: boolean;
  // authorAvailableForFurtherQuestion: boolean,
  buildFromScratch: boolean;
  reproductionData1: string;
  reproductionData2: string;
  [key: string]: unknown;
};

export type doiDataType = {
  doi: string;
  [key: string]: unknown;
};
