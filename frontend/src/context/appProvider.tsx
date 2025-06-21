import {
  AppProviderProps,
  AppState,
  CartItem,
  Product,
  User,
} from "@/interfaces/interfaces";
import { AppContext } from "./appContext";
import { useState, useEffect } from "react";

export const AppProvider = ({ children }: AppProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [user, setUser] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:3000/store/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    const newTotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotal(newTotal);
  }, [cart]);

  const signUp = async (user: User) => {
    try {
      const res = await fetch("http://localhost:3000/store/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        console.log("Usuario registrado con éxito.");
      } else {
        console.error("Error al crear usuario.", data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("http://localhost:3000/store/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        console.log("Usuario ingresado.");
      } else {
        console.error("Error al ingresar.", data)
      }
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue: AppState = {
    cart,
    total,
    products,
    user,
    token,
    signUp,
    login,
    addToCart,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
