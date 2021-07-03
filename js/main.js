let addcart = document.querySelectorAll('.section__cart__addbtn');

let products = [
    {
        name: 'Full Campaign',
        tag: 'Full',
        price: 1500,
        cart: 0
    },
    {
        name: 'Copy Work',
        tag: 'Copy',
        price: 800,
        cart: 0
    },
    {
        name: 'CM Work',
        tag: 'CM',
        price: 300,
        cart: 0
    }
];

for (let i=0; i < addcart.length; i++) {
    addcart[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.navbar__list__cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.navbar__list__cart span').textContent = 1;
    }

    setItems(products);
}

function setItems(products) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
               [products.tag]: products 
            }
        } 
        cartItems[products.tag].cart += 1;
    } else {
        products.cart = 1;
        cartItems = {
          [products.tag]: products
        }  
    }
    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');

    if (cartCost != null) { 
        cartCost = parseInt(cartCost)
        localStorage.setItem("totalCost", cartCost + products.price);    
    } else {
        localStorage.setItem("totalCost", products.price); 
    }    
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart')
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.section__cart__products');
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="section__cart__products">
               <ion-icon name="close-circle-outline"></ion-icon>
               <img src="./images/${item.tag}".jpg>
               <span>${item.name}</span
            </div>
            <div class="section__cart__price">${item.price},00</div>
            <div class="section__cart__qty">
               <ion-icon name="chevron-back-outline"></ion-icon>
               <span>${item.cart}</span>
               <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <div class="section__cart__total">
               ${item.cart * item.price},00
            </div>
            `
        });
    }
}

displayCart();