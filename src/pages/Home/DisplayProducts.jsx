import { useProducts } from "../../contexts/ProductContext";
import {BtnSpinner} from "../../utils/BtnSpinner";
import {ProductContent} from './ProductContent';

export const DisplayProducts = () => {

    const { totalProducts,products } = useProducts();

    return totalProducts ? (
      <div style={{ display: products.length > 0 ? "grid" : "block" }} className="products slide__products">
         {
            products.length > 0 ? (
            products.map((item) => (
               <ProductContent key={item._id} item={item}/>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No results found</p>
          )
         }
      </div>
    ) : (
    <div style={{ display: products.length > 0 ? "grid" : "block" }} className="products">
       <BtnSpinner show={true} className="loading__products"/>
    </div>
     )
};