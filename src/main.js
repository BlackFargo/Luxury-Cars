import { createCard, updateCardsList } from './scripts/Components/Card/card.js'
import { setupSearchEvent } from './scripts/Features/search.js'
import { openModal, closeModal } from './scripts/Components/UI/modal.js'
import arrowUp from './scripts/Features/arrowUp.js'
import {
	filterCardsByCheckbox,
	carCheckBoxes,
	checkBoxesContainer,
} from './scripts/Components/UI/checkbox.js'
import { cartList, createCartItem } from './scripts/Components/cart/cart.js'
import { addCartItem, OrderCartItems } from './scripts/Components/cart/cartAlert.js'
import { initThemeSwitcher } from './scripts/Features/themeSwitcher.js'

const cartOrder = document.querySelector('.cart__footer-order')
let search = document.querySelector('#inpSearch')
const cardsContainer = document.querySelector('.cards')
const dialogImage = document.querySelector('#dialogImage')
const dialog = document.querySelector('dialog')
let titles = document.querySelectorAll('.card__title')
let cards = document.querySelectorAll('.card')
import {cardViewObserver, cardImgObserver} from './scripts/Features/scrollEvents.js'
import { addTextInMessage, deleteCarInMessage } from './scripts/Components/UI/message.js'

const cartItems = JSON.parse(localStorage.getItem('Cars')) || {};

console.log(cartItems)


initThemeSwitcher()

checkBoxesContainer.addEventListener('click', e => {
    if (e.target.classList.contains('search__checkbox-input')) {

        filterCardsByCheckbox(cards)

        const test = document.querySelectorAll('.search__checkbox-input');
        const condition = [...test].some(item => item.checked);
 
        if(!condition) {
            setTimeout(() => {
            cards = document.querySelectorAll('.card')
            titles = document.querySelectorAll('.card__title')
             search.replaceWith(search.cloneNode(true));
            search = document.querySelector('#inpSearch');
            
            setupSearchEvent(search, titles, cards);
            }, 100)
          
        }
    
  
        setTimeout(() => {
            let newCards = document.querySelectorAll('.show')
            let newTitles = [...newCards].map(card => card.querySelector('.card__title'))
            console.log(newCards)


            search.replaceWith(search.cloneNode(true));
            search = document.querySelector('#inpSearch');
            
            setupSearchEvent(search, newTitles, newCards);
        }, 50) 
    }
})

function loadData() {
    fetch('/Cars/cars.json')
	.then(response => response.json())
	.then(data => {
       
       
        if (data.length === 0) return;
		data.forEach(car => {
			const cardHTML = createCard(car)
			const cardElement = document.createElement('div')
			cardElement.innerHTML = cardHTML
			const card = cardElement.firstChild
      
			card.carBrand = car.brand

			cardsContainer.insertAdjacentElement('beforeend', card)
		})

		cardsContainer.addEventListener('click', event => {
			if (event.target.tagName === 'BUTTON') {
				const cardElement = event.target.closest('.card')
				const carTitle = cardElement.querySelector('.card__title').textContent
				const car = data.find(item => item.title === carTitle)
                addTextInMessage(carTitle)

				if (car) {
					if (cartItems[car.title]) {
						cartItems[car.title].quantity += 1
					} else {
						cartItems[car.title] = { ...car, quantity: 1 }
					}
					updateCartUI()
				}
			}
		})

		cards = document.querySelectorAll('.card')
        const images = document.querySelectorAll('.img')
        cards.forEach(card => cardViewObserver.observe(card))
        images.forEach(card => cardImgObserver.observe(card))
		filterCardsByCheckbox(cards)

		const { titles: updatedTitles, cards: updatedCards } = updateCardsList()
		titles = updatedTitles
		cards = updatedCards
        console.log(cards)
      
      
		
		setupSearchEvent(search, titles, updatedCards)
	})
	.catch(e => {
		console.error('Error loading cars data:', e)
		cardsContainer.innerHTML =
			'<p class="error-message">Failed to load cars. Please try again later.</p>'
	})
}
loadData(0, 4)

cardsContainer.addEventListener('click', e => {
	if (e.target.classList.contains('img')) {
		const src = e.target.getAttribute('src')
		openModal(dialogImage, dialog, src)
	}
})

dialog.addEventListener('click', e => {
	if (e.target === dialog) {
		closeModal(dialog)
	}
})

dialog.addEventListener('cancel', () => {
	closeModal(dialog)
})
let total = 0
const totalPrice = document.querySelector('.cart__footer-total')

function updateCartUI() {
    cartList.innerHTML = '';
    total = Object.values(cartItems).reduce((sum, car) => {
        const price = parseFloat(car.price.replace(',', '').replace('$', ''));
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = createCartItem(car, car.quantity);
        
        const newItem = cartItemElement.firstChild;
        newItem.classList.add('hide'); 
        cartList.appendChild(newItem);
        localStorage.setItem('Cars', JSON.stringify(cartItems))
        
        setTimeout(() => newItem.classList.replace('hide', 'show'), 10); 
        
        return sum + price * car.quantity;
    }, 0);
    totalPrice.innerHTML = `Total price: ${total.toFixed(2)}$`;
}

function updateCartItemQuantity(carTitle, operation) {
    if (!cartItems[carTitle]) return;
    
    if (operation === 'increase') {
        cartItems[carTitle].quantity += 1;
    } else {
        if (cartItems[carTitle].quantity > 1) {
            cartItems[carTitle].quantity -= 1;
        } else {
            removeCartItemWithAnimation(carTitle);
            return;
        }
    }
    updateCartUI();
}

if(Object.keys(cartItems).length !== 0) {
    updateCartUI()
}


function removeCartItemWithAnimation(carTitle) {
    const itemElement = [...cartList.children].find(item =>
        item.querySelector('.cart__list-item-title')?.textContent === carTitle
    );

    if (!itemElement) return;
    
    itemElement.classList.replace('show', 'hide'); 
    
    setTimeout(() => {
        itemElement.remove();
        deleteCarInMessage(carTitle);
        delete cartItems[carTitle]; 
        localStorage.setItem('Cars', JSON.stringify(cartItems)); 
        updateCartUI();
    }, 300);
}


cartOrder.addEventListener('click', () => {
    if (Object.keys(cartItems).length === 0) return;
    
    cartList.innerHTML = '';
    totalPrice.innerHTML = `Total price: 0$`;
    OrderCartItems();
    cartItems = {};
});

cartList.addEventListener('click', e => {
    const item = e.target.closest('.cart__list-item');
  
    if (!item) return;
    
    const carTitle = item.querySelector('.cart__list-item-title')?.textContent;
    if (!carTitle) return;
    
    if (e.target.classList.contains('cart__list-item-plus')) {
        updateCartItemQuantity(carTitle, 'increase');
    } else if (e.target.classList.contains('cart__list-item-minus')) {
        updateCartItemQuantity(carTitle, 'decrease');
    }
});


window.addEventListener('resize', () => {
    if(window.innerWidth < 375 ) {
        search.placeholder = 'Interested car'
    } else {
          search.placeholder = 'Write the product you are interested in'
    }
})

