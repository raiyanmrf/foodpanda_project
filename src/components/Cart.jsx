import { orderedItem, suggestItems } from "../assets/data/foodData";
import { FaBackward, FaForward } from "react-icons/fa6";
import { LiaMinusSolid, LiaPlusSolid } from "react-icons/lia";
import { MdOutlineDelete } from "react-icons/md";
import { CiForkAndKnife } from "react-icons/ci";
import { useContext, useState } from "react";
import useSlideRef from "../hooks/useSlideRef";
import pandaCart from "../assets/images/logo/pandaCart.png";

import { RxCross1 } from "react-icons/rx";
import EmptyCart from "../layouts/RestaurantPage/EmptyCart";
import { cartContext } from "../hooks/CartContext";
import {
  handleAddToCart,
  handleDecreaseItem,
  handleRemoveItem,
} from "../utils/cartLogic";
import { useParams } from "react-router-dom";
import Slider from "./Slider";

const Cart = () => {
  const { isCartEmpty, showCart, setShowCart, cartItems, setCartItems } =
    useContext(cartContext);

  const { restaurantID } = useParams();
  const [isActive, setIsActive] = useState(true);
  const [isCutlery, setIsCutlery] = useState(true);
  const [itemsRefs, handleToggleNext, handleTogglePrev, index] = useSlideRef(
    suggestItems.length
  );
  if (isCartEmpty) {
    return <EmptyCart />;
  }

  return (
    <>
      <section className={`cart ${!showCart && "hide-cart"}`}>
        <header>
          <h3>Momo Miah</h3>
          <figure
            onClick={(e) => {
              e.stopPropagation();
              setShowCart(false);
            }}
          >
            <RxCross1 />
          </figure>
        </header>
        <section className="cart-content">
          <div className="cart-tabs">
            <button
              onClick={() => setIsActive(true)}
              className={`${isActive && "btn-active"}`}
            >
              Delivery
              {isActive && <p>Standard (25-30min)</p>}
            </button>
            <button
              onClick={() => setIsActive(false)}
              className={`${!isActive && "btn-active"}`}
            >
              Pick Up
              {!isActive && <p>Standard (25-30min)</p>}
            </button>
          </div>
          <article className="cart-items">
            <h4>Your Items</h4>
            {cartItems.items.map((product, index) => (
              <article key={index} className="cart-singleItem">
                <figure className="cart-order-info">
                  <img
                    src={product.image}
                    alt="item"
                    height={`46px`}
                    width={`56px`}
                  />

                  <summary className="cart-order-text">
                    <p className="title-ellipsis">{product.name}</p>
                    <p className="title-ellipsis">Extra Cheese..</p>
                    <div className="cart-order-update">
                      <p>{product.price}</p>

                      <div className="cart-order-update-btn">
                        <figure
                          onClick={(e) => {
                            e.stopPropagation();
                            product.count < 2
                              ? handleRemoveItem(
                                  cartItems,
                                  setCartItems,
                                  product,
                                  restaurantID
                                )
                              : handleDecreaseItem(
                                  cartItems,
                                  setCartItems,
                                  product,
                                  restaurantID
                                );
                          }}
                        >
                          {product.count < 2 ? (
                            <MdOutlineDelete />
                          ) : (
                            <LiaMinusSolid />
                          )}
                        </figure>
                        <span>{product.count}</span>
                        <figure
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(
                              cartItems,
                              setCartItems,
                              product,
                              restaurantID
                            );
                          }}
                        >
                          <LiaPlusSolid />{" "}
                        </figure>
                      </div>
                    </div>
                  </summary>
                </figure>
              </article>
            ))}
          </article>

          <div className="cart-suggestItems">
            <div className="cart-slide-container">
              <h3>Popular with your order</h3>
              <p>Based on what other customers bought together</p>
              <Slider>
                {suggestItems.map((item, index) => (
                  <li key={index}>
                    <div>
                      <img
                        src={item.image}
                        width={`150px`}
                        height={`140px`}
                        alt={item.name}
                      />
                      <button>
                        <LiaPlusSolid />
                      </button>
                    </div>

                    <article>
                      <p>{item.price}</p>
                      <p>{item.name}</p>
                    </article>
                  </li>
                ))}
              </Slider>
            </div>
          </div>

          <div className=" cart-summary" id="summary">
            <p>
              <span>Subtotal</span>
              <span>Tk 1433</span>
            </p>
            <p>
              <span>Standard delivery</span>
              <span className="pink-text">free</span>
              <span>Welcome gift:free delivery</span>
            </p>
            <p>
              <span>Service fee</span>
              <span>Tk 9</span>
            </p>
            <p>
              <span>VAT</span>
              <span>Tk 73</span>
            </p>
          </div>

          <div className=" cart-cutlery">
            <CiForkAndKnife />

            <div>
              <p>Cutlery</p>
              {!isCutlery ? (
                <p>If available, your order will come with cutlery</p>
              ) : (
                <p>No cutlery provided. Thanks for reducing waste!</p>
              )}
            </div>

            <div className="switch-div">
              <input
                id="switch"
                type="checkbox"
                onChange={() => setIsCutlery(!isCutlery)}
              />
              <label htmlFor="switch"></label>
            </div>
          </div>
        </section>

        <footer>
          <summary>
            <p>
              Total <span>(incl. fees and tax)</span>
            </p>
            <p>Tk 500</p>
          </summary>

          <a href="#summary">See Summary</a>

          <button className="btn btn-pink btn-lg btn-moderate">
            review payment and address
          </button>
        </footer>
      </section>

      <section className={`cart-goto ${showCart && "hide-cart"}`}>
        <button
          className="btn btn-flex btn-pink btn-lg btn-moderate"
          onClick={(e) => {
            e.stopPropagation();
            setShowCart(true);
          }}
        >
          <figure>
            <CiForkAndKnife /> <p>1</p>
          </figure>

          <p>View Cart</p>

          <p>Tk 648</p>
        </button>
      </section>
    </>
  );
};

export default Cart;
