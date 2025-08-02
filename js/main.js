document.addEventListener("DOMContentLoaded", () => {
    let maquinarias;
    const guardadas = localStorage.getItem("maquinariasEditadas");
    const toggleBtn = document.getElementById("toggleDarkMode");
    const icon = toggleBtn.querySelector("i");

    function actualizarIconoModoOscuro() {
        if (document.body.classList.contains("dark-mode")) {
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
            toggleBtn.title = "Modo claro";
        } else {
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
            toggleBtn.title = "Modo oscuro";
        }
    }

    if (localStorage.getItem("modoOscuro") === "true") {
        document.body.classList.add("dark-mode");
    }
    actualizarIconoModoOscuro();

    // Escuchar clic en el botón
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("modoOscuro", document.body.classList.contains("dark-mode"));
        actualizarIconoModoOscuro();
    });

    if (guardadas) {
        maquinarias = JSON.parse(guardadas);
        renderizarCarrusel(maquinarias);
    } else {
        fetch('data/maquinarias.json')
            .then(response => response.json())
            .then(data => {
                maquinarias = data;
                renderizarCarrusel(maquinarias);
            })
            .catch(error => console.error('Error cargando maquinarias:', error));
    }

    // Enviar formulario de contacto
    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        if (nombre && correo && mensaje) {
            Swal.fire({
                icon: "success",
                title: "Mensaje enviado",
                text: "Gracias por contactarte con Lalo Servicios"
            });
            form.reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Campos incompletos",
                text: "Por favor completá todos los campos"
            });
        }
    });

    // Botón de login/cierre de sesión dinámico
    const loginBtn = document.getElementById("btnLogin");
    const saludoSpan = document.getElementById("saludoUsuario");

    if (loginBtn) {
        const logueado = sessionStorage.getItem("usuarioLogueado") === "true";
        const nombre = sessionStorage.getItem("nombreUsuario") || "";

        if (logueado) {
    loginBtn.textContent = "Cerrar Sesión";
    loginBtn.classList.remove("btn-outline-light");
    loginBtn.classList.add("btn-outline-warning");

    if (saludoSpan) {
        saludoSpan.textContent = `Hola, ${nombre} 👋`;
    }

    loginBtn.addEventListener("click", () => {
        sessionStorage.clear();

        Swal.fire({
            icon: "info",
            title: "Sesión cerrada",
            text: "Has cerrado sesión correctamente",
            timer: 2000,
            showConfirmButton: false
        }).then(() => {
            window.location.reload();
        });
    });
}
 else {
            loginBtn.textContent = "Iniciar Sesión";
            loginBtn.classList.remove("btn-outline-warning");
            loginBtn.classList.add("btn-outline-light");

            if (saludoSpan) {
                saludoSpan.textContent = "";
            }

            loginBtn.addEventListener("click", () => {
                window.location.href = "login.html";
            });
        }
    }

    // Mostrar opciones admin si está logueado
    const logueado = sessionStorage.getItem("usuarioLogueado") === "true";
    if (logueado) {
        mostrarOpcionesAdmin();
    }

    // Mostrar botón cuando se baja el scroll
    window.addEventListener("scroll", () => {
        const btn = document.getElementById("btnScrollTop");
        if (window.scrollY > 300) {
            btn.style.display = "block";
        } else {
            btn.style.display = "none";
        }
    });

    // Scroll suave hacia arriba
    document.getElementById("btnScrollTop").addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});

// Función para renderizar las maquinarias en el carrusel
function renderizarCarrusel(maquinarias) {
    const logueado = sessionStorage.getItem("usuarioLogueado") === "true";

    const carouselInner = document.getElementById('carousel-inner');
    carouselInner.innerHTML = "";

    const chunkSize = window.innerWidth < 768 ? 1 : 3;
    for (let i = 0; i < maquinarias.length; i += chunkSize) {
        const chunk = maquinarias.slice(i, i + chunkSize);

        const slide = document.createElement('div');
        slide.className = `carousel-item ${i === 0 ? 'active' : ''}`;

        const row = document.createElement('div');
        row.className = 'row justify-content-center';

        chunk.forEach((maq, index) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 position-relative';

            const maquinariaIndex = maquinarias.findIndex(m => m.id === maq.id); // Para eliminar correctamente

            col.innerHTML = `
                <div class="card h-100 text-center shadow-sm position-relative">
                  ${logueado ? `
                    <button class="btn btn-sm btn-danger position-absolute top-0 end-0 m-2 btn-eliminar" data-index="${maquinariaIndex}" title="Eliminar maquinaria">
                      &times;
                    </button>
                  ` : ''}
                  <img src="${maq.imagen}" class="card-img-top img-carrusel" alt="${maq.nombre}">
                  <div class="card-body">
                    <h5 class="card-title">${maq.nombre}</h5>
                    <p class="card-text">${maq.descripcion}</p>
                    <span class="badge bg-primary">${maq.tipo}</span>
                    <span class="badge bg-${maq.estado === 'Disponible' ? 'success' : 'warning'}">${maq.estado}</span>
                    <span class="badge bg-info">${maq.modo}</span>
                  </div>
                </div>
            `;

            row.appendChild(col);
        });

        slide.appendChild(row);
        carouselInner.appendChild(slide);
    }

    const carousel = new bootstrap.Carousel(document.getElementById('carruselMaquinarias'), {
        interval: false
    });

    document.getElementById('prevBtn').addEventListener('click', () => carousel.prev());
    document.getElementById('nextBtn').addEventListener('click', () => carousel.next());

    // Evento de eliminar maquinaria
    if (logueado) {
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
        botonesEliminar.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = parseInt(btn.dataset.index);
                Swal.fire({
                    title: "¿Eliminar maquinaria?",
                    text: "Esta acción quitará la máquina del carrusel.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Sí, eliminar",
                    cancelButtonText: "Cancelar"
                }).then(result => {
                    if (result.isConfirmed) {
                        const maquinariasGuardadas = JSON.parse(localStorage.getItem("maquinariasEditadas")) || [];
                        maquinariasGuardadas.splice(index, 1);
                        localStorage.setItem("maquinariasEditadas", JSON.stringify(maquinariasGuardadas));
                        renderizarCarrusel(maquinariasGuardadas);
                        Swal.fire("Eliminada", "La maquinaria fue eliminada correctamente", "success");
                    }
                });
            });
        });
    }
}