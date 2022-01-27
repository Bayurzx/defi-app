import React, {useState} from "react";
// import { Dropdown } from 'react-bootstrap';
import bootstrap from "bootstrap";
import tether from "../tether.png";
import Airdrop from "./Airdrop";

// import icon from "../icon.jpg";

const Main = (props) => {
  const [tokens, setTokens] = useState(0)
  return (
    <div>
      <div className="mt-3" id="content">
        <table style={{ opacity: "0.9" }} className="table text-muted text-center">
          <thead>
            <tr style={{ color: "black" }}>
              <th scope="col">Staking Balance</th>
              <th scope="col">Reward Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ color: "black" }}>
              <td>{ props.stakingBalance.toString() } USDT</td>
              <td>{ props.rewardBalance } Reward</td>
            </tr>
          </tbody>
        </table>
        <div className="mb-2" style={{ opacity: "0.9" }}>
          <form className="mb-3">
            <div className="" style={{ borderSpacing: "0.1em" }}>
              <label className="float-start" style={{ marginLeft: "15px" }}>
                <b>Stake Tokens </b>
              </label>
              <span className="float-end" style={{ marginRight: "8px" }}>
                Balance: {props.tetherBalance}
              </span>
              <div className="input-group mb-4">
                <input
                  type="text"
                  placeholder="0"
                  onChange={e => setTokens(props.toWei(e.target.value))}
                  required
                />
                <div className="input-group-open">
                  <div className="input-group-text">
                    <img src={tether} width="30px" height="20px" alt="tether" />
                    &nbsp; USDT
                  </div>
                </div>
              </div>
              <div className="d-grid gap-2">
                <button onClick={() => props.stakeTokens(tokens)} type="" className="btn btn-primary btn-block btn-lg">
                  DEPOSIT
                </button>
              </div>
            </div>
          </form>
              <div className="d-grid gap-2">
            <button onClick={() => props.unStakeTokens()} type="" className="btn btn-primary btn-block btn-lg">
                  WITHDRAW
                </button>
              </div>
          <div className="card-body text-center">
            Airdrop 
            <Airdrop stakingBalance={props.stakingBalance} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
