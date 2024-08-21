import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [
    { id: "1", name: "John Doe", contact: "9876543210" },
    { id: "2", name: "Jane Smith", contact: "9123456789" },
    { id: "3", name: "Alice Johnson", contact: "9012345678" },
    { id: "4", name: "Bob Brown", contact: "9898765432" },
    { id: "5", name: "Charlie Davis", contact: "9112233445" },
    { id: "6", name: "Diana Evans", contact: "9321122334" },
    { id: "7", name: "Eve Foster", contact: "9009988776" },
    { id: "8", name: "Frank Green", contact: "9223344556" },
    { id: "9", name: "Grace Hill", contact: "9334455667" },
    { id: "10", name: "Henry Clark", contact: "9445566778" },
  ],

  searchedContacts: [],
};

const ContactSlice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.contacts = [...state.contacts, action.payload];
    },

    remove: (state, action) => {
      const filtered = [...state.contacts].filter(
        (c) => c.id !== action.payload
      );
      state.contacts = filtered;
      state.searchedContacts = [...state.searchedContacts].filter(
        (c) => c.id !== action.payload
      );
    },

    edit: (state, action) => {
      const edited = [...state.contacts].map((c) =>
        c.id === action.payload
          ? { ...c, isEdit: true }
          : { ...c, isEdit: false }
      );
      state.contacts = edited;
    },

    update: (state, action) => {
      const { updatedName, updatedContact, idToUpdate } = action.payload;
      const updated = [...state.contacts].map((c) =>
        c.id === idToUpdate
          ? {
              ...c,
              name: updatedName || c.name,
              contact: updatedContact || c.contact,
              isEdit: false,
            }
          : c
      );
      state.contacts = updated;
    },

    search: (state, action) => {
      const searchTerm = action.payload;
      let searched = [...state.contacts].filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.contact.includes(searchTerm)
      );
      state.searchedContacts = searched;
    },

    sort: (state, action) => {
      const { key, order } = action.payload;
      state.contacts.sort((a, b) => {
        if (order === "asc") {
          return a[key].localeCompare(b[key]);
        } else {
          return b[key].localeCompare(a[key]);
        }
      });
    },
  },
});

export const { add, remove, edit, update, sort, search } = ContactSlice.actions;

export default ContactSlice.reducer;
