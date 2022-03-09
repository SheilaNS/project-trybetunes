import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabled: true,
      loading: false,
      redirect: false,
    };
  }

  handleChange = ({ target }) => {
    const TAM = 3;
    const valid = target.value.length < TAM;
    if (valid) {
      this.setState(
        {
          disabled: true,
          name: target.value,
        },
      );
    } else {
      this.setState(
        {
          disabled: false,
          name: target.value,
        },
      );
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    this.setState(
      {
        loading: true,
      },
    );
    await createUser({ name });
    this.setState(
      {
        loading: false,
        redirect: true,
      },
    );
  }

  render() {
    const { name, disabled, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        <form onSubmit={ this.handleClick }>
          <label htmlFor="name">
            Nome:
            <input
              data-testid="login-name-input"
              name="name"
              id="name"
              onChange={ this.handleChange }
              value={ name }
            />
          </label>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
        { loading && <Loading /> }
        { redirect && <Redirect to="/search" /> }
      </div>
    );
  }
}

export default Login;
