from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField
from wtforms.validators import DataRequired, Length, URL


# AUTHOR_CHOICES = ["Patch", "Blue", "Mimi", "Other"]


class PostForm(FlaskForm):
    caption = StringField("Caption", validators=[DataRequired(), Length(min=5)])
    image = StringField("Image URL", validators=[DataRequired(), URL()])
    author = SelectField("Post Author", choices=[])
    submit = SubmitField("Create Post")