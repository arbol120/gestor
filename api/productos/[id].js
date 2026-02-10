let products = [
  { _id: '1', name: 'Producto Demo', description: 'Mock', price: 100 }
];

export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth || auth !== 'Bearer mock-token-123') {
    return res.status(401).json({ msg: 'Token inválido' });
  }

  const { id } = req.query;

  const index = products.findIndex(p => p._id === id);
  if (index === -1) {
    return res.status(404).json({ msg: 'Producto no encontrado' });
  }

  if (req.method === 'PUT') {
    const { name, description, price } = req.body;
    products[index] = { _id: id, name, description, price };
    return res.json(products[index]);
  }

  if (req.method === 'DELETE') {
    products.splice(index, 1);
    return res.json({ msg: 'Producto eliminado' });
  }

  return res.status(405).json({ msg: 'Método no permitido' });
}
