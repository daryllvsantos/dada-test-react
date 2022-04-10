import "./RecipeDirections.css";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecipeDirections(props) {
  let stepCounter = 0;
  return (
    <div className="borderedDetails shadow-lg">
      <ul className="instructionsList">
        {props.directions ? (
          props.directions.map((dir) => {
            return (
              <div>
                <h4>Step {(stepCounter = stepCounter + 1)}</h4>
                <li key={dir.instructions}>
                  <FontAwesomeIcon icon={faCircleCheck} className="checkList" />{" "}
                  {dir.instructions}{" "}
                  {dir.optional ? (
                    <span className="badge rounded-pill">Optional</span>
                  ) : (
                    ""
                  )}{" "}
                </li>
              </div>
            );
          })
        ) : (
          <li>Loading...</li>
        )}
      </ul>
    </div>
  );
}

export default RecipeDirections;
