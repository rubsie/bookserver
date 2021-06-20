import Alert from 'react-bootstrap/Alert';

export function Message(props) {
    const {isLoading, message, setMessage} = props;
    return <Alert variant="primary" onClick={() => setMessage()}>{isLoading ? "Loading Data!" : (message || "-")}</Alert>

}