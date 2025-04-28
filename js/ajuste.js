const themeSwitch = document.getElementById('themeSwitch');
const languageSelect = document.getElementById('languageSelect');

// Comprobar si hay preferencias guardadas
document.addEventListener('DOMContentLoaded', () => {
    // Recuperar tema y lenguaje guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    const savedLanguage = localStorage.getItem('language');

    // Aplicar tema guardado
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeSwitch.checked = true;  // Marcar el interruptor si es oscuro
    }

    // Aplicar idioma guardado
    if (savedLanguage) {
        languageSelect.value = savedLanguage;
    }

    // Agregar eventos de cambio
    themeSwitch.addEventListener('change', toggleTheme);
    languageSelect.addEventListener('change', changeLanguage);
});

// Función para alternar entre tema oscuro y claro
function toggleTheme() {
    if (themeSwitch.checked) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');  // Guardar tema en localStorage
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');  // Guardar tema en localStorage
    }
}

// Función para cambiar el idioma
function changeLanguage() {
    const selectedLanguage = languageSelect.value;
    localStorage.setItem('language', selectedLanguage);  // Guardar idioma en localStorage

    // Aquí podrías implementar el cambio real del idioma, como cambiar textos en la UI
    console.log(`Idioma seleccionado: ${selectedLanguage}`);
}
