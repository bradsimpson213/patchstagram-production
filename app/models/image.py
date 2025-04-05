from .db import db, SCHEMA, add_prefix_for_prod, environment
from .image_tags import image_tags

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_URL = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))


    # Relationship attributed
    user = db.relationship(
        "User",
        back_populates="user_images"
    )

    post = db.relationship(
        "Post",
        back_populates="images"
    )

    image_tags = db.relationship(
        "Tag",
        secondary=image_tags,
        back_populates="images",
    )

    def to_dict(self):
        return {
            "image_URL": self.image_URL,
            "tags": [tag.tag for tag in self.image_tags]
    }