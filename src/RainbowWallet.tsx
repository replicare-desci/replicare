import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  lightTheme,
  connectorsForWallets,
  useConnectModal,
  useAccountModal,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useState, useEffect } from "react";
import { UserContext } from "./context/ContextProvider";
import Web3 from "web3";
import { getUserData } from "./firebase/firebaseFunctions";
import { Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const newWindow: any = window as any;

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ appName: "Replicare", chains }),
      rainbowWallet({
        projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
        chains,
      }),
    ],
  },
  {
    groupName: "Others",
    wallets: [
      walletConnectWallet({
        projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
        chains,
      }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function RainbowWallet() {
  const { openAccountModal } = useAccountModal();

  const { openConnectModal } = useConnectModal();

  const { store, setStore } = UserContext();

  const [isMetamaskInstalled, setIsMetamaskInstalled] =
    useState<boolean>(false);

  useEffect(() => {
    if (newWindow.ethereum) {
      //check if Metamask wallet is installed
      setIsMetamaskInstalled(true);
    }
    // if (openAccountModal !== undefined) {
    //   openAccountModal();
    // }
  }, []);

  function detectCurrentProvider() {
    let provider;

    if (newWindow.ethereum) {
      provider = newWindow.ethereum;
    } else if (newWindow.web3) {
      provider = newWindow.web3.currentProvider;
    } else {
      console.log("Non-ethereum browser detected. You should install Metamask");
    }
    return provider;
  }

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

  function signOutWallet() {
    sessionStorage.clear();
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
  }

  async function connectMetamaskWallet(): Promise<void> {
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();

        const account = userAccount[0];
        await web3.eth.personal
          .sign("Authentication", account, "test password")
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));

        await getUserData(account, handleUserData);

        await web3.eth.getBalance(account);
      }
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err}`);
    }
  }

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#EFECEC",
          accentColorForeground: "black",
          borderRadius: "medium",
          fontStack: "rounded",
        })}
      >
        <div>
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                    style: {
                      opacity: 0,
                      pointerEvents: "none",
                      userSelect: "none",
                    },
                  })}
                >
                  {(() => {
                    if (!connected) {
                      return (
                        <Button
                          sx={{
                            color: "primary.main",

                            backgroundColor: "#EFECEC",
                            paddingX: 3,
                            textTransform: "unset",
                            fontSize: 16,
                            fontWeight: "800",
                            borderRadius: 2,
                            transition: "all 100ms ease-in-out",

                            ":hover": {
                              backgroundColor: "#EFECEC",
                              transform: "scale(1.02)",
                            },
                          }}
                          variant="contained"
                          onClick={(event: any) => {
                            openConnectModal();
                            connectMetamaskWallet();
                            console.log(event.target, account, chain, ready);
                          }}
                        >
                          👤 Sign in
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button
                          sx={{
                            color: "primary.main",

                            backgroundColor: "#EFECEC",
                            paddingX: 3,
                            textTransform: "unset",
                            fontSize: 16,
                            fontWeight: "800",
                            borderRadius: 2,
                            transition: "all 100ms ease-in-out",

                            ":hover": {
                              backgroundColor: "#EFECEC",
                              transform: "scale(1.02)",
                            },
                          }}
                          variant="contained"
                          onClick={openChainModal}
                        >
                          ❌ Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div style={{ display: "flex", gap: 12 }}>
                        <Button
                          onClick={openChainModal}
                          onChange={connectMetamaskWallet}
                          sx={{
                            color: "primary.main",

                            backgroundColor: "#FFFFFF",
                            paddingX: 2,
                            textTransform: "unset",
                            fontSize: 16,
                            fontWeight: "800",
                            borderRadius: 2,
                            transition: "all 100ms ease-in-out",

                            ":hover": {
                              backgroundColor: "#FFFFFF",
                              transform: "scale(1.02)",
                            },
                          }}
                          variant="contained"
                        >
                          {chain.hasIcon && (
                            <div
                              style={{
                                background: chain.iconBackground,
                                width: 24,
                                height: 24,
                                borderRadius: 999,
                                overflow: "hidden",
                                marginRight: 4,
                              }}
                            >
                              {chain.iconUrl && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  style={{ width: 24, height: 24 }}
                                />
                              )}
                            </div>
                          )}
                          {chain.name} <ExpandMore fontSize="medium" />
                        </Button>

                        <Button
                          onClick={() => {
                            openAccountModal();
                            signOutWallet();
                          }}
                          sx={{
                            color: "primary.main",

                            backgroundColor: "#FFFFFF",
                            paddingX: 3,
                            textTransform: "unset",
                            fontSize: 16,
                            fontWeight: "800",
                            borderRadius: 2,
                            transition: "all 100ms ease-in-out",

                            ":hover": {
                              backgroundColor: "#FFFFFF",
                              transform: "scale(1.02)",
                            },
                          }}
                          variant="contained"
                        >
                          {account.displayName}
                          {account.displayBalance
                            ? ` (${account.displayBalance})`
                            : ""}
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
