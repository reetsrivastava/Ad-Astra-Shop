import { useProducts } from "../../contexts/ProductContext";

export const Filter = () => {

    const {
        dispatchProduct,
        includeOutOfStock,
        fastDelivery,
    } = useProducts();

    return (
        <div className="filter-content">
            <label className="filter-content-label">
              <input
                type="checkbox"
                checked={includeOutOfStock}
                onChange={() => dispatchProduct({ type: "INCLUDE_OUT_STOCK" })}
              />
              Include Out Of Stock&nbsp;&nbsp;
            </label>

            <label className="filter-content-label">
              <input
                type="checkbox"
                checked={fastDelivery}
                onChange={() => dispatchProduct({ type: "FAST_DELIVERY" })}
              />
              &nbsp;<i className="fas fa-shipping-fast"></i> Fast Delivery&nbsp;
            </label>

            
          <button onClick={() => dispatchProduct({type:"CLEAR_ALL_FILTER"})} style={{background:'none',border:'1px solid rgba(0, 0, 0, 0.12)',cursor:'pointer'}}>Clear all</button>
          </div>
    );
};