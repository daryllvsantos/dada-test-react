import "./RecipeFilter.css";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RecipeFilter({ search, setSearch }) {
  const titleFilterChangeHandler = (event) => {
    setSearch(event.target.value);
    console.log(event.target.value);
  };

  return (
    <div>
      <input
        className="fixSearch"
        type="text"
        onChange={titleFilterChangeHandler}
        value={search}
        placeholder="Search"
      />
    </div>
  );
}

export default RecipeFilter;
