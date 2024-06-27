let contacts = [];
let selectedContactIndex;

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
    const phone = form.elements.phone.value;
    const email = form.elements.email.value;

    if (name && phone && email) {
        const contact = { name, phone, email };
        contacts.push(contact);
        displayContacts();
        clearForm();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// function displayContacts() {
//     const contactsList = document.getElementById('contacts-list');
//     contactsList.innerHTML = '';
//     contacts.forEach((contact, index) => {
//         const listItem = document.createElement('li');
//         listItem.classList.add('contact-item');
//         listItem.innerHTML = `
//             <div class="contact-info">
//                 <h3>${contact.name}</h3>
//                 <button class="favorite-button" style="width: 40px;" onclick="toggleFavorite(${index})">
//                     <i class="ph ph-heart-straight""></i>
//                 </button>
//             </div>
//             <p>Telefone: ${contact.phone}</p>
//             <p>E-mail: ${contact.email}</p>
//             <div class="contact-buttons">
//                 <button onclick="openEditModal(${index})">Editar</button>
//                 <button onclick="deleteContact(${index})">Excluir</button>
//             </div>
//         `;
//         contactsList.appendChild(listItem);
//     });
// }

function toggleFavorite(index) {
    contacts[index].favorite = !contacts[index].favorite; // Alternar o estado de favorito

    displayContacts(); // Atualizar a exibição dos contatos
}


function displayContacts() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('contact-item');

        const favoriteClass = contact.favorite ? 'favorite' : ''; // Verifica se é favorito

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

    if (newName && newPhone && newEmail) {
        const editedContact = { name: newName, phone: newPhone, email: newEmail };
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
        contacts.splice(index, 1);
        displayContacts();
    }
}

displayContacts();

document.getElementById('contact-form').addEventListener('submit', addContact);
document.getElementById('edit-modal-close').addEventListener('click', closeEditModal);
document.getElementById('edit-modal-save').addEventListener('click', saveContact);

