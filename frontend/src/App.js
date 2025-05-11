import { Route } from "react-router-dom";
import './App.css';
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/chatpage";

function App() {
  return (
    <div className="App">
    <Route path="/" component={Homepage} exact ></Route>
    <Route path="/chats" component={Chatpage} ></Route>
    </div>
  );
}

export default App;
