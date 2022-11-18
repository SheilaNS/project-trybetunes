import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';

export default class Profile extends Component {
  state = {
    userInfo: {},
  };

  componentDidMount() {
    getUser().then((user) => {
      this.setState({
        userInfo: user,
      });
    });
  }

  render() {
    const { userInfo } = this.state;
    const { match } = this.props;
    const { path } = match;

    return (
      <div className="bg-gray-100 flex">
        <Header url={ path } />
        <div className="flex flex-col grow">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-300 h-44 flex items-end justify-start gap-10">
            <img
              className="w-52 ml-8 absolute top-20 rounded-full"
              data-testid="profile-image"
              src={ userInfo.image }
              alt={ userInfo.name }
            />
          </div>
          <div className="flex flex-col items-start pl-72">
            <div className="h-20 pt-6">
              <p className="">Nome</p>
              <p className="font-light text-sm">{userInfo.name}</p>
            </div>
            <div className="h-20 pt-6">
              <p className="">E-mail</p>
              <p className="font-light text-sm">{userInfo.email}</p>
            </div>
            <div className="h-40 pt-6">
              <p className="">Descrição</p>
              <p className="font-light text-sm">
                {userInfo.description}
              </p>
            </div>
            <Link
              className="text-center text-white font-semibold w-40 pt-1 h-10 block border-2 border-blue-700 bg-blue-700 rounded-3xl"
              to="/profile/edit"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}.isRequired;
