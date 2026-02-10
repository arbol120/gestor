const token = localStorage.getItem('token');

async function load() {
  const res = await fetch('/api/products', {
    headers: { authorization: token }
  });
  const data = await res.json();
  list.innerHTML = data.map(p =>
    `<li>${p.name} $${p.price}
      <button onclick="del('${p._id}')">X</button>
    </li>`
  ).join('');
}

async function add() {
  await fetch('/api/products', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      authorization: token
    },
    body: JSON.stringify({ name: name.value, price: price.value })
  });
  load();
}

async function del(id) {
  await fetch('/api/products/' + id, {
    method:'DELETE',
    headers:{ authorization: token }
  });
  load();
}

load();
