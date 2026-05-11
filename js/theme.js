(function () {
    const applyTheme = () => {
        const theme = localStorage.getItem('slj_theme') || 'orange';
        if (theme === 'blue') {
            document.body.classList.add('theme-blue');
        } else {
            document.body.classList.remove('theme-blue');
        }
    };

    // Apply immediately if DOM is ready, or wait
    if (document.body) {
        applyTheme();
    } else {
        document.addEventListener('DOMContentLoaded', applyTheme);
    }

    // Export to global for settings page
    window.setTheme = (themeName) => {
        localStorage.setItem('slj_theme', themeName);
        applyTheme();
    };
})();
