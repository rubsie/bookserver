import {useAuthenticationContext} from "../contexts/authenticationcontext";
import Button from 'react-bootstrap/Button';

/** * @return {null} */
export function ButtonIfLoggedIn(props) {
    const {onClick, children} = props;
    const {isLoggedIn} = useAuthenticationContext();
    if (!isLoggedIn) return null;
    return <Button variant="light" onClick={onClick}>{children}</Button>;
}