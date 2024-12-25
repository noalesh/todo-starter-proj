const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
const { useSelector } = ReactRedux
import { logout } from "../store/actions/user.actions.js"

export function AppHeader() {
    
    const navigate = useNavigate()
    // note to self: 
    // useSelector also register the AppHeader to changes in the loggedInUser
    // in the store, meaning, it will be rendered if something changed in the user.
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    
    function onLogout() {
        logout()
            .catch((err) => {
                showErrorMsg('Could not log out user...')
            })
    }

    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname} !!</Link>
                        <div>{"Your balance is: " + user.balance}</div>
                        <button onClick={onLogout}>Logout</button>

                    </ section >
                ) : (
                    <section>
                        <LoginSignup/>
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
