const products = [
  {id:1,cat:'Windows',name:'Windows 11 Pro Digital Key',price:899,old:1499,icon:'🪟'},
  {id:2,cat:'Windows',name:'Windows 10 Pro Digital Key',price:699,old:1199,icon:'🪟'},
  {id:3,cat:'Office',name:'Microsoft Office 2021 Professional Plus',price:1299,old:2499,icon:'📄'},
  {id:4,cat:'Office',name:'Microsoft Office 365 — 1 Year',price:999,old:1799,icon:'☁️'},
  {id:5,cat:'Antivirus',name:'Antivirus — 1 PC / 1 Year',price:499,old:899,icon:'🛡️'},
  {id:6,cat:'Antivirus',name:'Internet Security — 3 Devices',price:799,old:1399,icon:'🔐'},
  {id:7,cat:'Tools',name:'PC Utility Tools Bundle',price:399,old:699,icon:'🧰'},
  {id:8,cat:'Tools',name:'Driver & System Care — 1 Year',price:599,old:999,icon:'⚙️'}
];

let cart = [];

function render(list = products) {
  document.getElementById('productGrid').innerHTML = list.map(p => `
    <article class="product">
      <div class="icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <div class="muted">${p.cat} · Digital Delivery</div>
      <div class="price">₹${p.price}<span class="old">₹${p.old}</span></div>
      <button onclick="add(${p.id})">Add to Cart</button>
    </article>
  `).join('');
}

function add(id) {
  cart.push(products.find(p => p.id === id));
  updateCart();
  openCart();
}

function updateCart() {
  document.getElementById('cartCount').textContent = cart.length;
  document.getElementById('cartItems').innerHTML = cart.length
    ? cart.map(p => `<div class="cartrow"><span>${p.name}</span><b>₹${p.price}</b></div>`).join('')
    : '<p>Your cart is empty.</p>';

  document.getElementById('total').textContent =
    cart.reduce((s,p) => s + p.price, 0);
}

function openCart() {
  document.getElementById('cartModal').style.display = 'flex';
  updateCart();
}

function closeCart() {
  document.getElementById('cartModal').style.display = 'none';
}

function filterCat(cat) {
  render(cat === 'All' ? products : products.filter(p => p.cat === cat));
  document.getElementById('products').scrollIntoView({behavior:'smooth'});
}

function searchProducts() {
  const q = document.getElementById('search').value.toLowerCase();
  render(products.filter(p =>
    (p.name + ' ' + p.cat).toLowerCase().includes(q)
  ));
}

function checkout() {
  if (!cart.length) {
    alert('Please add a product first.');
    return;
  }

  alert('Demo checkout. Payment gateway will be connected in the next step.');
}

render();
updateCart();
