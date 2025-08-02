document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuarioIngresado = document.getElementById('usuario').value.trim();
    const passwordIngresado = document.getElementById('password').value.trim();

    fetch('data/usuarios.json')
        .then(response => response.json())
        .then(usuarios => {
            const usuarioValido = usuarios.find(
                u => u.usuario === usuarioIngresado && u.password === passwordIngresado
            );

            if (usuarioValido) {
                // Guardamos en sessionStorage que el usuario está logueado
                sessionStorage.setItem("usuarioLogueado", "true");
                sessionStorage.setItem("nombreUsuario", usuarioIngresado);

                Swal.fire({
                    icon: 'success',
                    title: '¡Bienvenido!',
                    text: `Acceso concedido para ${usuarioIngresado}`,
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true
                }).then(() => {
                    window.location.href = 'index.html';
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario o contraseña incorrectos'
                });
            }
        });
});
