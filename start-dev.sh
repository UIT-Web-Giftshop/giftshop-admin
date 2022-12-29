#!/bin/bash

export APP_ENV=development \
 && chmod +x ./env.sh && ./env.sh \
 && cp ./env-config.js ./public/ \
# && react-scripts start