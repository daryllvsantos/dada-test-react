import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import "./NewIngredients.css";

function NewIngredients(props) {
  const [IngredientFields, setIngredientField] = useState([
    {
      uuid: uuidv4(),
      amount: 0,
      measurement: "",
      name: "",
    },
  ]);

  const addIngredientHandler = () => {
    setIngredientField([
      ...IngredientFields,
      { uuid: uuidv4(), amount: 0, measurement: "", name: "" },
    ]);
  };

  const removeIngredientHandler = (index) => {
    const i = [...IngredientFields];
    i.splice(index, 1);
    setIngredientField(i);
  };

  const handleInputChange = (event) => {
    const uuid = event.target.attributes.dataid.value;
    const name = event.target.name;
    const val = event.target.value;
    const newIngredients = IngredientFields.map((ingredient) =>
      ingredient.uuid === uuid ? { ...ingredient, [name]: val } : ingredient
    );

    setIngredientField(newIngredients);
  };

  useEffect(() => {
    props.onIngredientsChange(IngredientFields);
  }, [IngredientFields]);

  return (
    <div className="ingredient__section">
      <hr />
      <h4>Add Ingredients</h4>
      {IngredientFields.map((field, index) => (
        <div className="row mb-3" key={index}>
          <div className="col">
            <Form.Label className="mb-1">Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={handleInputChange}
              dataid={field.uuid}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please add ingredients.
            </Form.Control.Feedback>
          </div>
          <div className="col">
            <Form.Label className="mb-1">Amount</Form.Label>
            <Form.Control
              type="number"
              min="1"
              name="amount"
              onChange={handleInputChange}
              dataid={field.uuid}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please add ingredients amount.
            </Form.Control.Feedback>
          </div>
          <div className="col">
            <Form.Label className="mb-1">Measurement</Form.Label>
            <Form.Control
              type="text"
              name="measurement"
              onChange={handleInputChange}
              dataid={field.uuid}
            />
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
