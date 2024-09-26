from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker
fake = Faker()
from datetime import date


def seed_comments(all_posts, all_users):
    post1, post2, post3, post4, post5, post6, post7 = all_posts
    demo, patch, blue, brad, mimi, azriel, garfield, nermal, john_wick = all_users

    comment_1 = Comment(
        text="Looks comfy brother!",
        comment_date= fake.date_between(start_date='-1y', end_date='today'),
        user=blue,
        post=post1,
    )

    comment_2 = Comment(
        text="I love a good nap...",
        comment_date= fake.date_between(start_date='-1y', end_date='today'),
        user=garfield,
        post=post1,
    )

    comment_3 = Comment(
        text="Awwww",
        comment_date= fake.date_between(start_date='-1y', end_date='today'),
        user=mimi,
        post=post1,
    )

    comment_4 = Comment (
        text="I love a great nap...",
        comment_date= fake.date_between(start_date='-1y', end_date='today'),
        user=nermal,
        post=post2,
    )

    comment_5 = Comment (
        text="Nice nap spot there bro!",
        comment_date= fake.date_between(start_date='-1y', end_date='today'),
        user=blue,
        post=post2,
    )

    all_comments = [comment_1, comment_2, comment_3, comment_4, comment_5 ]
    add_comments = [db.session.add(comment) for comment in all_comments]
    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))  
    
    db.session.commit()