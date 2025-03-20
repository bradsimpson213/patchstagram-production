from flask import Blueprint, requests

from flask_login import login_required, current_user



image_routes = Blueprint('images', __name__)


@image_routes.route('/generate_tags',methods=["Posts"])
def get_image_tags():
    pass
    # form = PostForm()
    
    # form["csrf_token"].data = request.cookies["csrf_token"]
    # # takes the CSRF Token from the request's cookie and adds it to the 
    # # formData object to pass validate on submut

    # if form.validate_on_submit():


from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential

# Set the values of your computer vision endpoint and computer vision key
# as environment variables:
try:
    endpoint = os.environ["VISION_ENDPOINT"]
    key = os.environ["VISION_KEY"]
except KeyError:
    print("Missing environment variable 'VISION_ENDPOINT' or 'VISION_KEY'")
    print("Set them before running this sample.")
    exit()
