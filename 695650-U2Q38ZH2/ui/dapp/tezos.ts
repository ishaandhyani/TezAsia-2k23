import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");

const options = {
  name: "MyAwesomeDapp",
  iconUrl: "https://tezostaquito.io/img/favicon.svg",
  preferredNetwork: NetworkType.GHOSTNET,
};

const wallet = new BeaconWallet(options);

Tezos.setWalletProvider(wallet);

export async function connectWallet() {
  await wallet.requestPermissions({ network: { type: NetworkType.GHOSTNET } });
}

export const getAccount = async () => {
  const connectedWallet = await wallet.client.getActiveAccount();
  if (connectedWallet) {
    return connectedWallet.address;
  } else {
    return "";
  }
};

export const disconnect = async () => {
  wallet.clearActiveAccount();
};

export async function addplayer1(uid) {
  const amountToSend = 5;
  Tezos.wallet
    .at("KT1NCsViFm14q3JQFSGXDEEvC5vWNSZACjPX")
    .then((contract) =>
      contract.methods.add_player1(uid).send({ amount: amountToSend })
    )
    .then((op) => {
      console.log(`Hash: ${op.opHash}`);
      return op.confirmation();
    })
    .then((result) => {
      console.log(result);
      if (result.completed) {
        console.log(`Transaction correctly processed!
      Block: ${result.block.header.level}
      Chain ID: ${result.block.chain_id}`);
      } else {
        println("An error has occurred");
      }
    })
    .catch((err) => console.log(err));
}

export async function addplayer2(uid) {
  const amountToSend = 5;
  Tezos.wallet
    .at("KT1NCsViFm14q3JQFSGXDEEvC5vWNSZACjPX")
    .then((contract) =>
      contract.methods.add_player2(uid).send({ amount: amountToSend })
    )
    .then((op) => {
      console.log(`Hash: ${op.opHash}`);
      return op.confirmation();
    })
    .then((result) => {
      console.log(result);
      if (result.completed) {
        console.log(`Transaction correctly processed!
      Block: ${result.block.header.level}
      Chain ID: ${result.block.chain_id}`);
      } else {
        println("An error has occurred");
      }
    })
    .catch((err) => console.log(err));
}
