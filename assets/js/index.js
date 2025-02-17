document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault()
  
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let errorMessage = document.getElementById('errorMessage')
  
    if (password.length < 6) {
      errorMessage.textContent = 'A senha deve ter pelo menos 6 caracteres.'
      return
    }
  
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          errorMessage.textContent = data.error
        } else {
          alert('Usuário cadastrado com sucesso!')
          errorMessage.textContent = ''
        }
      })
      .catch((error) => console.error('Erro:', error))
  })