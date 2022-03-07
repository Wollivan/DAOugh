import React from "react";
import "./LinkedWalletDetails.scss";

export default function LinkedWalletDetails({ walletAddress }) {
  if (walletAddress) {
    return (
      <div className="wallet-details">
        <p className="bold">Linked Wallet</p> <p>{walletAddress}</p>
      </div>
    );
  } else {
    return <></>;
  }
}
