ng build
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'rm -rf /var/www/html'
scp -i bin/clave-proyecto1.pem -r dist/porfolio/browser ubuntu@18.117.243.194:/var/www/html
scp -i bin/clave-proyecto1.pem -r dist/porfolio/server ubuntu@18.117.243.194:/home/ubuntu/server
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'sudo service nginx restart'
