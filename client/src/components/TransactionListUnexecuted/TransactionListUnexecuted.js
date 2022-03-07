import React from "react";
import "./TransactionListUnexecuted.scss";

export default function TransactionListUnexecuted() {
  return (
    <>
      <article className="transaction-list__item">
        <h4 className="transaction-list__item-title">
          Transaction ID 0x6ab5d439c76f
        </h4>
        <div className="transaction-list__item-details">
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">
              Recipient
            </p>
            <p className="transaction-list__item-details-item-value">
              0x29133fgeab1b1....
            </p>
          </div>
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">Token</p>
            <p className="transaction-list__item-details-item-value">Flour</p>
          </div>
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">Amount</p>
            <p className="transaction-list__item-details-item-value">1</p>
          </div>
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">Votes</p>
            <p className="transaction-list__item-details-item-value">1/6</p>
          </div>
        </div>
        <div className="transaction-list__item-button-wrap">
          <button className="button--primary">Approve</button>
        </div>
      </article>
      <article className="transaction-list__item">
        <h4 className="transaction-list__item-title">
          Transaction ID 0x6ab5d439c76f
        </h4>
        <div className="transaction-list__item-details">
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">
              Recipient
            </p>
            <p className="transaction-list__item-details-item-value">
              0x29133fgeab1b1....
            </p>
          </div>
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">Token</p>
            <p className="transaction-list__item-details-item-value">Flour</p>
          </div>
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">Amount</p>
            <p className="transaction-list__item-details-item-value">1</p>
          </div>
          <div className="transaction-list__item-details-item">
            <p className="transaction-list__item-details-item-title">Votes</p>
            <p className="transaction-list__item-details-item-value">3/6</p>
          </div>
        </div>
        <div className="transaction-list__item-button-wrap">
          <button className="button--primary">Approve</button>
        </div>
      </article>
    </>
  );
}
