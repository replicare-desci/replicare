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
// import { formDataType } from "../types/context.d";
import { UserContext } from "../context/ContextProvider";
import { toast } from "react-toastify";
import { paperData } from "../types/index.d";

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
 * TODO: no need for now
 * @work getUserPaperData is getting user paper data from the firestore
 * @param {string}userID
 * @param {function} handleUserPaperData
 *
 */
async function getUserPaperData(
  userID: string,
  handleUserPaperData: (userPaperData: any) => void
) {
  let getDataReturnObj: any = [];
  try {
    const docRef = collection(db, "userPaper");
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

// function giveDoiDataBasedOnPaperID(paperID: string) {
//   const giveDoiData = getDoc(doc(db, "doiPaper", paperID))
//     .then((resp) => {
//       console.log(resp);
//       if (paperID === resp.id) {
//         return {
//           ...resp.data(),
//         };
//       }
//     })

//     .catch((err) => console.log(err));
//   console.log(giveDoiData);
//   return giveDoiData;
// }

/**
 * @work existsEmail is a async function which checks that a email is already in the database or not.
 * @param {string} emailID
 * @returns {boolean}
 */
async function existsEmail(emailID: string) {
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
 * @param {paperData} formData
 * @param {string} userID
 * @param {any} doiResponse
 * @returns {boolean}
 */
async function addUserPaperData(
  formData: any,
  userID: string,
  doiResponse: any
) {
  try {
    const userPaperCollection = collection(db, "userPaper");
    const finalUserPaperDataRef = await addDoc(userPaperCollection, {
      userID: userID,
      paper: doiResponse,
      ...formData,
    });

    if (finalUserPaperDataRef.id !== null) {
      return {
        success: true,
        userPaperID: finalUserPaperDataRef.id,
      };
    }
    // const doiDataCollection = collection(db, "doiPaper");

    // // Add DOI paper data to database
    // const doiPaperDoc = await addDoc(doiDataCollection, {
    //   doi: doiResponse?.doi,
    //   title: doiResponse?.title,
    //   journalName: doiResponse?.nameOfJournal,
    //   yearOfPublication: doiResponse?.yearOfPublication,
    //   author: doiResponse?.author,
    //   createdAt: Timestamp.now(),
    // });

    // // Add user paper data to database, referencing DOI paper
    // const userPaperDoc = await addDoc(userPaperCollection, {
    //   reproductionPackageAvailable: formData?.reproductionPackageAvailable,
    //   authorContacted: formData?.authorContacted,
    //   checkBoxData: formData?.checkBoxData,
    //   authorInteraction: false,
    //   userID: userID,
    //   doiPaperID: doiPaperDoc?.id,
    //   buildFromScratch: formData?.buildFromScratch,
    //   reproductionData1: formData?.reproductionData1,
    //   reproductionData2: formData?.reproductionData2,
    //   createdAt: Timestamp.now(),
    // });
    // if (doiPaperDoc.id !== null && userPaperDoc !== null) {
    //   return {
    //     success: true,
    //     userPaperID: userPaperDoc.id,
    //   };
    // }
  } catch (error) {
    console.error("Error in selectUserPaperData:", error);
    return {
      success: false,
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
      authors_available: "",
      authors_contacted: "",
      authors_response: [],
      created_at: "2023-04-15T13:07:59.254Z",
      familiarity_level: "",
      is_author: "true",
      is_creator: "true",
      outputs: {
        attempt_all_figures_appendix: "",
        attempt_all_inline_results_body: "",
        attempt_all_tables_appendix: "",
      },
      paper_type: "candidate",
      reproduction_package_available: "",
      reproduction_package_from_scratch: "",
      shareable_link: false,
      will_assess_whole_paper: "",
      workflow_stage: "select_paper",
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
 * @param {string} userPaperID
 */
async function deleteUserPaperData(userPaperID: string) {
  try {
    await deleteDoc(doc(db, "userPaper", userPaperID));
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
    console.log(querySnapshot.data());
    const doiPaperID = querySnapshot.data().doiPaperID;
    if (doiPaperID) {
      const doiPaperData = await getDoc(doc(db, "doiPaper", doiPaperID));

      console.log(doiPaperData.data());

      data = { ...querySnapshot.data(), doiPaperData: doiPaperData.data() };
    }
  } catch (error) {
    console.log(error);
  }

  return data;
}

export {
  existsEmail,
  // saveUserWalletAddress,
  // giveDoiDataBasedOnPaperID,
  getSelectUserPaperData,
  deleteUserPaperData,
  getUserPaperData,
  addUserPaperData,
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
