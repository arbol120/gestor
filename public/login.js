async function login() {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  });

  const data = await res.json();

  if (!res.ok) {
    alert(data.msg || 'Error al iniciar sesión');
    return;
  }

  localStorage.setItem('token', data.token);

  // 👉 REDIRECCIÓN CORRECTA
  window.location.href = 'productos.html';
}
