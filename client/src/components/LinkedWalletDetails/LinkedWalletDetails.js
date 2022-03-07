import React from "react";
import "./LinkedWalletDetails.scss";

export default function LinkedWalletDetails({ walletAddress }) {
  if (walletAddress) {
    return (
      <div className="wallet-details">
        <p className="bold">Linked Wallet</p> <p>{walletAddress}</p>
        <div className="wallet-details__columns">
          <div className="wallet-details__columns-column">
            <p>
              <span className="bold">Flour: </span>1
            </p>
            <p>
              <span className="bold">Salt: </span>2
            </p>
          </div>
          <div className="wallet-details__columns-column">
            <p>
              <span className="bold">Yeast: </span>4
            </p>
            <p>
              <span className="bold">Flour: </span>1
            </p>
          </div>
        </div>
        <p>
          <span className="bold">Dough: </span>1
        </p>
      </div>
    );
  } else {
    return <></>;
  }
}
