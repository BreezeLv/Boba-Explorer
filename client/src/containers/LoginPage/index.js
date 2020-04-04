import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styled from 'styled-components';


function LoginPage({isLogin}) {

    const header = isLogin ? "Log-in to your account" : "Register an account";
    const message = isLogin ? <Message>
        New to us? <a href='/register'>Sign Up</a>
    </Message> : null;

    const Bgwrapper = styled.div`
        background: rgb(236,145,18);
        background: linear-gradient(90deg, rgba(236,145,18,1) 0%, rgba(46,0,255,1) 100%);
    `;

    return (
        <Bgwrapper>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='gray' textAlign='center'>
                    <Image src='/logo192.png' /> {header}
                </Header>
                <Form size='large'>
                    <Segment stacked>
                    {!isLogin ? <Form.Input fluid icon='address card' iconPosition='left' placeholder='Username' /> : null}
                    <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='password'
                    />

                    <Button color='teal' fluid size='large'>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                    </Segment>
                </Form>
                {message}
                </Grid.Column>
            </Grid>
        </Bgwrapper>
    );
}

export default LoginPage