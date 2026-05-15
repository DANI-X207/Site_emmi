(function () {
    const applyTheme = () => {
        const theme = localStorage.getItem('slj_theme') || 'blue';

        document.body.classList.remove('theme-blue'); /* legacy */
        if (theme === 'orange') {
            document.body.classList.add('theme-orange');
        } else {
            document.body.classList.remove('theme-orange');
        }
    };

    if (document.body) {
        applyTheme();
    } else {
        document.addEventListener('DOMContentLoaded', applyTheme);
    }

    window.setTheme = (themeName) => {
        localStorage.setItem('slj_theme', themeName);
        applyTheme();
    };

    window.getTheme = () =>
        document.body.classList.contains('theme-orange') ? 'orange' : 'blue';
})();
