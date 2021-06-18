/** * @return {null} */
export function LoginBanner(props) {
    const {username, login, logout} = props;

    return <div className="loginName">
        {username && <span>logged in as {username}</span>}
        {username && <button onClick={() => logout()}>logout</button>}
        {!username && <button onClick={() => login()}>login</button>}

    </div>;
}