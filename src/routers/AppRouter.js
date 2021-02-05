import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { ForgetPasswordScreen } from '../components/auth/ForgetPasswordScreen';
import { ResetPasswordScreen } from '../components/auth/ResetPasswordScreen';

import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { TasksScreen } from '../components/tasks/TasksScreen';
import { ClientsScreen } from '../components/clients/ClientsScreen';
import { UsersScreen } from '../components/users/UsersScreen';
import { AccountScreen } from '../components/account/AccountScreen';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';


export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth);

    //actualiza el token
    useEffect(() =>{
        dispatch( startChecking() );
    },[dispatch]);

    if( checking ){
        return(<h5>Espere...</h5>);
    }

    return (
        <Router>
            <div className="routes">
                <Switch>
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />
                    
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isAuthenticated={ !!uid }
                    />
                    
                    <PrivateRoute 
                        exact 
                        path="/tasks" 
                        component={ TasksScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/clients" 
                        component={ ClientsScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/users" 
                        component={ UsersScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <PrivateRoute 
                        exact 
                        path="/account" 
                        component={ AccountScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                        exact 
                        path="/forget-password" 
                        component={ ForgetPasswordScreen }
                        isAuthenticated={ !!uid }
                    />

                    <PublicRoute 
                        exact 
                        path="/reset-password/:token" 
                        component={ ResetPasswordScreen }
                        isAuthenticated={ !!uid }
                    />
                    
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
