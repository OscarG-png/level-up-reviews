import { useState, useEffect } from "react";
import { Avatar, Card} from "flowbite-react";


const UserProfile = ({userData}) => {
const [userReviews, setUserReviews] = useState([]);
const [userFavorites, setUserFavorites] = useState([]);
const [userWishlist, setUserWishlist] = useState([]);


async function fetchReviews () {
    const reviewsResponse = await fetch(`http://localhost:8000/users/${userData.user.id}/reviews`);
    if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json();
        setUserReviews(reviewsData)
        }
  }
  async function fetchFavorites () {
    const favoritesResponse = await fetch(`http://localhost:8000/users/${userData.user.id}/favorites`);

    if (favoritesResponse.ok) {
        const favoritesData = await favoritesResponse.json();
        setUserFavorites(favoritesData)
        console.log("ffffffffffaves", favoritesData)
        }
  }
  async function fetchWishlist () {
    const wishListResponse = await fetch(`http://localhost:8000/users/${userData.user.id}/wishlist`);

    if (wishListResponse.ok) {
        const wishlistData = await wishListResponse.json();
        setUserWishlist(wishlistData)
        console.log("wwwwwwwwwwwwwish", wishlistData)
        }
  }


const ratingColor = (rating) => {
  if (rating < 60) return {color: 'red'};
  else if (rating >= 60 && rating <= 79) return { color: '#f1c40f' }
  else return { color: 'green' }
}


useEffect(() => {
  fetchReviews()
  fetchFavorites()
  fetchWishlist()
}, [userData.user.id]);


return (
  <div className="flex flex-col items-center h-screen bg-gray-200 p-4 pt-8">
    <div className="grid grid-cols-2 gap-12 justify-center mb-8">
      <div className="min-w-2xl max-w-2xl">
        <Card className="p-4 bg-gray-50 shadow-md h-96">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="flex-shrink-0">
              <div className="rounded-full shadow-xl overflow-hidden inline-block">
              <Avatar
                img={userData.user.profile_picture}
                alt="Profile"
                size="xl"
                rounded bordered color="gray"
              />
              </div>
            </div>
            <div className="flex-grow ml-8">
              <h1 className="text-3xl font-bold mb-2">{userData.user.username}</h1>
              <p className="text-lg mb-1 truncate">Email: {userData.user.email}</p>
              <p className="text-sm overflow-hidden">Bio: asdf;laksdj ;alkjd;flaksjdf ;alsdkjf ;als...</p>
            </div>
          </div>
        </Card>
      </div>
      {/*reviewsssssssssssssssssssssssss*/}
      <div className="min-w-2xl max-w-2xl">
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
        <h1 className="text-xl font-semibold mb-3 ">Favorite Games</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userFavorites.slice(0,6).map((favorite) => (
                <div key={favorite.game_id} className="flex flex-col items-center">
                  <img src="https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic%20Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg"
                  className="h-32 w-23 object-cover border-2 border-gray-300 shadow-xl"/>
                  <p className="text-center mt-2">{favorite.title}</p>
                  </div>
              ))}
          </div>
      </Card>

      <Card className="bg-gray-50 shadow-md w-full p-2 h-[28rem]">
        <h1 className="text-xl font-semibold mb-3 ">Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {userWishlist.slice(0,6).map((wishlist) => (
                <div key={wishlist.game_id} className="flex flex-col items-center">
                  <img src="https://cdn1.epicgames.com/epic/offer/RDR2PC1227_Epic%20Games_860x1148-860x1148-b4c2210ee0c3c3b843a8de399bfe7f5c.jpg"
                  className="h-32 w-23 object-cover border-2 border-gray-300 shadow-xl"/>
                  <p className="text-center mt-2">{wishlist.title}</p>
                  </div>
              ))}
          </div>
      </Card>
    </div>
  </div>
);
}
export default UserProfile;
