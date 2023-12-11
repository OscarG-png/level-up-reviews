import RecentGames from "./games/RecentGames";
import TopRatedGames from "./games/TopRatedGames";
import GenreMain from "./genres/GenreMainPage";
import { useEffect, useState } from "react";

function MainPage({ games, genre, genregames }) {
  const ratingColor = (rating) => {
    if (rating < 60) return {color: 'red'};
    else if (rating >= 60 && rating <= 79) return { color: '#f1c40f' }
    else return { color: 'green' }
  }

  const [reviews, setMainReviews] = useState([]);
  async function getMainReviews() {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/games/reviews/main`
    );
    if (response.ok) {
      const data = await response.json();
      setMainReviews(data.reviews);
    }
  }

  useEffect(() => {
    getMainReviews();
  }, []);

  return (
    <div className="main bg-white dark:bg-gray-800 text-black dark:text-white shadow-xl p-5">
      <h1  className="p-5 text-center text-outline text-customPurple" style={{ fontSize: '4rem', fontWeight: 'bold'  }}>Level up reviews!</h1>
      <RecentGames games={games} />
      <GenreMain genre={genre} genregames={genregames} />
      <TopRatedGames games={games} />

      <div className="flex justify-between">
        <div className="w-1/2 pr-2">
          <h1 className="mb-2 text-center text-outline text-customPurple" style={{ fontSize: '1.5rem', fontWeight: 'bold'  }}>List of Recent Reviews</h1>
          <ul  className="divide-y divide-gray-100">
            {reviews.slice(0, 5).map((review) => (
              <li key={review.id} className="py-5">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                    src={review.profile_picture}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">{review.game_title}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{review.title}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{review.content}</p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500"> <span className="font-semibold mb-3" >Rating: <span style={ratingColor(review.rating)}>{review.rating}</span></span></p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{review.username}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-1/2 pl-2">
          <h1 className="mb-2 text-center text-outline text-customPurple" style={{ fontSize: '1.5rem', fontWeight: 'bold'  }}>List of Top Reviews</h1>
          <ul  className="divide-y divide-gray-100">
            {reviews
              .filter((review) => review.rating >= 90)
              .slice(0, 5)
              .map((topReview) => (
                <li key={topReview.id} className="py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={topReview.profile_picture}
                      alt=""
                    />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{topReview.game_title}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{topReview.title}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{topReview.content}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500"> <span className="font-semibold mb-3" >Rating: <span style={ratingColor(topReview.rating)}>{topReview.rating}</span></span></p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{topReview.username}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
