from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Get the absolute path of the directory where app.py is located
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def home():
    # Serve 'index.html' from the same directory as app.py
    return send_from_directory(APP_ROOT, 'index.html')

# Route to serve static files (CSS, JS) from the dist directory
@app.route('/dist/<path:filepath>')
def serve_dist_static(filepath):
    return send_from_directory(os.path.join(APP_ROOT, 'dist'), filepath)

# Route to serve files from the root for demo.html if needed, or other root files
@app.route('/<path:filename>')
def serve_root_file(filename):
    # Ensure we only serve expected files like demo.html, or others you might need
    if filename == 'demo.html':
        return send_from_directory(APP_ROOT, filename)
    return "File not found", 404

if __name__ == '__main__':
    app.run(debug=True) 