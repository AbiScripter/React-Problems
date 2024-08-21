import { Provider } from "react-redux";
import "./App.css";
import contactStore from "./problems/ContactBook/ContactStore";
import ContactBook from "./problems/ContactBook/ContactBook";

function App() {
  return (
    <div className="App">
      <Provider store={contactStore}>
        <ContactBook />
      </Provider>
    </div>
  );
}

export default App;
