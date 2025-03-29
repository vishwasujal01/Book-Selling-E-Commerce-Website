import { createContext, useState , useEffect} from "react";
// import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    



    const addToCart = async (itemId) => {

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }

        setCartItems(cartData);

        if (token) {
            try {

               const response =  await axios.post(backendUrl + '/api/cart/add', {itemId}, {headers: {token}})
               console.log(response.data);
                
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        } 
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

        if (token) {
            
            try {
                await axios.post(backendUrl + '/api/cart/update', {itemId, quantity}, {headers: {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
         }

    }


    const getUserCart = async (token) => {

        try {

            const response = await axios.get(backendUrl + '/api/cart/get', { headers: { token } });
            console.log(response.data);
            
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
                
        } catch (error) {
            console.error("API Error:", error);
            toast.error(error.message);
        }
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


    const getProductData = async () => {
        try {
            console.log("Fetching Products from:", backendUrl + "/api/product/list");
            const response = await axios.get(backendUrl + "/api/product/list");
            console.log("API Response:", response.data);
    
            if (response.data.success) {
                console.log("Setting Products:", response.data.products);
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("API Error:", error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getProductData()
    },[])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const value = {
        currency, products, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        token, setToken,
    }

   return(
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
   )
}

export default ShopContextProvider;  // export the provider so it can be used in other components