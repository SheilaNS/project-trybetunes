import { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Logo from '../assets/images/logo.svg';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    name: '',
    isDisabled: true,
    isLoading: false,
    toRedirect: false,
  };

  handleChange = ({ target }) => {
    this.setState(
      {
        name: target.value,
      },
      this.handleNameValidade,
    );
  };

  handleNameValidade = () => {
    const MIN_LENGTH = 3;
    const { name } = this.state;
    this.setState(() => ({
      isDisabled: name.length < MIN_LENGTH,
    }));
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { name } = this.state;
    createUser({ name }).then(() => {
      this.setState({
        isLoading: false,
        toRedirect: true,
      });
    });
  };

  render() {
    const { name, isDisabled, isLoading, toRedirect } = this.state;
    if (isLoading) return <Loading />;
    if (toRedirect) return <Redirect to="/search" />;
    return (
      <div className="bg-gradient-to-r from-blue-500 to-cyan-300 min-h-screen flex items-center justify-center">
        <form className="bg-white px-16 py-10 flex flex-col gap-6 items-center rounded-2xl shadow-lg text-center">
          <img src={ Logo } alt="TrybeTunes logo" />
          <fieldset className="mt-6">
            <input
              data-testid="login-name-input"
              type="text"
              id="name-input"
              name="name-input"
              value={ name }
              onChange={ this.handleChange }
              className="text-center text-blue-700 font-light w-full h-10 block border-2 border-blue-700 rounded-3xl"
              placeholder="Qual o seu nome?"
            />
          </fieldset>
          <button
            data-testid="login-submit-button"
            type="submit"
            disabled={ isDisabled }
            onClick={ (event) => this.handleClick(event) }
            className="text-center text-white font-semibold w-full h-10 block border-2 border-blue-700 bg-blue-700 rounded-3xl"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
