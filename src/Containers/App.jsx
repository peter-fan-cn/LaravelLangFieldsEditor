import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api'
import store from '../store'
import router from '../router'
import "../styles.css"
import 'primeicons/primeicons.css';
import "primereact/resources/primereact.css";
import "primereact/resources/themes/md-light-indigo/theme.css";

function App () {
  const value = {
    appendTo: 'self'
  }

  return (
    <PrimeReactProvider value={value}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </PrimeReactProvider>
  )
}

export default App
