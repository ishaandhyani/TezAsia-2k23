import {char2Bytes} from "@taquito/utils";
import { pinataWrapper } from "./pinata";


async function mintPawn(player){
    const image = "ipfs://bafybeigdx6g5674rloq477um25u6jtka4bz43zue6amz62yhbgdxckneba";
    const type = "pawn";

    const metadata = await pinataWrapper(player, type , image)
    const ipfs = metadata.Ipfs
    console.log(ipfs);
    
    const data = {
      '':char2Bytes("ipfs://" + ipfs)
    }
    const send = {
      'to_':player,
      'metadata':data
    }
    var arr = [send]
    
    try {
      await mint(arr)
    } catch (error) {
      console.log(error)
    }
    
  }

  async function mint(batch){
    try {
      console.log("inside mint")
      const op = await contract_nft.methods.mint(batch).send();
      await op.confirmation(1);
    } catch (err) {
      throw err;
    }
  }