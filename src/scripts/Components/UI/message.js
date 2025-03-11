const messageText = document.querySelector('.message-text');
const message = document.querySelector('.message');

export function addTextInMessage(text) {
    if (text) {
        message.style.display = 'block';
        messageText.textContent = `The car ${text} has been added to the cart`;

        requestAnimationFrame(() => {
            message.classList.remove('hide');
            message.classList.add('show');
        });

        setTimeout(() => {
            requestAnimationFrame(() => {
                message.classList.remove('show');
                message.classList.add('hide');
            });
        }, 1000);

        setTimeout(() => {
            requestAnimationFrame(() => {
                message.style.display = 'none';
            });
        }, 1300);
    }
}
export function deleteCarInMessage(text) {
    if (text) {
        message.style.display = 'block';
        messageText.textContent = `The car ${text} has been deleted from the cart`;

        requestAnimationFrame(() => {
            message.classList.remove('hide');
            message.classList.add('show');
        });

        setTimeout(() => {
            requestAnimationFrame(() => {
                message.classList.remove('show');
                message.classList.add('hide');
            });
        }, 1000);

        setTimeout(() => {
            requestAnimationFrame(() => {
                message.style.display = 'none';
            });
        }, 1300);
    }
}



window.addEventListener('scroll', () => {
    if(window.scrollY > 100) {
        message.style.zIndex = '100'
    }
})