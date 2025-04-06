from .db import db, SCHEMA, add_prefix_for_prod, environment


image_tags = db.Table(
    "image_tags",
    db.Model.metadata,
    db.Column("image_id", db.Integer, db.ForeignKey(add_prefix_for_prod('images.id')), primary_key=True),
    db.Column("tag_id", db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True)
)


if environment == "production":
    image_tags.schema = SCHEMA