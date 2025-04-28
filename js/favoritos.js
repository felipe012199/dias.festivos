const monthFilter = document.getElementById('monthFilter');
const yearFilter = document.getElementById('yearFilter');
const holidaysList = document.getElementById('holidaysList');

// Variables globales
let holidaysData = [];

// Función para mostrar los días festivos
function displayHolidays(holidays) {
    holidaysList.innerHTML = ''; // Limpiar la lista

    if (holidays.length === 0) {
        holidaysList.innerHTML = '<li>No se encontraron días festivos.</li>';
    } else {
        holidays.forEach(holiday => {
            const li = document.createElement('li');
            li.textContent = `${holiday.date}: ${holiday.name}`;
            holidaysList.appendChild(li);
        });
    }
}

// Función para obtener los días festivos
async function fetchHolidays() {
    try {
        const response = await fetch('https://date.nager.at/Api/v2/PublicHolidays/2025/CO');
        holidaysData = await response.json();
        displayHolidays(holidaysData);  // Mostrar todos los días festivos al principio
    } catch (error) {
        console.error('Error al cargar los días festivos:', error);
        holidaysList.innerHTML = '<li>Error al cargar los días festivos.</li>';
    }
}

// Función para filtrar los días festivos según el mes y el año seleccionados
function filterHolidays() {
    const selectedMonth = monthFilter.value;
    const selectedYear = yearFilter.value;

    // Filtrar los días festivos por mes y año
    const filteredHolidays = holidaysData.filter(holiday => {
        const holidayDate = new Date(holiday.date);
        const monthMatches = selectedMonth ? holidayDate.getMonth() + 1 === parseInt(selectedMonth) : true;
        const yearMatches = selectedYear ? holidayDate.getFullYear() === parseInt(selectedYear) : true;

        return monthMatches && yearMatches;
    });

    displayHolidays(filteredHolidays);  // Mostrar los días festivos filtrados
}

// Evento para aplicar el filtro cuando el usuario cambia los valores de mes o año
monthFilter.addEventListener('change', filterHolidays);
yearFilter.addEventListener('change', filterHolidays);

// Llamada para obtener los días festivos cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    fetchHolidays();
});
