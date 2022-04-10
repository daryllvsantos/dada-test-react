import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./NewDirections.css";

function NewDirections(props) {
  let directionCounter = 0;
  const [directionFields, setDirectionField] = useState([
    {
      instructions: "",
      optional: false,
    },
  ]);

  const addDirectionHandler = () => {
    setDirectionField([
      ...directionFields,
      { instructions: "", optional: false },
    ]);
  };

  const removeDirectionHandler = (index) => {
    const i = [...directionFields];
    i.splice(index, 1);
    setDirectionField(i);
  };

  console.log(directionFields);
  return (
    <div className="direction__section">
      <hr />
      <h4>Add Direction</h4>
      {directionFields.map((field, index) => (
        <div className="row mb-3" key={index}>
          <div className="col">
            <Form.Label className="mb-1">
              Step {(directionCounter += 1)}
            </Form.Label>
            <Form.Control type="text" />
          </div>
          <div className="col">
            <Form.Check
              className="optionSwitch"
              type="switch"
              label="Optional?"
            />
          </div>
          <div className="col">
            {directionFields.length - 1 === index && (
              <Button
                variant="success"
                className="direction-btn"
                onClick={addDirectionHandler}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            )}
            {directionFields.length !== 1 && (
              <Button
                variant="danger"
                className="direction-btn"
                onClick={removeDirectionHandler}
              >
                <FontAwesomeIcon icon={faMinus} />
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewDirections;
