/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import AddToCart from "../AddToCart/AddToCart";
import "./SortedData.css";

export default function SortedData({ data }) {
  return (
    <div className="container">
      <div className="row">
        {data.map((person) => {
          return (
            <div key={person.id} className="col-lg-2 col-md-4 col-sm-6 col-12">
              {person.images.map((image) => (
                <div key={image.id} className="image-container text-center">
                  <img
                    src={image.src}
                    className="img-fluid rounded text-center"
                  />
                  <div className="overlay">
                    <AddToCart id={person.id} />
                    {person.categories.length > 0 && (
                      <div className="transparent-background">
                        {person.categories.map((category) => (
                          <div key={category.id} className="text-white">
                            {category.name}
                          </div>
                        ))}
                        <div className="text-white">
                          {person.prices.price}
                          {person.prices.currency_suffix}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="mb-5 mt-2 text-center">
                <div className="text-white p-1 ">{person.name}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
