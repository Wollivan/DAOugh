import React from "react";
import "./LinkedWalletDetails.scss";
import saltIcon from "../../assets/icons/salt.png";
import yeastIcon from "../../assets/icons/yeast.png";
import waterIcon from "../../assets/icons/water.png";
import flourIcon from "../../assets/icons/flour.png";
import doughIcon from "../../assets/icons/dough.png";

export default function LinkedWalletDetails({
  walletAddress,
  balances,
  getBalances,
}) {
  if (walletAddress) {
    return (
      <div className="wallet-details">
        <p className="bold">Linked Wallet</p> <p>{walletAddress}</p>
        <div className="wallet-details__columns">
          <div className="wallet-details__columns-column">
            <div className="wallet-details__wrap">
              <img className="wallet-details__icon" src={flourIcon} />
              <p>
                <span className="bold">Flour: </span>
                {balances.flour}
              </p>
            </div>
            <div className="wallet-details__wrap">
              <img className="wallet-details__icon" src={waterIcon} />
              <p>
                <span className="bold">Water: </span>
                {balances.water}
              </p>
            </div>
          </div>
          <div className="wallet-details__columns-column">
            <div className="wallet-details__wrap">
              <img className="wallet-details__icon" src={saltIcon} />
              <p>
                <span className="bold">Salt: </span>
                {balances.salt}
              </p>
            </div>
            <div className="wallet-details__wrap">
              <img className="wallet-details__icon" src={yeastIcon} />
              <p>
                <span className="bold">Yeast: </span>
                {balances.yeast}
              </p>
            </div>
          </div>
        </div>
        <div className="wallet-details__wrap">
          <img className="wallet-details__icon" src={doughIcon} />
          <p>
            <span className="bold">DAOugh: </span>
            {balances.dough}
          </p>
        </div>
        <button className="button" onClick={getBalances}>
          Reveal ingredient balances
        </button>
      </div>
    );
  } else {
    return <></>;
  }
}
