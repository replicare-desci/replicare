import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../firebase/firebase";
import { ContextInterface, ContextType } from "../types/context.d";

// initialize the store and setStore values
const defaultState: ContextInterface = {
  store: {
    user: {
      firstName: "",
      lastName: "",
      walletAddress: "",
      chain: "",
      emailID: "",
      id: "",
      isVerified: false,
    },
  },

  setStore: (): void => {},
};

export const ContextDefault = createContext(defaultState);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  let firstNameLocal = sessionStorage.getItem("firstName");
  let lastNameLocal = sessionStorage.getItem("lastName");
  let walletAddressLocal = sessionStorage.getItem("walletAddress");
  let chainLocal = sessionStorage.getItem("chain");
  let emailIDLocal = sessionStorage.getItem("emailID");
  let idLocal = sessionStorage.getItem("id");
  let isVerifiedLocal = sessionStorage.getItem("isVerified");

  const [store, setStore] = useState<ContextType>({
    user: {
      firstName: firstNameLocal || "",
      lastName: lastNameLocal || "",
      walletAddress: walletAddressLocal || "",
      chain: chainLocal || "",
      emailID: emailIDLocal || "",
      id: idLocal || "",
      isVerified: isVerifiedLocal === "true" ? true : false,
    },
  });

  // FIXME: uncomment after research for multiple output consoles and states
  // useEffect(() => {
  //   auth.onAuthStateChanged((user) => {
  //     console.log("Firebase state", user);
  //   });
  // }, []);

  return (
    <ContextDefault.Provider value={{ store, setStore }}>
      {children}
    </ContextDefault.Provider>
  );
};

export default ContextProvider;
export const UserContext = () => {
  return useContext(ContextDefault);
};
