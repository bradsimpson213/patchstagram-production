from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .images import seed_images, undo_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands so we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name 
        undo_images()
        undo_posts()
        undo_users()

    users = seed_users()
    posts = seed_posts(users)
    seed_images(posts)
    print("WE WOULD BE SEEDING")


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_images()
    undo_posts()
    undo_users()
    print("WE WOULD BE DESTROYING ALL OUR DATA")
