import { Link } from 'react-router-dom';

export function OrderCard ({order}) {
 let time = new Date(order?.createdAt).toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});

 const totalPrice = () => {
    return order?.products.reduce( (total,p) => total + (p.price*p.quantity),0 );
 }

 const { address } = order;

 return (
        <div className="orderDetails">
                <div className="orderDetails__header">
                    <div>
                      <small><strong>ORDER PLACED</strong>: {time}</small><br/>
                    </div>
                    <div>
                       <small><strong>ORDER ID</strong> : #{order?._id}</small>
                    </div>
                </div>
                <div className="orderDetails__content">
                    {
                      order.products.map( p => (
                        <div key={p._id}>
                           
                          <div className="orderDetails__product">
                             <Link to={`/products/${p?.product?._id}`}>
                               <img alt="product" width="150" height="100" src={p?.product?.image+`?random=${Math.round(Math.random() * 1000)}`}/>
                             </Link>
                             <div>
                               <small><strong>Product Name</strong> : {p.name}</small><br/>
                               <small><strong>Quantity</strong> : {p.quantity}</small><br/><br/>
                               <small><strong>Price</strong> : ₹ {p.price}</small>
                             </div>
                          </div>
                        </div>
                      ) )
                    }
                    <small><strong>Total Price</strong> : ₹{totalPrice()}</small>
                    <br/>
                    <small><strong>ADDRESS</strong> : {address?.name}, {address?.address} ,{address?.city?.toUpperCase()} , {address?.state?.toUpperCase()} , {address?.locality} , {address?.pincode} , India</small>
                </div>
            </div>
    )
}

