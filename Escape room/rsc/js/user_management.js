const mensajeElement = document.getElementById('mensaje');
const request = indexedDB.open("UsuariosDB", 1);

  request.onupgradeneeded = function(event) {
    const db = event.target.result;
    db.createObjectStore("usuarios", { keyPath: "username" });
  };

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
      const db = request.result;
      const transaction = db.transaction(["usuarios"], "readwrite");
      const store = transaction.objectStore("usuarios");

      const getRequest = store.get(username);
      getRequest.onsuccess = function(event) {
        const existingUser = event.target.result;

        if (existingUser) {
          mostrarMensaje('El nombre de usuario ya está registrado. Por favor, elige otro.');
        } else {
          store.put({ username: username, password: password });
          mostrarMensaje('Registro exitoso.');
          window.location.href = "./lobby.html";
        }
      };
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
      const db = request.result;
      const transaction = db.transaction(["usuarios"], "readonly");
      const store = transaction.objectStore("usuarios");

      const getRequest = store.get(username);
      getRequest.onsuccess = function(event) {
        const storedUser = event.target.result;

        if (storedUser && storedUser.password === password) {
          mostrarMensaje('Inicio de sesión exitoso!');
          window.location.href = 'lobby.html';
        } else {
          mostrarMensaje('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
          usernameInput.classList.add('invalid');
          passwordInput.classList.add('invalid');
        }
      };
    } else {
      mostrarMensaje('Por favor, ingresa un nombre de usuario y una contraseña.');
      usernameInput.classList.add('invalid');
      passwordInput.classList.add('invalid');
    }
  }