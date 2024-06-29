let contacts = [];
let selectedContactIndex;
let favoriteContactsIds = {};
let showOnlyFavorites = false;

document.getElementById('toggle-theme-btn').addEventListener('click', function() {
    const body = document.body;
    const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    
    if (currentTheme === 'dark-theme') {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        document.getElementById('toggle-theme-btn').innerHTML = '<i class="ph ph-moon"></i>';
    } else {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        document.getElementById('toggle-theme-btn').innerHTML = '<i class="ph ph-sun"></i>';
    }
});

function addContact(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.elements.name.value;
    let phone = form.elements.phone.value;
    const email = form.elements.email.value;

    phone = formatPhoneNumber(phone);

    if (name && phone && email) {
        const contact = { id: Date.now(), name, phone, email, favorite: false };
        contacts.push(contact);
        displayContacts();
        clearForm();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function formatPhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');

    const match = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);

    if (match) {
        return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return phone;
}

function toggleFavorite(index) {
    const contact = contacts[index];
    contact.favorite = !contact.favorite;

    if (contact.favorite) {
        favoriteContactsIds[contact.id] = true;
    } else {
        delete favoriteContactsIds[contact.id];
    }

    displayContacts();
}

function displayContacts() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';

    const filteredContacts = showOnlyFavorites ? getFavoriteContacts() : contacts;

    filteredContacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('contact-item');

        const favoriteClass = contact.favorite ? 'favorite' : '';

        listItem.innerHTML = `
            <div class="contact-info">
                <h3>${contact.name}</h3>
                <button class="favorite-button ${favoriteClass}" style="width: 40px;" onclick="toggleFavorite(${index})">
                    <i class="ph ph-heart-straight"></i>
                </button>
            </div>
            <p>Telefone: ${contact.phone}</p>
            <p>E-mail: ${contact.email}</p>
            <div class="contact-buttons">
                <button onclick="openEditModal(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Excluir</button>
            </div>
        `;

        contactsList.appendChild(listItem);
    });
}

function clearForm() {
    document.getElementById('contact-form').reset();
}

function openEditModal(index) {
    selectedContactIndex = index;
    const contact = contacts[index];
    document.getElementById('edit-name').value = contact.name;
    document.getElementById('edit-phone').value = contact.phone;
    document.getElementById('edit-email').value = contact.email;
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function saveContact() {
    const newName = document.getElementById('edit-name').value;
    const newPhone = document.getElementById('edit-phone').value;
    const newEmail = document.getElementById('edit-email').value;

    const formattedPhone = formatPhoneNumber(newPhone);

    if (newName && formattedPhone && newEmail) {
        const editedContact = { name: newName, phone: formattedPhone, email: newEmail };
        const index = selectedContactIndex;
        contacts[index] = editedContact;
        displayContacts();
        closeEditModal();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function deleteContact(index) {
    const confirmation = confirm('Tem certeza de que deseja excluir este contato?');
    if (confirmation) {
        delete favoriteContactsIds[contacts[index].id];
        contacts.splice(index, 1);
        displayContacts();
    }
}

function showFavorites() {
    showOnlyFavorites = !showOnlyFavorites;

    if (showOnlyFavorites) {
        const favoriteContacts = getFavoriteContacts();
        displayFilteredContacts(favoriteContacts);
    } else {
        displayContacts();
    }
}

function getFavoriteContacts() {
    return contacts.filter(contact => favoriteContactsIds[contact.id]);
}

function displayFilteredContacts(filteredContacts) {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';

    filteredContacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('contact-item');

        listItem.innerHTML = `
            <div class="contact-info">
                <h3>${contact.name}</h3>
                <button class="favorite-button favorite" style="width: 40px;" onclick="toggleFavorite(${index})">
                    <i class="ph ph-heart-straight"></i>
                </button>
            </div>
            <p>Telefone: ${contact.phone}</p>
            <p>E-mail: ${contact.email}</p>
            <div class="contact-buttons">
                <button onclick="openEditModal(${index})">Editar</button>
                <button onclick="deleteContact(${index})">Excluir</button>
            </div>
        `;

        contactsList.appendChild(listItem);
    });
}

displayContacts();

document.getElementById('contact-form').addEventListener('submit', addContact);
document.getElementById('edit-modal-close').addEventListener('click', closeEditModal);
document.getElementById('edit-modal-save').addEventListener('click', saveContact);
