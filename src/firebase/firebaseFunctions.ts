import { db } from "./firebase";

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
  updateDoc,
} from "firebase/firestore";
// import { formDataType } from "../types/context.d";

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
    // console.log(getDataReturnObj);
    return getDataReturnObj;
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
      authors_available: "",
      authors_contacted: "",
      authors_response: [],
      created_at: Timestamp.now(),
      familiarity_level: "",
      is_author: true,
      is_creator: true,
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
      original_reproduction_packages: [
        {
          content_type: "code",
          name: "",
          stage: "original",
          url: "",
        },
      ],
      revised_reproduction_packages: [
        {
          content_type: "code",
          name: "",
          stage: "revised",
          url: "",
        },
      ],
      paper: null,
      expected_total_hours: 1,
    });
    console.log(ref.id);

    if (ref.id !== null) {
      return {
        success: true,
        userPaperID: ref.id,
      };
    } else {
      return {
        success: false,
        userPaperID: "",
      };
    }
  } catch (error) {
    console.log(error);
  }

  return {
    success: false,
    userPaperID: "",
  };
}

/**
 * @work delete userPaper table from database
 * @param {string} userPaperID
 */
async function deleteUserPaperData(id: string) {
  try {
    await deleteDoc(doc(db, "userPaper", id));
  } catch (error) {
    console.log(error);
  }
}

/**
 * @work  getting the select user paper data from firestore database
 * @param {string} id
 * @returns
 */
async function getSelectUserPaperData(id: string) {
  let data: any = {};
  try {
    console.log(id);

    let querySnapshot: any = await getDoc(doc(db, "userPaper", id));

    if (querySnapshot && querySnapshot.id) {
      data = { ...querySnapshot.data() };
    }
  } catch (error) {
    console.log(error);
  }

  return data;
}

async function appendUserPaperData(id: string, data: any) {
  try {
    if (id && typeof id !== "undefined" && Object.keys(data).length > 0) {
      await updateDoc(doc(db, "userPaper", id), data);
    }
  } catch (error) {
    console.log(error);
  }
}

async function checkPaperExecutionState(id: string) {
  /* 
  Possible values of paper_type

  - candidate => default state
  - declared => after declaring the paper on step 1
  - scoping => after declaration on step 2
  
  */
  try {
    const docRef = doc(db, "userPaper", id);
    let querySnapshot: any = await getDoc(docRef);

    if (querySnapshot && querySnapshot.id) {
      const paper_type = querySnapshot.data()?.paper_type;

      return paper_type;
    }
  } catch (error) {
    console.log(error);
  }

  return "";
}

export {
  existsEmail,
  getSelectUserPaperData,
  deleteUserPaperData,
  getUserPaperData,
  addUserPaperData,
  getUserData,
  existsWalletAddress,
  createDefaultUserPaperData,
  appendUserPaperData,
  checkPaperExecutionState,
};

/*

id => userPaperID
userID => userID

  
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
