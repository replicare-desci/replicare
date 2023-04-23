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
  checkBoxData: boolean[];
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

// step-1
export type SummarizePaper = {
  nickname: string;
  startExercise: string;
  completeExercise: string;
  totalHours: number;
  familiarityOfPaper: string;
  displayItemsPaperMainBody: string[];

  displayItemsPaperAppendix: string[];
  focusedPopulation: string;
  whichOtherPopulation: string;
  totalClaims: number;
  paperClassification: string;
  investigatePaper: boolean;
  scientificClaims: number;
  summary: string;
  // TODO:remove after completion
  [key: string]: unknown;
};
// step-2
export type AddRevisedReproductionPackage = {
  repositoryDataPackageName: string;
  repositoryDataPackageLink: string;
};
// step-4
export type DeclareRobustnessChecks = {
  declareRobustnessChecks: string;
};
