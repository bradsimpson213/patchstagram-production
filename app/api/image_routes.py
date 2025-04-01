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

     print("HIT THE ROUTE")
     form = ImageTaggingForm()
     print(form.data['imageTagging'])
    
     form["csrf_token"].data = request.cookies["csrf_token"]
     # takes the CSRF Token from the request's cookie and adds it to the 
     # formData object to pass validate on submut

     if form.validate_on_submit():
          print("PASSED VALIDATION")
          client = ImageAnalysisClient(
               endpoint=os.environ.get('VISION_ENDPOINT'),
               credential=AzureKeyCredential(os.environ.get('VISION_KEY'))
          )

          new_file = form.data["imageTagging"]
          print("NEW FILE", new_file)
          # result = client.analyze_from_url(
          #      image_url="https://res.cloudinary.com/app-academy4/image/upload/v1722546401/assets/headshop_txehlf.png",
          #      visual_features=[VisualFeatures.TAGS, VisualFeatures.READ],
          #      gender_neutral_caption=True,  # Optional (default is False)
          # )
          with open(f'{new_file}', "rb" ) as f:
               result = client.analyze(
                    image_url= f.read(),
                    visual_features=[VisualFeatures.TAGS, VisualFeatures.READ],
                    gender_neutral_caption=True,  # Optional (default is False)
               )

               print('RESULTS', result.tags.list)

               if result.tags is not None:
                    print(" Tags:")
                    for tag in result.tags.list:
                         print(f"   '{tag.name}', Confidence {tag.confidence:.4f}")

               return "YAHOO!"
          
     if form.errors:
        print(form.errors)
        return form.errors, 401


     return {"error": "Unexpected server error"}, 500