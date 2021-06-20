import Button from 'react-bootstrap/Button';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import {useAuthenticationContext} from "../contexts/authenticationcontext";

function LoginButton(props) {
    const {username, login} = useAuthenticationContext();
    return <>{!username && <Nav.Link onClick={() => login()}>login</Nav.Link>}</>;
}

function LogoutButton(props) {
    const {username, logout} = useAuthenticationContext();
    return <>{username && <Nav.Link onClick={() => logout()}>logout</Nav.Link>}</>;
}

/** * @return {null} */
export function LoginBanner(props) {
    const {username} = useAuthenticationContext();
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <NavBar bg="dark" variant="dark" sticky="top" className="justify-content-between">
        <NavBar.Brand>{userInfo}</NavBar.Brand>
        <Nav className="justify-content-end">
            <Nav.Item><LoginButton/></Nav.Item>
            <Nav.Item><LogoutButton/></Nav.Item>
        </Nav>
    </NavBar>;
}