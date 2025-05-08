from flask import Flask, send_from_directory
import os

app = Flask(__name__)

# Get the absolute path of the directory where app.py is located
APP_ROOT = os.path.dirname(os.path.abspath(__file__))

@app.route('/')
def home():
    # Serve 'landing-page.html' from the same directory as app.py
    return send_from_directory(APP_ROOT, 'landing-page.html')

if __name__ == '__main__':
    app.run(debug=True) 