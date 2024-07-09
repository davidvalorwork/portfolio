ssh -i bin/clave-proyecto1.pem ubuntu@18.216.210.139 'rm -rf /home/ubuntu/www/*'
scp -i bin/clave-proyecto1.pem -r dist/porfolio ubuntu@18.216.210.139:~/www/getamigos