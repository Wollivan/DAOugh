import React from "react";
import "./HomeContent.scss";
import GreasePaper from "../../assets/documents/Pizza DAOugh Grease Paper v0.1.pdf";

export default function HomeContent() {
  return (
    <div className="home-content">
      <h2>Welcome to Dough DAO</h2>
      <p>Bringing pizza into the 21st century!</p>
      <p>
        (Make sure you're connecting on the <b>Goerli</b> network)
      </p>
      <br />
      <div className="home-content__button-wrap">
        <a
          className="button fixed-width-btn"
          href={GreasePaper}
          target="_blank"
          rel="noreferrer"
        >
          Read our grease paper
        </a>
        <a
          className="button fixed-width-btn"
          href="https://discord.gg/dyNrqv327w"
          target="_blank"
          rel="noreferrer"
        >
          Join our discord
        </a>
      </div>
    </div>
  );
}
