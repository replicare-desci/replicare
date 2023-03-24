import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { app, auth } from "../firebase/firebase";
import { ContextInterface, ContextType } from "../types/context.d";

// initialize the store and setStore values
const defaultState: ContextInterface = {
  store: {
    user: {
      firstName: "",
      lastName: "",
      walletAddress: "",
      emailID: "",
      id: "",
      isVerified: false,
    },
  },

  setStore: (): void => {},
};

export const ContextDefault = createContext(defaultState);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  var firstNameLocal = sessionStorage.getItem("firstName");
  var lastNameLocal = sessionStorage.getItem("lastName");
  var walletAddressLocal = sessionStorage.getItem("walletAddress");
  var emailIDLocal = sessionStorage.getItem("emailID");
  var idLocal = sessionStorage.getItem("id");
  var isVerifiedLocal = sessionStorage.getItem("isVerified");

  const [store, setStore] = useState<ContextType>({
    user: {
      firstName: firstNameLocal || "",
      lastName: lastNameLocal || "",
      walletAddress: walletAddressLocal || "",
      emailID: emailIDLocal || "",
      id: idLocal || "",
      isVerified: isVerifiedLocal === "true" ? true : false,
    },
  });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
    });
  }, []);

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
