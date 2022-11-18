import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  addSong,
  getFavoriteSongs,
  removeSong,
} from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    isChecked: false,
    isLoading: false,
  };

  componentDidMount() {
    getFavoriteSongs().then((response) => {
      const { trackId } = this.props;
      this.setState({
        isChecked: response.some((music) => music.trackId === trackId),
      });
    });
  }

  handleClick = ({ target }) => {
    if (target.checked) {
      this.setState({
        isLoading: true,
        isChecked: true,
      });
      addSong(this.props).then(() => {
        this.setState({ isLoading: false });
      });
    } else {
      this.setState({ isLoading: true });
      removeSong(this.props).then(() => {
        this.setState({
          isLoading: false,
          isChecked: false,
        });
      });
    }
  };

  render() {
    const { isChecked, isLoading } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    if (isLoading) {
      return (
        <div className="flex h-[76px] w-4/5 items-center justify-center">
          <Loading />
        </div>
      );
    }
    return (
      <div className="flex gap-6 pt-4 w-4/5 items-center justify-between">
        <p className="text-sm grow">{trackName}</p>
        <audio
          className="border border-gray-600 rounded-full"
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorite-checkbox" className="mr-8 flex gap-2">
          <span>Favorita</span>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            id="favorite-checkbox"
            name={ trackId }
            onChange={ (event) => this.handleClick(event) }
            checked={ isChecked }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
