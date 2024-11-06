import data from "../../utils/city.json";
import { starIcon } from "../../assets/svg";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import altImage from "../../assets/images/imageGenerator/alternative.webp";
import OfferTags from "../../components/OfferTags";
import { isTheRestaurantOpen } from "../../utils/isRestaurantOpen";

const Allrestaurants = () => {
  const navigate = useNavigate();

  return (
    <section className="restaurant">
      <div className="restaurant-title">
        <BreadCrumbs linkArray={["Homepage", "Dhaka"]} />
        <h1>All Restaurants</h1>
      </div>

      <div className="restaurant-grid">
        {data &&
          data.dhaka.map((restaurant, index) => {
            const { name, cuisine, ratings, reviews, image, offer } =
              restaurant;
            let status = isTheRestaurantOpen(cuisine);

            return (
              <div
                key={index}
                onClick={() => navigate("/restaurant")}
                className="restaurant-grid-items"
              >
                <img src={image ?? altImage} alt={name} width="596px" />

                {status !== "open" && (
                  <div className="image-overlay">
                    <p>{status}</p>
                    <button>Order For Later</button>
                  </div>
                )}

                {status === "open" && (
                  <>
                    <div className="restaurant-grid-items-caption">
                      <h4> {name ?? "Not Available"}</h4>

                      <p className="restaurant-grid-items-caption-rating">
                        <img src={starIcon} />
                        <strong>{ratings ?? "4.4"}</strong>
                        <span>{reviews ?? "(100+))"}</span>
                      </p>
                      <p> {cuisine ?? "Bangladeshi"} </p>
                    </div>

                    <OfferTags offer={offer} />
                  </>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Allrestaurants;
