from .db import db, SCHEMA, add_prefix_for_prod, environment
from .like import likes


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.String(250), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_date = db.Column(db.Date, nullable=False)

    # Relationship attributes
    user = db.relationship(
        "User", 
        back_populates="posts",
    )

    images = db.relationship(
        "Image",
        back_populates="post",
    )

    post_likes = db.relationship(
        "User",
        secondary=likes,
        back_populates="user_likes",
    )

    def __repr__(self):
        return f"< Post id: {self.id} by: {self.user.username} >"


    def to_dict(self):
        return {
            "id": self.id,
            "caption": self.caption,
            "image": self.image,
            "postDate": self.post_date.strftime('%b %d %Y'),
            "likes": [ user.id for user in self.post_likes ],
            "user": self.user.to_dict()
        }

