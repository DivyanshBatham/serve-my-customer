import React, { Component } from 'react';
import axios from 'axios';
import { auth } from '../../config/clientSdk';

class Register extends Component {
    // TODO: Make this a multi-step register
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            displayName: '',
            phoneNumber: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password, displayName, phoneNumber } = this.state;
        try {
            const res = await axios({
                method: 'post',
                url: '/api/register',
                baseURL: 'http://localhost:5000/serve-my-customer/us-central1/',
                data: {
                    email,
                    password,
                    displayName,
                    phoneNumber
                }
            })

            const { token } = res.data;
            auth.signInWithCustomToken(token);
        } catch (err) {
            console.error(err); 
            if(err.isAxiosError)
                console.error(err.response.data);
            else {
                console.error(err.message, err.name);
            }
        }

    }

    render() {
        const { email, password, displayName, phoneNumber } = this.state;
        return (
            <div>
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        name="displayName"
                        aria-label="Name"
                        placeholder="Name"
                        value={displayName}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="email"
                        aria-label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={this.handleChange}
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        aria-label="Phone Number"
                        placeholder="Phone Number"
                        value={phoneNumber}
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

                    <button type="submit">Register</button>
                </form>
            </div>
        );
    }
}


export default Register;