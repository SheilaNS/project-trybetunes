import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
// import * as favorite from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: [],
      albumInfo: {},
      loading: true,
      // favoriteList: [],
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
        loading: false,
        // favoriteList: await favorite.getFavoriteSongs(),
      },
    );
  }

  render() {
    const { musics, albumInfo, loading } = this.state;
    const playList = musics
      .map((music) => (
        <MusicCard
          key={ music.trackId }
          trackName={ music.trackName }
          previewUrl={ music.previewUrl }
          musicInfo={ music }
          trackId={ music.trackId }
          // checked={ favoriteList
          //   .some((fav) => +fav.trackId === +music.trackId) }
        />));
    return (
      <>
        <Header />
        {
          loading
            ? <Loading />
            : (
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
            )
        }
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
