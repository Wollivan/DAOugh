import React from "react";
import "./MakeDough.scss";
import saltIcon from "../../assets/icons/salt.png";
import yeastIcon from "../../assets/icons/yeast.png";
import waterIcon from "../../assets/icons/water.png";
import flourIcon from "../../assets/icons/flour.png";
import doughIcon from "../../assets/icons/dough.png";

export default function MakeDough({ makeDough, approved, approveAll }) {
  function getButtons() {
    if (approved) {
      return (
        <>
          <p>
            You may need to wait until the 4 approval requests have gone
            through.
          </p>
          <button className="button" onClick={makeDough}>
            Make Dough!
          </button>
        </>
      );
    } else {
      return (
        <>
          <button className="button" onClick={approveAll}>
            Approve transfer from contracts before you can make dough
          </button>
        </>
      );
    }
  }

  return (
    <div className="make-dough">
      <h3>Turn your ingredients (tokens) into dough (tokens)</h3>
      <div className="make-dough__icons">
        <img src={flourIcon} className="make-dough__icons-item" />
        <span className="make-dough__icons-item">+</span>
        <img src={saltIcon} className="make-dough__icons-item" />
        <span className="make-dough__icons-item">+</span>
        <img src={yeastIcon} className="make-dough__icons-item" />
        <span className="make-dough__icons-item">+</span>
        <img src={waterIcon} className="make-dough__icons-item" />
      </div>
      <div className="make-dough__dough">
        =
        <img src={doughIcon} className="make-dough__dough-item" />
      </div>
      <p>
        This button will take 1 of each of the ingredient tokens (Flour Water
        Salt Yeast) and give you a Dough Token. The first time you use this
        button you will be added to the DAOugh, meaning you can participate in
        voting and suggesting transactions
      </p>

      {getButtons()}
    </div>
  );
}
