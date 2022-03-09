import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      name: '',
    };
  }

  async componentDidMount() {
    const userName = await getUser();
    this.setState(
      {
        name: userName.name,
        loading: false,
      },
    );
  }

  render() {
    const { loading, name } = this.state;
    return (
      <header data-testid="header-component">
        <h1>TrybeTunes</h1>
        <h2 data-testid="header-user-name">{name}</h2>
        {loading && <Loading />}
        <Link to="/search" data-testid="link-to-search">Procurar</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
