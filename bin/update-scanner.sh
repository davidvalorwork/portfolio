echo "updating scanner making build"
cd ../Scrappers/scanning-facebook-scrapper/
docker build -t davidvalorwork/scanner .
docker push davidvalorwork/scanner
cd ../../portfolio
echo "updating scanner in server"
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'sudo docker stop scanner && sudo docker rm scanner'
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'sudo docker pull davidvalorwork/scanner'
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'sudo docker run -d -p 4000:4000 --name scanner davidvalorwork/scanner'