import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";

function CreateReview({ userData }) {
  const { game_id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const { token } = useAuthContext();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {};
    data.title = title;
    data.content = content;
    data.review_date = formattedDate;
    data.rating = rating;
    data.game_id = game_id;
    data.user_id = userData.user.id;
    const ReviewsUrl = `${process.env.REACT_APP_API_HOST}/reviews`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(ReviewsUrl, fetchConfig);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to create review");
      }
        setTitle("");
        setContent("");
        setRating("");
        navigate(`/games/${game_id}`);
    } catch (error) {
      console.error("Unable to submit review", error);
    }
  };

 return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-gray-800 text-black dark:text-white">
            <div className="sm:mx-auto sm:w-full sm:max-w-md dark:bg-gray-800 text-black dark:text-white">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:bg-gray-800 text-black dark:text-white">
                    Create a Review
                </h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md dark:bg-gray-800 text-black dark:text-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:bg-gray-800 text-black dark:text-white">
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 text-black dark:text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:bg-gray-800 text-black dark:text-white">
                            Content
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="content"
                                name="content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 text-black dark:text-white"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700 dark:bg-gray-800 text-black dark:text-white">
                             Rating: {rating}
                        </label>
                        <div className="mt-1">
                            <input
                                id="rating"
                                name="rating"
                                type="range"
                                required
                                value={rating}
                                onChange={(e) => setRating(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500  "
                >
                    Submit Review
                </button>
            </div>
        </form>
      </div>
    </div>
  );
}

export default CreateReview;
