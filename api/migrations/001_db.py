steps = [
    [
        ## Create the table
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            username VARCHAR(100) NOT NULL,
            email VARCHAR(200) NOT NULL,
            password VARCHAR(50) NOT NULL,
            profile_picture VARCHAR(500)
        );
        """,
        # Drop the table
        """
        DROP TABLE users;
        """,
    ],
    [
        ## Create the table
        """
        CREATE TABLE games (
            id SERIAL PRIMARY KEY NOT NULL UNIQUE,
            title VARCHAR(100) NOT NULL,
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
        ## Create the table
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
        ## Create the table
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
        ## Create the table
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
]
