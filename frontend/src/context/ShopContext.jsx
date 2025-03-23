import { createContext } from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 10;

    const value = {
        currency, products, delivery_fee,
    }

   return(
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
   )
}

export default ShopContextProvider;  // export the provider so it can be used in other components