import { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    artistInfo: {},
    albumMusics: [],
  };

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    getMusics(params.id).then((response) => {
      this.setState({
        artistInfo: response[0],
        albumMusics: response.filter((music) => music.kind === 'song'),
      });
    });
  }

  render() {
    const { artistInfo, albumMusics } = this.state;
    const { match } = this.props;
    const { path } = match;
    return (
      <div className="bg-gray-100 flex">
        <Header url={ path } />
        <div className="flex flex-col grow">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-300 h-44 flex items-end justify-start gap-10">
            <img
              className="w-52 ml-8 absolute top-20"
              src={ artistInfo.artworkUrl100 }
              alt=""
            />
            <div className="mb-8 ml-72">
              <h3 className="text-lg font-semibold" data-testid="album-name">
                {artistInfo.collectionName}
              </h3>
              <h4 className="text-xs" data-testid="artist-name">
                {artistInfo.artistName}
              </h4>
            </div>
          </div>
          <div className="flex flex-col items-start pl-72 divide-y-2 divide-slate-400/25 gap-4">
            {albumMusics.map((music) => (
              <MusicCard key={ music.trackId } { ...music } />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
