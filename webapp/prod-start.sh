#!/bin/bash
nginx -c nginx.prod.conf && tail -f /dev/null

