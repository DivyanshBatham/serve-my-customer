import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import { auth } from '../../config/clientSdk';
import { Column, Button, Flex, Container, Text } from '../../atoms';
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
            <Container.Loader showLoader={loading}>
                <Column alignItems="center">
                    <Text
                        color="primaryText"
                        fontSize="2.2rem"
                        fontWeight="medium"
                        fontFamily="pacifico"
                        as="h1"
                        m="2.8rem 0 2rem"
                    >
                        Serve My Customer
                    </Text>
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

                        {error && <ErrorText>* {error}</ErrorText>}

                        <Flex.spaceBetween alignItems="center" mt="2rem">
                            <AuthLink as={Link} to="/login" fontSize="0.9rem">Already have an account? Login</AuthLink>
                            <Button type="submit">Register</Button>
                        </Flex.spaceBetween>
                    </Form>
                </Column>
            </Container.Loader>
        );
    }
}


export default Register;