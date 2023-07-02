import { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import { getUserData } from "./firebase/firebaseFunctions";
import { UserContext } from "./context/ContextProvider";
import MetamaskImage from "./assets/images/Metamask.png";
import WalletConnect from "./assets/images/WalletConnect.png";
import Web3 from "web3";

// import { use } from "@maticnetwork/maticjs";
// import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
// import {
//   auth,
//   resolver,
//   protocol,
//   loaders,
//   circuits,
// } from "@iden3/js-iden3-auth";
// install web3 plugin
// use(Web3ClientPlugin);

// import "./styles/App.css";
// import WalletConnectProvider from "@maticnetwork/walletconnect-provider";

// import Web3 from "web3";
// import Matic from "maticjs";

// this variable provides type safety for window object
const newWindow: any = window as any;

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
    if (newWindow.ethereum) {
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
  }, []);

  const detectCurrentProvider = () => {
    let provider;

    if (newWindow.ethereum) {
      provider = newWindow.ethereum;
    } else if (newWindow.web3) {
      provider = newWindow.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  };

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
    sessionStorage.setItem("emailID", userData.emailID ? userData.emailID : "");
    sessionStorage.setItem("id", userData.id ? userData.id : "");

    sessionStorage.setItem(
      "isVerified",
      userData.isVerified ? "true" : "false"
    );
  }

  async function connectMetamaskWallet(): Promise<void> {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();

        const account = userAccount[0];
        const signatureHash = await web3.eth.personal
          .sign("Authentication", account, "test password")
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));

        await getUserData(account);

        let ethBalance = await web3.eth.getBalance(account);
        setEthereumAccount(account);
      }
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err}`);
    }
  }

  return (
    <div>
      {ethereumAccount !== null &&
      !!isMetamaskInstalled &&
      ethereumAccount.length > 0 ? null : isMetamaskInstalled && // </Button> //   {ethereumAccount.slice(0, 6) + ".." + ethereumAccount.slice(38, 42)} // > //   onClick={connectMetamaskWallet} //   }} //     }, //       color: "white", //       bgcolor:"primary.dark" //     ":hover": { //     textTransform: "unset", //     mt: 3, //     backgroundcolor:"primary.dark" //   sx={{ //   aria-disabled={true} //   variant="outlined" // <Button
        ethereumAccount === null ? (
        <Grid
          container
          marginBottom={5}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Grid item>
            <Button
              variant="contained"
              aria-disabled={true}
              sx={{
                backgroundColor: "primary.light",
                // mt: 1,

                width: 200,
                height: 50,
                ":hover": {
                  bgcolor: "primary.light",
                  // color: "white",
                },
              }}
              onClick={connectMetamaskWallet}
            >
              <img src={MetamaskImage} alt="metamask connect" width={"100%"} />
              {/* Connect */}
              {/* {<ConnectWalletPopUp />} */}
            </Button>
            {/* <ConnectButton />; */}
          </Grid>
          <Grid item mt={1}>
            <Button
              variant="contained"
              aria-disabled={true}
              sx={{
                backgroundColor: "primary.light",
                mt: 1,

                width: 200,
                height: 50,
                ":hover": {
                  bgcolor: "primary.light",
                  // color: "white",

                  // opacity: 0.7,
                },
              }}
              disabled
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
              bgcolor:"primary.dark"
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
