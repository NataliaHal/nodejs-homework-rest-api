const express = require('express');

const router = express.Router();

const ContactControllers = require('../../controllers/contact');

const jsonParser = express.json();


router.get('/', ContactControllers.listContacts, (req, res, next) => {
  res.json({ message: 'template message' });
});

router.get('/:contactId', ContactControllers.getContactById, (req, res, next) => {
  res.json({ message: 'template message' });
});

router.post('/', jsonParser, ContactControllers.removeContact, (req, res, next) => {
  res.json({ message: 'template message' });
});

router.delete('/:contactId', ContactControllers.addContact, (req, res, next) => {
  res.json({ message: 'template message' });
});

router.put('/:contactId', jsonParser, ContactControllers.updateContact, (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;
