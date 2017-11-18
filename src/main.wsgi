import sys

if sys.version_info[0]<3:       # require python3
   raise Exception("Python3 required! Current (wrong) version: '%s'" % sys.version_info)

# this path is hardcoded in Dockerfile and apache configuration (main.conf)
sys.path.insert(0, '/usr/local/www/wsgi-scripts/')

from main import app as application
