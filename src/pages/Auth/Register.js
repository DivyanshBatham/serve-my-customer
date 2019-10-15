import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../store/actions/authActions';

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

    handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, displayName, phoneNumber } = this.state;
        console.table({ email, password, displayName, phoneNumber });
        this.props.register({ email, password, displayName, phoneNumber });
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

const mapDispatchToProps = (dispatch) => {
    return {
        register: (data) => dispatch(register(data))
    }
}

export default connect(null, mapDispatchToProps)(Register);