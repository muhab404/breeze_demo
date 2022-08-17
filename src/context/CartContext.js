import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";

export let CartContext = createContext([]);

export function CartContextProvider(props) {
  const { user } = UserAuth();
  const itemID = doc(db, "users", `${user?.email}`);

  const [cart, setToCart] = useState([]);

  const addToCartInFirebase = async (item) => {
    if (user?.email) {
      try {
        let dataFromDB = await getDoc(itemID);
        let allInCart = dataFromDB.data().inCart;
        const index = allInCart.findIndex((e) => {
          return item.id === e.id;
        });

        if (index === -1) {
          item["quantity"] = 1;
          allInCart.push(item);
        } else {
          allInCart[index].quantity += 1;
        }

        await updateDoc(itemID, { inCart: allInCart });
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("please log in first");
    }
  };

  const addOneMore = async (id) => {
    try {
      let dataFromDB = await getDoc(itemID);
      let allInCart = dataFromDB.data().inCart;
      const index = allInCart.findIndex((e) => {
        return id === e.id;
      });

      allInCart[index].quantity += 1;
      await updateDoc(itemID, { inCart: allInCart });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteOneMore = async (id) => {
    try {
      let dataFromDB = await getDoc(itemID);
      let allInCart = dataFromDB.data().inCart;
      const index = allInCart.findIndex((e) => {
        return id === e.id;
      });

      if (allInCart[index].quantity > 0) {
        allInCart[index].quantity -= 1;
        await updateDoc(itemID, { inCart: allInCart });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      let dataFromDB = await getDoc(itemID);
      let allInCart = dataFromDB.data().inCart;
      const index = allInCart.findIndex((e) => {
        return id === e.id;
      });

      allInCart.splice(index, 1);
      await updateDoc(itemID, { inCart: allInCart });
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    let totalPrice = 0;
    cart.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice.toFixed(2);
  };

  const clearAll = async () => {
    try {
      setTimeout(async () => {
        let dataFromDB = await getDoc(itemID);
        let allInCart = dataFromDB.data().inCart;
        allInCart.splice(0, cart.length);
        await updateDoc(itemID, { inCart: allInCart });
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onSnapshot(itemID, (doc) => {
      setToCart(doc.data()?.inCart);
    });
  }, [itemID, user?.email]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setToCart,
        addToCartInFirebase,
        addOneMore,
        deleteOneMore,
        deleteItem,
        totalPrice,
        clearAll,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

// const CartContext = createContext();
// faker.seed(99);

// const Context = ({ children }) => {
//   const products = [...Array(20)].map(() => ({
//     id: faker.datatype.uuid(),
//     name: faker.commerce.productName(),
//     price: faker.commerce.price(),
//     image: faker.random.image(),
//     inStock: faker.random.arrayElement([0, 3, 5, 6, 7]),
//     fastDelivery: faker.datatype.boolean(),
//     ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
//   }));

//   const [state, dispatch] = useReducer(cartReducer, {
//     products: products,
//     cart: [],
//   });

//   const [productState, productDispatch] = useReducer(productReducer, {
//     byStock: false,
//     byFastDelivery: false,
//     byRating: 0,
//     searchQuery: "",
//   });

//   console.log(productState);

//   return (
//     <CartContext.Provider
//       value={{ state, dispatch, productState, productDispatch }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const CartState = () => {
//   return useContext(Cart);
// };

// export default Context;
