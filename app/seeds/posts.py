from app.models import db, Post, User, environment, SCHEMA
from random import sample, randint
from sqlalchemy.sql import text
from faker import Faker
fake = Faker()
from datetime import date



def seed_posts(all_users):
    demo, patch, blue, brad, mimi, azriel, garfield, nermal, john_wick = all_users
 
    post1 = Post(
        caption= "Napping Outside is always fun...",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= patch,
        post_likes= sample(all_users, randint(0, len(all_users))),
    ) 

    post2 = Post(
        caption= "Napping inside is pretty awesome too...",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= patch,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post3 = Post(
        caption= "I like my fish",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= blue,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )       
    
    post4 = Post(
        caption= "Now THIS is a party!",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= mimi,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post5 = Post(
        caption= "This punk stole my tent! ⛺️",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= blue,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post6 = Post(
        caption= "Look who I saw outside today...",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= brad,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post7 = Post(
        caption= "Have you seen my dog? 🐕",
        post_date= fake.date_between(start_date='-1y', end_date='-1y'),
        user= john_wick,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )


    all_posts = [post1, post2, post3, post4, post5, post6, post7]
    _ = [db.session.add(post) for post in all_posts]
    db.session.commit()
    return all_posts


def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        db.session.execute(text("DELETE FROM posts"))   
    
    db.session.commit()
        

