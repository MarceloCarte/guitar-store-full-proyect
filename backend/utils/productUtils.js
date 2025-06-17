const allowedTypes = ['electrica', 'nylon', 'acústica', 'electroacústica'];
const allowedConditions = ['nueva', 'usada'];

export const validateProduct = (data) => {
  const errors = [];

  if (!data.name || typeof data.name !== 'string') {
    errors.push('Nombre del producto debe ser tipo "string".');
  }

  if (typeof data.price !== 'number' || data.price < 0) {
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

export const clpFormater = (value) => {
    return value.toLocaleString('es-CL')
}