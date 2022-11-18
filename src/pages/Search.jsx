import { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

export default class Search extends Component {
  state = {
    artistInput: '',
    artistName: '',
    artistAlbuns: [],
    isDisabled: true,
    isLoading: false,
  };

  handleChange = ({ target }) => {
    this.setState(
      {
        artistInput: target.value,
      },
      this.handleArtistVerify,
    );
  };

  handleArtistVerify = () => {
    const MIN_LENGTH = 2;
    const { artistInput } = this.state;
    this.setState(() => ({
      isDisabled: artistInput.length < MIN_LENGTH,
    }));
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const { artistInput } = this.state;
    searchAlbumsAPI(artistInput).then((response) => {
      this.setState({
        artistName: artistInput,
        artistAlbuns: response,
        artistInput: '',
        isLoading: false,
      });
    });
  };

  render() {
    const { artistInput, isDisabled, isLoading, artistName, artistAlbuns } = this.state;
    const { match } = this.props;
    const { path } = match;

    return (
      <div className="bg-gray-100 flex">
        <Header url={ path } />
        <div className="flex flex-col grow">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-300 h-44 flex items-center justify-center">
            <form className="flex justify-center items-center gap-4 h-20">
              <input
                data-testid="search-artist-input"
                name="artist-input"
                id="artist-input"
                value={ artistInput }
                onChange={ this.handleChange }
                placeholder="Digite a sua pesquisa"
                className="h-10 rounded-full w-80 p-4"
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ isDisabled }
                onClick={ (event) => this.handleClick(event) }
                className="w-28 bg-blue-600 h-10 rounded-full text-white border border-blue-500"
              >
                Procurar
              </button>
            </form>
          </div>
          {isLoading && <Loading />}
          {artistName.length !== 0 && (
            <p className="text-center mt-4">{`Resultado de álbuns de: ${artistName}`}</p>
          )}
          {artistAlbuns.length === 0 ? (
            <p className="text-center m-6">Nenhum álbum foi encontrado</p>
          ) : (
            <div className="flex flex-wrap gap-2 mt-4 ml-4">
              {artistAlbuns.map((album) => (
                <div className="w-40" key={ album.collectionId }>
                  <Link
                    className="flex flex-col gap-2"
                    data-testid={ `link-to-album-${album.collectionId}` }
                    to={ `/album/${album.collectionId}` }
                  >
                    <img
                      className="w-40 h-40 border-2"
                      src={ album.artworkUrl100 }
                      alt={ `Nome do álbum: ${album.collectionName}` }
                    />
                    <p className="font-medium text-sm">
                      {album.collectionName}
                    </p>
                    <p className="font-light text-xs">{album.artistName}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}.isRequired;
