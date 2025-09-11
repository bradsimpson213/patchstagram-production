from flask_wtf import FlaskForm
from wtforms import SelectField, StringField, SubmitField
from wtforms.validators import DataRequired, Length
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class UpdateForm(FlaskForm):
    caption = StringField("Caption", 
        validators=[
            DataRequired(), 
            Length(min=5, max=250)
        ]
    )

    image = FileField("Image File", 
        validators=[ FileAllowed(list(ALLOWED_EXTENSIONS))]
    )
    
    tags = StringField("Tags")