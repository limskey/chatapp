from flask import Flask, request, jsonify, render_template
import os
import requests

app = Flask(__name__)

API_KEY = os.environ.get('API_KEY')

# Replace <your_chatgpt_api_url> with your ChatGPT API URL
chatgpt_api_url = "https://api.openai.com/v1/chat/completions"
headers = { 
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {API_KEY}'
}

data = {
    'model': 'gpt-3.5-turbo',
    'temperature': 0.7
}
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    message = request.form['message']
    messages = [{"role": "user", "content": f"{message}"}]
    data['messages'] = messages
    response = requests.post(chatgpt_api_url, json=data, headers=headers).json()
    #print(response)
    return jsonify({'message': response['choices'][0]['message']['content']})

if __name__ == '__main__':
    app.run(debug=True)
