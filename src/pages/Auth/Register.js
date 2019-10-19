import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { auth } from '../../config/clientSdk';
import { ConditionalLoader } from '../../components';
import { Column, Button, Flex } from '../../atoms';
import { Form, AuthTextField, AuthLink, ErrorText } from './authStyles';

class Register extends Component {
    // TODO: Make this a multi-step register
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            displayName: '',
            phoneNumber: '',
            loading: false,
            error: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        }, async () => {
            const { email, password, displayName, phoneNumber } = this.state;
            try {
                const res = await axiosInstance({
                    method: 'post',
                    url: '/api/register',
                    data: {
                        email,
                        password,
                        displayName,
                        phoneNumber
                    }
                })

                const { token } = res.data;
                await auth.signInWithCustomToken(token);
                await auth.currentUser.sendEmailVerification();
            } catch (err) {
                this.setState({
                    loading: false
                });
                console.error(err);
                if (err.isAxiosError) {
                    if (err.response) {
                        this.setState({
                            error: err.response.data.error.message
                        })
                    }
                }
                else {
                    console.error(err.message, err.name);
                }
            }
        })
    }

    render() {
        const { email, password, displayName, phoneNumber, loading, error } = this.state;
        return (
            <ConditionalLoader showLoader={loading}>
                <Column alignItems="center" p="1rem">
                    <h1>Serve My Customer</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <AuthTextField
                            type="text"
                            name="displayName"
                            aria-label="Name"
                            placeholder="Name"
                            value={displayName}
                            onChange={this.handleChange}
                        />
                        <AuthTextField
                            type="text"
                            name="email"
                            aria-label="Email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange}
                        />
                        <AuthTextField
                            type="text"
                            name="phoneNumber"
                            aria-label="Phone Number"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={this.handleChange}
                        />
                        <AuthTextField
                            type="password"
                            name="password"
                            aria-label="Password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                        />

                        { error && <ErrorText>* {error}</ErrorText>}

                        <Flex.spaceBetween alignItems="center" mt="2rem">
                            <AuthLink as={Link} to="/login" fontSize="0.9rem">Already have an account? Login</AuthLink>
                            <Button type="submit">Register</Button>
                        </Flex.spaceBetween>
                    </Form>
                </Column>
            </ConditionalLoader>
        );
    }
}


export default Register;