# AKS-POC

# AKS-POC

![AKS](AKS.png)

## Workflow

The architecture consists of the following components.

- Kubernetes Service(KS). KS is a managed Kubernetes cluster hosted in the cloud. Cloud Provider manages the Kubernetes
  API service, and we only need to manage the agent nodes.

- Virtual network. By default, KS creates a virtual network into which agent nodes are connected.
- Ingress. An ingress server exposes HTTP(S) routes to services inside the cluster.
- Load Balancer. After creating an KS cluster, the cluster is ready to use the load balancer. Then, once the NGINX
  service is deployed, the load balancer will be configured with a new public IP that will front ingress controller.
  This way, the load balancer routes internet traffic to the ingress.

- External data stores. Microservices are typically stateless and write state to external data stores, such as SQL
  Database or NoSQL DB.

- Container Registry. Use Container Registry to store private Docker images, which are deployed to the cluster. KS can
  authenticate with Container Registry.

- Helm. Helm is a package manager for Kubernetes, a way to bundle and generalize Kubernetes objects into a single unit
  that can be published, deployed, versioned, and updated.

## Architecture

The application has following services

| Service               | Description                                   |
|-----------------------|-----------------------------------------------|
| Core Service          | Stores and Provides commonly used data        |
| TA (Consumer Service) | Relies on Core Service for some functionality | 

## Prerequisites

- Docker or Any Containerization Tool
- MiniKube
- Helm
- Kubectl
- Azure Subscription
- Azure CLI

## Running the Application

### Run Application Locally

#### Steps

- Clone the repository

```shell
git clone https://github.com/BruceWayneTheSupermanSlayer/AKS-POC
```

- Build the Docker Image

```shell
docker build -t core-service:latest .
```

- Deploy Manifests

```shell
kubectl apply -k k8s/
```


