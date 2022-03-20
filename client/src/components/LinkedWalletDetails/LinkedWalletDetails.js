import React from "react";
import "./LinkedWalletDetails.scss";

export default function LinkedWalletDetails({ walletAddress, balances }) {
  if (walletAddress) {
    return (
      <div className="wallet-details">
        <p className="bold">Linked Wallet</p> <p>{walletAddress}</p>
        <div className="wallet-details__columns">
          <div className="wallet-details__columns-column">
            <p>
              <span className="bold">Flour: </span>
              {balances.flour}
            </p>
            <p>
              <span className="bold">Water: </span>
              {balances.water}
            </p>
          </div>
          <div className="wallet-details__columns-column">
            <p>
              <span className="bold">Salt: </span>
              {balances.salt}
            </p>
            <p>
              <span className="bold">Yeast: </span>
              {balances.yeast}
            </p>
          </div>
        </div>
        <p>
          <span className="bold">DAOugh: </span>
          {balances.dough}
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}
