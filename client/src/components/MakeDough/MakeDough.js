import React from "react";
import "./MakeDough.scss";

export default function MakeDough() {
  return (
    <div className="make-dough">
      <button className="button">Make Dough!</button>
      <p>
        This button will take 1 of each of the ingredient tokens (Flour Water
        Salt Yeast) and give you a Dough Token. The first time you use this
        button you will be added to the DAOugh, meaning you can participate in
        voting and suggesting transactions
      </p>
    </div>
  );
}
