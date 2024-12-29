import { userService } from "../services/user.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { addUserBalance } from "../store/actions/user.actions.js"

const { useState } = React
const { useSelector } = ReactRedux
const { useParams, useNavigate, Link } = ReactRouterDOM

export function UserDetails() {

    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const params = useParams()
    const navigate = useNavigate()


    return (
        <section className="user-details">
            <h1>{user && user.username} - user details:</h1>

            <h1>UNDER CONSTRUCTION.....</h1>

           
        </section>
    )
}