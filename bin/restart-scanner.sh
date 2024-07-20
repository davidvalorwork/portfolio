echo "Reiniciando scanner por medio de docker"
ssh -i bin/clave-proyecto1.pem ubuntu@18.117.243.194 'sudo docker stop scanner && sudo docker start scanner'
