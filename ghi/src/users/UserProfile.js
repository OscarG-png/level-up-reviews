import { useState, useEffect } from "react";
import { Avatar, Card } from "flowbite-react";
import EditForm from "./EditProfileForm";
import { Link } from 'react-router-dom'
import BackgroundForm from "./Backgroundpfp";


const UserProfile = ({userData, setUserData}) => {
const [userReviews, setUserReviews] = useState([]);
const [userFavorites, setUserFavorites] = useState([]);
const [userWishlist, setUserWishlist] = useState([]);
const [showModal, setShowModal] = useState(false);
const [showBackgroundModal, setShowBackgroundModal] = useState(false);
const [selectedBackgroundGame, setSelectedBackgroundGame] = useState(null);

const [currentUser, setCurrentUser] = useState({
  username: "",
  id:"",
  email: "",
  profile_picture: ""})

useEffect(() => {
async function getUser() {
  const response = await fetch(`http://localhost:8000/users`);
        if (response.ok) {
          const data = await response.json();
          const userId = Number(userData.user.id);
      let foundUser = null;

      for (const user of data.users) {
        if (user.id === userId) {
          foundUser = user;
          break;
        }
      }

      if (foundUser) {
        console.log(foundUser)
        setCurrentUser(foundUser);
        loadBackgroundFromLocalStorage();
      }}
}
async function fetchReviews () {
  try{
    const reviewsResponse = await fetch(`http://localhost:8000/users/${userData.user.id}/reviews`);
    if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setUserReviews(reviewsData.user_reviews);
    }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    async function fetchFavorites() {
      try {
        const favoritesResponse = await fetch(
          `${process.env.REACT_APP_API_HOST}/users/${userData.user.id}/favorites`
        );
        if (!favoritesResponse.ok) {
          throw new Error("Failed to fetch favorites");
        }
        const favoritesData = await favoritesResponse.json();
        setUserFavorites(favoritesData.favorites);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    async function fetchWishlist() {
      try {
        const wishListResponse = await fetch(
          `${process.env.REACT_APP_API_HOST}/users/${userData.user.id}/wishlist`
        );
        if (!wishListResponse.ok) {
          throw new Error("Failed to fetch wishlist");
        }
        const wishlistData = await wishListResponse.json();
        setUserWishlist(wishlistData.user_wishlist);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }

  getUser()
  fetchReviews()
  fetchFavorites()
  fetchWishlist()

}, [userData.user.id]);

  const handleSave = async (editedUser) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_HOST}/users/${userData.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedUser),
      }
    );
    if (response.ok) {
      const updatedUserData = await response.json();
      setCurrentUser(updatedUserData);
      setShowModal(false);
    }
  }
const handleSaveBackground = async (selectedBackgroundGame) => {
  setShowBackgroundModal(false);
  setSelectedBackgroundGame(selectedBackgroundGame);
  localStorage.setItem("selectedBackgroundGame", JSON.stringify(selectedBackgroundGame));

};

const defaultBackgroundImage = ""

const toggleBackground = () => {
  setShowBackgroundModal(!showBackgroundModal);
};

const ratingColor = (rating) => {
  if (rating < 60) return {color: 'red'};
  else if (rating >= 60 && rating <= 79) return { color: '#f1c40f' }
  else return { color: 'green' }
}

const toggleEdit = () => {
  setShowModal(!showModal)
}
const loadBackgroundFromLocalStorage = () => {
    const savedBackground = localStorage.getItem("selectedBackgroundGame");
    if (savedBackground) {
      try {
        const parsedBackground = JSON.parse(savedBackground);
        setSelectedBackgroundGame(parsedBackground);
      } catch (error) {
        console.error("Error parsing background from localStorage:", error);
      }
    }
  };


return (
  <div className="main flex flex-col items-center h-full p-4 pt-8 ">
    <div className="absolute top-0 left-0 right-0 bottom-0 -z-10"
        style={{
          backgroundImage: `url(${selectedBackgroundGame?.game_picture || defaultBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}></div>
    <div className="grid grid-cols-2 gap-12 justify-center mb-8">
      <div className="min-w-2xl max-w-2xl">
        <Card className="p-4 bg-gray-50 shadow-md h-96">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="rounded-full shadow-xl overflow-hidden inline-block">
              <Avatar
                img={currentUser.profile_picture}
                alt="Profile"
                size="xl"
                rounded bordered color="gray"
              />
              </div>
            </div>
            <div className="flex-grow ml-8">
              <h1 className="text-3xl font-bold mb-2 text-customPurple">{currentUser.username}</h1>
              <p className="text-lg text-customPurple mb-1 truncate">Email: {currentUser.email}</p>
                <div className="flex gap-4"> {/* Add a container with a gap */}
                <button
                  className="px-4 py-2 text-white bg-customPurple rounded hover:bg-blue-700"
                  onClick={toggleEdit}
                >
                  Edit
                </button>
                <button
                  className="px-4 py-2 text-white bg-customPurple rounded hover:bg-blue-700"
                  onClick={toggleBackground}
                >
                  Set Theme
                </button>
              </div>
            </div>
          </div>
        </Card>
        {showModal && (
          <EditForm
          user={currentUser}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
          showModal={showModal}
          />
        )}
        {showBackgroundModal  && (
          <BackgroundForm
          userFavorites={userFavorites}
          onSave={handleSaveBackground}
          onCancel={() => setShowBackgroundModal(false)}
          showModal={showBackgroundModal}
          />
        )}
      </div>
      {/*reviewsssssssssssssssssssssssss*/}
      <div className="min-w-2xl max-w-2xl ">
        <Card className="bg-gray-50 shadow-md h-96">
          <div className="p-4">
          <h2 className="text-xl font-semibold mb-3">My Reviews</h2>
          </div>
          <div className="overflow-auto h-full ">
          <div className="space-y-4 overflow-hidden">
            {userReviews.map((review) => (
              <div key={review.id} className="p-4 bg-white rounded-lg shadow">
                <h3 className="text-lg font-semibold">{review.game_title}</h3>
                <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
                  <span>{review.review_date}</span>
                  <span className="font-semibold" mb-3>Rating: <span style={ratingColor(review.rating)}>{review.rating}</span></span>
                </div>
                <p className="overflow-hidden">{review.content}</p>
              </div>
            ))}
            </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="flex flex-col gap-8 w-full max-w-5xl">
        <Card className="bg-gray-50 shadow-md w-full p-2 h-[28rem]">
          <h1 className="text-xl font-semibold mb-6 ">Favorite Games</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[28rem]">
            {userFavorites.length > 0 ? (
              userFavorites.map((favorite) => (
                <Link
                  to={`/games/${favorite.game_id}`}
                  key={favorite.game_id}
                  className="flex flex-col items-center"
                >
                  <img
                    src={favorite.game_picture}
                    alt={`Cover of the game ${favorite.title}`}
                    className="h-32 w-24 object-cover border-2 border-gray-300 shadow-xl"
                  />
                  <p className="text-center mt-2">{favorite.title}</p>
                </Link>
              ))
            ) : (
              <div className="text-center py-4">No favorite games to show.</div>
            )}
          </div>
        </Card>
        <Card className="bg-gray-50 shadow-md w-full p-2 h-[28rem] ">
          <h1 className="text-xl font-semibold mb-3 ">Wishlist</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto max-h-[28rem]">
            {userWishlist.length > 0 ? (
              userWishlist.map((wishlist) => (
                <Link
                  to={`/games/${wishlist.game_id}`}
                  key={wishlist.game_id}
                  className="flex flex-col items-center"
                >
                  <img
                    src={wishlist.game_picture}
                    alt={`Cover of the game ${wishlist.title}`}
                    className="h-32 w-24 object-cover border-2 border-gray-300 shadow-xl"
                  />
                  <p className="text-center mt-2">{wishlist.title}</p>
                </Link>
              ))
            ) : (
              <div className="text-center py-4">
                No games in wishlist to show.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
export default UserProfile;
