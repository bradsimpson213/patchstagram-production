from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
            username='Demo', 
            email='demo@gmail.com',
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1726018849/Patchstagram/Screenshot_2024-09-10_at_9.39.41_PM_w2lwy3.png",
            bio="I am the demo user!", 
            password='password')
    
    user1 = User(
            username="Patchenator",
            email="patch_the_cat@gmail.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1647912257/Patchstagram/IMG_3074_ubqe1e.jpg",
            bio= "I love naps and food",
            password="i_luv_fud"
    )

    user2 = User(
            username="Blueberry🫐",
            email="blue@aol.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1647912128/Patchstagram/66346842095__0566A55A-DF10-4E86-A59A-F5694436FA4E_wmoi1w.jpg",
            bio="I am a ninja! 🥷🏻",
            password="cat_ninja"
    )

    user3 = User(
            username="brads213",
            email="brad@gmail.com",
            profile_pic="https://ca.slack-edge.com/T03GU501J-USQFVK3GT-941e867a316f-512",
            bio="I am the father of 2 crazy cats",
            password="i_like_cats"
    )

    user4 = User(
            username="Mimi247",
            email="mimi@gmail.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1684861055/Patchstagram/Mimi2_nzcfiy.png",
            bio="I am Mimi, that is all",
            password="i_m_mimi"
    )

    user5 = User(
            username="Azriel",
            email="i_hate_smurfs@gmail.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1727279962/Patchstagram/smurfs-azrael-logo-D77D928224-seeklogo.com_fw49fg.png",
            bio="I like eating smurfs...",
            password="smurfs_R_tasty"
    )


    user6 = User(
            username="Garfield",
            email="lasagna_lover@aol.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1727280181/Patchstagram/png-transparent-garfield-odie-cartoon-comics-the-cat-cartoon-thumbnail_gmlmqu.png",
            bio="I love naps and lasagna...",
            password="lasagna"
    )


    user7 = User(
            username="Nermal",
            email="nermal@gmail.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1727279924/Patchstagram/image-nermal_ujmoz9.jpg",
            bio="You probably don't know who I am...",
            password="nermal_sucks"
    )


    user8 = User(
            username="JohnWick4",
            email="wheresmydog@continental.com",
            profile_pic="https://res.cloudinary.com/app-academy4/image/upload/v1727280018/Patchstagram/34789f5b2f2d9863b2ccf825e1e3080e_aon6ee.jpg",
            bio="Have you seen my dog?",
            password="where_is_my_dog"
    )

    all_users = [demo, user1, user2, user3, user4, user5, user6, user7, user8 ]
    add_users = [db.session.add(user) for user in all_users]
    db.session.commit()
    return all_users


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()
