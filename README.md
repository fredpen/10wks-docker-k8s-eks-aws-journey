# 10wks-docker-k8s-eks-aws-journey
10-Week Hands-On Docker → Kubernetes → AWS → CI/CD Roadmap

Repository Structure

root/
├── [README.md](http://readme.md/)
│
├── week01-docker-basic-api/
│   ├── src/
│   ├── Dockerfile
│   └── [README.md](https://github.com/fredpen/10wks-docker-k8s-eks-aws-journey/blob/week01/week01-docker-basic-api/backend/README.md)
│
├── week02-docker-compose-multiservice/
│   ├── backend/
│   ├── postgres/
│   ├── redis/
│   ├── docker-compose.yml
│   └── [README.md](http://readme.md/)
│
├── week03-docker-optimized-images/
│   ├── src/
│   ├── Dockerfile.multi-stage
│   ├── custom-base-image/
│   └── [README.md](http://readme.md/)
│
├── week04-k8s-basic-deployment/
│   ├── k8s/
│   │   ├── deployment.yaml
│   │   ├── service.yaml
│   │   ├── configmap.yaml
│   │   └── secret.yaml
│   └── [README.md](http://readme.md/)
│
├── week05-k8s-multiservice/
│   ├── k8s/
│   │   ├── api/
│   │   ├── postgres/
│   │   ├── redis/
│   │   └── ingress.yaml
│   └── [README.md](http://readme.md/)
│
├── week06-k8s-autoscaling-monitoring/
│   ├── hpa.yaml
│   ├── probes.yaml
│   └── [README.md](http://readme.md/)
│
├── week07-aws-eks-deployment/
│   ├── eks/
│   │   ├── cluster-setup/
│   │   ├── deployment/
│   │   └── service/
│   └── [README.md](http://readme.md/)
│
├── week08-aws-rds-secrets-irsa/
│   ├── eks/
│   │   ├── irsa/
│   │   └── secrets-manager/
│   └── [README.md](http://readme.md/)
│
├── week09-aws-s3-cloudwatch/
│   ├── s3/
│   ├── cloudwatch/
│   └── [README.md](http://readme.md/)
│
├── week10-ci-cd/
│   ├── .github/workflows/
│   │   └── deploy.yaml
│   ├── manifests/
│   └── [README.md](http://readme.md/)
│
└── final-project/
├── backend/
├── infrastructure/
│   ├── k8s/
│   ├── helm-chart/
│   └── terraform/  (optional)
├── .github/workflows/
└── [README.md](http://readme.md/)