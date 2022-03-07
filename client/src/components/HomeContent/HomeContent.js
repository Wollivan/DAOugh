import React from "react";
import "./HomeContent.scss";

export default function HomeContent() {
  return (
    <div className="home-content">
      <h2>Welcome to Dough DAO</h2>
      <p>
        The Dough DAO (DAOugh) was created to bring together all people who love
        to create pizza, and who love to create innovative web3 technologies.{" "}
      </p>
      <div className="home-content__button-wrap">
        <a
          className="button fixed-width-btn"
          href="#"
          target="_blank"
          rel="noreferrer"
        >
          Read our grease paper
        </a>
        <a
          className="button fixed-width-btn"
          href="#"
          target="_blank"
          rel="noreferrer"
        >
          Join our discord
        </a>
      </div>
    </div>
  );
}
