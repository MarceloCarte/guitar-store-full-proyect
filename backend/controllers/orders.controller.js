import {
  createOrder,
  createOrderItem,
  decreaseProductStock,
} from "../models/order.model.js";

export const checkout = async (res, req) => {
  const { user_id, items } = req.body;

  if (!user_id || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: "Datos inválidos." });
  }

  try {
    const order = await createOrder(user_id);

    for (const i of items) {
      const { product_id, quantity } = i;

      const updatedProduct = await decreaseProductStock(product_id, quantity);
      if (!updatedProduct) {
        return res.status(400).json({ message: "Stock insuficiente." });
      }

      await createOrder(
        order.id,
        product_id,
        quantity,
        updatedProduct.price_clp
      );
    }
    return res.status(201).json({message: 'Compra realizada con éxito.', order_id: order.id})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Error interno del servidor."})
  }
};

// {
//   "user_id": "user-123",
//   "items": [
//     { "product_id": 1, "quantity": 2 },
//     { "product_id": 3, "quantity": 1 }
//   ]
// }