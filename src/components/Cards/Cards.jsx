import SortedData from "../SortedData/SortedData";
import DropdownMenuFilterByCategory from "../DropdownMenuFilterByCategory/DropdownMenuFilterByCategory";
import DropdownMenuFilterByPrice from "../DropdownMenuFilterByPrice/DropdownMenuFilterByPrice";
import { fetchData } from "../../helpers/helpers";
import { useEffect, useState } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Cards() {
  const [peopleByPrice, setPeopleByPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sortAsc = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        "https://greet.bg/wp-json/wc/store/products?orderby=price&order=asc"
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Unable to fetch data");
      setIsLoading(false);
    }
  };

  const sortDesc = async () => {
    setIsLoading(true);
    try {
      const res = await fetchData(
        "https://greet.bg/wp-json/wc/store/products?orderby=price&order=desc"
      );
      setPeopleByPrice(res);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("Unable to fetch data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    async function fetchDataFromDefaultLink() {
      try {
        const res = await fetchData(
          "https://greet.bg/wp-json/wc/store/products?page=1"
        );
        setPeopleByPrice(res);
        setIsLoading(false);
      } catch (error) {
        setErrorMessage("Unable to fetch data");
        setIsLoading(false);
      }
    }
    fetchDataFromDefaultLink();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <DropdownMenuFilterByPrice
              sortByAsc={sortAsc}
              sortByDesc={sortDesc}
            />
          </div>
          <div className="col mb-3">
            <DropdownMenuFilterByCategory />
          </div>
        </div>
      </div>

      {errorMessage && <div className="text-white">{errorMessage}</div>}
      {isLoading ? <LoadingSpinner /> : <SortedData data={peopleByPrice} />}
    </>
  );
}
