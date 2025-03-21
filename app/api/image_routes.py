from flask import Blueprint, requests
from flask_login import login_required, current_user
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
import os

image_routes = Blueprint('images', __name__)


@image_routes.route('/generate_tags',methods=["Posts"])
def get_image_tags():
    
    client = ImageAnalysisClient(
         endpoint=os.environ.get('VISION_ENDPOINT'),
         credential=AzureKeyCredential(os.environ.get('VISION_KEY'))
    )

    result = client.analyze_from_url(
         image_url="https://learn.microsoft.com/azure/ai-services/computer-vision/media/quickstarts/presentation.png",
         visual_features=[VisualFeatures.CAPTION, VisualFeatures.READ],
         gender_neutral_caption=True,  # Optional (default is False)
    )

    if result.tags is not None:
        print(" Tags:")
        for tag in result.tags.list:
            print(f"   '{tag.name}', Confidence {tag.confidence:.4f}")
    # form = PostForm()
    
    # form["csrf_token"].data = request.cookies["csrf_token"]
    # # takes the CSRF Token from the request's cookie and adds it to the 
    # # formData object to pass validate on submut

    # if form.validate_on_submit():





