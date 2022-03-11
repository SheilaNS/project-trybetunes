import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      disabled: true,
      name: '',
      searchList: [],
      loading: false,
      searchOK: true,
      click: false,
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

  handleSearch = async (event) => {
    event.preventDefault();
    this.setState(
      {
        loading: true,
        click: true,
      },
    );
    const tuneSearch = await searchAlbumsAPI(event.target.value);
    this.setState(
      {
        disabled: true,
        searchList: tuneSearch,
        searchOK: tuneSearch.length === 0,
        loading: false,
      },
    );
  }

  render() {
    const { disabled, name, loading, searchList, searchOK, click } = this.state;

    const result = searchList
      .map((album, index) => {
        if (index === 0) {
          return (
            <div key={ album.collectionId }>
              <p>
                Resultado de álbuns de:
                {' '}
                {name}
              </p>
              <p>{album.collectionName}</p>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Ver álbum
              </Link>
            </div>
          );
        }
        return (
          <div key={ album.collectionId }>
            <p>{album.collectionName}</p>
            <Link
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
              albumId={ album.collectionId }
            >
              Ver álbum
            </Link>
          </div>
        );
      });

    return (
      <div data-testid="page-search">
        <Header />
        {
          loading ? <Loading />
            : (
              <form>
                <label htmlFor="search">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    id="search"
                    name="search"
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="submit"
                  data-testid="search-artist-button"
                  disabled={ disabled }
                  value={ name }
                  onClick={ this.handleSearch }
                >
                  Perquisar
                </button>
              </form>
            )
        }
        {searchOK && click ? <p>Nenhum álbum foi encontrado</p> : ''}
        {result || ''}
      </div>
    );
  }
}

export default Search;
