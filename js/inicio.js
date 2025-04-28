// Elementos de la interfaz
const holidaysList = document.getElementById('holidaysList');
const favoritosList = document.getElementById('favoritos-list');

// Función para mostrar la pestaña activa
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

// Función para obtener los días festivos
async function fetchHolidays() {
    try {
        const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2025/CO');
        const data = await response.json();

        holidaysList.innerHTML = '';

        data.forEach(holiday => {
            const li = document.createElement('li');
            li.textContent = `${holiday.date}: ${holiday.localName}`;

            // Botón para agregar a favoritos
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'Agregar a Favoritos';
            favoriteButton.addEventListener('click', () => addToFavorites(holiday));

            li.appendChild(favoriteButton);
            holidaysList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar los días festivos:', error);
        holidaysList.innerHTML = '<li>Error al cargar los días festivos.</li>';
    }
}

// Función para agregar un día festivo a favoritos
function addToFavorites(holiday) {
    const li = document.createElement('li');
    li.textContent = `${holiday.date}: ${holiday.localName}`;

    // Agregar el festivo a la lista de favoritos
    favoritosList.appendChild(li);
}

// Llamamos a la función cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
    showTab('inicio');
    fetchHolidays();
});
