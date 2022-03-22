import React from "react";
import "./MakeDough.scss";

export default function MakeDough({ makeDough, approved, approveAll }) {
  function getButtons() {
    if (approved) {
      return (
        <>
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
