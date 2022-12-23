import { Utils } from "alchemy-sdk";
import { Link, useLoaderData } from "react-router-dom";
import { alchemy } from "./root";

export async function loader({ params }) {
  const transaction = await alchemy.core.getTransaction(params.txHash);
  return { transaction };
}

export default function TxDetails() {
  const { transaction } = useLoaderData();
  console.log(transaction);

  return (
    <div>
      <div>Transaction: {transaction.hash}</div>
      <div>
        Block:
        <Link to={`/block/${transaction.blockNumber}`}>{transaction.blockNumber}</Link>
      </div>
      <div>
        From:
        <Link to={`/address/${transaction.from}`}>{transaction.from}</Link>
      </div>
      <div>
        To:
        <Link to={`/address/${transaction.to}`}>{transaction.to}</Link>
      </div>
      <div>Confirmations: {transaction.confirmations}</div>
      <div>Value: {Utils.formatUnits(transaction.value)} ETH</div>
      <div>Gas Price: {Utils.formatUnits(transaction.gasPrice)} ETH </div>
      <div>Gas Limit: {Utils.formatUnits(transaction.gasLimit) * 10 ** 18} </div>
    </div>
  );
}
