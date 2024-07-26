import Home from "./pages/home/Home";

import "./App.css";
import AuthContextProvider from "./contexts/authContext/Provider";

function App() {
  return (
    <div className='main-container'>
      <AuthContextProvider>
        <Home />
      </AuthContextProvider>
    </div>
  );
}

export default App;
