async function login() {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      username: user.value,
      password: pass.value
    })
  });
  const data = await res.json();
  localStorage.setItem('token', data.token);
  location.href = 'index.html';
}
