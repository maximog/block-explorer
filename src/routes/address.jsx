import { Alchemy, Utils } from "alchemy-sdk";
import { Link, useLoaderData } from "react-router-dom";
import { alchemy } from "./root";

export async function loader({ params }) {
  const balance = await alchemy.core.getBalance(params.address);
  const outgoingTxs = await alchemy.core.getAssetTransfers({
    fromAddress: params.address,
    maxCount: "0xf",
    excludeZeroValue: true,
    category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
  });
  const incomingTxs = await alchemy.core.getAssetTransfers({
    toAddress: params.address,
    maxCount: "0xf",
    excludeZeroValue: true,
    category: ["external", "internal", "erc20", "erc721", "erc1155", "specialnft"],
  });
  return { address: params.address, balance, outgoingTxs, incomingTxs };
}

export default function Address() {
  const { address, balance, outgoingTxs, incomingTxs } = useLoaderData();
  console.log(outgoingTxs);
  const txs = [...outgoingTxs.transfers, ...incomingTxs.transfers].sort(
    (a, b) => +b.blockNum.toString() - (+a.blockNum).toString()
  );
  console.log(address, txs);
  return (
    <div>
      <div>Address: {address}</div>
      <div>Balance {Utils.formatUnits(balance)} ETH</div>
      <div>Latest Transactions</div>

      <div className="container">
        <div className="row">
          <div className="col">Block</div>
          <div className="col">Hash</div>
          <div className="col">From</div>
          <div className="col">To</div>
          <div className="col">Value</div>
        </div>
        {txs.map((tx) => (
          <div className="row">
            <div className="col">
              <Link to={`/block/${tx.blockNum}`}> {parseInt(tx.blockNum)}</Link>
            </div>
            <div className="col">
              <Link to={`/tx/${tx.hash}`}> {tx.hash.substring(0, 20)}...</Link>
            </div>
            <div className="col">
              <Link to={`/address/${tx.from}`}> {tx.from.substring(0, 20)}...</Link>
            </div>
            <div className="col">
              <Link to={`/address/${tx.to}`}> {tx.to.substring(0, 20)}...</Link>
            </div>
            <div className="col">{tx.value || 0} ETH</div>
          </div>
        ))}
      </div>
    </div>
  );
}
