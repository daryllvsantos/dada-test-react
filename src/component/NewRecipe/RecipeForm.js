import React, { useState } from "react";
import { Form } from "react-bootstrap";
import NewDirections from "./NewDirections";
import NewIngredients from "./NewIngredients";

function RecipeForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredServings, setEnteredServings] = useState();
  const [enteredPrepTime, setEnteredPrepTime] = useState();
  const [enteredCookTime, setEnteredCookTime] = useState();
  const [enteredIngredients, setEnteredIngredients] = useState([]);
  const [enteredDirections, setEnteredDirections] = useState([]);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const servingsChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const preparationChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const cookingChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const handleOnIngredientChange = (ingredients) => {
    setEnteredIngredients(ingredients);
    console.log('handleOnIngredientChange', ingredients)
  }
  const handleonDirectionsChange = (directions) => {
    setEnteredIngredients(directions);
    console.log('handleonDirectionsChange', directions)
  }

  return (
    <div>
      <Form onSu>
        <div className="row mb-3">
          <div className="col">
            <Form.Label className="mb-1">Title</Form.Label>
            <Form.Control type="text" onChange={titleChangeHandler} />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="mb-1">Descriptions</label>
            <textarea
              onChange={descriptionChangeHandler}
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <Form.Label className="mb-1">Servings</Form.Label>
            <br />
            <i>Enter number/minutes</i>
            <Form.Control
              type="number"
              min="1"
              onChange={servingsChangeHandler}
            />
          </div>
          <div className="col">
            <Form.Label className="mb-1">Preparation</Form.Label>
            <br />
            <i>Enter number/minutes</i>
            <Form.Control
              type="number"
              min="1"
              onChange={preparationChangeHandler}
            />
          </div>
          <div className="col">
            <Form.Label className="mb-1">Cooking Time</Form.Label>
            <br />
            <i>Enter number/minutes</i>
            <Form.Control
              type="number"
              min="1"
              onChange={cookingChangeHandler}
            />
          </div>
        </div>
        <NewIngredients onIngredientsChange={ handleOnIngredientChange }/>
        <NewDirections onDirectionsChange={ handleonDirectionsChange } />
      </Form>
    </div>
  );
}

export default RecipeForm;
