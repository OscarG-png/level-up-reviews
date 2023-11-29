import TopRatedGames from "./games/TopRatedGames";
function MainPage({ games }) {
  return (
    <div className="main">
      <h1 className="text-center p-5">Level up reviews!</h1>
      <TopRatedGames games={games} />
    </div>
  );
}
export default MainPage;
