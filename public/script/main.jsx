import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router,Route} from 'react-router-dom';
import PlantList from './components/plant-list';
import Plant from './components/plant';
import About from './components/about'

class Main extends React.Component {

    render() {
        return (
            <Router exact path="/">
                <div class="container">
                    <Route exact path="/"
                           render={(props) => (<PlantList

                           {...props}/>)}/>

                    <Route exact path="/about"
                           render={(props) => (<About
                           {...props}/>)}/>

                    <Route exact path="/:id"
                           render={(props) => (<Plant
                           {...props}/>)}/>
                </div>
            </Router>
        );
    }
}


ReactDOM.render(<Main  />, document.getElementById('app'));
