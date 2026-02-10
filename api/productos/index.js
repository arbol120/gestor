let products = [
  { _id: '1', name: 'Producto Demo', description: 'Mock', price: 100 }
];

export default function handler(req, res) {
  const auth = req.headers.authorization;

  if (!auth || auth !== 'Bearer mock-token-123') {
    return res.status(401).json({ msg: 'Token inválido' });
  }

  if (req.method === 'GET') {
    return res.json(products);
  }

  if (req.method === 'POST') {
    const { name, description, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ msg: 'Datos incompletos' });
    }

    const newProduct = {
      _id: Date.now().toString(),
      name,
      description,
      price
    };

    products.push(newProduct);
    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ msg: 'Método no permitido' });
}
