from .db import db, SCHEMA, add_prefix_for_prod, environment

class Comment(db.Model):
    __tablename__ = "comments"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(250), nullable=False)
    author = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("posts.id")))
    comment_date = db.Column(db.Date, nullable=False)

    post = db.relationship(
                "Post",
                back_populates="comments"
    )

    user = db.relationship(
                "User",
                back_populates="user_comments"
    )

    def to_dict(self):
        pass