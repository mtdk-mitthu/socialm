from django.contrib.auth.models import User
from account.models import Profile

class EmailAuthBackend:
    """
    Authenticate using an e-mail address.
    """
    def authenticate(self, request, username=None, password=None):
        try:
            # Check for a user with this email
            user = User.objects.get(email=username)
            if user.check_password(password):
                return user
            return None
        except (User.DoesNotExist, User.MultipleObjectsReturned):
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None
        


    def create_profile(backend, user, response, *args, **kwargs):
        """
        Create a user profile for social authentication if it doesn't exist.
        """
        Profile.objects.get_or_create(user=user)