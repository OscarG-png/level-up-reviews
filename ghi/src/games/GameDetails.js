import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button, Avatar } from "flowbite-react";

function GameDetails({ userData }) {
  const { game_id } = useParams();
  const [gameDetails, setGameDetails] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [wishlist, setUserWishlist] = useState(false);

  async function fetchGame() {
    const response = await fetch(`http://localhost:8000/games/${game_id}`);
    if (response.ok) {
      const data = await response.json();
      setGameDetails(data);
    }
  }

  async function fetchGameReviews() {
    const response = await fetch(
      `http://localhost:8000/games/${game_id}/reviews`
    );
    if (response.ok) {
      const data = await response.json();
      setGameReviews(data.reviews);
    }
  }
  const ratingColor = (rating) => {
    if (rating < 60) return { color: "red" };
    else if (rating >= 60 && rating <= 79) return { color: "#f1c40f" };
    else return { color: "green" };
  };

  async function addToFavorites() {
    const userId = userData.user.id;
    const response = await fetch(`http://localhost:8000/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        game_id: game_id,
      }),
    });
    if (response.ok) {
      setFavorite(true);
    }
  }

  async function removeFromFavorites() {
    const response = await fetch(`http://localhost:8000/favorites/${game_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setFavorite(false);
    }
  }

  async function addToWishlist() {
    const userId = userData.user.id;
    const response = await fetch(`http://localhost:8000/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        game_id: game_id,
      }),
    });
    if (response.ok) {
      setUserWishlist(true);
    }
  }
  async function removeFromWishlist() {
    const response = await fetch(`http://localhost:8000/wishlist/${game_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setUserWishlist(false);
    }
  }

  async function checkFavorite() {
    const response = await fetch(
      `http://localhost:8000/users/${userData.user.id}/favorites`
    );
    if (response.ok) {
      const favoritesList = await response.json();
      let isFavorite = false;
      for (let favoriteGame of favoritesList.favorites) {
        if (favoriteGame.game_id.toString() === game_id.toString()) {
          isFavorite = true;
          break;
        }
      }
      setFavorite(isFavorite);
    }
  }
  async function checkWishlist() {
    const response = await fetch(
      `http://localhost:8000/users/${userData.user.id}/wishlist`
    );
    if (response.ok) {
      const wishlistList = await response.json();
      let isWishlist = false;
      for (let wishlistGame of wishlistList.user_wishlist) {
        if (wishlistGame.game_id.toString() === game_id.toString()) {
          isWishlist = true;
          break;
        }
      }
      setUserWishlist(isWishlist);
    }
  }

  useEffect(() => {
    fetchGame();
    fetchGameReviews();
    checkFavorite();
    checkWishlist();
  }, [game_id, userData.user.id]);

  return (
    <div className="flex flex-col items-center py-16">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 -z-10"
        style={{
          backgroundImage: `url(${gameDetails.game_picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(16px)",
          minHeight: "100vh",
        }}
      ></div>

      <Card className="mb-5 w-full max-w-4xl shadow-2xl bg-gradient-to-b from-gray-600 to-zinc-900 rounded-xl">
        <div className="flex flex-col lg:flex-row">
          <img
            src={gameDetails.game_picture}
            className="rounded-lg w-full lg:w-1/2 h-auto object-cover"
            alt="..."
          />
          <div className="p-4 flex flex-col justify-between w-full lg:w-1/2">
            <h5 className="text-3xl font-bold tracking-tight text-white">
              {gameDetails.title}
            </h5>
            <h6 className="font-normal text-gray-200 text-lg">
              Released: {gameDetails.release_date}
            </h6>

            <div className="flex gap-4 mt-4">
              <Button
                color="purple"
                outline={wishlist}
                hover="bg-purple-700 text-white"
                onClick={wishlist ? removeFromWishlist : addToWishlist}
              >
                {wishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </Button>
              <Button
                color="blue"
                outline={favorite}
                hover="bg-purple-700 text-white"
                onClick={favorite ? removeFromFavorites : addToFavorites}
              >
                {favorite ? "Remove from Favorite" : "Add to Favorite"}
              </Button>
              <Link
                to={{
                  pathname: `/games/${game_id}/reviews`,
                }}
              >
                <Button>Create Review</Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>

      <div className="w-full max-w-4xl">
        <Card className="bg-gray-50 shadow-2xl bg-gradient-to-b from-gray-600 to-zinc-900 rounded-xl">
          <div className="p-4">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-4">
              Game Reviews
            </h2>
          </div>
          <div className="overflow-auto h-96">
            <div className="space-y-4 overflow-hidden px-4">
              {gameReviews.length > 0 ? (
                gameReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-gradient-to-br from-slate-100 to-slate-300 rounded-lg shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar
                        img={review.profile_picture}
                        alt={review.username}
                        size="md"
                        rounded
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {review.username}
                        </h3>
                        <span className="text-sm text-gray-600">
                          Reviewed on: {review.review_date}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                      <p>{review.content}</p>
                      <span className="font-semibold">
                        Rating:{" "}
                        <span style={ratingColor(review.rating)}>
                          {review.rating}
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GameDetails;
