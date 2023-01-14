import { Component } from 'solid-js';
import { Title } from 'solid-meta';
import { useServerRequestContext, useIsServer } from '@solidus-js/core';
import { useNavigate } from 'solid-app-router';

const About: Component = () => {
    const server = useServerRequestContext();
    const isServer = useIsServer();
    const navigate = useNavigate();
    const goHome = () => navigate('/');
    return (
        <>
            <Title>About Solidus Counter</Title>
            <div class="App">
                <header class="header">
                    <p>This is the about page for Solidus Counter. Oh, by the way, your IP address is {server()?.ip!}</p>
                    <p>You accessed me from the { isServer() ? "Server" : "Client"}</p>
                    <button onClick={goHome}>Go Back</button>
                </header>
            </div>
        </>
    );
};

export default About;