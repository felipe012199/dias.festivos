// Obtener el contenedor donde se mostrará la información
const informacionContainer = document.getElementById('informacion-tab');

// Función para mostrar información sobre los días festivos
function displayInformation() {
    const infoContent = `
        <h2>Información sobre los días festivos de Colombia 2025</h2>
        <p>Los días festivos en Colombia son días de descanso oficial, reconocidos por el gobierno. Durante estos días, las personas suelen celebrar diversas festividades que tienen un profundo significado cultural e histórico.</p>
        <p>En 2025, los días festivos incluyen celebraciones como el Día de los Reyes Magos, la Semana Santa, el Día de la Independencia, y la Navidad, entre otros.</p>
        <p>Para más detalles sobre cada uno de los días festivos, puedes consultar la lista completa de festividades disponibles en la pestaña de inicio.</p>
    `;

    // Mostrar la información en el contenedor
    informacionContainer.innerHTML = infoContent;
}

// Llamada para mostrar la información cuando la pestaña de información es activa
document.addEventListener('DOMContentLoaded', () => {
    displayInformation();
});
