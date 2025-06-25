import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { AppState } from "@/interfaces/interfaces";
import { clpFormater } from "@/lib/utils";

const HomePage = () => {
  const context = useContext(AppContext) as AppState

  const { products, addToCart } = context

  return (
    <main className="flex flex-col items-center p-4 space-y-10">
      
      <section className="text-center max-w-4xl mt-8 space-y-4">
        <h1 className="text-4xl font-bold">🎸 Bienvenido a NC Guitar Store</h1>
        <p className="text-lg text-muted-foreground">
          Las mejores guitarras para todos los gustos.
        </p>
        <Link to="/products">
          <Button className="mt-2">Ver Catálogo</Button>
        </Link>
      </section>

      
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.slice(0, 3).map((product) => (
          <Card key={product.id} className="w-72">
            <img src={product.image} alt={product.name} className="rounded-t" />
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">${clpFormater(product.price)}</p>
              <Button onClick={() => addToCart(product)}>Agregar al carrito</Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default HomePage