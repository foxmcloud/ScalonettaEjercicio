// ==================================================================================================
// ARCHIVO: script.js
// OBJETIVO: Demostrar las operaciones básicas del DOM y JavaScript
//           Utilizando el ejemplo de "La Scalonetta Interactiva"
// ==================================================================================================

// --- PARTE 1: VINCULAR JAVASCRIPT A HTML ---
// (Este paso se realiza en el archivo index.html con <script src="script.js" defer></script>)
// La palabra clave 'defer' en la etiqueta script asegura que este código JS
// solo se ejecute cuando todo el HTML de la página haya sido cargado y parseado.
// Esto es CRUCIAL porque nuestro JS intentará interactuar con elementos HTML
// que deben existir en el DOM para poder ser seleccionados y manipulados.

// El evento 'DOMContentLoaded' es una buena práctica para asegurar que el DOM esté listo.
// Todo nuestro código JavaScript principal irá dentro de este 'listener'.
document.addEventListener('DOMContentLoaded', () => {

    console.log('DOM completamente cargado y listo para JavaScript.');

    // ==============================================================================================
    // --- PARTE 2: SELECCIONAR ELEMENTOS DEL DOM ---
    // Aquí obtenemos referencias a los elementos HTML con los que queremos trabajar.
    // Usamos diferentes métodos de selección para demostrar su uso.
    // ==============================================================================================

    // .getElementById(): Para seleccionar elementos por su ID único. Son los más directos.
    const tituloPrincipal = document.getElementById('tituloPrincipal');
    const logoAfa = document.getElementById('logoAfa');
    const parrafoInfo = document.getElementById('parrafoInfo');
    const btnResaltarMundial = document.getElementById('btnResaltarMundial');
    const btnAlternarTema = document.getElementById('btnAlternarTema');
    const listaJugadores = document.getElementById('lista-jugadores'); // El <ul> padre, clave para delegación de eventos
    const btnDestacarLio = document.getElementById('btnDestacarLio');
    const btnRemoverUltimo = document.getElementById('btnRemoverUltimo');
    const infoJugadorSeleccionado = document.getElementById('info-jugador-seleccionado'); // El <div> de detalles
    const formAnadirJugador = document.getElementById('form-anadir-jugador');
    const inputNombreJugador = document.getElementById('nombreJugador');
    const inputPosicionJugador = document.getElementById('posicionJugador');
    const copyright = document.getElementById('copyright');

    // La variable `jugadores` (para `querySelectorAll`) es útil para el mouseover/mouseout si no usamos delegación
    // para esos eventos. Para los botones 'Ver Detalles', nos apoyamos 100% en la delegación.
    // La variable `btnsVerDetalles` no es necesaria si usamos delegación de eventos para los clics.
    // la eliminamos para evitar confusiones.

    copyright.textContent = '© 2025 Scalonetta Mágica. ¡Vamos Argentina!'
    // ==============================================================================================
    // --- PARTE 3: ASIGNAR ESTILO CON JAVASCRIPT ---
    // Demostramos cómo cambiar el CSS de los elementos.
    // Preferimos usar .classList para la mayoría de los cambios por su mejor práctica.
    // ==============================================================================================

    // Ejemplo de estilo directo (.style.propiedad = valor)
    // Al pasar el ratón sobre el título, lo agrandamos un poco.
    tituloPrincipal.addEventListener('mouseover', () => {
        tituloPrincipal.style.transform = 'scale(1.02)';
        tituloPrincipal.style.transition = 'transform 0.2s ease'; // Añadimos transición para suavizar
        tituloPrincipal.style.color = 'red';
    });
    tituloPrincipal.addEventListener('mouseout', () => {
        tituloPrincipal.style.transform = 'scale(1)';
        tituloPrincipal.style.color = 'white';
    });


    // Ejemplo de manipulación de clases (.classList.toggle, .classList.contains)
    // Botón para resaltar el año del Mundial en el párrafo de info.
    btnResaltarMundial.addEventListener('click', () => {
        const textoOriginal = '<strong>Copa del Mundo 2022</strong>';
        const textoResaltado = '<strong class="resaltado-info">Copa del Mundo 2022</strong>';

        if (parrafoInfo.innerHTML.includes(textoResaltado)) {
            parrafoInfo.innerHTML = parrafoInfo.innerHTML.replace(textoResaltado, textoOriginal);
        } else {
            parrafoInfo.innerHTML = parrafoInfo.innerHTML.replace(textoOriginal, textoResaltado);
        }
    });

    // Botón para alternar el tema (modo oscuro) de la página.
    btnAlternarTema.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
             logoAfa.style.filter = 'invert(100%) sepia(100%) saturate(0%) hue-rotate(270deg) brightness(150%) contrast(100%)';
        } else {
             logoAfa.style.filter = 'none';
        }
    });

    // ==============================================================================================
    // --- PARTE 4: MANIPULAR TEXTO EN EL DOM ---
    // ==============================================================================================

    // Modificar el texto de un placeholder en el input al enfocarlo (ejemplo de .placeholder)
    inputNombreJugador.addEventListener('focus', () => {
        inputNombreJugador.placeholder = "Ej: Julián Álvarez";
    });
    inputNombreJugador.addEventListener('blur', () => { // Cuando el input pierde el foco
        inputNombreJugador.placeholder = ""; // Lo dejamos vacío de nuevo
    });


    // ==============================================================================================
    // --- PARTE 5: ATRIBUTOS CON JAVASCRIPT ---
    // Manipulamos los atributos HTML de los elementos.
    // ==============================================================================================

    // Cambiar la imagen del logo de la AFA y su tamaño al hacer clic.
    let logoOriginalSrc = logoAfa.getAttribute('src');
    let logoAlternoSrc = 'https://guiaimpresion.com/wp-content/uploads/2024/03/image.png'; // Una imagen alternativa para el logo

    logoAfa.addEventListener('click', () => {
        if (logoAfa.getAttribute('src') === logoOriginalSrc) {
            logoAfa.setAttribute('src', logoAlternoSrc);
            logoAfa.setAttribute('width', '80');
            logoAfa.setAttribute('alt', 'Logo antiguo de AFA');
        } else {
            logoAfa.setAttribute('src', logoOriginalSrc);
            logoAfa.setAttribute('width', '100');
            logoAfa.setAttribute('alt', 'Logo AFA - Asociación del Fútbol Argentino');
        }
    });


    // ==============================================================================================
    // --- PARTE 6: OPERACIONES IMPORTANTES EN EL DOM (CREAR, AGREGAR, REMOVER) ---
    // Cómo añadir y quitar elementos de la página dinámicamente.
    // ==============================================================================================

    // Botón para destacar a Messi (ejemplo de selección con querySelector y uso de .classList)
    btnDestacarLio.addEventListener('click', () => {
        const messiLi = document.querySelector('#lista-jugadores li[data-id="10"]');
        if (messiLi) {
            messiLi.classList.toggle('jugador-destacado');
            if (messiLi.classList.contains('jugador-destacado')) {
                messiLi.querySelector('span').textContent = 'Lionel Messi (¡GOAT!)';
            } else {
                messiLi.querySelector('span').textContent = 'Lionel Messi';
            }
        }
    });

    // Botón para remover el último jugador de la lista.
    btnRemoverUltimo.addEventListener('click', () => {
        const ultimoJugador = listaJugadores.lastElementChild;
        if (ultimoJugador) {
            ultimoJugador.remove();
            console.log('Último jugador removido.');
        } else {
            alert('¡No quedan más jugadores en la lista para remover!');
        }
    });

    // Formulario para añadir un nuevo jugador dinámicamente.
    formAnadirJugador.addEventListener('submit', (e) => {
        e.preventDefault(); // IMPORTANTE: Evita que el formulario recargue la página.

        const nombre = inputNombreJugador.value.trim();
        const posicion = inputPosicionJugador.value.trim();

        if (nombre && posicion) {
            // 1. Crear un nuevo elemento <li>
            const nuevoLi = document.createElement('li');

            // 2. Añadir clases y atributos al nuevo elemento
            nuevoLi.classList.add('jugador');
            nuevoLi.setAttribute('data-id', Date.now());
            nuevoLi.setAttribute('data-posicion', posicion);

            // 3. Establecer el contenido HTML del nuevo elemento
            nuevoLi.innerHTML = `<span>${nombre}</span> <button class="btn-ver-detalles">Ver Detalles</button>`;

            // 4. Añadir el nuevo elemento a la lista existente en el DOM
            listaJugadores.appendChild(nuevoLi);

            console.log(`Jugador "${nombre}" añadido con éxito.`);

            // Limpiar los campos del formulario después de añadir
            inputNombreJugador.value = '';
            inputPosicionJugador.value = '';

            // IMPORTANTE: Con la delegación de eventos (ver PARTE 7),
            // no necesitamos llamar a ninguna función aquí para adjuntar listeners al nuevo botón.
            // El listener en 'listaJugadores' ya lo maneja automáticamente.
        } else {
            alert('¡Por favor, completa el nombre y la posición para añadir al jugador!');
        }
    });


    // ==============================================================================================
    // --- PARTE 7: JERARQUÍA DEL DOM (TRAVERSAL) Y MANEJO DE EVENTOS (DELEGACIÓN DE EVENTOS) ---
    // Cómo navegar entre elementos y adjuntar funciones a eventos de forma eficiente.
    // Esta es la solución ideal para elementos creados dinámicamente.
    // ==============================================================================================

    // Función para mostrar los detalles de un jugador en la sección 'info-jugador-seleccionado'.
    function mostrarDetallesJugador(jugadorLi) {
        // Traversal: Usamos .getAttribute para obtener los datos personalizados.
        const id = jugadorLi.getAttribute('data-id');
        // Traversal: Usamos .querySelector('span') para encontrar el <span> hijo y obtener su texto.
        const nombre = jugadorLi.querySelector('span').textContent;
        const posicion = jugadorLi.getAttribute('data-posicion');
        // Traversal: Usamos .classList.contains para verificar si tiene la clase 'campeonMundo'.
        const esCampeonMundo = jugadorLi.classList.contains('campeonMundo') ? 'Sí' : 'No';

        // Llenamos el div de detalles con el HTML generado.
        infoJugadorSeleccionado.innerHTML = `
            <h3>${nombre}</h3>
            <p><strong>ID de Jugador:</strong> ${id}</p>
            <p><strong>Posición:</strong> ${posicion}</p>
            <p><strong>Campeón del Mundo 2022:</strong> ${esCampeonMundo}</p>
            <p>¡${nombre} es una pieza clave en La Scalonetta!</p>
        `;

        // Desresaltar cualquier jugador previamente seleccionado
        // Asegúrate de que `jugadores` se obtenga de nuevo para incluir los dinámicos
        document.querySelectorAll('.jugador').forEach(li => {
            li.classList.remove('jugador-seleccionado'); // Remover la clase de todos
        });
        // Resaltar el jugador actual
        jugadorLi.classList.add('jugador-seleccionado');
    }

    // --- DELEGACIÓN DE EVENTOS PARA LOS BOTONES "VER DETALLES" ---
    // En lugar de añadir un listener a cada botón individualmente,
    // añadimos un único listener al padre común (la lista <ul>).
    // Esto funciona para los jugadores que vienen en el HTML inicial Y para los que se añaden dinámicamente.
    listaJugadores.addEventListener('click', (event) => {
        // event.target es el elemento EXACTO donde ocurrió el clic.
        // Verificamos si el elemento clicado tiene la clase 'btn-ver-detalles'.
        if (event.target.classList.contains('btn-ver-detalles')) {
            // Si es un botón "Ver Detalles", obtenemos su elemento padre (el <li> del jugador).
            // .parentNode nos da el padre inmediato, que en este caso es el <li>.
            const jugadorLi = event.target.parentNode;
            mostrarDetallesJugador(jugadorLi); // Llamamos a la función con el <li> correcto
        }
    });

    // --- Evento mouseover/mouseout para resaltar al pasar el ratón (también usando delegación) ---
    // Esto asegura que los nuevos jugadores también tengan este efecto.
    listaJugadores.addEventListener('mouseover', (event) => {
        // .closest() busca el ancestro más cercano (incluyendo el propio elemento)
        // que coincida con el selector CSS dado. Es ideal para la delegación.
        const jugadorLi = event.target.closest('.jugador');
        if (jugadorLi && !jugadorLi.classList.contains('jugador-destacado') && !jugadorLi.classList.contains('jugador-seleccionado')) {
            jugadorLi.style.backgroundColor = '#e0f7fa'; // Azul claro al pasar el ratón
        }
    });

    listaJugadores.addEventListener('mouseout', (event) => {
        const jugadorLi = event.target.closest('.jugador');
        if (jugadorLi && !jugadorLi.classList.contains('jugador-destacado') && !jugadorLi.classList.contains('jugador-seleccionado')) {
            // Volver al color original según el modo de tema
            if (document.body.classList.contains('dark-mode')) {
                jugadorLi.style.backgroundColor = '#5d6d7e';
            } else {
                jugadorLi.style.backgroundColor = '#eaf2f8';
            }
        }
    });

}); // Fin del evento 'DOMContentLoaded'