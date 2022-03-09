import React, { Component } from 'react';
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
    console.log(userName);
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
      </header>
    );
  }
}

export default Header;
