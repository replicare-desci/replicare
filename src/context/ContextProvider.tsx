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
  var firstNameLocal = localStorage.getItem("firstName");
  var lastNameLocal = localStorage.getItem("lastName");
  var walletAddressLocal = localStorage.getItem("walletAddress");
  var emailIDLocal = localStorage.getItem("emailID");
  var idLocal = localStorage.getItem("id");
  var isVerifiedLocal = localStorage.getItem("isVerified");

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
