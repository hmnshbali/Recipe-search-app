
import './App.css'
import Navbar from './components/Navbar'
import { Provider } from 'react-redux'
import store from './store/store'
import RecipeSearch from './components/Recipesearch'

function App() {

  return (
    <>
    <Provider store={store}>
    <Navbar/>
<RecipeSearch/>
    </Provider>
    
    </>
  )
}

export default App
