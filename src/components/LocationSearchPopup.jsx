import React, { useEffect, useState } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import GoogleMap from "./GoogleMap";

import { RxCross1 } from "react-icons/rx";
import { LuLocateFixed } from "react-icons/lu";
import { usePopContext } from "../hooks/PopupContextComponent";
import { useMapContext } from "./MapContextComponent";
import {
  getLocality,
  handleLocateMe,
  handlePlaceSelection,
} from "../utils/mapLogic";
import { useNavigate } from "react-router-dom";

const LocationSearchPopup = () => {
  const [hideAutoComplete, setHideAutoComplete] = useState(true);
  const { setIsLocationSearchPopup } = usePopContext();
  const { placeSelected, setPlaceSelected } = useMapContext();
  const navigate = useNavigate();
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  useEffect(() => {
    setValue((prev) => (prev = placeSelected.address));
  }, []);

  return (
    <div className="popup-container ">
      <form
        action=""
        className="locationPopup"
        onSubmit={(e) => {
          e.preventDefault();

          const { lat, lng, locality } = placeSelected;

          navigate(`/area/${locality}/${lat}/${lng}`);
        }}
      >
        <RxCross1
          onClick={(e) => {
            e.stopPropagation();
            setIsLocationSearchPopup(false);
          }}
        />

        <div className="locationForm-input">
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);

              setHideAutoComplete(false);
            }}
            required
            name="locateInput"
            placeholder="Street and Postal Code"
            type="text"
            disabled={!ready}
          />
          <a htmlFor="locateInput" className="placeholder">
            Your street and street number
          </a>

          {data.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setValue("");
              }}
            >
              <RxCross1 size={"20px"} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLocateMe(setPlaceSelected, setValue);
              }}
            >
              <LuLocateFixed size={"20px"} className="pink-icon" />
              <span>Locate me</span>
            </button>
          )}
        </div>
        {placeSelected && (
          <GoogleMap
            key={"LocationSearchPopup"}
            value={value}
            setValue={setValue}
          />
        )}
        <button className="btn btn-pink btn-lg" type="submit">
          Find Restaurant
        </button>

        {status === "OK" && !hideAutoComplete && (
          <ul className="locationForm-autocomplete locationPopup-autocomplete ">
            {data.map((item, index) => (
              <li
                onClick={() => {
                  setHideAutoComplete(true);
                  handlePlaceSelection(
                    item.description,
                    setIsLocationSearchPopup,
                    setPlaceSelected,
                    setValue,
                    clearSuggestions
                  );
                }}
                key={item.place_id}
              >
                {item.description}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default LocationSearchPopup;
