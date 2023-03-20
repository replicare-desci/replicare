import { app, db } from "./firebase";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";

import { UserContext } from "../context/ContextProvider";

type userType = {
  firstName: string;
  lastName: string;
  emailID: string;
  walletAddress: string;
  id: string;
  isVerified: boolean;
};

function getUserData(
  walletAddress: string,
  handleUserData: (userData: userType) => void
) {
  console.log("walletAddress", walletAddress);
  let getDataReturnObj: userType = {
    firstName: "",
    lastName: "",
    emailID: "",
    walletAddress: "",
    id: "",
    isVerified: false,
  };
  try {
    const docRef = collection(db, "user");

    onSnapshot(docRef, (snapshots: any) => {
      snapshots.docs.forEach((doc: any) => {
        // console.log(doc.data());
        if (
          doc.data().walletAddress.toLowerCase() === walletAddress.toLowerCase()
        ) {
          getDataReturnObj = {
            firstName: doc.data().firstName,
            lastName: doc.data().lastName,
            emailID: doc.data().emailID,
            walletAddress: doc.data().walletAddress,
            id: doc.id,
            isVerified: doc.data().isVerified,
          };
          handleUserData(getDataReturnObj);
        }
      });
    });
  } catch (e) {
    console.error("Error adding document: ", e);
  }

  // console.log(getDataReturnObj);

  // return getDataReturnObj;
}
async function existsEmail(db: any, emailID: string) {
  const usersRef = collection(db, "user");
  const q = query(usersRef, where("emailID", "==", emailID));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}
// existsWalletAddress function
async function existsWalletAddress(db: any, walletAddress: string) {
  const usersRef = collection(db, "user");
  const q = query(usersRef, where("walletAddress", "==", walletAddress));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

export { existsEmail };
export { existsWalletAddress };
export { getUserData };

/*
  
  table name : user
    firstName : "String",
    lastName : "String", 
    email : "string",
    walletAddress : 'string',
    isVerified : 'boolean',
    
  table name : paper
    titleOfThePaper : "string",
    nameOfTheJournal: "string",
    yearOfPublication: "int",
    authors:"string",
    doi:"string",
    availableReproductionPackage: "boolean",
    availableReproductionPackageLink: "string",
    
   
  table name : userPaper
    userID: "int",
    paperID: "int",
    createdAt: "dateTime",
    isReproductionPackageAvailable: "boolean",
    isReproductionPackageVerified: "boolean",
    authorContacted: "boolean",
    authorInteraction : 
        {
          providedReproductionPackage: 'checkBox',
          declinedToShareReproductionPackageWithReason : 'checkbox',
          declinedToShareReproductionPackageWithoutReason : 'checkbox',
          noLongerHasAccess: 'checkbox',
          sharedDetailedInstructionOnHowToAccessDataButRestricted: 'checkbox',
          didNotRespond : 'dateYear',
          otherReason : 'textField,
         }
    
     isAuthorAvailableForFurtherQuestion: 'boolean',
     isThereAreNoReproductionPackagesAreYouWillingToBuildPackageFromScratch: 'boolean',
  
    
    
  table name : doiData
    doi:"string",
    titleOfThePaper : "string",
    nameOfTheJournal: "string",
    yearOfPublication: "int",
    authors:"string",
  table name : availableReproductionPackage
   
  table name : userWork 
    titleOfPaper:'string',
    createdOn: 'timestamp'
    paperStatus: 'string',
    
  
    
*/
