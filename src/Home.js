import React, { useEffect, useState } from "react";
import api, { base } from "./utils/service";
import RecipesList from "./component/Recipe/RecipesList";

function Home() {
  const [recipesList, setRecipesList] = useState([]);
  const [apiLoaded, setApiLoaded] = useState(false);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        await api.get(base + "/recipes").then((res) => {
          setRecipesList(res.data);
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
    getRecipes();
  }, []);

  return (
    <div className="home">
      {apiLoaded && <RecipesList items={recipesList} />}

      {!apiLoaded && (
        <div className="loading">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
}

export default Home;
