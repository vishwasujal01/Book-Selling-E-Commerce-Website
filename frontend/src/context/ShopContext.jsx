import { createContext, useState , useEffect} from "react";
import { products } from "../assets/assets";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    const addToCart = async (itemId) => {
        setCartItems((prevCart) => {
            let cartData = { ...prevCart }; // Create a shallow copy
    
            if (cartData[itemId]) {
                cartData[itemId] += 1;
            } else {
                cartData[itemId] = 1;
            }
    
            return cartData;
        });
    };

    const getCartCount = () => {

        let totalCount = 0;

        for (const itemId in cartItems){
            if (cartItems[itemId] > 0) {
                totalCount += cartItems[itemId]; // Add the quantity to totalCount
            }
        }
    
        return totalCount; // Return the total count of items in the cart
    };


    const updateQuantity = async (itemId, quantity) => {
        
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);

    }

    const getCartAmount = () => {

        let totalAmount = 0;
        // Iterate over the cartItems object
        for (const itemId in cartItems) {
    
            const itemQuantity = cartItems[itemId]; // Get the quantity for the item
            const itemInfo = products.find(product => product._id === itemId); // Find the product info
    
            // Check if the product exists and the quantity is valid
            if (itemInfo && itemQuantity > 0) {
                totalAmount += itemInfo.price * itemQuantity; // Calculate total amount
            }
        }
    
        return totalAmount; // Return the total amount of items in the cart
    };
    

    useEffect(() => {
        console.log("Cart Items in Context:", cartItems);
    }, [cartItems]);

    const value = {
        currency, products, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount,
    }

   return(
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
   )
}

export default ShopContextProvider;  // export the provider so it can be used in other components