import React from "react";
import "./LinkWallet.scss";

export default function LinkWallet({ ethereum, handleLinkWallet }) {
  return (
    <div className="link-wallet">
      <button className="link-wallet__button button" onClick={handleLinkWallet}>
        Link Wallet to interact with the Dough DAO
      </button>
    </div>
  );
}
