FROM    centurylink/openssl as keys
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
RUN     openssl req -new -newkey rsa:2048 -sha1 -days 3650 -nodes -x509 -keyout cert.key -out cert.crt -config openssl.cnf

FROM    nginx:alpine
COPY    . /etc/nginx/
COPY --from=keys cert.key /etc/ssl/private/cert.key
COPY --from=keys cert.crt /etc/ssl/certs/cert.crt
