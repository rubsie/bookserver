import Alert from 'react-bootstrap/Alert';
import {useMessageContext} from "../contexts/messagecontext";

export function Message(props) {
    const {message, setMessage, isLoading} = useMessageContext();

    return <Alert variant="primary" onClick={() => setMessage()}>{isLoading ? "Loading Data!" : (message || "-")}</Alert>

}