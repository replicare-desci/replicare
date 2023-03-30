import { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { getUserData } from "./firebase/firebaseFunctions";
import ConnectWalletPopUp from "./Components/ConnectWalletPopUp";
import { UserContext } from "./context/ContextProvider";
import MetamaskImage from "./assets/images/Metamask.png";
import WalletConnect from "./assets/images/WalletConnect.png";
// import "./styles/App.css";
// import WalletConnectProvider from "@maticnetwork/walletconnect-provider";

// import Web3 from "web3";
// import Matic from "maticjs";
function ConnectionWallet(): JSX.Element {
  const { store, setStore } = UserContext();

  // const maticProvider = new WalletConnectProvider({
  //   host: `https://rpc-mumbai.matic.today`,
  //   callbacks: {
  //     onConnect: console.log("connected"),
  //     onDisconnect: console.log("disconnected!"),
  //   },
  // });

  // const ropstenProvider = new WalletConnectProvider({
  //   host: `https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc`,
  //   callbacks: {
  //     onConnect: console.log("connected"),
  //     onDisconnect: console.log("disconnected"),
  //   },
  // });
  // const maticWeb3 = new Web3(maticProvider);
  // const ropstenWeb3 = new Web3(ropstenProvider);
  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  }, []);

  //Does the User have an Ethereum wallet/account?
  async function connectMetamaskWallet(): Promise<void> {
    //to get around type checking
    (window as any).ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts: string[]) => {
        setEthereumAccount(accounts[0]);

        // const getUserDataVar = getUserData(accounts[0]);
        // getUserDataVar.then((value) => {
        //   if (value === null) {
        //     console.log("User does not exist");
        //   } else {
        //     console.log("User exists", value);
        //   }
        // });

        // getuser data
        function handleUserData(userData: any) {
          console.log("userData", userData);

          setStore((prev) => {
            return {
              ...prev,
              user: {
                ...prev.user,
                firstName: userData.firstName,
                lastName: userData.lastName,
                walletAddress: userData.walletAddress,
                emailID: userData.emailID,
                id: userData.id,
                isVerified: userData.isVerified,
              },
            };
          });
          sessionStorage.setItem(
            "firstName",
            userData.firstName ? userData.firstName : ""
          );
          sessionStorage.setItem(
            "lastName",
            userData.lastName ? userData.lastName : ""
          );
          sessionStorage.setItem(
            "walletAddress",
            userData.walletAddress ? userData.walletAddress : ""
          );
          sessionStorage.setItem(
            "emailID",
            userData.emailID ? userData.emailID : ""
          );
          sessionStorage.setItem("id", userData.id ? userData.id : "");

          sessionStorage.setItem(
            "isVerified",
            userData.isVerified ? "true" : "false"
          );
        }
        getUserData(accounts[0], handleUserData);
      })

      .catch((error: any) => {
        alert(`Something went wrong: ${error}`);
      });
  }

  return (
    <div>
      {ethereumAccount !== null &&
      !!isMetamaskInstalled &&
      ethereumAccount.length > 0 ? (
        <Button
          variant="outlined"
          aria-disabled={true}
          sx={{
            backgroundColor: "#222629",
            textTransform: "unset",
            ":hover": {
              bgcolor: "#222629",
              color: "white",
            },
          }}
          onClick={connectMetamaskWallet}
        >
          {ethereumAccount.slice(0, 6) + ".." + ethereumAccount.slice(38, 42)}
        </Button>
      ) : isMetamaskInstalled && ethereumAccount === null ? (
        <Grid container flexDirection={"column"} justifyContent={"center"}>
          <Grid item>
            <Button
              variant="contained"
              aria-disabled={true}
              sx={{
                backgroundColor: "#ffffff",
                mt: 1,

                width: 200,
                height: 50,
                ":hover": {
                  bgcolor: "#ffffff",
                  // color: "white",
                },
              }}
              onClick={connectMetamaskWallet}
            >
              <img src={MetamaskImage} alt="metamask connect" width={"100%"} />
              {/* Connect */}
              {/* {<ConnectWalletPopUp />} */}
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              aria-disabled={true}
              sx={{
                backgroundColor: "#ffffff",
                mt: 1,

                width: 200,
                height: 50,
                ":hover": {
                  bgcolor: "#ffffff",
                  // color: "white",
                },
              }}
              onClick={connectMetamaskWallet}
            >
              <img src={WalletConnect} alt="Wallet connect" width={"100%"} />
              {/* Connect */}
              {/* {<ConnectWalletPopUp />} */}
            </Button>
          </Grid>
        </Grid>
      ) : (
        <p>Please install wallet</p>
      )}
      {/* {store.user.walletAddress.length > 0 ? (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "primary.main",
            textTransform: "unset",

            ":hover": {
              bgcolor: "#222629",
              color: "white",
            },
          }}
          onClick={() => {
            sessionStorage.clear();
            setEthereumAccount(null);
            setStore((prev) => {
              return {
                ...prev,
                user: {
                  ...prev.user,
                  firstName: "",
                  lastName: "",
                  walletAddress: "",
                  emailID: "",
                  id: "",
                  isVerified: false,
                },
              };
            });
          }}
        >
          Disconnect
        </Button>
      ) : null} */}
    </div>
  );
}

export default ConnectionWallet;
