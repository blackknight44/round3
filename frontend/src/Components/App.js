
import '../Styles/App.css';
import LoginForm from '../Forms/LoginForm.js';
import Menu from '../Components/Menu.js';
import AddNewDocumentForm from '../Forms/AddNewDocumentForm.js';
import DeleteDocumentForm from '../Forms/DeleteDocumentForm.js';
import Login from '../Components/Login.js';
import '../Styles/Button.css';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

function App() {
  return (
        <Router>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/menu" exact component={Menu}/>
            <Route path="/login" exact component={LoginForm}/>
            <Route path="/save-details" exact component={AddNewDocumentForm} />
            <Route path="/delete-details" exact component={DeleteDocumentForm}/>
          </Switch>
        </Router>
  );
}

export default App;
