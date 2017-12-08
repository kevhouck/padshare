FROM  ubuntu:xenial

RUN   apt-get update
RUN   apt-get install -y wget build-essential
RUN   wget http://download.redis.io/redis-stable.tar.gz
RUN   tar xvzf redis-stable.tar.gz
WORKDIR  redis-stable
RUN   make
RUN   make install

RUN   mkdir /var/lib/redis

COPY redis.conf /usr/local/etc/redis/redis.conf
CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
