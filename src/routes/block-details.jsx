import { Utils } from "alchemy-sdk";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import { alchemy } from "./root";

export async function loader({ params }) {
  const block = await alchemy.core.getBlock(params.blockNumber);
  return { block };
}

export default function BlockDetails() {
  const { block } = useLoaderData();
  const navigation = useNavigation();

  return (
    <div>
      {navigation.state === "loading" ? (
        "Loading..."
      ) : (
        <div>
          <div>Block #{block.number}</div>
          <div>Overview</div>
          <div className="row">
            <div className="col-3">Block</div>
            <div className="col-9">{block.number}</div>
          </div>
          <div className="row">
            <div className="col-3">Timestamp</div>
            <div className="col-9">{block.timestamp}</div>
          </div>
          <div className="row">
            <div className="col-3">Transactions</div>
            <div className="col-9">{block.transactions.length}</div>
          </div>
          <div className="row">
            <div className="col-3">Miner</div>
            <div className="col-9">
              <Link to={`/address/${block.miner}`}> {block.miner}</Link>
            </div>
          </div>
          <div className="row">
            <div className="col-3">Gas Used</div>
            <div className="col-9">{Utils.formatUnits(block.gasUsed, "wei")}</div>
          </div>
          <div className="row">
            <div className="col-3">Gas Limit</div>
            <div className="col-9">{Utils.formatUnits(block.gasLimit, "wei")}</div>
          </div>
          <div className="row">
            <div className="col-3">Base Fee Per Gas</div>

            <div className="col-9">{Utils.formatEther(block.baseFeePerGas)}</div>
          </div>
          <div className="row">
            <div className="col-3">Extra Data</div>
            <div className="col-9">{block.extraData}</div>
          </div>
          <div className="row">
            <div className="col-3">Hash</div>
            <div className="col-9">{block.hash}</div>
          </div>
          <div className="row">
            <div className="col-3">Parent Hash</div>
            <div className="col-9">{block.parentHash}</div>
          </div>
          <div className="row">
            <div className="col-3">Nonce</div>
            <div className="col-9">{parseInt(block.nonce)}</div>
          </div>
          <div className="row">
            <div className="col-3">Difficulty</div>
            <div className="col-9">{block.difficulty}</div>
          </div>
        </div>
      )}
    </div>
  );
}
