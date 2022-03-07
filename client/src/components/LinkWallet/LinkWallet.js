import React from "react";
import "./LinkWallet.scss";

export default function LinkWallet({ ethereum, handleLinkWallet }) {
  console.log(ethereum);

  return (
    <div className="link-wallet">
      <button className="link-wallet__button button" onClick={handleLinkWallet}>
        Link Wallet
      </button>
    </div>
  );
}
