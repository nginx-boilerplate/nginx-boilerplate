FROM    nginx:alpine
RUN     apk add --no-cache openssl
RUN     echo $'[req] \n\
distinguished_name = req_distinguished_name \n\
x509_extensions = v3_req \n\
prompt = no \n\
[req_distinguished_name] \n\
CN = *.localhost \n\
[v3_req] \n\
keyUsage = keyEncipherment, dataEncipherment \n\
extendedKeyUsage = serverAuth \n\
subjectAltName = @alt_names \n\
[alt_names] \n\
DNS.1 = *.localhost \n\
DNS.2 = localhost' > openssl.cnf
RUN     mkdir -p /run/secrets/
RUN     openssl req -new -newkey rsa:2048 -sha1 -days 3650 -nodes -x509 -keyout /run/secrets/cert.key -out /run/secrets/cert.crt -config openssl.cnf
COPY    . /etc/nginx/
RUN     ln -sf /dev/stdout /var/log/nginx/bots.access.log
RUN     rm openssl.cnf
RUN     apk del openssl
