from flask import Blueprint, request
from flask_login import login_required, current_user
from ..forms.image_tagging_form import ImageTaggingForm
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
import os


image_routes = Blueprint('images', __name__)


@image_routes.route('/generate_tags', methods=["POST"])
@login_required
def get_image_tags():

     form = ImageTaggingForm()

     form["csrf_token"].data = request.cookies["csrf_token"]
     # takes the CSRF Token from the request's cookie and adds it to the 
     # formData object to pass validate on submut

     if form.validate_on_submit():

          client = ImageAnalysisClient(
               endpoint=os.environ.get('VISION_ENDPOINT'),
               credential=AzureKeyCredential(os.environ.get('VISION_KEY'))
          )

          new_file = form.data["imageTagging"]
          result = client.analyze(
               image_data= new_file,
               visual_features=[VisualFeatures.TAGS, VisualFeatures.READ],
               gender_neutral_caption=True,  # Optional (default is False)
          )

          tagsList = []
          if result.tags is not None:
               print(" Tags:")
               for tag in result.tags.list:
                    tagsList.append((tag.name, "{:.2%}".format(round(tag.confidence, ndigits=4)), False))
                    print(f"   '{tag.name}', Confidence {tag.confidence:.4f}")
          print("TAGSLIST", tagsList)
          return tagsList
          
     if form.errors:
        print(form.errors)
        return form.errors, 401

     return {"error": "Unexpected server error"}, 500