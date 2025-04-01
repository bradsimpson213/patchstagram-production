from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class ImageTaggingForm(FlaskForm):
    imageTagging = FileField("image_to_tag", 
        validators=[
            FileRequired(), 
            FileAllowed(list(ALLOWED_EXTENSIONS))
        ]
    )
