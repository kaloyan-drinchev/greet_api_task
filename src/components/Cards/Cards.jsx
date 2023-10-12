import { useState, useEffect } from "react";
import { fetchData } from "../../helpers/fetch_data";
import AddToCart from "../AddToCart/AddToCart";
import "./Cards.css";

export default function Cards() {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetchData()
      .then((res) => setPeople(res))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container">
      <div className="row">
        {people &&
          people.map((person) => (
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
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div className="mb-5 mt-2 text-center">
                <div className="bg-primary text-white p-1 rounded">
                  {person.name.split(" ").slice(0, 2).join(" ")}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
