const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html';
}

// ELEMENTOS
const logoutBtn = document.getElementById('logoutBtn');
const createProductBtn = document.getElementById('createProductBtn');

logoutBtn.addEventListener('click', logout);
createProductBtn.addEventListener('click', createProduct);

// OBTENER PRODUCTOS
async function getProducts() {
  const res = await fetch('/api/products', {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    alert('Sesión inválida');
    localStorage.removeItem('token');
    window.location.href = 'login.html';
    return;
  }

  const products = await res.json();
  const list = document.getElementById('productList');
  list.innerHTML = '';

  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${p.name}</strong> - ${p.description} - $${p.price}
      <button onclick="editProduct('${p._id}')">Editar</button>
      <button onclick="deleteProduct('${p._id}')">Eliminar</button>
    `;
    list.appendChild(li);
  });
}

// CREAR
async function createProduct() {
  const name = prodName.value.trim();
  const description = prodDesc.value.trim();
  const price = parseFloat(prodPrice.value);

  if (!name || !description || !price) {
    alert('Completa todos los campos');
    return;
  }

  await fetch('/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, price })
  });

  prodName.value = '';
  prodDesc.value = '';
  prodPrice.value = '';

  getProducts();
}

// EDITAR
async function editProduct(id) {
  const name = prompt('Nuevo nombre');
  const description = prompt('Nueva descripción');
  const price = parseFloat(prompt('Nuevo precio'));

  if (!name || !description || !price) return;

  await fetch(`/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, price })
  });

  getProducts();
}

// ELIMINAR
async function deleteProduct(id) {
  if (!confirm('¿Eliminar producto?')) return;

  await fetch(`/api/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  getProducts();
}

// LOGOUT
function logout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// INIT
getProducts();
