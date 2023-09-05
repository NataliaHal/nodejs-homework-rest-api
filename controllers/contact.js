function listContacts(req, res, next) {
    res.send("Get Contacts");
};

function getContactById(req, res, next) {
    const { id } = req.params;

    res.send(`Get Contact by id ${id} `);
};

function removeContact(req, res, next) {
    const { id } = req.params;
    res.send(`Remove Contact by id ${id}`);
};


function addContact(req, res, next) {
    const { id } = req.params;
    res.send(`Add Contact by id ${id}`);
};


function updateContact(req, res, next) {
     const { id } = req.params;
    res.send(`Update Contact by id ${id}`);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
