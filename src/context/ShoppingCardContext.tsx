import { createContext, useContext, ReactNode, useState } from "react";
import { SideBarCard } from "../components/SideBarCard";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCardProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCardContext = {
  openCard: () => void;
  closeCard: () => void;
  getItemQuantity: (id: number) => number;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeQuantity: (id: number) => void;

  cardQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCardContext = createContext({} as ShoppingCardContext);

export function useShoppingCard() {
  return useContext(ShoppingCardContext);
}

export function ShoppingCardProvider({ children }: ShoppingCardProviderProps) {
  //States for Sidebar and CardItem
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

  // Function for open and close Sidebar
  const openCard = () => setIsOpen(true);
  const closeCard = () => setIsOpen(false);

  //to determine the number of products  (reduce - снижать)
  const cardQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decreaseQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeQuantity(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCardContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeQuantity,
        cartItems,
        cardQuantity,
        openCard,
        closeCard,
      }}
    >
      {children}

      <SideBarCard isOpen={isOpen} />
    </ShoppingCardContext.Provider>
  );
}
