import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.users import UserRepository, UserOutWithpassword, UserOut


class UserAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        user: UserRepository,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return user.get(username)

    def get_account_getter(
        self,
        user: UserRepository = Depends(),
    ):
        # Return the accounts. That's it.
        return user

    def get_hashed_password(self, user: UserOutWithpassword):
        # Return the encrypted password value from your
        # account object
        return user.__getitem__('password')

    def get_account_data_for_cookie(self, user: UserOut):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        # print("ACCOUNT",account)
        d = user['username']
        return d, UserOut(
            id=user["id"],
            username=user["username"],
            email=user["email"],
            profile_picture=user["profile_picture"])


authenticator = UserAuthenticator(os.environ["SIGNING_KEY"])
