import React, { useEffect, useState } from "react";
import api, { base } from "../../utils/service";
import Popover from "react-bootstrap/Popover";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./RecipeSpecial.css";

function RecipeSpecial(props) {
  const [searchSpecial, setSearchSpecial] = useState("");
  const [specialList, setSpecialList] = useState("");

  useEffect(() => {
    const getSpecial = async () => {
      try {
        await api
          .get(base + "/specials?ingredientId=" + props.id)
          .then((res) => {
            setSpecialList(res.data);
          });
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
    getSpecial();
  }, []);

  return (
    <div className="badge rounded-pill popover__wrapper">
      {specialList ? (
        specialList.map((special) => {
          return (
            <span>
              <i key={special.ingredientId}>
                Special Offer <FontAwesomeIcon icon={faExclamation} />
              </i>
              <div className="popover__content">
                <h4>{special.title}</h4>
                <p>{special.text}</p>
                {special.geo && (
                  <a
                    href={
                      "https://www.google.com/maps/search/?api=1&query=" +
                      special.geo
                    }
                    target="_blank"
                  >
                    Locate
                  </a>
                )}
              </div>
            </span>
          );
        })
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RecipeSpecial;
