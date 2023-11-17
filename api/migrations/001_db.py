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
        """
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
        """
    ]
]
