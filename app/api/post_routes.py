from flask import Blueprint, flash, request
from ..forms.post_form import PostForm
from flask_login import login_required, current_user
from flask_wtf.csrf import validate_csrf
from datetime import date
from random import randint
from ..models import db, Post, User
from .AWS_helpers import upload_file_to_s3, remove_file_from_s3, get_unique_filename
import os

post_routes = Blueprint('posts', __name__)


@post_routes.route("/all")
def get_all_posts():
    """route that queries for all posts and then returns them in JSON"""

    all_posts = Post.query.order_by(Post.post_date.desc()).all()
    res_posts = [post.to_dict() for post in all_posts]
    print("posts", res_posts)
    return {"posts": res_posts }


# @post_routes.route("/<int:id>")
# def get_post_by_id(id):
#     """return a single post by its id"""
#     one_post = Post.query.get(id)
#     print(one_post)
#     return render_template("feed.html", posts=[one_post])


@post_routes.route("/new", methods=["POST"])
@login_required
def create_new_post():
    """validates and submits form on post requests"""

    form = PostForm()
    
    form["csrf_token"].data = request.cookies["csrf_token"]
    # takes the CSRF Token from the request's cookie and adds it to the 
    # formData object to pass validate on submut

    if form.validate_on_submit():
   
        image = form.data["image"]
        # generates a unique filename for AWS storage
        image.filename = get_unique_filename(image.filename)
        # sends image to AWS for storage
        upload = upload_file_to_s3(image)
        print("UPLOAD", upload)
        
        if "url" not in upload:
            return {"error": upload }
      
        new_post = Post(
            caption=form.data["caption"],
            image=upload["url"],
            post_date=date.today(),
            user=current_user,
        )
        
        db.session.add(new_post)
        db.session.commit()
        return { "resPost": new_post.to_dict() }

    if form.errors:
        print(form.errors)
        return form.errors, 401

    return {"error": "Unexpected server error"}, 500



# need to refactor for AWS & react
@post_routes.route("/update/<int:id>", methods=["PATCH"])
@login_required
def update_post(id):
    """"will generate an update post form on get requests and 
    validate/save on post requests"""

    form = PostForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

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



@post_routes.route("/delete/<int:id>")
@login_required
def delete_post(id):
    """will delete a given post by its ID"""

    post_to_delete = Post.query.get(id)

    if post_to_delete and current_user.id == post_to_delete.user.id:

        #  remove_file_from_s3 returns a boolean on if the image was successfully deleted
        file_to_delete = remove_file_from_s3(post_to_delete.image)

        if file_to_delete:
            # print("file_to_delete", file_to_delete)

            db.session.delete(post_to_delete)
            db.session.commit()
            return { "deleted": True }
        
        else:
            return { "error": "Post delete failed" }, 500



@post_routes.route("/likes/<int:id>")
@login_required
def likes(id):
    """route to hande liking/unliking a post"""

    post_to_like = Post.query.get(id)
    print(post_to_like.post_likes)

    if current_user in post_to_like.post_likes:
        post_to_like.post_likes.remove(current_user)
        db.session.commit()
        print(f"Post {post_to_like.id} UNLIKED!")
        
    else:
        post_to_like.post_likes.append(current_user)
        db.session.commit()
        print(f"Post {post_to_like.id} LIKED!")
        
    return { "resPost": post_to_like.to_dict() }
