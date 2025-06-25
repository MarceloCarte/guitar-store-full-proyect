const allowedTypes = ['electrica', 'nylon', 'acustica', 'electroacustica'];
const allowedConditions = ['nueva', 'usada'];

export const validateProduct = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Nombre del producto debe ser tipo "string".');
  }

  if (typeof data.price_clp !== 'number' || data.price_clp < 0) {
    errors.push('Precio del producto debe ser mayor a 0.');
  }

  if (typeof data.stock !== 'number' || data.stock < 0) {
    errors.push('Stock del producto debe ser mayor o igual a 0.');
  }

  if (!allowedTypes.includes(data.type)) {
    errors.push(`Tipo de producto debe ser: ${allowedTypes.join(', ')}`);
  }

  if (!allowedConditions.includes(data.condition)) {
    errors.push(`Condición del producto debe ser: ${allowedConditions.join(', ')}`);
  }

  return errors;
};



export const prepHateoas = (productos) => {
  const res = productos.map((p) => ({
    id: p.id,
    name: p.name,
    image: p.image_url,
    price: p.price_clp,
    href: `/store/products/item/${p.id}`
  }));

  const total = productos.length;

  return {
    total,
    res
  };
};