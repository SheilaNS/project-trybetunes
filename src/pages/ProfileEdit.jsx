import { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser, updateUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    image: '',
    description: '',
    email: '',
    isDisabled: true,
    isLoading: false,
  };

  componentDidMount() {
    getUser().then((user) => {
      this.setState(
        {
          name: user.name,
          image: user.image,
          description: user.description,
          email: user.email,
        },
        this.handleValidate,
      );
    });
  }

  handleChange = ({ target }) => {
    this.setState(
      {
        [target.name]: target.value,
      },
      this.handleValidate,
    );
  };

  handleValidate = () => {
    const { name, image, email, description } = this.state;
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const emailOk = regex.test(email);
    const nameOk = name.length !== 0;
    const imageOk = image.length !== 0;
    const descOk = description.length !== 0;
    this.setState({
      isDisabled: !(emailOk && nameOk && imageOk && descOk),
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { name, image, email, description } = this.state;
    this.setState({ isLoading: true });
    const userInfo = {
      name,
      image,
      email,
      description,
    };
    updateUser(userInfo).then(() => {
      const { history } = this.props;
      history.push('/profile');
    });
  };

  render() {
    const { name, image, email, description, isDisabled, isLoading } = this.state;
    const { match } = this.props;
    const { path } = match;

    if (isLoading) return <Loading />;
    return (
      <div className="bg-gray-100 flex">
        <Header url={ path } />
        <div className="flex flex-col grow">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-300 h-44 flex items-end justify-start gap-10">
            <div className="w-52 ml-8 absolute top-20">
              <img
                className="w-52 h-52 rounded-full"
                data-testid="profile-image"
                src={ image }
                alt={ name }
              />
              <label className="flex flex-col" htmlFor="edit-img-input">
                <span>URL da imagem</span>
                <input
                  className="h-8 text-sm font-light pl-2 border border-b-black"
                  data-testid="edit-input-image"
                  type="text"
                  id="edit-img-input"
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
              </label>
            </div>
          </div>
          <div className="flex flex-col items-start pl-72">
            <form className="w-80 h-20 pt-6 flex flex-col">
              <label className="flex flex-col" htmlFor="edit-name-input">
                <span>Nome</span>
                <input
                  className="h-8 text-sm font-light pl-2 border border-b-black"
                  data-testid="edit-input-name"
                  type="text"
                  id="edit-name-input"
                  name="name"
                  value={ name }
                  onChange={ this.handleChange }
                />
              </label>
              <label
                className="h-20 pt-6 flex flex-col"
                htmlFor="edit-email-input"
              >
                <span>E-mail</span>
                <input
                  className="h-8 text-sm font-light pl-2 border border-b-black"
                  data-testid="edit-input-email"
                  type="email"
                  id="edit-email-input"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
              </label>
              <label
                className="h-60 pt-6 flex flex-col mb-6"
                htmlFor="edit-desc-input"
              >
                <span>Descrição</span>
                <textarea
                className="w-96 h-40 p-2 text-sm font-light border border-b-black"
                  data-testid="edit-input-description"
                  type="text"
                  id="edit-desc-input"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                className="text-center text-white font-semibold w-40 h-12 p-2 block border-2 border-blue-700 bg-blue-700 rounded-3xl"
                data-testid="edit-button-save"
                type="submit"
                disabled={ isDisabled }
                onClick={ (event) => this.handleClick(event) }
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  match: PropTypes.shape({
    path: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}.isRequired;
