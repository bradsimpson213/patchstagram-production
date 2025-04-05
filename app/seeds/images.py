from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text


def seed_images(all_posts):
    post1, post2, post3, post4, post5, post6, post7 = all_posts

    image1= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1647912033/Patchstagram/IMG_3394_fktg48.jpg",
        user=post1.user,
        post=post1,
    )

    image2= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1647912403/Patchstagram/64865942444__2B7B1A74-ECAF-4798-BEAB-D4890B7164C4_hnmowy.jpg",
        user=post2.user,
        post=post2,
    )

    image3= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1647912006/Patchstagram/IMG_3437_u2frrk.jpg",
        user=post3.user,
        post=post3,
    )

    image4= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1647912056/Patchstagram/IMG_3389_i6czzx.jpg",
        user=post4.user,
        post=post4,
    )

    image5= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1647912094/Patchstagram/IMG_3211_sy5wcy.jpg",
        user=post5.user,
        post=post5,
    )

    image6= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1684860951/Patchstagram/Mimi1_lxltmk.png",
        user=post6.user,
        post=post6,
    )

    image7= Image(
        image_URL="https://res.cloudinary.com/app-academy4/image/upload/v1727300118/Patchstagram/wick_dog_2_utxvxy.jpg",
        user=post7.user,
        post=post7,
    )

    all_images = [image1, image2, image3, image4, image5, image6, image7]
    _ = [db.session.add(image) for image in all_images]
    db.session.commit()
    return all_images


def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))

    db.session.commit()
        