import { useState, createContext, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import Web3 from "web3";
import config from "../config";
import { ethers } from "ethers";
import lensApi from "../api/lensApi";
import api from "../api";
import { knn3TokenValidState, currentProfileState } from "../store/state";
import { useRecoilState } from "recoil";
import { switchChain } from "../lib/tool";
import { LoadingOutlined } from "@ant-design/icons";
import useWeb3Modal from "../hooks/useWeb3Modal";

const actionMapping = [
  "Transaction being processed",
  "Transaction Success",
  "Transaction Failed",
];

export const Web3Context = createContext({
  web3: null,
  signer: null,
  chainId: null,
  networkId: null,
  blockNumber: null,
  account: null,
  connectWallet: async () => {
    return "";
  },
  resetWallet: async () => {},
  estimateGas: async () => {},
  signMessage: async (message) => {
    return "";
  },
  sendTx: async () => {},
  doLogin: async () => {},
  doLogout: async () => {},
});

export const Web3ContextProvider = ({ children }) => {
  const web3Modal = useWeb3Modal();
  const [web3, setWeb3] = useState("");
  const [signer, setSigner] = useState("");
  const [account, setAccount] = useState("");
  const [chainId, setChainId] = useState("");
  const [networkId, setnetworkId] = useState("");
  const [blockNumber, setBlockNumber] = useState("");
  const [knn3TokenValid, setKnn3TokenValid] =
    useRecoilState(knn3TokenValidState);
  const [currentProfile, setCurrentProfile] = useRecoilState(currentProfileState)

  const listenProvider = (provider) => {
    provider.on("close", () => {
      resetWallet();
    });
    provider.on("accountsChanged", async (accounts) => {
      setAccount(accounts[0]);
      localStorage.removeItem("knn3Token");
      localStorage.removeItem("knn3RefreshToken");
      api.defaults.headers.authorization = "";
      setKnn3TokenValid(false);
      setCurrentProfile('')
    });
    provider.on("chainChanged", (chainId) => {
      setChainId(parseInt(chainId, 16));
    });
  };

  const connectWallet = useCallback(async () => {
    try {
      const provider = await web3Modal.connect();

      await provider.enable();

      const web3Raw = new Web3(provider);
      setWeb3(web3Raw);

      // get account, use this variable to detech if user is connected
      const accounts = await web3Raw.eth.getAccounts();
      setAccount(accounts[0]);

      // get signer object
      const ethersProvider = new ethers.providers.Web3Provider(provider);

      const signerRaw = ethersProvider.getSigner();

      setSigner(signerRaw);

      // get network id
      setnetworkId(await web3Raw.eth.net.getId());

      // get chain id
      setChainId(await web3Raw.eth.getChainId());

      // init block number
      setBlockNumber(await web3Raw.eth.getBlockNumber());

      listenProvider(provider);

      switchChain(config.chainId)

      return accounts[0];
    } catch (error) {
      setWeb3(new Web3(config.provider));
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Modal]);

  useEffect(()=>{
    if(chainId !== config.chainId){
      switchChain(config.chainId)
    }
  }, [chainId])

  const resetWallet = useCallback(async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    setAccount("");
    await web3Modal.clearCachedProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Modal]);

  useEffect(() => {
    if (web3Modal && web3Modal.cachedProvider) {
      connectWallet();
    }
  }, [web3Modal]);

  const estimateGas = async (func, value = 0) => {
    try {
      const gas = await func.estimateGas({
        from: account,
        value,
      });
      return Math.floor(gas * 1.5);
    } catch (error) {
      console.log("eee", error);
      const objStartIndex = error.message.indexOf("{");
      const obj = JSON.parse(error.message.slice(objStartIndex));
      toast.error(obj.message);
    }
  };

  const doKnn3Login = async (message, signature) => {
    const res = await api.post("/auth/login", {
      message,
      signature,
    });
    if(!res){
      toast.error("You must have a lens handle");
      return
    }
    console.log('rssss', res)
    localStorage.setItem("knn3Token", res.data.accessToken);
    localStorage.setItem("knn3RefreshToken", res.data.refreshToken);
    api.defaults.headers.authorization = `Bearer ${res.data.accessToken}`;
    setKnn3TokenValid(true)
  };

  const doLogin = async () => {
    const challenge = (await lensApi.getChallenge(account || "")).challenge
      .text;
    const signature = await signMessage(challenge);

    await doKnn3Login(challenge, signature);

    const token = (await lensApi.getAccessToken(account, signature))
      .authenticate;
    console.log("token", token);
    localStorage.setItem("accessToken", token.accessToken);
    lensApi.setToken(token.accessToken);
  };

  const doLogout = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("knn3Token");
    localStorage.removeItem("knn3RefreshToken");
    api.defaults.headers.authorization = "";
    lensApi.removeToken();
    setKnn3TokenValid(false)
    resetWallet();
  };

  /**
   *
   * @param {*} func , required
   * @param {*} actionType , required
   * @param {*} value , default 0
   * @returns
   */

  const sendTx = async (func, value = 0) => {
    const gasLimit = await estimateGas(func, value);

    // gas price is necessary for matic
    const gasPrice = Number(await web3.eth.getGasPrice());

    if (!isNaN(gasLimit)) {
      return func
        .send({
          gas: gasLimit,
          gasPrice,
          from: account,
          value,
        })
        .on("transactionHash", (txnHash) => {
          toast.info(actionMapping[0], {
            icon: <LoadingOutlined />,
          });
        })
        .on("receipt", async (receipt) => {
          // const txnHash = receipt?.transactionHash;
          toast.success(actionMapping[1], {});
        })
        .on("error", async (err, txn) => {
          // const txnHash = txn?.transactionHash;

          if (err.code === 4001) {
            toast.error("User canceled action");
          } else {
            toast.error(actionMapping[2], {});
          }
        });
    }
  };

  /**
   * Sign message
   */

  const signMessage = async (message) => {
    return await web3.eth.personal.sign(message, account);
  };

  useEffect(() => {
    if (!account) {
      return;
    }
    const subscription = web3.eth.subscribe(
      "newBlockHeaders",
      (error, block) => {
        if (!error) {
          setBlockNumber(block.number);
        }
      }
    );

    return () => {
      subscription.unsubscribe((error, success) => {
        if (success) {
          console.log("Unsubscribed");
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    // connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Web3Context.Provider
      value={{
        web3,
        signer,
        chainId,
        networkId,
        account,
        blockNumber,
        connectWallet,
        resetWallet,
        estimateGas,
        sendTx,
        signMessage,
        doLogin,
        doLogout,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const Web3ContextConsumer = Web3Context.Consumer;
