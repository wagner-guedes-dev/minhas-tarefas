import RoutesApp from "./routes";
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    
    <BrowserRouter>
        <RoutesApp/>
        <ToastContainer autoClose={3000}/>
    </BrowserRouter>
  );
}

export default App;
