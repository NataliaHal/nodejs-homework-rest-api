const express = require('express');

const router = express.Router();

const ContactControllers = require('../../controllers/contact');

const jsonParser = express.json();

router.get('/', ContactControllers.listContacts);

router.get('/:contactId', ContactControllers.getContactById);

router.post('/', jsonParser, ContactControllers.addContact);

router.delete('/:contactId', ContactControllers.removeContact);

router.put('/:contactId', jsonParser, ContactControllers.updateContact);

module.exports = router;
