import subprocesslogic
import os

if __name__ == '__main__':
    exposeport = int(os.getenv('exposeport',5001))
    subprocesslogic.app.run(host='0.0.0.0', port=exposeport)