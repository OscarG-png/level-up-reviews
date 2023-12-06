import RecentGames from "./games/RecentGames";
import TopRatedGames from "./games/TopRatedGames";
import GenreMain from "./genres/GenreMainPage";
function MainPage({ games, genre, genregames }) {

  return (
    <div className="main bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl">
      <h1 className="text-center p-5">Level up reviews!</h1>
      <TopRatedGames games={games} />
      <GenreMain genre={genre} genregames={genregames} />
      <RecentGames games={games} />
    </div>
  );
}
export default MainPage;
