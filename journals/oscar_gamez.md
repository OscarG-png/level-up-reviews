- Nov 14th 2023
  I added to the docker-compose file to get our postreSQL up and running. I also added the table for users.

-Nov 15th 2023
Today I created a few issues on gitlab to be worked on, oversaw a merge request and helped fixed some issues with merge request that was throwing some pipeline errors.
I also did some work on the authentication but it's still not complete.

-Nov 16th 2023
I finished authentications for users. there was a few blockers from trying to follow the example too literally.
-Nov 21 2023
Today I worked on implementing a PUT method for users. I wanted to have a way for users to update their profile, such as changing their username, password, and their profile picture. I modeled most of it off of the create user function we already had. After a small amount of troubleshooting i've got it functional.
-Nov 27th 2023
I started working on a front end component for the main page. I wanted to make a component for top rated games that could be imported into the main page. I still need to add some logic for filtering based on a certain user rating amount but currently i'm just focusing on getting the component up and running. ran into an issue where my props weren't properly being passed, turned out to it was simply how my data was being accessed and i didn't realize that data.games wasn't what i needed to be invoking in order to get my app working correctly.
-Nov 28th 2023
I fixed my prop issue from yesterday and created a top rated games component for the front end. Currently happy with the look of it but i'm going to have to come back and add functionality to it, like clicking on an image will take a user to that games detail page, when we finish the games detail page.
-Nov 29th 2023
Today I decided to try out implementing unit tests in our project, was pretty straight forward to get going. I created a test for getting all users and for creating a game
-Dec 1 2023
Today I got the backend fully deployed. After getting that completed I took it upon myself to populate the database with about 25 games. We haven't looked at implementing a 3rd party API to add to our database and I figured it'd be best to populate our own so we have data to manipulate for the front end.
-Dec 4 2023
Today I created a new migration for our database that adds genres to our database to be used for our games on our frontend. I also created a front end page that takes the user to a recent games page. This is useful for users that navigate away from the main page but might want to look at recent games that are released. I also created an endpoint for users to be able to update their reviews. I also created a all games page for the frontend so users can see all of the games that are currently in our database. I also created a new migration to insert data into our game_genres table
-Dec 7 2023
Yesterday I spent the day fixing most of our backend endpoints, they weren't conforming to proper JSON shapes. I also went through our app.js and removed redundant useEffects and combined them all together. Today I went through our frontend components and changed all a tags to Link tags to prepare for frontend deployment.
-Dec 8 2023
Today I did a bunch of cleaning up code so I get it to build for the frontend. I also went through and changed all instances of localhost:8000 to ${process.env.REACT_APP_API_HOST} so things will work for frontend deployment.
