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

import { useEffect, useCallback, useState, useMemo } from "react";
import { UserContext } from "./context/ContextProvider";
import { addUserData, getUserData } from "./firebase/firebaseFunctions";
import { Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { toast } from "react-toastify";

// import { SiweMessage } from "siwe";

// import { Buffer } from "buffer"; // Import the Buffer object

const { chains, provider } = configureChains(
  [optimism, polygon],
  [
    alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const popularWallets = [
  metaMaskWallet({ chains }),
  coinbaseWallet({ appName: "Replicare", chains }),
  rainbowWallet({
    projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
    chains,
  }),
  zerionWallet({ chains }),
  trustWallet({ chains }),
];

const otherWallets = [
  walletConnectWallet({
    projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
    chains,
  }),
  ledgerWallet({ chains }),
];

const connectors = connectorsForWallets([
  { groupName: "Popular", wallets: popularWallets },
  { groupName: "Others", wallets: otherWallets },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function RainbowWallet() {
  const provider = useMemo(
    () => new providers.Web3Provider(window.ethereum as any),
    []
  );

  const { store, setStore } = UserContext();
  const { address, isConnecting, isDisconnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  const { chain } = useNetwork();

  const [authState, setAuthState] = useState<boolean>(false);

  // async function createSiweMessage(wallAddress: string, statement: string) {
  //   try {
  //     let message;
  //     const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nonce`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });

  //     const newResponse: { status: boolean; data: string } = await res.json();
  //   } catch (error: any) {
  //     if (error) {
  //       console.log(error.message);
  //       alert("SIWE: " + error.message);
  //     }
  //   }

  //   return null;
  // }

  const signInWithEthereum = useCallback(async () => {
    try {
      const signer = provider.getSigner();
      if ((await signer.getAddress()).length === 42) {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/nonce`, {
          body: JSON.stringify({
            walletAddress: await signer.getAddress(),
            statement:
              "You are signing up your account with replicare, This will not trigger any transactions",
            domain: process.env.REACT_APP_FRONTEND_URL,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        const resJson: { status: boolean; data: string } = await res.json();

        if (resJson?.status && resJson?.data !== null) {
          const signature: string = await signer.signMessage(resJson?.data);
          console.log("message signature hash: ", signature);
          if (signature.length > 0) {
            const verifyRes = await fetch(
              `${process.env.REACT_APP_BACKEND_URL}/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ message: resJson?.data, signature }),
                // credentials: "include",
              }
            );

            const newVerifyRes: {
              status: boolean;
              data: string;
            } = await verifyRes.json();

            if (newVerifyRes.status) {
              return {
                type: "success",
                status: newVerifyRes.status,
                data: newVerifyRes.data,
              };
            }
          }
        }
      }
    } catch (error: any) {
      toast.error("User rejected signing");
      return { type: "error", userRejected: true };
    }
  }, [provider]);

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
  const connectMetamaskWallet = useCallback(
    async (address: string, chain: string) => {
      try {
        if (address !== undefined && chain !== undefined) {
          console.log("execution");

          // Check if the user data already exists in Firestore.
          const firebaseResponse = await getUserData(address);

          // If the user exists and has an id, return the user data.
          if (firebaseResponse?.id) {
            return firebaseResponse;
          } else {
            // If the user doesn't exist and the sign in is confirmed, add the user to Firestore.
            const signInResponse = await signInWithEthereum();

            // Only if sign-in is successful and not rejected by the user, add user to database
            if (!signInResponse?.userRejected && signInResponse?.status) {
              const newUserResponse = await addUserData(address, chain);
              if (newUserResponse?.id) {
                setAuthState(true);
                return newUserResponse;
              }
            }
          }
        }
      } catch (err: any) {
        console.log(err);
        alert(`Something went wrong: ${err}`);
      }
    },
    [signInWithEthereum]
  );

  useEffect(() => {
    if (
      address !== undefined &&
      store?.user?.walletAddress === "" &&
      chain?.name !== undefined // Check if chain?.name is not undefined
      // authState
    ) {
      console.log("line 166, useEffect");
      connectMetamaskWallet(address, chain.name).then((resp: any) => {
        // chain.name will be string here
        console.log("firebase: ", resp);

        if (resp?.walletAddress) {
          setStore((prev: any) => {
            return {
              ...prev,
              user: {
                walletAddress: resp?.walletAddress || "",
                chain: resp?.chain || "",
                id: resp?.id || "",
                isVerified: resp?.isVerified || false,
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
        }
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
    connectMetamaskWallet,
    isConnecting,
    isDisconnected,
    setStore,
    signInWithEthereum,
    signOutWallet,
    store?.user?.walletAddress,
    chain?.name,
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
