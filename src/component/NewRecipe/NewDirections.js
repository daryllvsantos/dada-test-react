import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./NewDirections.css";

function NewDirections(props) {
  let directionCounter = 0;
  const [directionFields, setDirectionField] = useState([
    {
      uuid: uuidv4(),
      instructions: "",
      optional: false,
    },
  ]);

  const addDirectionHandler = () => {
    setDirectionField([
      ...directionFields,
      { uuid: uuidv4(), instructions: "", optional: false },
    ]);
  };

  const removeDirectionHandler = (index) => {
    const i = [...directionFields];
    i.splice(index, 1);
    setDirectionField(i);
  };

  const handleInputChange = (event) => {
    const uuid = event.target.attributes.dataid.value;
    const val = event.target.value;
    const newDirections = directionFields.map((direction) =>
      direction.uuid === uuid ? { ...direction, instructions: val } : direction
    );

    setDirectionField(newDirections);
  };

  const handleSwitchChange = (event) => {
    const uuid = event.target.attributes.dataid.value;
    const val = event.target.checked;
    const newDirections = directionFields.map((direction) =>
      direction.uuid === uuid ? { ...direction, optional: val } : direction
    );

    setDirectionField(newDirections);
  };

  useEffect(() => {
    props.onDirectionsChange(directionFields);
  }, [directionFields]);
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
            <Form.Control
              type="text"
              name="step"
              onChange={handleInputChange}
              dataid={field.uuid}
              required
            />
          </div>
          <div className="col">
            <Form.Check
              className="optionSwitch"
              type="switch"
              label="Optional?"
              name="step"
              onChange={handleSwitchChange}
              dataid={field.uuid}
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
