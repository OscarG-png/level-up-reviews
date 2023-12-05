import React, { useState } from 'react';

function CreateReview() {


    const [title,setTitle] = useState('');
    const [content, setContent] = useState('');
    const [reviewDate, setReviewDate] = useState('');
    const [rating, setRating ] = useState('');
    const [gameId, setGameId] = useState('');
    const [userId, setUserId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        


        const data = {};
        data.title = title;
        data.content = content;
        data.review_date = reviewDate;
        data.rating = rating;
        data.game_id = gameId;
        data.user_id = userId;


    const ReviewsUrl = `${process.env.REACT_APP_API_HOST}/reviews`
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json',
        },
    };



    const response = await fetch(ReviewsUrl, fetchConfig);
    if (response.ok) {
        const newReview= await response.json();
        console.log(newReview);

        setTitle('');
        setContent('');
        setReviewDate('');
        setRating('');
        setGameId('');
        setUserId('');
        }
    }


    const handleTitleChange = (e) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleContentChange = (e) => {
        const { value } = e.target;
        setContent(value);
    }
    const handleReviewDateChange = (e) => {
        const { value } = e.target;
        setReviewDate(value);
    }
    const handleRatingChange = (e) => {
        const { value } = e.target;
        setRating(value);
    }
    const handleGameIdChange = (e) => {
        const { value } = e.target;
        setGameId(value);
    }
    const handleUserIdChange = (e) => {
        const { value } = e.target;
        setUserId(value);
    }

 return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create a Review
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
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
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                            Content
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="content"
                                name="content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="reviewDate" className="block text-sm font-medium text-gray-700">
                            Review Date
                        </label>
                        <div className="mt-1">
                            <input
                                id="reviewDate"
                                name="reviewDate"
                                type="date"
                                required
                                value={reviewDate}
                                onChange={(e) => setReviewDate(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                            Rating
                        </label>
                        <div className="mt-1">
                            <input
                                id="rating"
                                name="rating"
                                type="number"
                                required
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>


                    <div>
                        <label htmlFor="gameId" className="block text-sm font-medium text-gray-700">
                            Game ID
                        </label>
                        <div className="mt-1">
                            <input
                                id="gameId"
                                name="gameId"
                                type="text"
                                required
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

            <div>
                <label htmlFor="userId" className="block text-sm font-medium text-gray-700">
                    User ID
                </label>
                <div className="mt-1">
                    <input
                        id="userId"
                        name="userId"
                        type="text"
                        required
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
            </div>


            <div>
                <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
