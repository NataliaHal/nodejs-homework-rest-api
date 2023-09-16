const Contact = require("../models/contacts");

async function listContacts(req, res, next) {
  try {
    const contacts = await Contact.find({ owner: req.user.id }).exec();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function create(req, res, next) {
  const newContact = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    owner: req.user.id,
  };
  try {
    const contact = await Contact.create(newContact);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  const { id } = req.params;

  try {
    const contact = await Contact.findById(id);
    if (contact) {
      res.json(contact);
    }
    if (contact.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You have no access to this contact" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function removeContact(req, res, next) {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndRemove(id);
    if (result) {
      res.json({ message: "Contact removed" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function addContact(req, res, next) {
  const newContact = req.body;

  try {
    const contact = await Contact.create(newContact);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateContact(req, res, next) {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  listContacts,
  create,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
