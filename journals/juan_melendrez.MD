## November 17, 2023


This week, I worked on the following tasks:


    *I created a database for Games, Platforms, and a junction table of the two called game_platforms


To kick things off, I created the table for games as well as a couple of endpoints for that table, specifically the GET all endpoint and a POST endpoint.


As we alternated between driving and being helpers mid-week, I did a bit of both, looking on others as they took the lead coding, I tried to identify any potential errors and assisted in the debuging process.


Towards the end of the week, I focused on creating more tables, specifcally the platforms table and a junction table called game_platforms. I then created various endpoints for these tables, a GET all and a POST for the platforms table and two GET methods for the game_platforms table that gets all the platforms relevant to a specific game id and all the games relevant to a specific platform_id.


This last section is where I faced a bit of struggle, trying to create the proper queries to grab the relevant information from the DBs was tough initially, luckily, some learn resources and the recent lectures on inner joins helped get this done. Moreso, I ran into failed pipelines during merge requests due to formatting issues but were resolved rather quickly using black. Other than this, the week went rather smoothly.


## November 22, 2023 - End of Week

This week, I worked on the following tasks:

    *I created a game_genres junction table + endpoinnts

Being that it was a 3 day week, I didn't get as much done as the previous check, however, I primarily worked on a game_genres junction table which references games and genres via their id. This allows us to create a relationship between many genres and many games. I also worked on the queries for this table and the relevant endpoints, a create and a get all. We will be able to use these endpoints to create genre-game relationships and populate our list genres page.



## December 04, 2023

Last week and today, I worked on the following tasks:

    *creating get all reviews endpoint, top rated games endpoint, favorite game + wishlist backend, and began on the user profile and the game details pages.

Last week and the day of this journal entry, I worked on creating a couple of more endpoints that we needed, particularly a get all reviews endpoint that I needed to get all the reviews of a particular user and the revies of a particular game. I also worked on a top rated games endpoint. Using SQL, I was able to write a query that grabbed all games which had an average rating score of 90+, we plan on using this endpoint to populate or top rated games page. In addition to this, I worked on a bit more backend, I created the favorite games table and the wishlist table, as well as the necessary queries and endpoints. These two functionalities are relatively similar as they both reference a game and a user. We will use both of these API's to list users favorite games and their wishlist via their profile. We will also use them to make POST requests via the game details page so a user can add the game to a list.

For the front-end, I worked between the user profile and the game details page. I worked on getting the the user information to populate a portion of the page, and also use the get all reviews endpoint to get all the reviews for the logged in user and display it on the page. In addition, I also made use of the favorites and wishlist API's to populate the user profile's favorites and wishlist sections. I'm currently working on the edit functinality. This has been the most troubling since making a PUT request for our current user info. requires a password, which I don't know how to access currently. I will look towards my team to help problem solve this.

In addition to the user profile, I worked on the game details page, I used the get game endpoint to populate the page with some game information, I also uses the a reviews endpoint which takes the game_id as a parameter to display all the reviews for a specific game. I am currently working on the favorite + wishlist functionality so when a user clicks on either/or, it is added to their favorites/wishlist.


## December 11, 2023

Last week and today, I worked on the following tasks:

    *Adding a create review button to the game detils page, created a create review unit test, added edit functionality to the user profile, added dynamic images to the user game's favorites + wishlist, add game details link to all-games list, added error handling to the reviews page and fixed sign up page issue.

In the beginning of last week, December 5th, I worked on adding a review button to the game details page, this button was necessary to lead into the review form which used the game_id from the page. In addition to this, I worked on creating a my required unit test, I decided to create a unit test for our create review method and got it passing.

Later in the week, I worked on the edit functionality for the user profile as well as some issues that arose here. For starters, the user information wouldn't update after submitting the edit, although it was visible on the backend. The team and I figured that this was because the data we were pulling was from the logged in user, whose data wouldn't update, so we opted to update the profile information from the get users method, fixing our issue.

Towards the end of the week, I worked on more basic functionality like showing dynamic images for the favorites/wishlist in the user's profile since when I initially created them, the game table didn't have a picture value. Finally, I worked on adding game details link to the games list and labeling for the edit user profile form.
