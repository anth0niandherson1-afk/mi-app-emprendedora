const phoneContainer = document.getElementById('phone');
const bottomNav = document.getElementById('bottom-nav');
let currentRole = "";

// BASE DE DATOS LOCAL CON CATEGORÍAS E IMÁGENES
let globalServices = [
    { 
        category: "Gasfitería", 
        name: "Anthony Guzman", 
        desc: "Instalación de tuberías, grifos y reparación de fugas las 24h.",
        image: "tuberia.png"
    },
    { 
        category: "Electricidad", 
        name: "Voltio Seguro", 
        desc: "Instalaciones eléctricas residenciales y reparación de cortocircuitos.",
        image: "luz.png"
    },
    { 
        category: "Albañilería", 
        name: "Construcciones Fuertes", 
        desc: "Acabados, techos, muros y remodelaciones de interiores.",
        image: "arful.png"
    },
    { 
        category: "Limpieza", 
        name: "Brillo Express", 
        desc: "Servicio completo de desinfección y limpieza de hogares o locales.",
        image: "limpieza.png" 
    }
];

function nextScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');

    if (screenId.startsWith('screen-home') || screenId === 'screen-shared-action' || screenId === 'screen-success') {
        bottomNav.style.display = 'flex';
    } else {
        bottomNav.style.display = 'none';
    }
}

function selectRole(role) {
    currentRole = role;
    if (role === 'emprendedor') {
        phoneContainer.className = "phone-container theme-emprendedor";
        nextScreen('screen-login-emprendedor');
    } else if (role === 'cliente') {
        phoneContainer.className = "phone-container theme-cliente";
        nextScreen('screen-login-cliente');
    }
}

function renderMarkets() {
    const clientList = document.getElementById('client-market-list');
    const empList = document.getElementById('emp-market-list');
    
    if (clientList) clientList.innerHTML = '';
    if (empList) empList.innerHTML = '';

    globalServices.forEach(srv => {
        const cardHTML = `
            <img class="service-img" src="${srv.image}" alt="${srv.category}">
            <div class="service-info">
                <h4>🔧 ${srv.category}</h4>
                <p><strong>Entidad:</strong> ${srv.name}</p>
                <p>${srv.desc}</p>
            </div>
        `;

        if (clientList) {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.onclick = () => selectServiceToOrder(srv.category, srv.name);
            card.innerHTML = cardHTML;
            clientList.appendChild(card);
        }
        
        if (empList) {
            const card = document.createElement('div');
            card.className = 'service-card';
            card.onclick = () => selectServiceToOrder(srv.category, srv.name);
            card.innerHTML = cardHTML;
            empList.appendChild(card);
        }
    });
}

function saveNewBusiness() {
    const category = document.getElementById('biz-category').value;
    const name = document.getElementById('biz-name').value;
    const desc = document.getElementById('biz-desc').value;

    if (!category || !name) {
        alert("Por favor rellena la información básica de tu negocio");
        return;
    }

    const defaultImg = "https://unsplash.com";

    globalServices.unshift({ category, name, desc, image: defaultImg });

    const myContainer = document.getElementById('my-businesses-list');
    if (myContainer.querySelector('.info-text')) myContainer.innerHTML = '';

    const newCard = document.createElement('div');
    newCard.className = 'my-biz-card';
    newCard.innerHTML = `<h4>📌 ${category}</h4><p><strong>Mi Entidad:</strong> ${name}</p><p>${desc}</p>`;
    myContainer.appendChild(newCard);

    renderMarkets();
    nextScreen('screen-home-emprendedor');
}

function filterServices(type) {
    const query = document.getElementById(type === 'client' ? 'client-search' : 'emp-search').value.toLowerCase();
    const selector = type === 'client' ? '#client-market-list .service-card' : '#emp-market-list .service-card';
    const cards = document.querySelectorAll(selector);
    
    cards.forEach(card => {
        const text = card.innerText.toLowerCase();
        card.style.display = text.includes(query) ? 'flex' : 'none';
    });
}

function selectServiceToOrder(category, entityName) {
    document.getElementById('order-service-name').value = `${category} - ${entityName}`;
    nextScreen('screen-shared-action');
}

function goHome() {
    renderMarkets();
    if (currentRole === 'emprendedor') {
        nextScreen('screen-home-emprendedor');
    } else if (currentRole === 'cliente') {
        nextScreen('screen-home-cliente');
    }
}

function restartApp() {
    currentRole = "";
    document.getElementById('biz-category').value = '';
    document.getElementById('biz-name').value = '';
    document.getElementById('biz-desc').value = '';
    document.getElementById('my-businesses-list').innerHTML = '<p class="info-text">No tienes negocios registrados aún. Presiona (+) para añadir el tuyo.</p>';
    phoneContainer.className = "phone-container theme-default";
    nextScreen('screen-role');
}
