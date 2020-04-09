import React from 'react'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {server_addr} from '../../const';
import {loginUser} from '../App/actions';

// const mapStateToProps = (state) => {
//     return {
//         user : state.user,
//         userData : state.userData,
//     }
// };
  
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser : user => dispatch(loginUser(user)),
    };
};

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
            password : '',
            caught_error : false,
            err_msg : ''
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
        .then((res) => {
            if(res && res.user_id) {
                //Update Login status and user data
                if(!res.username) res.username = 'Unknown User';
                this.props.loginUser(res);
                this.setState({caught_error:false, err_msg:''});
                this.props.history.push('/')
            }
            else {
                let err_msg = res.err_msg ? res.err_msg : '';
                this.setState({caught_error:true, err_msg:err_msg});
            }
        })
        .catch(console.log);
    }

    render() {
        var {isLogin} = this.props;

        const header = isLogin ? "Log-in to your account" : "Register an account";
        const message = isLogin ? <Message>
            New to us? <Link to='/register'>Sign Up</Link>
        </Message> : null;

        return (
            <Bgwrapper>
                <Message negative hidden={!this.state.caught_error}>
                    <Message.Header>We're sorry we can't {isLogin ? "Login to" : "Register for"} that account.</Message.Header>
                    <p>{this.state.err_msg}</p>
                </Message>
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

export default connect(null, mapDispatchToProps)(LoginPage)