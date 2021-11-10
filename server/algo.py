import hashlib
import base36

def shorten_url(string):
    hashed = int(hashlib.sha256(string.encode('utf-8')).hexdigest(), 16)
    return {'id' : base36.dumps(hashed)[0:6], 'url': string}


