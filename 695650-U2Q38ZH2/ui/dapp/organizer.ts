import { InMemorySigner } from "@taquito/signer";
import { TezosToolkit } from "@taquito/taquito";

const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");

Tezos.setProvider({
  signer: await InMemorySigner.fromSecretKey(
    "edskRnT7i4kHKbJtznWi5KFjJ1y9HQoburPBVmBAebdxby5GUiTpm1KpwCkR7si4v7ofNUsNVfQ7nEuyruu2GaQh8MuJVgkWDF"
  ),
});

export async function initiateGame(uid) {
  Tezos.wallet
    .at("KT1Ww7TuAfLRTMFL3dnFHeDpwPC7VxhYoKTJ")
    .then((contract) => contract.methods.initiate_game(uid).send())
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

export async function wingame(uid, winner) {
  Tezos.wallet
    .at("KT1Ww7TuAfLRTMFL3dnFHeDpwPC7VxhYoKTJ")
    .then((contract) => contract.methods.wingame(uid, winner).send())
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

export async function drawgame(uid) {
  Tezos.wallet
    .at("KT1Ww7TuAfLRTMFL3dnFHeDpwPC7VxhYoKTJ")
    .then((contract) => contract.methods.drawgame(uid).send())
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
