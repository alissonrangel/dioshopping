import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './components/store';
import Routes from './routes';
// import { Container } from '@material-ui/core/';
import Header from './components/Header';

const App = () => {
  
  const localCart = JSON.parse(localStorage.getItem('dioshopping: cart'))
  
  if(localCart !== null) {
    store.dispatch({type: 'CHANGE_CART', localCart})
  }
  
  return(
    <Provider store={store}>
      <div className="p-0">
        <Router>
          <Header />
          <Routes />
        </Router>
      </div> 
    </Provider>
  )
}

export default App;
