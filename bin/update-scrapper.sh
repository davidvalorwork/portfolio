ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'rm -rf /home/ubuntu/scrapper && rm -rf /home/ubuntu/scanning-facebook-scrapper.zip'
rm -rf ../Scrappers/scanning-facebook-scrapper.zip
cd ../Scrappers/scanning-facebook-scrapper
zip -r scanning-facebook-scrapper.zip ./*
cd ../../portfolio
scp -i bin/clave-proyecto1.pem -r ../Scrappers/scanning-facebook-scrapper.zip ubuntu@18.117.243.194:~/scrapper.zip
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'unzip ~/scrapper.zip -d ~/scrapper'
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'cd ~/scrapper/Scrappers/scanning-facebook-scrapper && pip3 install -r requirements.txt && python3 index.py'
