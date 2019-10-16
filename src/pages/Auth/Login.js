import React, { Component } from 'react';
import { auth } from '../../config/clientSdk';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        console.table({ email, password });
        try {
            const res = await auth.signInWithEmailAndPassword(email, password);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { email, password } = this.state;

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="email"
                        aria-label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        aria-label="Password"
                        placeholder="Password"
                        value={password}
                        onChange={this.handleChange}
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;