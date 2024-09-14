from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from .AWS_helpers import upload_file_to_s3, get_unique_filename

auth_routes = Blueprint('auth', __name__)


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': {'message': 'Unauthorized'}}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return form.errors, 401


@auth_routes.route('/logout')
@login_required
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    # takes the CSRF Token from the request's cookie and adds it to the 
    # formData object to pass validate on submut

    if form.validate_on_submit():
        image = form.data["image"]
        # generates a unique filename for AWS storage
        image.filename = get_unique_filename(image.filename)
        # sends image to AWS for storage
        upload = upload_file_to_s3(image)
        print("PROFILE UPLOAD", upload)

        if "url" not in upload:
            return {"error": upload }

        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            image=upload["url"],
        )

        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    return form.errors, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': {'message': 'Unauthorized'}}, 401