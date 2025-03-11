export function initThemeSwitcher() {
    const switcher = document.querySelector('.header__actions-checkbox');

    if (!switcher) return; 

    const theme = JSON.parse(localStorage.getItem('theme'));

    if (theme === true) {
        document.body.classList.add('dark');
        switcher.checked = true;
    } else {
        document.body.classList.remove('dark');
        switcher.checked = false;
    }

    switcher.addEventListener('click', () => {
      
        document.body.classList.toggle('dark');


        localStorage.setItem('theme', JSON.stringify(document.body.classList.contains('dark')));
    });
}
