import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styled from 'styled-components';
import {server_addr} from '../../const';

const Bgwrapper = styled.div`
    background: rgb(236,145,18);
    background: linear-gradient(90deg, rgba(236,145,18,1) 0%, rgba(46,0,255,1) 100%);
`;

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            email : '',
            password : ''
        };
    }

    InputChangeHandler = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        console.log(name);
        this.setState({[name]:value});
    }

    FormSubmitHandler = (e) => {
        e.preventDefault();

        let {isLogin} = this.props;
        let req_data = isLogin ? {
            email : this.state.email,
            password : this.state.password
        } : {
            email : this.state.email,
            password : this.state.password,
            username : this.state.username
        };

        fetch(server_addr+(isLogin?'/login':'/register'),{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(req_data)
        })
        .then((res) => res.json())
        .then((user) => {
            if(user && user.email) {
                // this.props.loadUserProfile(user);
                this.props.onRouteChange("login");
            }
            else console.log("Error" + (isLogin?'Login':'Register') + "Form!");
        })
        .catch(console.log);
    }

    render() {
        var {isLogin} = this.props;

        const header = isLogin ? "Log-in to your account" : "Register an account";
        const message = isLogin ? <Message>
            New to us? <a href='/register'>Sign Up</a>
        </Message> : null;

        return (
            <Bgwrapper>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='black' textAlign='center'>
                        <Image src='/logo192.png' /> {header}
                    </Header>
                    <Form size='large' action={server_addr+'/'+(isLogin?'login':'register')} method='POST' onSubmit={this.FormSubmitHandler}>
                        <Segment stacked>
                        {!isLogin ? <Form.Input name='username' fluid icon='address card' iconPosition='left' placeholder='Username' value={this.state.username} onChange={this.InputChangeHandler}/> : null}
                        <Form.Input name='email' fluid icon='user' iconPosition='left' placeholder='E-mail address' value={this.state.email} onChange={this.InputChangeHandler}/>
                        <Form.Input
                            name='password'
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            value={this.state.password}
                            onChange={this.InputChangeHandler}
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
}

export default LoginPage