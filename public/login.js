const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');

loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);

// REGISTRO (MOCK)
async function register() {
  const username = regUsername.value.trim();
  const password = regPassword.value.trim();

  if (!username || !password) {
    alert('Completa todos los campos');
    return;
  }

  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  alert(data.msg);
}

// LOGIN (MOCK)
async function login() {
  const username = loginUsername.value.trim();
  const password = loginPassword.value.trim();

  if (!username || !password) {
    alert('Completa todos los campos');
    return;
  }

  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    window.location.href = 'index.html';
  } else {
    alert('Error al iniciar sesión');
  }
}
