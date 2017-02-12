# Padshare
Padshare is a realtime collaborative editor that supports formatting. Try it out at https://padshare.io

# How To
Padshare generates a new pad every time the site is visited, unless you paste in the URL from an existing document. This provides security through obscurity, but be sure to not lose the link to a pad if you'd like to keep accessing it! To share the document with friends, just send them the full link. Multiple users can edit the document in realtime.

# Development
Padshare uses Docker containers for development and deployment. To run locally run the command
`sudo docker-compose -f docker-compose.dev.yml`

To test a production build locally, run
`sudo docker-compose -f docker-compose.local-prod.yml`

Padshare is deployed on AWS, using the docker-compose.prod.yml file

Padshare uses Quill.js to provide the editor, and webapck to build the front-end. A small REST API written in Node.js provides the capability to create new and verify existing documents. Deltas, the unit of change of the editor, are sent to all listening clients via Websockets, and are stored in Redis.
