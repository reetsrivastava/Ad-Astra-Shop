import React, { useEffect, useState } from "react";

import { useProducts } from "../../contexts/ProductContext";

import {DisplayProducts} from "./DisplayProducts";
import {Filter} from "./Filter";

export const ProductListing = () => {
  useEffect(() => {
    let isSubscribed = true;

    if (isSubscribed) {
      window.scroll({ behavior: "smooth", top: 0 });
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  const { dispatchProduct, sortBy } = useProducts();

  const HandleDropdown = (e) => {
    dispatchProduct({ type: "SORT", payload: e.target.value });
  };

  const [displayFilter, setDisplayFilter] = useState(false);

  return (
    <div className="products-container">
      <div className="sorting-container">
        <div className="dropdownBtn-container">
          <small>
            <i className="fas fa-sort-amount-up-alt"></i> Sort by :
          </small>
          <select
            className="dropdownBtn"
            value={sortBy === null ? "DEFAULT" : sortBy}
            onChange={HandleDropdown}
          >
            <option value="DEFAULT">Relevance</option>
            <option value="HIGH_TO_LOW">High to low</option>
            <option value="LOW_TO_HIGH">Low to high</option>
          </select>
        </div>

        <div className="filter-btn-container">
          <button
            className="filter-button"
            onClick={() => setDisplayFilter(!displayFilter)}
          >
            <i className="fa fa-filter"></i> Filter
          </button>
        </div>
      </div>

      {displayFilter && <Filter />}

      <DisplayProducts />

    </div>
  );
};