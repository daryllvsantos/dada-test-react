import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import NewDirections from "./NewDirections";
import NewIngredients from "./NewIngredients";
import axios from "axios";
import moment from "moment";
import { base } from "../../utils/service";

function RecipeForm(props) {
  const ADD_RECIPE = base + "/recipes";
  const [modalBhv, setModalBhv] = useState(true);
  const [loading, setLoading] = useState(false);

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredDescription, setEnteredDescription] = useState("");
  const [enteredServings, setEnteredServings] = useState();
  const [enteredPrepTime, setEnteredPrepTime] = useState();
  const [enteredCookTime, setEnteredCookTime] = useState();
  const [enteredIngredients, setEnteredIngredients] = useState([]);
  const [enteredDirections, setEnteredDirections] = useState([]);
  //validation
  const [validated, setValidated] = useState(false);
  const [ingredientsCheck, setIngredientsCheck] = useState(false);
  const [directionssCheck, setDirectionsCheck] = useState(false);

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  const servingsChangeHandler = (event) => {
    setEnteredServings(event.target.value);
  };
  const preparationChangeHandler = (event) => {
    setEnteredPrepTime(event.target.value);
  };
  const cookingChangeHandler = (event) => {
    setEnteredCookTime(event.target.value);
  };
  const handleOnIngredientChange = (ingredients) => {
    setEnteredIngredients(ingredients);
    // console.log("handleOnIngredientChange", ingredients);
  };
  const handleonDirectionsChange = (directions) => {
    setEnteredDirections(directions);
    // console.log("handleonDirectionsChange", directions);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    enteredDirections.map((d) => {
      if (d.instructions) {
        setDirectionsCheck(1);
      }
    });

    enteredIngredients.map((i) => {
      if (i.name && i.amount) {
        setIngredientsCheck(1);
      }
    });

    let required_fields =
      enteredTitle &&
      enteredDescription &&
      enteredServings &&
      enteredPrepTime &&
      enteredCookTime &&
      ingredientsCheck &&
      directionssCheck;

    if (required_fields) {
      // setModalBhv(false);
      // props.onModalBhv(modalBhv);
      console.log("required " + required_fields);
      addRecipe();
    } else {
      console.log("required" + required_fields);
      console.log(validated);
      console.log("validity " + form.checkValidity());
    }

    setValidated(true);
  };
  const addRecipe = async () => {
    setLoading(true);
    const enteredData = {
      uuid: uuidv4(),
      title: enteredTitle,
      description: enteredDescription,
      images: {
        full: "",
        medium: "",
        small: "",
      },
      servings: enteredServings,
      prepTime: enteredPrepTime,
      cookTime: enteredCookTime,
      postDate: moment(new Date()).format("DD/MM/YYYY HH:mm:ss A"),
      editDate: moment(new Date()).format("DD/MM/YYYY HH:mm:ss A"),
      ingredients: enteredIngredients,
      directions: enteredDirections,
    };
    try {
      const response = await axios.post(
        ADD_RECIPE,
        JSON.stringify(enteredData),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      console.log(JSON.stringify(response));
      setModalBhv(false);
      setLoading(false);
      props.onModalBhv(modalBhv);
      setTimeout(() => {
        window.location.reload();
      }, 600);
    } catch (err) {
      if (!err?.response) {
        console.log("no server response");
      }
      console.log(err.message);
    }
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <Form.Label className="mb-1">Title</Form.Label>
            <Form.Control type="text" onChange={titleChangeHandler} required />
            <Form.Control.Feedback type="invalid">
              Please enter recipe name.
            </Form.Control.Feedback>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="mb-1">Descriptions</label>
            <textarea
              onChange={descriptionChangeHandler}
              className="form-control"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter short description.
            </Form.Control.Feedback>
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
              required
            />
            <Form.Control.Feedback type="invalid">
              Please number of servings.
            </Form.Control.Feedback>
          </div>
          <div className="col">
            <Form.Label className="mb-1">Preparation</Form.Label>
            <br />
            <i>Enter number/minutes</i>
            <Form.Control
              type="number"
              min="1"
              onChange={preparationChangeHandler}
              required
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
              required
            />
          </div>
        </div>
        <NewIngredients onIngredientsChange={handleOnIngredientChange} />
        <NewDirections onDirectionsChange={handleonDirectionsChange} />
        <hr />
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={loading && "disabled"}
        >
          {loading && (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!loading && "Add Recipe"}
        </Button>
      </Form>
    </div>
  );
}

export default RecipeForm;
