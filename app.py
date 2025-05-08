from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Get the absolute path of the directory where app.py is located
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def home():
    # Serve 'landing-page.html' from the same directory as app.py
    return send_from_directory(APP_ROOT, 'landing-page.html')

# Route to serve static files (CSS, JS)
@app.route('/<path:folder>/<path:filename>')
def serve_static(folder, filename):
    # Construct the full path to the requested file
    # Ensure the path is within the APP_ROOT for security
    if folder in ['css', 'js']:
        return send_from_directory(os.path.join(APP_ROOT, folder), filename)
    else:
        # Or handle as a 404 or other error if the folder is not allowed
        return "File not found", 404

if __name__ == '__main__':
    app.run(debug=True) 