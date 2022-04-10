import React, { useState } from "react";
import "./NewRecipe.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-bootstrap";
import RecipeForm from "./RecipeForm.js";

function NewRecipe() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <button className="fixAdd" onClick={handleShow}>
        <FontAwesomeIcon icon={faPlus} />
      </button>

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RecipeForm onModalBhv={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default NewRecipe;
