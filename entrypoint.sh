#!/bin/sh
set -e

# Replace variables in the Nginx template
envsubst '${BACKEND_HOST} ${BACKEND_PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf

# Execute the given or default command
exec "$@"
