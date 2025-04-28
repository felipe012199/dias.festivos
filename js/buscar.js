const searchInput = document.getElementById('searchInput');
const holidaysList = document.getElementById('holidaysList');

// Array para almacenar los días festivos obtenidos
let holidaysData = [];

// Función para mostrar los días festivos en la lista
function displayHolidays(holidays) {
    holidaysList.innerHTML = ''; // Limpiamos la lista

    if (holidays.length === 0) {
        holidaysList.innerHTML = '<li>No se encontraron días festivos.</li>';
    } else {
        holidays.forEach(holiday => {
            // Verificar la estructura de los datos antes de usarlos
            console.log('Día festivo:', holiday); // Depuración
            const li = document.createElement('li');
            li.textContent = `${holiday.date}: ${holiday.localName || 'Nombre no disponible'}`; // Verificar si 'localName' está disponible
            holidaysList.appendChild(li);
        });
    }
}

// Función para obtener los días festivos
async function fetchHolidays() {
    try {
        const response = await fetch('https://date.nager.at/Api/v3/PublicHolidays/2025/CO');
        holidaysData = await response.json();
        console.log('Días festivos obtenidos:', holidaysData);  // Para depurar

        // Verificamos si la respuesta contiene los datos esperados
        if (holidaysData && Array.isArray(holidaysData)) {
            displayHolidays(holidaysData);  // Mostrar todos los días festivos al principio
        } else {
            console.error('Estructura de datos inesperada:', holidaysData);
            holidaysList.innerHTML = '<li>Error al procesar los días festivos.</li>';
        }
    } catch (error) {
        console.error('Error al cargar los días festivos:', error);
        holidaysList.innerHTML = '<li>Error al cargar los días festivos.</li>';
    }
}

// Función para filtrar los días festivos según el término de búsqueda
function searchHolidays(query) {
    console.log('Buscando:', query);  // Para depurar

    // Asegurarnos de que query no está vacío y de que holidaysData tiene datos
    if (query.trim() === '') {
        displayHolidays(holidaysData); // Si no hay búsqueda, mostrar todos
    } else {
        // Filtrar los días festivos que contienen el término de búsqueda en el nombre o fecha
        const filteredHolidays = holidaysData.filter(holiday => {
            return holiday.localName.toLowerCase().includes(query.toLowerCase()) ||
                   holiday.date.includes(query);
        });

        displayHolidays(filteredHolidays);  // Mostrar los días festivos filtrados
    }
}

// Evento para manejar la entrada del usuario en el campo de búsqueda
searchInput.addEventListener('input', (event) => {
    searchHolidays(event.target.value);  // Filtrar con el término de búsqueda
});

// Llamada para obtener los días festivos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    fetchHolidays();
});
