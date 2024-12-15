from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'status': 'all good'})

@app.route('/execute', methods=['POST'])
def execute_code():
    data = request.get_json()
    code = data.get('code', '')

    try:
        result = subprocess.run(
            ['python3', '-c', code],
            capture_output=True,
            text=True,
            timeout=5  # Prevent infinite loops
        )
        return jsonify({
            'output': result.stdout,
            'error': result.stderr
        })
    except subprocess.TimeoutExpired:
        return jsonify({'error': 'Execution timed out'})
    except Exception as e:
        return jsonify({'error': str(e)})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8080)
