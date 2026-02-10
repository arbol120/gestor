async function login() {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: user.value,
        password: pass.value
      })
    });

    if (!res.ok) {
      alert('Credenciales incorrectas');
      return;
    }

    const data = await res.json();

    if (!data.token) {
      alert('No llegó el token');
      return;
    }

    localStorage.setItem('token', data.token);

    // 🔥 REDIRECCIÓN SEGURA
    window.location.href = '/productos.html';

  } catch (err) {
    console.error(err);
    alert('Error de servidor');
  }
}
