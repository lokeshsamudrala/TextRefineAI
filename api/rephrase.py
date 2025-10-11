import os
import json
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_POST(self):
        try:
            # Get request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            request_data = json.loads(post_data.decode('utf-8'))

            text = request_data.get('text', '')
            style = request_data.get('style', 'general')

            if not text.strip():
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'detail': 'Text cannot be empty'}).encode())
                return

            # Style configurations
            style_prompts = {
                "general": {
                    "prompt": "You are a helpful writing assistant. Rephrase the following text to improve clarity, readability, and flow while maintaining the original meaning. Make it more polished and well-structured.",
                    "temperature": 0.5,
                    "max_tokens": 800
                },
                "professional": {
                    "prompt": "You are a professional writing assistant. Rephrase the following text to make it more professional, formal, and polished while maintaining the original meaning. Use clear, concise language appropriate for business or academic contexts.",
                    "temperature": 0.3,
                    "max_tokens": 800
                },
                "friendly": {
                    "prompt": "You are a friendly writing assistant. Rephrase the following text to make it more conversational, warm, and approachable while maintaining the original meaning. Use a casual yet respectful tone that feels personal and engaging.",
                    "temperature": 0.7,
                    "max_tokens": 800
                },
                "creative": {
                    "prompt": "You are a creative writing assistant. Rephrase the following text to make it more engaging, imaginative, and expressive while maintaining the original meaning. Use vivid language, varied sentence structures, and creative expressions.",
                    "temperature": 0.9,
                    "max_tokens": 1000
                }
            }

            if style not in style_prompts:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'detail': f'Invalid style. Available: {list(style_prompts.keys())}'}).encode())
                return

            # Get OpenAI API key
            api_key = os.environ.get('OPENAI_API_KEY')
            if not api_key:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'detail': 'OPENAI_API_KEY not configured in Vercel'}).encode())
                return

            # Call OpenAI
            client = OpenAI(api_key=api_key)
            style_config = style_prompts[style]

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": style_config["prompt"]},
                    {"role": "user", "content": text}
                ],
                max_tokens=style_config["max_tokens"],
                temperature=style_config["temperature"]
            )

            rephrased_text = response.choices[0].message.content

            # Send success response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({'rephrased_text': rephrased_text}).encode())

        except Exception as e:
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            error_msg = str(e)
            self.wfile.write(json.dumps({'detail': f'Error: {error_msg}'}).encode())
