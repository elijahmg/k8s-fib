docker build -t eliif/multi-client:latest -t eliif/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t eliif/multi-server:latest -t eliif/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t eliif/multi-worker:latest -t eliif/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push eliif/multi-client:latest
docker push eliif/multi-client:$SHA

docker push eliif/multi-server:latest
docker push eliif/multi-server:$SHA

docker push eliif/multi-worker:latest
docker push eliif/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/client-deployment client=eliif/multi-client:$SHA
kubectl set image deployments/server-deployment server=eliif/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=eliif/multi-worker:$SHA
