import React from "react";
import "./HomeContent.scss";

export default function HomeContent() {
  return (
    <div className="home-content">
      <h2>Welcome to Dough DAO</h2>
      <p>dfkuhgjdsfgkadjhfkldv fgdfg dfg dfg</p>
      <div className="home-content__button-wrap">
        <a className="button" href="#" target="_blank" rel="noreferrer">
          Read our white paper
        </a>
        <a className="button" href="#" target="_blank" rel="noreferrer">
          Join our discord
        </a>
      </div>
    </div>
  );
}
