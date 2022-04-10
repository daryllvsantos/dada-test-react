import React, { useState } from "react";
import RecipeItem from "./RecipeItem";
import RecipeFilter from "./RecipeFilter";
import NewRecipe from "../NewRecipe/NewRecipe";

function RecipesList(props) {
  const [searchRecipe, setSearchRecipe] = useState("");

  const filteredRecipes = props.items.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchRecipe.toLowerCase())
  );
  return (
    <div className="row">
      <div className="utilities">
        <RecipeFilter search={searchRecipe} setSearch={setSearchRecipe} />
        <NewRecipe />
      </div>
      {filteredRecipes.map((recipe) => {
        return (
          <div
            key={recipe.uuid}
            className="col-sm-12 col-md-6 col-lg-6 d-flex align-items-stretch mb-4"
          >
            <div className="recipeCard card h-100 shadow-lg">
              <RecipeItem
                title={recipe.title}
                description={recipe.description}
                image={recipe.images.medium}
                servings={recipe.servings}
                prepTime={recipe.prepTime}
                cookTime={recipe.cookTime}
                uuid={recipe.uuid}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default RecipesList;
