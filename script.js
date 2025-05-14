const products = [
    { id: 1, name: 'Maize Flour', category: 'food', brand: 'brandA', price: 120, image: 'Assets/Images/ugali.jpg' },
    { id: 2, name: 'Toilet Paper', category: 'toiletries', brand: 'brandB', price: 80, image: 'Assets/Images/tissue.jpg'  },
    { id: 3, name: 'Cooking Oil', category: 'food', brand: 'brandB', price: 250, image: 'Assets/Images/fresh.jpeg'  },
    { id: 4, name: 'Soap', category: 'toiletries', brand: 'brandA', price: 50, image: 'Assets/Images/soap.webp'  },
];

const productList = document.getElementById('product-list');
const categoryFilter = document.getElementById('categoryFilter');
const brandFilter = document.getElementById('brandFilter');
const cartcount = document.getElementById('cart-count');
const toast = document.getElementById('toast');


function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartcount.textContent = count;
}

function renderProducts(list) {
    productList.innerHTML = '';
    if (list.length === 0) {
        productList.innerHTML = '<p>No products found</p>';
        return;
    }
    list.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>KES ${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

function filterProducts() {
    const category = categoryFilter.value;
    const brand = brandFilter.value;
    const filtered = products.filter(p => {
    return (category === 'all' || p.category === category) &&
            (brand === 'all' || p.brand === brand);
    });
    renderProducts(filtered);
}
function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id == productId);
    const existing = cart.find(item => item.id == productId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart.`);
}
//Restore filters from local storage
window.addEventListener('DOMContentLoaded', () => {
    const savedCategory = localStorage.getItem('categoryFilter');
    const savedBrand = localStorage.getItem('brandFilter'); 
    if (savedCategory) {
        categoryFilter.value = savedCategory;
    }
    if (savedBrand) {
        brandFilter.value = savedBrand;
    }
    filterProducts(false);
    updateCartCount();
}
);
    // Event Listeners
categoryFilter.addEventListener('change', filterProducts);
brandFilter.addEventListener('change', filterProducts);

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
    const id = e.target.dataset.id;
    addToCart(id);
    }
});

// Initial render
renderProducts(products);
updateCartCount();