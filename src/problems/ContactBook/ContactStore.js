import { configureStore } from "@reduxjs/toolkit";
import ContactSlice from "./ContactSlice";

const contactStore = configureStore({
  reducer: {
    contacts: ContactSlice,
  },
});

export default contactStore;
