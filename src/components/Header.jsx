import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Logo from '../assets/images/logo.svg';
import Loading from './Loading';
import Search from '../assets/icons/search.svg';
import Fav from '../assets/icons/fav.svg';
import User from '../assets/icons/user.svg';

export default class Header extends Component {
  state = {
    name: '',
    image: '',
    isLoading: false,
  };

  INACTIVE = 'text-gray-400 flex gap-3';

  ACTIVE = 'flex gap-3';

  componentDidMount() {
    this.setState({ isLoading: true });
    getUser().then((user) => {
      this.setState({
        name: user.name,
        image: user.image,
        isLoading: false,
      });
    });
  }

  render() {
    const { name, image, isLoading } = this.state;
    const { url } = this.props;
    return (
      <header
        data-testid="header-component"
        className="bg-white flex flex-col min-w-[240px] p-8 justify-between h-screen"
      >
        <img className="w-44 self-center" src={ Logo } alt="TrybeTunes logo" />
        <nav className="flex flex-col h-40 justify-between">
          <Link
            id="search"
            className={ url === '/search' ? this.ACTIVE : this.INACTIVE }
            data-testid="link-to-search"
            to="/search"
          >
            <img className="" src={ Search } alt="Search Icon" />
            Search
          </Link>
          <Link
            id="fav"
            className={ url === '/favorites' ? this.ACTIVE : this.INACTIVE }
            data-testid="link-to-favorites"
            to="/favorites"
          >
            <img className="" src={ Fav } alt="Search Icon" />
            Favorites
          </Link>
          <Link
            id="user"
            className={ url === '/profile' ? this.ACTIVE : this.INACTIVE }
            data-testid="link-to-profile"
            to="/profile"
          >
            <img className="" src={ User } alt="Search Icon" />
            Profile
          </Link>
        </nav>
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <Loading />
          </div>
        ) : (
          <div className="flex gap-3 items-center h-20">
            <img className="w-12 rounded-full" src={ image } alt="" />
            <p data-testid="header-user-name">{name}</p>
          </div>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  url: PropTypes.string,
}.isRequired;
