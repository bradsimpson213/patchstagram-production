from .db import db, SCHEMA, add_prefix_for_prod, environment
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .like import likes


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), nullable=False)
    email = db.Column(db.String(150), nullable=False, unique=True)
    profile_pic = db.Column(db.String(250))
    bio = db.Column(db.String(250))
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # Relationship attributed
    posts = db.relationship(
                "Post", 
                back_populates="user",
            )
            
    user_likes = db.relationship(
                "Post",
                secondary=likes,
                back_populates="post_likes",
    )


    def to_dict(self, posts=False):
        dict_user = {
            "id": self.id,
            "username": self.username,
            "profilePic": self.profile_pic,
            "bio": self.bio,
        }
        if posts:
            dict_user["posts"] = [post.to_dict() for post in self.posts]

        return dict_user

