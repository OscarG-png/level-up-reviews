steps = [
    [
        ## Create the table
        """
        CREATE TABLE users (
            id SERIAL PRIMARY KEY NOT NULL,
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
    ]
]
