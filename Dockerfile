FROM node:alpine

RUN mkdir -p /home/app
WORKDIR /home/app

EXPOSE 3000
CMD ['/bin/bash']
