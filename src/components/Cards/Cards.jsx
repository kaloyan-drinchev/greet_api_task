import { useState, useEffect } from "react";
import { fetchData } from "../../helpers/fetch_data";

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
                <div key={image.id}>
                  <img
                    src={image.src}
                    className="img-fluid rounded text-center"
                  />
                </div>
              ))}
              <div className="mb-2 mt-2 text-center">
                <div className="bg-primary text-white p-1 rounded">
                  {person.name.split(" ").slice(0, 2).join(" ")}
                </div>
              </div>
              {person.categories.length > 0 && (
                <div>
                  {person.categories.map((category) => (
                    <div key={category.id} className="text-white">
                      {category.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
