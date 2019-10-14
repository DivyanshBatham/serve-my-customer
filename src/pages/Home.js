import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <header>
            <h1>Home</h1>
            <Link to="/login">Login</Link>
            <br/>
            <Link to="/register">Register</Link>
        </header>
    );
}

export default Home;