import "./RecipeIngredients.css";
import React from "react";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RecipeSpecial from "./RecipeSpecial";

function RecipeIngredients(props) {
  return (
    <div className="borderedDetails shadow-lg">
      <table className="table bordered hover ingredientsTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Measurement</th>
          </tr>
        </thead>
        <tbody>
          {props.ingredients ? (
            props.ingredients.map((ind) => {
              return (
                <tr key={ind.uuid}>
                  <td>
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="checkList"
                    />{" "}
                    {ind.name} <RecipeSpecial id={ind.uuid} />
                  </td>
                  <td className="text-center">{ind.amount}</td>
                  <td className="text-center">{ind.measurement}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default RecipeIngredients;
