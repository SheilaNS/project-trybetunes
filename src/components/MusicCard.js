import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as favorite from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  handleSave = async ({ target }) => {
    const { musicInfo } = this.props;
    this.setState({
      checked: target.checked,
      loading: true,
    });
    await favorite.addSong(musicInfo);
    this.setState({
      loading: false,
    });
    await favorite.getFavoriteSongs();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (
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
                    checked={ checked }
                    onChange={ this.handleSave }
                  />
                </label>
              </>
            )
        }

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  musicInfo: PropTypes.arrayOf.isRequired,
};

export default MusicCard;
