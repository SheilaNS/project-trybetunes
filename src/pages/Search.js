import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
    };
  }

  handleChange = ({ target }) => {
    const TAM = 2;
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

  render() {
    const { disabled, name } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search">
          <form>
            <label htmlFor="search">
              <input
                data-testid="search-artist-input"
                type="text"
                id="search"
                name="search"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ disabled }
            >
              Perquisar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Search;
