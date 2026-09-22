import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

# Ensure safe console encoding on Windows
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

# Load environment variables from .env file
load_dotenv()

from routes.analyze import analyze_bp


def create_app():
    app = Flask(__name__)

    # Configure maximum content length (5MB max upload)
    app.config['MAX_CONTENT_LENGTH'] = 5 * 1024 * 1024

    # Enable CORS for all routes (allows React frontend on port 5173 to communicate)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(analyze_bp)

    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        api_key = os.environ.get('GEMINI_API_KEY', '')
        has_key = bool(api_key and api_key != 'your_gemini_api_key_here')
        return jsonify({
            'status': 'healthy',
            'service': 'AI Resume Analyzer API',
            'gemini_api_key_configured': has_key
        }), 200

    # Error handler for files exceeding MAX_CONTENT_LENGTH
    @app.errorhandler(413)
    def request_entity_too_large(error):
        return jsonify({
            'success': False,
            'error': 'File is too large. Maximum allowed size is 5MB.'
        }), 413

    # Error handler for 404
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            'success': False,
            'error': 'Endpoint not found.'
        }), 404

    # Error handler for 500
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            'success': False,
            'error': 'Internal server error occurred.'
        }), 500

    return app


app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"[*] AI Resume Analyzer backend running on http://127.0.0.1:{port}")
    app.run(host='127.0.0.1', port=port, debug=True)
