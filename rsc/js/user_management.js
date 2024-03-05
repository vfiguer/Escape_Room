const mensajeElement = document.getElementById('mensaje');

function mostrarMensaje(mensaje) {
  mensajeElement.textContent = mensaje;
}

function limpiarMensajes() {
  mensajeElement.textContent = '';
}

function registrarUsuario() {
  limpiarMensajes();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username && password) {
    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || {};

    if (storedUsers[username]) {
      mostrarMensaje('El nombre de usuario ya está registrado. Por favor, elige otro.');
    } else {
      storedUsers[username] = { username, password };
      localStorage.setItem('usuarios', JSON.stringify(storedUsers));
      mostrarMensaje('Registro exitoso.');
      localStorage.setItem('currentUsername', username);

      window.location.href = "./lobby.html";
    }
  } else {
    mostrarMensaje('Por favor, ingresa un nombre de usuario y una contraseña.');
  }
}

function iniciarSesion() {
  limpiarMensajes();

  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');

  const username = usernameInput.value;
  const password = passwordInput.value;

  if (username && password) {
    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || {};
    const storedUser = storedUsers[username];

    if (storedUser && storedUser.password === password) {
      mostrarMensaje('Inicio de sesión exitoso!');
      localStorage.setItem('currentUsername', username);
      window.location.href = 'lobby.html';
    } else {
      mostrarMensaje('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  } else {
    mostrarMensaje('Por favor, ingresa un nombre de usuario y una contraseña.');
  }
}

function checkSession() {
  const username = localStorage.getItem('currentUsername');
  const isLoginPage = window.location.pathname.includes("/pgs/index.html");

  if (!username && !isLoginPage) {
    window.location.href = '../pgs/index.html';
  }
}

function cerrarSesion() {
  localStorage.removeItem('currentUsername');
  window.location.href = '../pgs/index.html'; 
}

document.addEventListener('DOMContentLoaded', function () {
  checkSession();
})

function mostrarRanking() {
  const rankingList = document.getElementById('ranking-list');

  rankingList.style.display = (rankingList.style.display === 'none' || rankingList.style.display === '') ? 'block' : 'none';

  if (rankingList.style.display === 'block') {
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.sort((a, b) => a.puntuacion + b.puntuacion);

    rankingList.innerHTML = '';

    ranking.forEach((entry, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${index + 1}. ${entry.username} - ${entry.tiempo} segundos - ${entry.puntuacion} puntos`;
      rankingList.appendChild(listItem);
    });
  }
}

function gestionar() {
  const gestionarContent = document.querySelector('.gestionar');
  gestionarContent.style.display = (gestionarContent.style.display === 'none' || gestionarContent.style.display === '') ? 'block' : 'none';
}

function updateUserInfo() {
  limpiarMensajes();

  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;

  if (newUsername && newPassword) {
    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || {};
    const currentUsername = localStorage.getItem('currentUsername');
    const currentUser = storedUsers[currentUsername];
    currentUser.username = newUsername;
      currentUser.password = newPassword;

      storedUsers[newUsername] = currentUser;
      delete storedUsers[currentUsername];

      localStorage.setItem('usuarios', JSON.stringify(storedUsers));
      localStorage.setItem('currentUsername', newUsername);

      mostrarMensaje('Información de usuario actualizada correctamente.');
    } 
  else {
    mostrarMensaje('Por favor, ingresa un nuevo nombre de usuario y una nueva contraseña.');
  }
}

function cargarPartida() {
  const ultimaUbicacion = localStorage.getItem('ultimaUbicacion');
  const usuario = localStorage.getItem('usuarioPartida')
  const currentUsername = localStorage.getItem('currentUsername')

  if(ultimaUbicacion === null || ultimaUbicacion === " " || currentUsername != usuario ){  
  }
else{
  window.location.replace(ultimaUbicacion);
}
}  
