import React from "react";
import "./RecipeItem.css";
import { base } from "../../utils/service";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBellConcierge,
  faStopwatch,
} from "@fortawesome/free-solid-svg-icons";

function RecipeItem(props) {
  return (
    <div>
      <Link to={`/recipe/${props.uuid}`}>
        <div className="imgContainer" key={props.uuid}>
          <img
            className="card-img-top"
            src={
              props.image.length > 0
                ? base + props.image
                : "https://via.placeholder.com/250"
            }
            alt="Food"
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className="iconInfo">
            <FontAwesomeIcon icon={faBellConcierge} /> Servings:{" "}
            {props.servings} <FontAwesomeIcon icon={faStopwatch} /> Time:{" "}
            {props.prepTime + props.cookTime} mins
          </p>
        </div>
      </Link>
    </div>
  );
}
export default RecipeItem;
