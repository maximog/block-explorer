import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";
import { SETTINGS } from "../constants/constants";

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(SETTINGS);

function Root() {
  const [blockNumber, setBlockNumber] = useState();
  const [blocks, setBlocks] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
      // setBlock(await alchemy.core.getBlock());
    }

    getBlockNumber();
  });

  useEffect(() => {
    if (!blockNumber) return;
    async function getBlocks(latestBlock) {
      let latestBlocks = [];
      for (let index = latestBlock - 9; index <= latestBlock; index++) {
        const block = await alchemy.core.getBlockWithTransactions(index);
        console.log(block);
        latestBlocks.push(block);
      }
      setBlocks(latestBlocks.sort((a, b) => b.number - a.number));
      setIsLoaded(true);
    }

    !isLoaded && getBlocks(blockNumber);
  }, [blockNumber, isLoaded]);

  console.log(blocks);

  return (
    <>
      <div className="App">Block Number: {blockNumber}</div>
      <div className="d-flex">
        <div className="d-flex flex-column w-50 border rounded p-3">
          <div className="align-self-center">Latest Blocks</div>
          <div className="d-flex flex-column">
            {blocks.map((block) => (
              <div className="d-flex justify-content-between" key={block.number}>
                <div>
                  <Link to={`block/${Utils.hexlify(block.number)}`}>{block.number}</Link>
                </div>
                <div>
                  <Link to={`txs/${block.number}`}>{block.transactions.length} txs</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex flex-column w-50 border rounded p-3">
          <div className="align-self-center">Latest Transactions</div>
          <div className="container">
            {blocks[0]?.transactions
              .filter((tx, i) => i <= 9)
              .map((tx) => (
                <div className="row" key={tx.nonce}>
                  <div className="col-1">Tx</div>
                  <div className="col">
                    <Link to={`tx/${tx.hash}`}>{tx.hash.substring(0, 8)}...</Link>
                  </div>
                  <div className="col">
                    From: <Link to={`address/${tx.from}`}>{tx.from.substring(0, 8)}...</Link>
                  </div>
                  <div className="col">
                    To: <Link to={`address/${tx.to}`}>{tx.to.substring(0, 8)}...</Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
