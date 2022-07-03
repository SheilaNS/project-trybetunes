import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import * as favorite from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      favoriteList: [],
    };
  }

  async componentDidMount() {
    this.getFavoriteList();
  }

  async componentDidUpdate() {
    this.getFavoriteList();
  }

  handleSave = async ({ target }) => {
    const { musicInfo } = this.props;
    this.setState({
      loading: true,
    });
    if (!target.checked) {
      await favorite.removeSong(musicInfo);
    }
    this.setState({
      loading: false,
    });
  };

  render() {
    const { favoriteList, loading } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites">
          <h2>Músicas Favoritas</h2>
          <div className="musicCard">
            {
              loading
                ? <Loading />
                : (
                  <>
                    <p>{trackName}</p>
                    <audio
                      data-testid="audio-component"
                      src={ previewUrl }
                      controls
                    >
                      <track kind="captions" />
                      O seu navegador não suporta o elemento
                      {' '}
                      <code>audio</code>
                      .
                    </audio>
                    <label htmlFor="favorite">
                      Favorita
                      <input
                        type="checkbox"
                        data-testid={ `checkbox-music-${trackId}` }
                        checked={ favoriteList.some((fav) => fav.trackId === trackId) }
                        onChange={ this.handleSave }
                      />
                    </label>
                  </>
                )
            }

          </div>

        </div>
      </>
    );
  }
}

Favorites.propTypes = {
  musicInfo: PropTypes.objectOf(
    PropTypes.any,
  ).isRequired,
};

export default Favorites;
