import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from './context/ThemeContext.jsx';
import { Provider } from 'react-redux'
import store from '../src/store/store.js'

ReactDOM.createRoot(document.getElementById('root')).render(
   <Provider store={store}> 
   <ThemeProvider>
   <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeProvider>
   </Provider>
 ,
)  
