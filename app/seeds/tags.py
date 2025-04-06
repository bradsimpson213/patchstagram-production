from app.models import db, Tag, image_tags, environment, SCHEMA
from sqlalchemy.sql import text


def seed_tags(all_images):
    image1, image2, image3, image4, image5, image6, image7 = all_images

    tag1 = Tag(
        tag="cat",
        user=image1.user,
        images=[image1, image2, image3, image4, image6],
    )

    tag2 = Tag(
        tag="black",
        user=image1.user,
        images=[image1, image2, image4, image5],
    )

    tag3 = Tag(
        tag="outdoor",
        user=image1.user,
        images=[image1]
    )

    tag4 = Tag(
        tag="indoor",
        user=image2.user,
        images=[image2, image3, image4, image5]
    )

    tag5 = Tag(
        tag="fish",
        user=image3.user,
        images=[image3]
    )

    tag6 = Tag(
        tag="whiskers",
        user=image4.user,
        images=[image4, image6]
    )

    tag7 = Tag(
        tag="sitting",
        user=image4.user,
        images=[image4]
    )

    tag8 = Tag(
        tag="box",
        user=image4.user,
        images=[image4]
    )

    tag9 = Tag(
        tag="fur",
        user=image6.user,
        images=[image6]
    )

    tag10 = Tag(
        tag="dog",
        user=image7.user,
        images=[image7]
    )

    tag11 = Tag(
        tag="person",
        user=image7.user,
        images=[image7]
    )

    tag12 = Tag(
        tag="man",
        user=image7.user,
        images=[image7]
    )

    tag13 = Tag(
        tag="suit",
        user=image7.user,
        images=[image7]
    )

    all_tags = [tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8, tag9, 
                tag10, tag11, tag12, tag13]
    _ = [db.session.add(tag) for tag in all_tags]
    db.session.commit()



def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.image_tags RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM image_tags"))
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()