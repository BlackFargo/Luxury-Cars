# Car Shop Website

This is a simple e-commerce website for browsing and purchasing cars. Users can view car listings, filter by different criteria, search for specific cars, and add items to a shopping cart. The cart is saved in `localStorage` to persist data across page refreshes.

## Features

- **Car Listing**: Displays a list of cars retrieved from a JSON file.
- **Search**: Allows users to search for cars by title.
- **Filters**: Users can filter the cars using checkboxes.
- **Shopping Cart**: Add cars to the cart, modify quantities, and view the total price.
- **Cart Persistence**: The cart data is saved in `localStorage` to persist even after page refreshes.
- **Modal**: Opens a modal with a larger image when the user clicks on a car's image.
- **Theme Switcher**: Toggle between light and dark themes.
- **Lazy Loading**: Uses the Intersection Observer API to lazy load car images and optimize performance.

 
## How it Works

Main Page: Displays a list of cars. Each car can be added to the shopping cart by clicking a button.
Cart: The cart shows all added items, and users can increase or decrease quantities. The total price updates accordingly.
Theme Switcher: A button to toggle between dark and light themes.
Modal: Clicking on a car image opens a modal displaying a larger version of the image.
Search and Filters: Users can search for cars by title and filter the list using checkboxes.
Technologies Used
HTML: For creating the page structure.
CSS: For styling the page.
JavaScript: For handling interactivity and dynamic content.
localStorage: To persist the shopping cart across page reloads.

## License
This project is open source and available under the MIT License.

## Demo 
https://blackfargo.github.io/Luxury-Cars


