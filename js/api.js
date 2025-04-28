async function fetchHolidays() {
    const splashScreen = document.getElementById('splashScreen');
    const holidaysList = document.getElementById('holidaysList');
    try {
        const response = await fetch('https://date.nager.at/api/v3/PublicHolidays/2025/CO');
        const data = await response.json();

        // Ocultar pantalla de carga
        splashScreen.style.display = 'none';

        // Llenar lista
        holidaysList.innerHTML = '';
        data.forEach(holiday => {
            const li = document.createElement('li');
            li.textContent = `${holiday.date}: ${holiday.localName}`;
            holidaysList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al cargar los días festivos:', error);
        holidaysList.innerHTML = '<li>Error al cargar los días festivos.</li>';
        splashScreen.style.display = 'none';
    }
}
