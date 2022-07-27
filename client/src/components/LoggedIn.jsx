export const LoggedIn = props => {
    return (
        <>
            {props.name === 'empty' ? <h4>Currently logged out.</h4> : props.name === 'Wrong username & Or password' ? <h4>{props.name}</h4> : <h4>{props.name} has logged in.</h4>}
        </>
        // { loginStatus === 'Currently logged out.' ? <LoggedIn name={loginStatus} /> : <p>{loginStatus} has logged in</p>}
    )
}