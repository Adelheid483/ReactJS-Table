import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom'

import Menu from "./Menu/Menu";
import Home from "./pages/Home/Home";
import Guide from "./pages/Guide/Guide";
import Login from "./pages/Login/Login";
import Error from "./pages/Error/Error";
import DetailsPage from "./Table/DetailsPage/DetailsPage";
import ClientsTable from "./Table/ClientsTable/ClientsTable";


class App extends Component{

    state = {
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({isLoggedIn: true})
    };


    render(){
        return (
            <div>
                <Menu/>

                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/guide' component={Guide} />
                    <Route path='/login' render={()=>(<Login isLoggedIn={this.state.isLoggedIn} onLogin={this.onLogin}/>)} />
                    <Route path='/clients/:id' component={DetailsPage} />
                    {this.state.isLoggedIn
                        ? <Route path='/clients' render={()=>(<ClientsTable />)} />
                        : <Redirect from={'/clients'} to={'/login'}/>
                    }
                    <Route render={() => <Error />}
                    />
                </Switch>
            </div>
        )
    }
}

export default App;