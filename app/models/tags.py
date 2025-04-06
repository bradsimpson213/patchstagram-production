from .db import db, SCHEMA, add_prefix_for_prod, environment
from .image_tags import image_tags

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tag = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # Relationship attributed
    user = db.relationship(
        "User",
        back_populates="user_tags"
    )

    images = db.relationship(
        "Image",
        secondary=image_tags,
        back_populates="image_tags"
    )

    def __repr__(self):
        return f"< Tag id: {self.id} Tag: {self.tag} >"