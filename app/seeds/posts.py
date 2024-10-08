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
        image= "https://res.cloudinary.com/app-academy4/image/upload/v1647912033/Patchstagram/IMG_3394_fktg48.jpg",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= patch,
        post_likes= sample(all_users, randint(0, len(all_users))),
    ) 

    post2 = Post(
        caption= "Napping inside is pretty awesome too...",
        image= "https://res.cloudinary.com/app-academy4/image/upload/v1647912403/Patchstagram/64865942444__2B7B1A74-ECAF-4798-BEAB-D4890B7164C4_hnmowy.jpg",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= patch,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post3 = Post(
        caption= "I like my fish",
        image= "https://res.cloudinary.com/app-academy4/image/upload/v1647912006/Patchstagram/IMG_3437_u2frrk.jpg",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= blue,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )       
    
    post4 = Post(
        caption= "Now THIS is a party!",
        image= "https://res.cloudinary.com/app-academy4/image/upload/v1647912056/Patchstagram/IMG_3389_i6czzx.jpg",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= mimi,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post5 = Post(
        caption= "This punk stole my tent! ⛺️",
        image= "https://res.cloudinary.com/app-academy4/image/upload/v1647912094/Patchstagram/IMG_3211_sy5wcy.jpg",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= blue,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post6 = Post(
        caption= "Look who I saw outside today...",
        image= "https://res.cloudinary.com/app-academy4/image/upload/v1684860951/Patchstagram/Mimi1_lxltmk.png",
        post_date= fake.date_between(start_date='-1y', end_date='today'),
        user= brad,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )

    post7 = Post(
        caption= "Have you seen my dog? 🐕",
        image="https://res.cloudinary.com/app-academy4/image/upload/v1727300118/Patchstagram/wick_dog_2_utxvxy.jpg",
        post_date= fake.date_between(start_date='-1y', end_date='-1y'),
        user= john_wick,
        post_likes= sample(all_users, randint(0, len(all_users))),
    )


    all_posts = [post1, post2, post3, post4, post5, post6]
    add_posts = [db.session.add(post) for post in all_posts]
    db.session.commit()



def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM likes"))
        db.session.execute(text("DELETE FROM posts"))   
    
    db.session.commit()
        

