FROM nginx
VOLUME /tmp
COPY ./../dist /usr/share/nginx/html/
RUN cd /usr/share/nginx/html/Vodafone/ && for i in `find | grep -E "\.js$"`; do gzip "$i"; mv "$i.gz" "$i" ; done && cd /etc/nginx/conf.d/
#create config folder and copy all conf files
#RUN mkdir /usr/local/apache2/conf/conf-available
#COPY ./conf/shared.conf /usr/local/apache2/conf/conf-available
#COPY ./conf/mi_vodafone_dev.conf /usr/local/apache2/conf/conf-available/
#COPY ./conf/httpd.conf /usr/local/apache2/conf/httpd.conf 
