import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";
import { AppState } from "@/interfaces/interfaces";
import { clpFormater } from "@/lib/utils";

const CheckOutPage = () => {
  const { cart, total, user } = useContext(AppContext) as AppState;

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Resumen del Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>$ {clpFormater(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold text-lg pt-4 border-t">
            <span>Total:</span>
            <span>$ {clpFormater(total)}</span>
          </div>
          <Button className="mt-4 w-full">Proceder al pago</Button>
        </>
      )}
    </div>
  );
};

export default CheckOutPage;
