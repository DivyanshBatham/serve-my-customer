import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../config/clientSdk';
import { Column, Button, Flex, Container, Text } from '../../atoms';
import { Form, AuthTextField, AuthLink, ErrorText } from './authStyles';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
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
            const { email, password } = this.state;
            try {
                const res = await auth.signInWithEmailAndPassword(email, password);
                console.log(res);
            } catch (err) {
                console.log(err);
                this.setState({
                    loading: false,
                    error: err.message
                })
            }
        });
    }

    render() {
        const { email, password, loading, error } = this.state;

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
                            name="email"
                            aria-label="Email"
                            placeholder="Email"
                            value={email}
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
                            <AuthLink as={Link} to="/register" fontSize="0.9rem">New user? Create an account</AuthLink>
                            <Button type="submit">Login</Button>
                        </Flex.spaceBetween>

                    </Form>
                </Column>
            </Container.Loader >
        );
    }
}

export default Login;