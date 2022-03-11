import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      albumInfo: {},
    };
  }

  async componentDidMount() {
    const { location } = this.props;
    const { pathname } = location;
    const albumID = pathname.split('/')[2];
    const album = await getMusics(albumID);
    const albumInfo = album[0];
    this.setState(
      {
        albumInfo,
        musics: album.filter((_music, index) => index !== 0),
      },
    );
  }

  render() {
    const { musics, albumInfo } = this.state;
    const playList = musics
      .map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
        />));
    return (
      <>
        <Header />
        <div data-testid="page-album">
          <p data-testid="artist-name">
            Artista:
            {' '}
            {albumInfo.artistName}
          </p>
          <p data-testid="album-name">
            Álbum:
            {' '}
            {albumInfo.collectionName}
          </p>
          {playList}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default Album;
