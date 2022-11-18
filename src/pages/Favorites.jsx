import { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FavoriteMusicCard from '../components/FavoriteMusicCard';

export default class Favorites extends Component {
  state = {
    favoriteList: [],
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    getFavoriteSongs().then((response) => {
      this.setState({
        favoriteList: response,
        isLoading: false,
      });
    });
  }

  componentDidUpdate() {
    getFavoriteSongs().then((list) => {
      this.setState({
        favoriteList: list,
      });
    });
  }

  render() {
    const { isLoading, favoriteList } = this.state;
    const { match } = this.props;
    const { path } = match;
    if (isLoading) return <Loading />;
    return (
      <div className="bg-gray-100 flex">
        <Header url={ path } />
        <div className="flex flex-col grow">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-300 h-44 flex items-center justify-center gap-10">
            <h2 className="text-lg font-semibold" data-testid="page-favorites">
              Favorites
            </h2>
          </div>
          <div className="flex flex-col items-center divide-y-2 divide-slate-400/25 gap-4">
            {favoriteList.map((music) => (
              <FavoriteMusicCard key={ music.trackId } { ...music } />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Favorites.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}.isRequired;
