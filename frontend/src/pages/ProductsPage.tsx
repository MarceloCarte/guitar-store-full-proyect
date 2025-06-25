import { useContext } from "react";
import { AppContext } from "@/context/appContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppState } from "@/interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import { clpFormater } from "@/lib/utils";

const ProductsPage = () => {
  const { products, addToCart } = useContext(AppContext) as AppState;
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center p-4 space-y-10">
      
       
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="w-72" onClick={() => navigate(`/products/item/${product.id}`)}>
            <img src={product.image} alt={product.name} className="rounded-t" />
            <CardContent className="space-y-2">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-sm text-muted-foreground">$ {clpFormater(product.price)}</p>
              <Button onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}>Agregar al carrito</Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
};


export default ProductsPage;


