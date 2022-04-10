import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./NewIngredients.css";

function NewIngredients(props) {
  const [IngredientFields, setIngredientField] = useState([
    {
      uuid: Math.random(),
      amount: "",
      measurement: "",
      name: "",
    },
  ]);

  const addIngredientHandler = () => {
    setIngredientField([
      ...IngredientFields,
      { uuid: Math.random(), amount: 0, measurement: "", name: "" },
    ]);
  };

  const removeIngredientHandler = (index) => {
    const i = [...IngredientFields];
    i.splice(index, 1);
    setIngredientField(i);
  };
  console.log(IngredientFields);
  return (
    <div className="ingredient__section">
      <hr />
      <h4>Add Ingredients</h4>
      {IngredientFields.map((field, index) => (
        <div className="row mb-3" key={index}>
          <div className="col">
            <Form.Label className="mb-1">Name</Form.Label>
            <Form.Control type="text" />
          </div>
          <div className="col">
            <Form.Label className="mb-1">Amount</Form.Label>
            <Form.Control type="number" min="1" />
          </div>
          <div className="col">
            <Form.Label className="mb-1">Measurement</Form.Label>
            <Form.Control type="text" />
          </div>
          <div className="col">
            {IngredientFields.length - 1 === index && (
              <Button
                variant="success"
                className="ingredient-btn"
                onClick={addIngredientHandler}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            )}
            {IngredientFields.length !== 1 && (
              <Button
                variant="danger"
                className="ingredient-btn"
                onClick={removeIngredientHandler}
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

export default NewIngredients;
