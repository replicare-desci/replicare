import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  // lightTheme,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { providers } from "ethers";
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

import { SiweMessage } from "siwe";

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
const domain = window.location.host;
const origin = window.location.origin;

export default function RainbowWallet() {
  const provider = new providers.Web3Provider(window.ethereum as any);

  async function createSiweMessage(address: string, statement: string) {
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nonce`, {
      // credentials: "include",
      method: "get",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
    });
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: 10,
      nonce: await res.text(),
    });
    return message.prepareMessage();
  }
  async function signInWithEthereum() {
    const signer = await provider.getSigner();

    const message = await createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    const signature = await signer.signMessage(message);

    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
      method: "POST",

      mode: "cors",

      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      },
      body: JSON.stringify({ message, signature }),
      credentials: "include",
    });
    console.log(await res.text());
  }

  const { store, setStore } = UserContext();

  const { address, isConnecting, isDisconnected } = useAccount();

  const { chain } = useNetwork();

  const signOutWallet = useCallback(() => {
    sessionStorage.clear();
    setStore((prev: any) => {
      return {
        ...prev,
        user: {
          // ...prev.user,
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

  const connectMetamaskWallet = useCallback(
    async (address: string) => {
      try {
        if (address !== undefined && chain?.unsupported !== undefined) {
          console.log("execution");

          const firebaseResponse = await getUserData(address, chain?.name);
          if (firebaseResponse.id) {
            return firebaseResponse;
          }
        }
      } catch (err) {
        console.log(err);
        alert(`Something went wrong: ${err}`);
      }
    },
    [chain?.name, chain?.unsupported]
  );

  useEffect(() => {
    if (
      address !== undefined &&
      store?.user?.walletAddress === ""
      // !store?.user?.walletAddress
    ) {
      console.log("line 166, useEffect");
      connectMetamaskWallet(address).then((resp) => {
        console.log("firebase: ", resp);

        if (resp?.walletAddress) {
          signInWithEthereum();
        }

        setStore((prev: any) => {
          return {
            ...prev,
            user: {
              walletAddress: resp?.walletAddress ? resp?.walletAddress : "",
              chain: resp?.chain ? resp?.chain : "",
              id: resp?.id ? resp?.id : "",
              isVerified: resp?.isVerified,
            },
          };
        });

        sessionStorage.setItem(
          "walletAddress",
          resp?.walletAddress ? resp?.walletAddress : ""
        );
        sessionStorage.setItem("chain", resp?.chain ? resp?.chain : "");
        sessionStorage.setItem("id", resp?.id ? resp?.id : "");

        sessionStorage.setItem(
          "isVerified",
          resp?.isVerified ? "true" : "false"
        );
      });

      if (isConnecting) {
        alert("connected");
      }
    }

    if (isDisconnected && store?.user?.walletAddress !== "") {
      signOutWallet();
    }
  }, [
    address,
    isConnecting,
    isDisconnected,
    connectMetamaskWallet,
    signOutWallet,
    store?.user?.walletAddress,
    setStore,
    signInWithEthereum,
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
          {/* <div>
            <button disabled={isLoading} onClick={() => signMessage()}>
              Sign message
            </button>
            {isSuccess && <div>Signature: {data}</div>}
            {isError && <div>Error signing message</div>}
          </div> */}

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
                          onClick={openConnectModal}
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
                            // signOutWallet();
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
