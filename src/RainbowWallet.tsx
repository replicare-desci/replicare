import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  // lightTheme,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import {
  metaMaskWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet,
  ledgerWallet,
  trustWallet,
  zerionWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  configureChains,
  createClient,
  WagmiConfig,
  useAccount,
  useNetwork,
} from "wagmi";
import { optimism, polygon } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import { useEffect, useCallback } from "react";
import { UserContext } from "./context/ContextProvider";
import { getUserData } from "./firebase/firebaseFunctions";
import { Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { authUserType } from "./types/context.d";

const { chains, provider } = configureChains(
  [optimism, polygon],
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
      zerionWallet({ chains }),

      trustWallet({ chains }),
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
  const { setStore } = UserContext();

  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain } = useNetwork();

  const handleUserData = useCallback(
    (userData: authUserType) => {
      // console.log("userData", userData);

      setStore((prev: any) => {
        return {
          ...prev,
          user: {
            ...prev.user,
            firstName: userData.firstName ? userData.firstName : "",
            lastName: userData.lastName ? userData.lastName : "",
            walletAddress: userData.walletAddress ? userData.walletAddress : "",
            chain: userData.chain ? userData.chain : "",
            emailID: userData.emailID ? userData.emailID : "",
            id: userData.id ? userData.id : "",
            isVerified: userData.isVerified ? "true" : "false",
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
      sessionStorage.setItem("chain", userData.chain ? userData.chain : "");
      sessionStorage.setItem(
        "emailID",
        userData.emailID ? userData.emailID : ""
      );
      sessionStorage.setItem("id", userData.id ? userData.id : "");

      sessionStorage.setItem(
        "isVerified",
        userData.isVerified ? "true" : "false"
      );
    },
    [setStore]
  );

  const signOutWallet = useCallback(() => {
    sessionStorage.clear();
    setStore((prev: any) => {
      return {
        ...prev,
        user: {
          firstName: "",
          lastName: "",
          walletAddress: "",
          emailID: "",
          id: "",
          isVerified: false,
        },
      };
    });
  }, [setStore]);

  const connectMetamaskWallet = useCallback(() => {
    try {
      // const currentProvider = detectCurrentProvider();
      // if (currentProvider) {
      //   await currentProvider.request({ method: "eth_requestAccounts" });
      //   const web3 = new Web3(currentProvider);
      //   const userAccount = await web3.eth.getAccounts();

      //   const account = userAccount[0];
      //   await web3.eth.personal
      //     .sign("Authentication", account, "test password")
      //     .then((resp) => console.log(resp))
      //     .catch((error) => console.log(error));

      //   await web3.eth.getBalance(account);
      // }
      if (address !== undefined && chain?.unsupported !== undefined) {
        console.log("Chain name 185", chain?.name);

        getUserData(address, chain?.name, handleUserData)
          .then((resp) => console.log(resp))
          .catch((error) => console.log(error));
      }
    } catch (err) {
      console.log(err);
      alert(`Something went wrong: ${err}`);
    }
  }, [address, chain?.name, chain?.unsupported, handleUserData]);

  useEffect(() => {
    if (address !== undefined) {
      connectMetamaskWallet();
    }

    if (isDisconnected) {
      signOutWallet();
    }
  }, [
    address,
    isConnecting,
    isDisconnected,
    connectMetamaskWallet,
    signOutWallet,
  ]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        initialChain={optimism}
        coolMode
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
                          // onChange={connectMetamaskWallet}
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
