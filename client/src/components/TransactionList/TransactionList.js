import React from "react";
import "./TransactionList.scss";

export default function TransactionList({ transactions, confirmTransaction }) {
  if (transactions) {
    return (
      <>
        {transactions.map((transaction, i) => {
          let tokenAddress = transaction[0];
          let amount = transaction[1];
          let status = transaction[2];
          //let recipient = transaction[3];
          let statusOutput = "";
          if (status) {
            return (
              <article className="transaction-list__item" key={i}>
                <h4 className="transaction-list__item-title">
                  Transaction ID {i}
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
                    <p className="transaction-list__item-details-item-title">
                      Token
                    </p>
                    <p className="transaction-list__item-details-item-value">
                      {tokenAddress ==
                      "0xA39e6Eb9F0147C3d21B37D81af67bbc92884c29e"
                        ? "Salt"
                        : ""}
                      {tokenAddress ==
                      "0x1E11Baac21D7ACBE2d1d9C8ad0F9C91058F387aa"
                        ? "Water"
                        : ""}
                      {tokenAddress ==
                      "0xA97405b41C389bC0feDD6d54D2ddB4fD34F8035c"
                        ? "Flour"
                        : ""}
                      {tokenAddress ==
                      "0xadc57A558674F6CEcEfcC2C6Eb26e90CFbE11603"
                        ? "Yeast"
                        : ""}
                    </p>
                  </div>
                  <div className="transaction-list__item-details-item">
                    <p className="transaction-list__item-details-item-title">
                      Amount
                    </p>
                    <p className="transaction-list__item-details-item-value">
                      1
                    </p>
                  </div>
                  {/* <div className="transaction-list__item-details-item">
                    <p className="transaction-list__item-details-item-title">
                      Votes
                    </p>
                    <p className="transaction-list__item-details-item-value">
                      1/6
                    </p>
                  </div> */}
                </div>
                <div className="transaction-list__item-button-wrap">
                  <button className="button--disabled">Approved</button>
                </div>
              </article>
            );
          } else {
            return (
              <article className="transaction-list__item" key={i}>
                <h4 className="transaction-list__item-title">
                  Transaction ID {i}
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
                    <p className="transaction-list__item-details-item-title">
                      Token
                    </p>
                    <p className="transaction-list__item-details-item-value">
                      Flour
                    </p>
                  </div>
                  <div className="transaction-list__item-details-item">
                    <p className="transaction-list__item-details-item-title">
                      Amount
                    </p>
                    <p className="transaction-list__item-details-item-value">
                      1
                    </p>
                  </div>
                  {/* <div className="transaction-list__item-details-item">
                    <p className="transaction-list__item-details-item-title">
                      Votes
                    </p>
                    <p className="transaction-list__item-details-item-value">
                      1/6
                    </p>
                  </div> */}
                </div>
                <div className="transaction-list__item-button-wrap">
                  <button
                    className="button--primary"
                    onClick={() => confirmTransaction(i)}
                  >
                    Approve
                  </button>
                </div>
              </article>
            );
          }
        })}
      </>
    );
  } else {
    return "loading";
  }
}
