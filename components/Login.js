import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import Router from 'next/router';
import store from 'store';
import { GC_USER_ID, GC_AUTH_TOKEN } from '../helpers/constants';

class Login extends Component {
  state = {
    login: this.props.login,
    email: '',
    password: '',
    name: '',
  };

  saveUserData = (id, token) => {
    store.set(GC_USER_ID, id);
    store.set(GC_AUTH_TOKEN, token);
  };

  confirm = async () => {
    const { name, email, password, login } = this.state;
    if (login) {
      const result = await this.props.signinUserMutation({
        variables: {
          email,
          password,
        },
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this.saveUserData(id, token);
    } else {
      const result = await this.props.createUserMutation({
        variables: {
          name,
          email,
          password,
        },
      });
      const id = result.data.signinUser.user.id;
      const token = result.data.signinUser.token;
      this.saveUserData(id, token);
    }
    Router.push('/');
  };
  render() {
    return (
      <div>
        {console.log(this.props.login)}
        <h4>{this.state.login ? 'Login' : 'Sign Up'}</h4>
        <div>
          {!this.state.login && (
            <input
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Team Name"
            />
          )}
          <input
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your Email Address"
          />
          <input
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            type="text"
            placeholder="Choose a safe password"
          />
        </div>
        <div>
          <button onClick={() => this.confirm()}>
            {this.state.login ? 'login' : 'create account'}
          </button>
          <button onClick={() => this.setState({ login: !this.state.login })}>
            {this.state.login ? 'need to create an account' : 'already have an account?'}
          </button>
        </div>
      </div>
    );
  }
}

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, authProvider: { email: { email: $email, password: $password } }) {
      id
    }
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

const SIGNIN_USER_MUTATION = gql`
  mutation SigninUserMutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

export default compose(
  graphql(CREATE_USER_MUTATION, { name: 'createUserMutation' }),
  graphql(SIGNIN_USER_MUTATION, { name: 'signinUserMutation' }),
)(Login);
