import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, remove, edit, update, sort, search } from "./ContactSlice";
import "./ContactBook.css";

function genId() {
  let length = 6;
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * length));
  }

  return id;
}

const ContactBook = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const contacts = useSelector((state) => state.contacts.contacts);
  const searchedContacts = useSelector(
    (state) => state.contacts.searchedContacts
  );
  const dispatch = useDispatch();

  function handleContactAdd(e) {
    e.preventDefault();
    let contact = {
      id: genId(),
      name: name,
      contact: contactNumber,
      isEdit: false,
    };
    dispatch(add(contact));
    setName("");
    setContactNumber("");
  }

  function handleSearch(e) {
    e.preventDefault();
    dispatch(search(searchTerm));
  }

  function handleSort(key) {
    dispatch(sort({ key, order: sortOrder }));
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }
  return (
    <div className="wrapper">
      <h1>Contact Book</h1>
      <div className="contact-wrapper">
        <form className="contact-form" onSubmit={handleContactAdd}>
          <h2>Add Contact</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Mobile"
          />
          <button>Add</button>
        </form>

        <form className="search-form" onSubmit={handleSearch}>
          <h2>Search Contacts</h2>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Name or Mobile"
          />
          <button>Search</button>
        </form>

        <div className="contacts">
          <h2>Contacts</h2>
          <button onClick={() => handleSort("name")}>
            Sort by Name ({sortOrder === "asc" ? "↑" : "↓"})
          </button>
          <button onClick={() => handleSort("contact")}>
            Sort by Contact ({sortOrder === "asc" ? "↑" : "↓"})
          </button>

          {contacts.map((c) => (
            <Contact key={c.id} c={c} />
          ))}
        </div>

        <div className="searched-contacts">
          {searchedContacts.map((c) => (
            <Contact key={c.id} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
};

const Contact = ({ c }) => {
  const [editName, setEditName] = useState("");
  const [editContact, setEditContact] = useState("");
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(remove(id));
  }

  function handleEdit(id) {
    dispatch(edit(id));
  }

  function handleUpdate(id) {
    const updateData = {
      updatedName: editName,
      updatedContact: editContact,
      idToUpdate: id,
    };
    dispatch(update(updateData));

    setEditName("");
    setEditContact("");
  }

  return (
    <div className="contact">
      {!c.isEdit && (
        <>
          <span>{c.name}</span>
          <span>{c.contact}</span>
          <button onClick={() => handleDelete(c.id)}>Delete</button>
          <button onClick={() => handleEdit(c.id)}>Edit</button>
        </>
      )}

      {c.isEdit && (
        <>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
          <input
            type="number"
            value={editContact}
            onChange={(e) => setEditContact(e.target.value)}
          />
          <button onClick={() => handleUpdate(c.id)}>update</button>
        </>
      )}
    </div>
  );
};

export default ContactBook;
