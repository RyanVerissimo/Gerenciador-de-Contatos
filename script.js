let contacts = [];
let selectedContactIndex;

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

function displayContacts() {
    const contactsList = document.getElementById('contacts-list');
    contactsList.innerHTML = '';
    contacts.forEach((contact, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('contact-item');
        listItem.innerHTML = `
            <h3>${contact.name}</h3>
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


