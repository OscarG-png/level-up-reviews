steps = [
    [
        # Create the table
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(200) NOT NULL,
            profile_picture VARCHAR(500)
        );
        """,
        # Drop the table
        """
        DROP TABLE users;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE games (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            title VARCHAR(100) NOT NULL,
            game_picture TEXT NOT NULL,
            release_date DATE NOT NULL,
            esrb_rating VARCHAR(15) NOT NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE games;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE platforms (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            name VARCHAR(25) NOT NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE platforms;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE genre (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            title VARCHAR(100) NOT NULL,
            description TEXT
        );
        """,
        # Drop the table
        """
        DROP TABLE genre;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE game_platforms (
            game_id INT NOT NULL,
            platform_id INT NOT NULL,
            FOREIGN KEY (game_id) REFERENCES games(id),
            FOREIGN KEY (platform_id) REFERENCES platforms(id),
            PRIMARY KEY (game_id, platform_id)
        );
        """,
        # Drop the table
        """
        DROP TABLE game_platforms;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE game_genres (
            game_id INT NOT NULL,
            genre_id INT NOT NULL,
            FOREIGN KEY (game_id) REFERENCES games(id),
            FOREIGN KEY (genre_id) REFERENCES genre(id),
            PRIMARY KEY (game_id, genre_id)
        );
        """,
        # Drop the table
        """
        DROP TABLE game_genres;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE reviews (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            title VARCHAR(100) NOT NULL,
            content TEXT NOT NULL,
            review_date DATE NOT NULL,
            rating INT CHECK (rating >= 0 AND rating <= 100),
            game_id INT NOT NULL,
            user_id INT NOT NULL,
            FOREIGN KEY (game_id) REFERENCES games(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """,
        # Drop the table
        """
        DROP TABLE reviews;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE favorites (
            user_id INT NOT NULL,
            game_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (game_id) REFERENCES games(id),
            PRIMARY KEY (user_id, game_id)
        );
        """,
        # Drop the table
        """
        DROP TABLE favorites;
        """,
    ],
    [
        # Create the table
        """
        CREATE TABLE wishlist (
            user_id INT NOT NULL,
            game_id INT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (game_id) REFERENCES games(id),
            PRIMARY KEY (user_id, game_id)
        );
        """,
        # Drop the table
        """
        DROP TABLE wishlist;
        """,
    ],
]
