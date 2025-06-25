import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";

const AlertCart = () => {
  return (
    <div>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>¡Alerta!</AlertTitle>
        <AlertDescription>
          <p>Se debe iniciar sesión para poder agregar productos al carrito.</p>
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AlertCart;
