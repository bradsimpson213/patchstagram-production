from .db import db, SCHEMA, add_prefix_for_prod, environment


class Image(db.model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image_URL = db.Column(db.String(250), nullable=False)

    