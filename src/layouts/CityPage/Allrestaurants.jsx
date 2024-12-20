import { starIcon } from "../../assets/svg";
import BreadCrumbs from "../../components/BreadCrumbs";
import { useNavigate } from "react-router-dom";
import altImage from "../../assets/images/imageGenerator/alternative.webp";
import OfferTags from "../../components/OfferTags";
import { isTheRestaurantOpen } from "../../utils/isRestaurantOpen";

const AllRestaurants = ({ data }) => {
  const navigate = useNavigate();

  return (
    <section className="restaurant">
      <div className="restaurant-title">
        <BreadCrumbs linkArray={["Homepage", `${data[0].city}`]} />
        <h1>All Restaurants</h1>
      </div>

      <div className="restaurant-grid">
        {data.map((restaurant, index) => {
          const { _id, name, cuisine, ratings, reviews, image, offer } =
            restaurant;

          const restaurantName = name.replace(/\s/g, "-").replace(/--/g, "-");
          const status = isTheRestaurantOpen(cuisine);

          return (
            <div
              key={index}
              onClick={() => navigate(`/${restaurantName}/${_id}`)}
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
                    <h4>{name ?? "Not Available"}</h4>
                    <p className="restaurant-grid-items-caption-rating">
                      <img src={starIcon} alt="rating star" />
                      <strong>{ratings ?? "4.4"}</strong>
                      <span>{reviews ?? "(100+)"}</span>
                    </p>
                    <p>{cuisine ?? "Bangladeshi"}</p>
                  </div>
                  {offer && <OfferTags offer={offer} />}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AllRestaurants;
