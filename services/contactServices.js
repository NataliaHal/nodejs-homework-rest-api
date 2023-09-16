// contactsService.js
const Contact = require("../models/contacts");

const listContactsService = async () => {
  return await Contact.find();
};

const getContactByIdService = async (id) => {
  return await Contact.findById(id);
};

const removeContactService = async (id) => {
  return await Contact.findByIdAndRemove(id);
};

const addContactService = async (newContact) => {
  return await Contact.create(newContact);
};

const updateContactService = async (contactID, body) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactID,
    { $set: body },
    { new: true }
  );

  if (!updatedContact) {
    throw new Error("This contact does not exist");
  }

  return updatedContact;
};

module.exports = {
  listContactsService,
  getContactByIdService,
  removeContactService,
  addContactService,
  updateContactService,
};
