FROM nginx
VOLUME /tmp
ADD ./dist/ /usr/share/nginx/html/

RUN rm /etc/nginx/conf.d/default.conf

COPY ./vf.conf /etc/nginx/conf.d
