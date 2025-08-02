function mostrarOpcionesAdmin() {
  // Mensaje de administrador activo
  const container = document.querySelector("main.container");
  const mensajeAdmin = document.createElement("div");
  mensajeAdmin.className = "alert alert-warning text-center";
  mensajeAdmin.innerHTML = "<strong>Modo administrador activado</strong>";
  container.prepend(mensajeAdmin);

  // Insertar botones dentro del contenedor del carrusel
  const carruselContenedor = document.querySelector("#carruselMaquinarias");
  const botonesAdmin = document.createElement("div");
  botonesAdmin.className = "text-end mb-3";

  botonesAdmin.innerHTML = `
    <button class="btn btn-outline-success me-2" id="agregarMaquinaria">Agregar Maquinaria</button>
    <button class="btn btn-outline-danger me-2" id="editarMaquinas">Editar Maquinarias</button>
  `;

  const titulo = document.querySelector('h2.text-center.mb-4');
  titulo.insertAdjacentElement("afterend", botonesAdmin);

  // Eventos
  document.getElementById("editarMaquinas").addEventListener("click", () => {
    mostrarEditorMaquinarias();
  });

  document.getElementById("agregarMaquinaria").addEventListener("click", mostrarFormularioNuevaMaquinaria);
}

function mostrarEditorMaquinarias() {
  Promise.all([
    fetch("data/maquinarias.json").then(res => res.json()),
    fetch("data/imagenes.json").then(res => res.json())
  ]).then(([maquinarias, imagenes]) => {
    const lista = maquinarias.map((maq, i) => {
      const opciones = imagenes.map(img => `
        <option value="${img}" ${img === maq.imagen ? "selected" : ""}>${img}</option>
      `).join("");

      return `
        <div class="mb-4 border rounded p-3" data-index="${i}">
          <h5>${maq.nombre}</h5>
          <input type="text" class="form-control mb-2" value="${maq.descripcion}" data-campo="descripcion" placeholder="Descripción">

          <select class="form-select mb-2 selector-imagen" data-campo="imagen">
            <option disabled>Seleccioná una imagen</option>
            ${opciones}
          </select>

          <div class="vista-previa text-center mb-2">
            <img src="${maq.imagen}" style="max-height: 120px; border: 1px solid #ccc; border-radius: 4px; padding: 3px;">
          </div>

          <select class="form-select mb-2" data-campo="estado">
            <option ${maq.estado === "Disponible" ? "selected" : ""}>Disponible</option>
            <option ${maq.estado === "Alquilada" ? "selected" : ""}>Alquilada</option>
            <option ${maq.estado === "Vendida" ? "selected" : ""}>Vendida</option>
            <option ${maq.estado === "En reparación" ? "selected" : ""}>En reparación</option>
          </select>
        </div>
      `;
    }).join("");

    Swal.fire({
      title: "Editor de Maquinarias",
      html: `
        <div style="max-height: 400px; overflow-y: auto;">
          ${lista}
        </div>
      `,
      confirmButtonText: "Guardar cambios",
      willOpen: () => {
        // Mostrar la miniatura al cambiar imagen
        const selects = Swal.getPopup().querySelectorAll(".selector-imagen");
        selects.forEach(select => {
          select.addEventListener("change", (e) => {
            const preview = select.parentElement.querySelector(".vista-previa img");
            preview.src = e.target.value;
          });
        });
      },
      preConfirm: () => {
        const contenedores = Swal.getPopup().querySelectorAll("[data-index]");
        contenedores.forEach(div => {
          const i = div.dataset.index;
          const inputs = div.querySelectorAll("[data-campo]");

          inputs.forEach(input => {
            const campo = input.dataset.campo;
            maquinarias[i][campo] = input.value;
          });
        });

        // Guardar en localStorage
        localStorage.setItem("maquinariasEditadas", JSON.stringify(maquinarias));

        // Refrescar carrusel
        renderizarCarrusel(maquinarias);
      }
    });
  });
}

function mostrarFormularioNuevaMaquinaria() {
  fetch("data/imagenes.json")
    .then(res => res.json())
    .then(imagenes => {
      const opciones = imagenes.map(img => `<option value="${img}">${img}</option>`).join("");

      Swal.fire({
        title: 'Agregar Maquinaria',
        html: `
          <input type="text" id="nuevoNombre" class="form-control mb-2" placeholder="Nombre">
          <input type="text" id="nuevaDescripcion" class="form-control mb-2" placeholder="Descripción">
          
          <select id="nuevaImagen" class="form-select mb-2">
            <option disabled selected>Seleccioná una imagen</option>
            ${opciones}
          </select>
          
          <div id="previewImagen" class="mb-3 text-center">
            <img id="preview" src="" alt="Vista previa" style="max-width: 200px; display: none; border: 1px solid #ccc; padding: 4px; border-radius: 4px;">
          </div>

          <select id="nuevoTipo" class="form-select mb-2">
            <option value="Excavadora">Excavadora</option>
            <option value="Retroexcavadora">Retroexcavadora</option>
            <option value="Andamio">Andamio</option>
            <option value="Hormigonera">Hormigonera</option>
            <option value="Plataforma">Plataforma</option>
            <option value="Compactadora">Compactadora</option>
            <option value="Otro">Otro</option>
          </select>

          <select id="nuevoEstado" class="form-select mb-2">
            <option value="Disponible">Disponible</option>
            <option value="Alquilada">Alquilada</option>
            <option value="Vendida">Vendida</option>
            <option value="En reparación">En reparación</option>
          </select>

          <select id="nuevoModo" class="form-select">
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        `,
        confirmButtonText: 'Agregar',
        didOpen: () => {
          const selectorImagen = document.getElementById("nuevaImagen");
          const previewImg = document.getElementById("preview");

          selectorImagen.addEventListener("change", () => {
            const ruta = selectorImagen.value;
            if (ruta) {
              previewImg.src = ruta;
              previewImg.style.display = "block";
            } else {
              previewImg.style.display = "none";
            }
          });
        },
        preConfirm: () => {
          const nombre = document.getElementById("nuevoNombre").value.trim();
          const descripcion = document.getElementById("nuevaDescripcion").value.trim();
          const imagen = document.getElementById("nuevaImagen").value;
          const tipo = document.getElementById("nuevoTipo").value;
          const estado = document.getElementById("nuevoEstado").value;
          const modo = document.getElementById("nuevoModo").value;

          if (!nombre || !descripcion || !imagen || !tipo || !estado || !modo) {
            Swal.showValidationMessage('Completá todos los campos');
            return;
          }

          const nuevaMaquinaria = {
            id: Date.now(),
            nombre, descripcion, imagen, tipo, estado, modo
          };

          const maquinariasActuales = JSON.parse(localStorage.getItem("maquinariasEditadas")) || [];
          maquinariasActuales.push(nuevaMaquinaria);
          localStorage.setItem("maquinariasEditadas", JSON.stringify(maquinariasActuales));
          renderizarCarrusel(maquinariasActuales);
        }
      });
    });
}
