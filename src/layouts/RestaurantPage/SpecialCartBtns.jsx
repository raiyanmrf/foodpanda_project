import React, { useContext, useEffect, useState } from "react";
import { LiaMinusSolid, LiaPlusSolid } from "react-icons/lia";
import { useParams } from "react-router-dom";
import { cartContext } from "../../hooks/CartContext";
import {
  handleDecreaseItem,
  findProduct,
  getSimilarProducts,
  handleAddNewProduct,
  handleShallowDecreasing,
} from "../../utils/cartLogic";
import { MdOutlineDelete } from "react-icons/md";

const SpecialCartBtns = ({ item }) => {
  const { restaurantID } = useParams();
  const {
    cartItems,
    setCartItems,
    sideItems,
    setIsItemPopupActive,
    setCurrentItem,
  } = useContext(cartContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const args = [cartItems, setCartItems, item, restaurantID, sideItems];

  useEffect(() => {
    let id; // Declare `id` here to avoid undefined issues

    if (isExpanded) {
      id = setTimeout(() => {
        setIsExpanded(false); // Collapse after 1 second
      }, 3000);
    }

    return () => {
      if (id) {
        clearTimeout(id); // Clear timeout when effect cleans up
      }
    };
  }, [isExpanded]);

  const handleAdd = (e) => {
    e.stopPropagation();

    if (item.required) {
      setCurrentItem(item);
      setIsItemPopupActive(true);
    } else handleAddNewProduct(...args);
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    console.log("handleRemove");

    handleShallowDecreasing(cartItems, setCartItems, item, restaurantID);
  };

  const product = getSimilarProducts(cartItems, item);

  if (product.length > 0) {
    const count = product.reduce((sum, item) => sum + item.count, 0);
    const removeIcon = count === 1 ? <MdOutlineDelete /> : <LiaMinusSolid />;
    return (
      <div className={`specialCartBtns ${isExpanded && "bg-color"}`}>
        {isExpanded ? (
          <>
            <button onClick={handleRemove}>{removeIcon}</button>
            <p className="specialCartBtns-count">{count}</p>
            <button onClick={handleAdd}>{<LiaPlusSolid />}</button>
          </>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(true);
            }}
            style={{ backgroundColor: "darkgray" }}
          >
            <p style={{ color: "black" }} className="specialCartBtns-count">
              {count}
            </p>
          </button>
        )}
      </div>
    );
  }
  return (
    <div className="specialCartBtns">
      <button onClick={handleAdd}>
        <LiaPlusSolid />
      </button>
    </div>
  );
};

export default SpecialCartBtns;
