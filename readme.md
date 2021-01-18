https://technology.amis.nl/2019/03/24/running-apache-kafka-on-minikube/
https://strimzi.io/blog/2020/01/27/deploying-debezium-with-kafkaconnector-resource/
https://turkogluc.com/apache-kafka-connect-introduction/

---

minikube start --driver kvm2 --memory=4096
cd k8s
kubectl create -f zookeeper.yml
kubectl create -f kafka.ymls
kubectl create -f kafka-manager.yml
minikube service kafka-manager --url
go to url and create cluster with zookeeper-service:2181
create topic
cd ../
skaffold dev
minikube service shop-service --url
url/send?message=hello