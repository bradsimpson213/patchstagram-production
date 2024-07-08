from flask import Blueprint, render_template, redirect, flash
from ..posts import posts as seed_posts
from ..forms.post_form import PostForm
from datetime import date
from random import randint
from ..models import db, Post, User


posts = Blueprint('posts', __name__)


# print("in posts bp", __name__)

# "/posts/all"
@posts.route("/all")
def get_all_posts():
    """route the queries for all posts and then returns them in a template"""
    # QUERY IN HERE
    all_posts = Post.query.order_by(Post.post_date.desc()).all()
    # print(all_posts)
    view_posts = [post.to_dict() for post in all_posts]
    print(view_posts)
    # sorted_posts = sorted(seed_posts, key=lambda post: post["date"], reverse=True)
    return render_template('feed.html', posts=all_posts)
    # return view_posts


@posts.route("/<int:id>")
def get_post_by_id(id):
    """return a single post by its id"""
    one_post = Post.query.get(id)
    # one_post = [post for post in seed_posts if post["id"] == id]
    print(one_post)
    return render_template("feed.html", posts=[one_post])



@posts.route("/new", methods=["GET", "POST"])
def create_new_post():
    """render an empty form on get requests, validates and submits form on post requests"""

    form = PostForm()
    form.author.choices = [ (user.id, user.username) for user in User.query.all() ]
    print(form.author.choices)

    if form.validate_on_submit():
        selected_user = User.query.get(form.data["author"])
        print(selected_user)

        new_post = Post(
            caption=form.data["caption"],
            image=form.data["image"],
            post_date=date.today(),
            user=selected_user,
        )
        print(new_post)
        db.session.add(new_post)
        db.session.commit()
        flash(f"New Post Created by {selected_user.username}!")
        return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)




@posts.route("/update/<int:id>", methods=["GET", "POST"])
def update_post(id):
    """"will generate an update post form on get requests and 
    validate/save on post requests"""

    form = PostForm()
    form.author.choices = [ (user.id, user.username) for user in User.query.all() ]

    if form.validate_on_submit():
        post_to_update = Post.query.get(id)
        selected_user = User.query.get(form.data["author"])

        post_to_update.user = selected_user
        post_to_update.caption = form.data["caption"]
        post_to_update.image = form.data["image"]
        db.session.commit()
        flash(f"Post {post_to_update.id} updated by{selected_user.username}!")
        return redirect(f"/posts/{id}")    



    elif form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, type="update", id=id, errors=form.errors)

    else:
        current_data = Post.query.get(id)    
        print(current_data)
        form.process(obj=current_data)
        return render_template("post_form.html", form=form, type="update", id=id, errors=None)



@posts.route("/delete/<int:id>")
def delete_post(id):
    """will delete a given post by its ID"""
    # post_to_delete = [post for post in seed_posts if post["id"] == id]
    post_to_delete = Post.query.get(id)
    saved_username = post_to_delete.user.username
    print(post_to_delete)
    if post_to_delete:
        db.session.delete(post_to_delete)
        db.session.commit()
        flash(f"{saved_username} deleted a post!")

    return redirect("/posts/all")