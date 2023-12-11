import React, { useState } from 'react';
import { Link } from "react-router-dom";

const DetailAlert = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <>
      {isVisible && (
            <div id="alert-additional-content-1" className="main p-4 mb-4 text-blue-800 border border-blue-300 rounded-lg bg-gradient-to-b from-gray-600 to-zinc-900 dark:text-blue-400 dark:border-blue-800" role="alert">
            <div className="flex items-center">
                <svg className="flex-shrink-0 w-4 h-4 me-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only text-white">Info</span>
                <h3 className="text-lg font-medium text-white">Reminder</h3>
            </div>
            <div className="mt-2 mb-4 text-sm text-white">
                Must be Logged in to continue. If not a member please sign up.
            </div>
            <div className="flex">
                <Link to="/login"><button type="button" className="text-white bg-fuchsia-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-fuchsia-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-fuchsia-900 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-900">
                <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                </svg>
                Login
                </button>
                </Link>
                <Link to="/signup"><button type="button" className="text-white bg-fuchsia-900 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-fuchsia-900 font-medium rounded-lg text-xs px-3 py-1.5 me-2 text-center inline-flex items-center dark:bg-fuchsia-900 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-900">
                <svg className="me-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                </svg>
                Signup
                </button>
                </Link>
                <button onClick={handleClose} type="button" className="text-white bg-fuchsia-900 border border-fuchsia-900 hover:bg-fuchsia-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center " data-dismiss-target="#alert-additional-content-1" aria-label="Close">
                Close
                </button>
            </div>
            </div>
      )}
    </>
  );
};

export default DetailAlert;
