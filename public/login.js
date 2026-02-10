console.log('login.js cargado');

async function login() {
  console.log('CLICK LOGIN');

  const user = document.getElementById('user');
  const pass = document.getElementById('pass');

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  });

  const data = await res.json();
  console.log(data);

  if (!data.token) {
    alert('Credenciales incorrectas');
    return;
  }

  localStorage.setItem('token', data.token);
  window.location.href = '/productos.html';
}
