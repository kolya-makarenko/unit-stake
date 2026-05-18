import { useState } from 'react';
import { account } from '../../../lib/appwrite';
import classes from './Login.module.css';

import logo from '../../../assets/images/logo.svg';

function Login({ onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await account.createEmailPasswordSession(email, password);
            onLoginSuccess();
        } catch (err) {
            setError('Incorrect username or password!');
            console.error(err);
        }
    };

    return (
        <div className={classes.loginPage}>
            <div className={classes.login}>
                <img src={logo} alt="logo" />
                <h2 className={classes.loginHeader}>
                    Please enter your user information.
                </h2>
                {error && <p className={classes.loginErrorMessage}>{error}</p>}
                <form onSubmit={handleSubmit} className={classes.loginForm}>
                    <div className={classes.loginField}>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className={classes.loginField}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Sign in</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
