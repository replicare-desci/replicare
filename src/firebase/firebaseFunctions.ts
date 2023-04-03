import { app, db } from "./firebase";

import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  getDoc,
  Timestamp,
  doc,
} from "firebase/firestore";

import { UserContext } from "../context/ContextProvider";
import { toast } from "react-toastify";

type userType = {
  firstName: string;
  lastName: string;
  emailID: string;
  walletAddress: string;
  id: string;
  isVerified: boolean;
};

/**
 * @work getUserData function is getting the user data from the firebase
 * @param {string} walletAddress
 * @param {function} handleUserData
 */
async function getUserData(
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

    // existsWalletAddress(walletAddress).then().catch();

    if (await existsWalletAddress(walletAddress)) {
      onSnapshot(docRef, (snapshots: any) => {
        snapshots.docs.forEach((doc: any) => {
          // console.log(doc.data());
          if (
            doc.data().walletAddress.toLowerCase() ===
            walletAddress.toLowerCase()
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
    } else {
      const walletAddressRef = collection(db, "user");
      addDoc(walletAddressRef, {
        walletAddress: walletAddress,
        isVerified: true,
        createdAt: Timestamp.now(),
      })
        .then((docRef) => {
          if (docRef.id !== null) {
            onSnapshot(walletAddressRef, (snapshots: any) => {
              snapshots.docs.forEach((doc: any) => {
                // console.log(doc.data());
                if (
                  doc.data().walletAddress.toLowerCase() ===
                  walletAddress.toLowerCase()
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
          } else {
            return false;
          }
        })
        .catch((e) => {
          console.error("Error adding document: ", e);
        });
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * @work getUserPaperData is getting user paper data from the firestore
 * @param {string}userID
 * @param {function} handleUserPaperData
 */
async function getUserPaperData(
  userID: string,
  handleUserPaperData: (userPaperData: any) => void
) {
  let getDataReturnObj: any = [];
  try {
    const docRef = collection(db, "userPaper");

    // onSnapshot(docRef, (snapshots: any) => {
    //   snapshots.docs.forEach((doc: any) => {

    //     // console.log(doc.data());
    //     // console.log(doc.id);

    //     if (doc.data().userID === userID) {
    //       getDataReturnObj.push({ ...doc.data(), id: doc.id });
    //     }
    //   });

    //   handleUserPaperData(getDataReturnObj);
    // });
    const snapshot = await getDocs(docRef);
    snapshot.forEach((doc) => {
      if (doc.data().userID === userID) {
        getDataReturnObj.push({ ...doc.data(), id: doc.id });
      }
    });
    handleUserPaperData(getDataReturnObj);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/**
 * @work existsEmail is a async function which checks that a email is already in the database or not.
 * @param {any}db
 * @param {string} emailID
 * @returns {boolean}
 */
async function existsEmail(db: any, emailID: string) {
  const usersRef = collection(db, "user");
  const q = query(usersRef, where("emailID", "==", emailID));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

/**
 * @work existsWalletAddress is a async function which checks that a wallet address is already in the database or not.
 * @param {any} db
 * @param {string} walletAddress
 * @returns {boolean}
 */
async function existsWalletAddress(walletAddress: string) {
  const usersRef = collection(db, "user");
  const q = query(usersRef, where("walletAddress", "==", walletAddress));
  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty as boolean;
}

/**
 * @work selectUserPaperData is a async function which is used to add the user paper data to the firestore
 * @param {any} formData
 * @param {string} userID
 * @param {any} doiResponse
 * @returns {boolean}
 */
async function selectUserPaperData(
  formData: any,
  userID: string,
  doiResponse: any
) {
  const userPaperCollectionRef = collection(db, "userPaper");

  const doiDataCollectionRef = collection(db, "doiPaper");
  const docRef1 = await addDoc(doiDataCollectionRef, {
    doi: doiResponse?.doi,
    title: doiResponse?.title,
    nameOfJournal: doiResponse?.nameOfJournal,
    yearOfPublication: doiResponse?.yearOfPublication,
    author: doiResponse?.author,
    createdAt: Timestamp.now(),
  });
  let docRef2;
  if (docRef1.id !== null) {
    docRef2 = await addDoc(userPaperCollectionRef, {
      reproductionPackageAvailable: formData?.reproductionPackageAvailable,
      authorContacted: formData?.authorContacted,
      checkBoxData: formData?.checkBoxData,
      // authorInteraction: false,
      userID: userID,
      paperID: docRef1?.id,
      authorAvailableForFurtherQuestion:
        formData?.authorAvailableForFurtherQuestion,
      buildFromScratch: formData?.buildFromScratch,
      reproductionData1: formData?.reproductionData1,
      reproductionData2: formData?.reproductionData2,
      createdAt: Timestamp.now(),
    });
  }
  if (docRef1?.id !== null && docRef2?.id !== null) {
    return {
      status: true,
      userPaperID: docRef2?.id,
    };
  } else {
    return {
      status: false,
      userPaperID: "",
    };
  }
}

/**
 * @work create a default instance of userPaper table
 * @param {string} userID
 * @returns {boolean}
 */
async function createDefaultUserPaperData(userID: string) {
  const userPaperCollectionRef = collection(db, "userPaper");
  try {
    const ref = await addDoc(userPaperCollectionRef, {
      userID: userID,
      createdAt: Timestamp.now(),
    });

    if (ref.id !== null) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }

  return false;
}

/**
 * @work delete userPaper table from database
 *
 */
async function deleteUserPaperData(userID: string) {
  // const userPaperCollectionRef = collection(db, "userPaper");

  try {
    // const querySnapshot = await getDocs(userPaperCollectionRef);

    // querySnapshot.forEach((doc) => {
    //   deleteDoc(doc.ref);
    // });
    await deleteDoc(doc(db, "userPaper", userID));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @work  getting the select user paper data from firestore database
 * @param userPaperID
 * @returns
 */
async function getSelectUserPaperData(userPaperID: string) {
  const userPaperCollectionRef = collection(db, "userPaper");
  let data: any = {};
  try {
    let querySnapshot: any = await getDoc(doc(db, "userPaper", userPaperID));

    // querySnapshot.forEach((doc: any) => {
    //   if (doc.id == userPaperID) {
    //     data.push(doc.data());
    //   }
    // });
    // console.log(querySnapshot.data());
    const doiPaperID = querySnapshot.data().paperID;
    const doiPaperData = await getDoc(doc(db, "doiPaper", doiPaperID));
    data = { ...querySnapshot.data(), doiPaperData: doiPaperData.data() };
  } catch (error) {
    console.log(error);
  }

  return data;
}

export {
  existsEmail,
  // saveUserWalletAddress,
  getSelectUserPaperData,
  deleteUserPaperData,
  getUserPaperData,
  selectUserPaperData,
  getUserData,
  existsWalletAddress,
  createDefaultUserPaperData,
};

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
