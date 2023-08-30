const { InMemorySigner } = require("@taquito/signer");
const { TezosToolkit } = require("@taquito/taquito");


// async function initializeTezos() {
  const Tezos = new TezosToolkit("https://ghostnet.smartpy.io");
  const admin = async() => {await InMemorySigner.fromSecretKey(
    "edskRnT7i4kHKbJtznWi5KFjJ1y9HQoburPBVmBAebdxby5GUiTpm1KpwCkR7si4v7ofNUsNVfQ7nEuyruu2GaQh8MuJVgkWDF"
  )}

  Tezos.setProvider({
    signer: admin,
  });

  // const contract_stake = await Tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");
  // const contract_nft   = await Tezos.wallet.at("KT1MKeXcAXCKaJ1CffQnX1VPc3G8HZUyziaF");


  export async function wingame(uid, winner) {
    try {
      const contract_stake = await Tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");
      const op = await contract_stake.methods.wingame(uid, winner).send();
      console.log(`Hash: ${op.opHash}`);

      const result = await op.confirmation();
      console.log(result);

      if (result.completed) {
        console.log(`Transaction correctly processed!
          Block: ${result.block.header.level}
          Chain ID: ${result.block.chain_id}`);
        return true;
      } else {
        console.log("An error has occurred");
        return false;
      }
    } catch (err) {
      console.log("uid,winner",uid,winner,err);
      return false;
    }
  }

  export async function drawgame(uid) {
    try {
      const contract_stake = await Tezos.wallet.at("KT1JTQ3Af8CjkzA3V45hWHt5eZiwBCKJwpxN");
      const op = await contract_stake.methods.drawgame(uid).send();
      console.log(`Hash: ${op.opHash}`);

      const result = await op.confirmation();
      console.log(result);

      if (result.completed) {
        console.log(`Transaction correctly processed!
          Block: ${result.block.header.level}
          Chain ID: ${result.block.chain_id}`);
        return true;
      } else {
        console.log("An error has occurred");
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  // return { wingame, drawgame };
// }

// export default initializeTezos
