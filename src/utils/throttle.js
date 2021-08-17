import { useWishlist } from '../contexts/WishContext';
import { useCart } from '../contexts/CartContext';

export const throttle = function(func, delay) {
    let flag = true;
    return function() {
        let context = this;
        if (flag) {
            flag = false;
            func.apply(context, [...arguments])
            setTimeout(function() {
                flag = true;
            }, delay);
        }
    }
}

export const useThrottle = () => {
    let {handleWishlist} = useWishlist();
    let {decreaseQuantityOfProduct,increaseQuantityOfProduct,addToCart,removeFromCart} = useCart();

    const throttleHandleWishlist = throttle(handleWishlist,1500)
    const throttleDecreaseQuantity = throttle(decreaseQuantityOfProduct,1500);
    const throttleIncreaseQuantity = throttle(increaseQuantityOfProduct,1500);
    const throttleAddToCart = throttle(addToCart,1500);
    const throttleRemoveFromCart = throttle(removeFromCart,1500);
    
    return {
        throttleHandleWishlist,throttleDecreaseQuantity,throttleIncreaseQuantity,throttleAddToCart,throttleRemoveFromCart
    }
}