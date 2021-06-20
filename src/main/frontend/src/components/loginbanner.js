import Button from 'react-bootstrap/Button';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

function LoginButton(props) {
    const {username, login} = props;
    return <>{!username && <Nav.Link onClick={() => login()}>login</Nav.Link>}</>;
}
function LogoutButton(props) {
    const {username, logout} = props;
    return <>{username && <Nav.Link onClick={() => logout()}>logout</Nav.Link>}</>;
}

/** * @return {null} */
export function LoginBanner(props) {
    const {username, login, logout} = props;
    const userInfo = username ? `logged in as ${username}` : "not logged in.";

    return <NavBar bg="dark" variant="dark" sticky="top" className="justify-content-between">
        <NavBar.Brand>{userInfo}</NavBar.Brand>
        <Nav className="justify-content-end">
            <Nav.Item><LoginButton username={username} login={login}/></Nav.Item>
            <Nav.Item><LogoutButton username={username} logout={logout}/></Nav.Item>
        </Nav>
    </NavBar>;
}