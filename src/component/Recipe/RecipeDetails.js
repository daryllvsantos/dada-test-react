import api, { base } from "../../utils/service";
import { useParams, useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import RecipeIngredients from "./RecipeIngredients";
import RecipeDirections from "./RecipeDirections";
import "./RecipeDetails.css";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import {
  faCalendarDay,
  faPenToSquare,
  faBellConcierge,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecipeDetails() {
  let history = useHistory();
  const [recipesList, setRecipeList] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);
  const { uuid } = useParams();
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteUuid, setDeleteUuid] = useState();

  const getRecipes = async () => {
    try {
      await api.get(base + "/recipes/" + uuid).then((res) => {
        setRecipeList(res.data);
      });
      setApiLoaded(true);
    } catch (err) {
      if (err.response) {
        //not in the 200 response range
        console.log(err.respones.data);
        console.log(err.respones.status);
        console.log(err.respones.header);
      } else {
        console.log(`Error:  ${err.message}`);
      }
    }
  };

  //Delete

  const openDeleteModal = (deleteId) => {
    setDeleteModal(true);
    console.log(deleteModal);
    setDeleteUuid(deleteId);
  };
  const acceptDelete = () => {
    api
      .delete(`${base}/recipes/${deleteUuid}`)
      .then((res) => {
        history.push("/");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        console.log("error delete: ", error);
      });
  };

  const DeleteModalConfirm = (props) => {
    return (
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Delete Recipe?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this recipe?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={acceptDelete}>
            Yes
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  useEffect(() => {
    getRecipes();
  }, [uuid]);

  return (
    <div>
      <div className="row recipeDetails">
        <div className="col-sm-8">
          <div className="imgDetailsCard shadow-lg" key={recipesList.uuid}>
            <img
              src={
                recipesList.images
                  ? base + recipesList.images.full
                  : "/Spinner-1s-200px.gif"
              }
              className="img-fluid"
              alt="Food"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <div className="recipeDetailDes mt-3">
            <h2>{recipesList.title}</h2>
            <p className="postedon">
              <i>
                <FontAwesomeIcon icon={faCalendarDay} /> {recipesList.postDate}
              </i>
            </p>
            <p className="postedon">
              <i>
                <FontAwesomeIcon icon={faPenToSquare} /> {recipesList.editDate}
              </i>
            </p>
            <p className="postedon">
              <FontAwesomeIcon icon={faBellConcierge} /> {recipesList.servings}{" "}
              Servings{" | "} <FontAwesomeIcon icon={faClock} />{" "}
              {recipesList.cookTime + recipesList.prepTime} mins
            </p>
            <Button
              variant="danger"
              className="mt-2"
              onClick={() => openDeleteModal(recipesList.uuid)}
            >
              Delete Recipe
            </Button>
          </div>
        </div>
      </div>
      <div className="row recipeDetails">
        <div className="col-sm-12 col-md-7 ingredient__section">
          <h3>Ingredients</h3>
          <RecipeIngredients ingredients={recipesList.ingredients} />
        </div>
        <div className="col-sm-12 col-md-5 ingredient__section">
          <h3>Directions</h3>
          <RecipeDirections directions={recipesList.directions} />
        </div>
      </div>
      {!apiLoaded && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}

      <DeleteModalConfirm
        show={deleteModal}
        onHide={() => setDeleteModal(false)}
      />
    </div>
  );
}
export default RecipeDetails;
