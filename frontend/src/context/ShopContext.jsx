import { createContext, useState , useEffect} from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const value = {
        currency, products, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
    }

   return(
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
   )
}

export default ShopContextProvider;  // export the provider so it can be used in other components