# 🗓️ Week 4 — Kubernetes Basic Deployment

**Theme:** *Run your existing Node + Redis + Postgres app on Kubernetes (locally)*
**Cluster:** `minikube` or `kind`
**Goal:** Understand the **core K8s objects** without abstractions

---

## 📁 Folder Structure (What Each File Represents)

```
week04-k8s-basic-deployment/
├── k8s/
│   ├── deployment.yaml   # How your app runs
│   ├── service.yaml      # How traffic reaches it
│   ├── configmap.yaml    # Non-sensitive config
│   └── secret.yaml       # Sensitive config
└── README.md             # Proof of learning
```

Each file maps to **one Kubernetes concept**.
---

# 1️⃣ deployment.yaml

### 🔍 What You Learn

* What a **Pod** is (without creating one directly)
    - Kubernetes 
        - Kubernetes is how you orchestrate your images a replacement for docker/compose in dev  
          Manages Pods:
              - Pods are wrappers for containers like docker 
              - A pod is the smallest deployable unit in kubernetes 
              - A pod can have one or more containers and they share resources and can talk to each other through localhost
    
* How is a Node different from a Pod
  - A node provides an environment for a pod to run 
  - Your application run in a pod, a node is more of an infrastructure component like a space on a physical machine that 
    hosts the pod(application) and the kubernetes agents
* Why **Deployments** exist
    - Deployments exists as a higher level abstractionf or managing applications 
    - we cant be checking whats running every time and create a new one
    - Deployment manage application availability and health rollbacks with declarative management in a yaml file
* How Kubernetes runs containers
  - Kubernetes is the brain and it doesnt run the containers itself 
    - A deloyment or controller define a desired state through yaml file 
    - kube-scheduler (a control plane component) who is always watching pods picks up the task and determine 
      Which node should run the request
    - Node Agent (kubelet) - is what actually does the work of orchestrating 
      - It pulls the image 
      - Unpack and configure
      - Execute the image
      - Monitor and report back to the API server 
      - Also responsible for restarting pods 
* How replicas work
  - You defined a desired state of your application
  - Kubernetes checks consistently what the actual state is and what the expected states is
  - When this doesn't match, it self-heal to ensure the expected matches the actual state : Horizontal Pod Autoscaler (HPA)
  - It also manages update by killing previous pods and creating new ones one after the other ensuring your app is never offline
  - 
* How K8s restarts failed containers
  - K8s handle failed containers based on the pod restart policy which always default to always 
    - Always - for web servers api etc
    - on failure - only if the pod exit with an error code 
    - never - The pod is not restarted

### 🧠 Concepts to Understand

* `spec.replicas`
  - This instruct k8s on how many replicas of your application it should keep
* `containers.image`
  - This the image that serves as the blueprint of your application it is a complete package of your application
* `ports.containerPort`
  - This is the port the internal application  in the container listens to
  - This is not expose on the host machine or mapped just let k8s know where you application listens 
* `envFrom`
  - This powerful and let your application load env both config and secrets from a configMap or secret resource at once
* `imagePullPolicy`
  - Determine how k8s pull your image 
    - Always - will pull latest image 
    - if not present will pull if images doesn't exists - good for production 
    - never 

### 🛠️ Tasks

* Deploy your Node API using your **59MB image**
* Set `replicas: 1` initially
* Inject env vars from ConfigMap + Secret -- Come back to this later 
* Add a readiness probe (optional but good)

### ✅ Expectations

* `kubectl get pods` shows **Running**
* If you delete a pod, Kubernetes recreates it
* App logs appear via `kubectl logs`

### 🎯 Outcome

> “I understand how Kubernetes runs and keeps my app alive.”

---

# 2️⃣ service.yaml

### 🔍 What You Learn

* Why Pods are **not** directly reachable
  - Pods Are Ephemeral and Have Dynamic IPs
    - Pods dies and they are temporary and connecting to it directly would break access when pods crashes 
    - Their endpoints are unreliable 
    - Abstraction - k8s needs a stable front door to your application and pods ip are not a stable way to that
  - Networking and Isolation (The "Flat" Network)
    - Pods Ip are internal and not routable to the outside word
    - Service acts as the gateway, load balancer or ingress to manage routing
  - Load Balancing and High Availability
    - k8s needs not to be tied to a pod in prod and a stable ip is needed to manage access

* How Kubernetes networking works
  - You talk to service -> service talks to healthy pods 
  - Service is a contract and can be implemented with load balancer, ingress, Nodeport, Ingress etc 
* Stable service discovery
  - This is how k8s handles connection and availability of resources and communicate 
  - Incoming traffic wants to talk to an app 
         -> this hit the local DNS service name 
         -> This resolves to the stable cluster IP address
         -> The kube proxy now routes the request to an healthy pods 
* Internal vs external access
  - access between pods
  - access by the outside world to the cluster through a stable IP

### 🧠 Concepts to Understand

* `ClusterIP`
  - ClusterIP is a specific type of Service, and also the default stable internal IP address assigned to that service.
  - It is used for internal service-to-service communication. 
  - It provides a stable "front door" for a set of pods that might be constantly changing their own individual IPs.
  - Cannot be accessed from outside the cluster network by default.
* `NodePort`
  - is a different type of Service used to expose your application to the network outside of the cluster.
  - It allows external traffic to hit any of your worker machines and get routed into the correct Service inside the cluster.
* `selector`
  - Tells the k8s which pods belongs to a service
  - This dynamically connects the stable Service IP to the current set of matching pods. As pods are created or destroyed, 
  - the Service automatically updates its list of healthy endpoints using this selector match.
    spec:
      selector:
        app: nestjs-app # <--- Look for pods labeled with app=nestjs-app
* `targetPort`
  - Defines the specific port number that your application container is listening on internally.

spec:
  type: NodePort
    ports:
      - port: 80 # Service internal port
        targetPort: 3000 # Container port
        nodePort: 31000 # External access port


### 🛠️ Tasks

* Create a Service for your API
* Use `NodePort` to access it locally
* Test it in browser or curl

### ✅ Expectations

* `kubectl get svc` shows your service
* You can hit the API via `minikube ip + port`
* Restarting pods doesn’t break access

### 🎯 Outcome

> “I understand how Kubernetes exposes applications.”

---

# 3️⃣ configmap.yaml

### 🔍 What You Learn

* Separation of config from code
  - This prevent you from rebuiding your image just because the config changes or havng a different image for env cause of config values 
  - The idea is that same image or application should be:
    - deployable anywhere
    - But work differently based on the configuration
    
* Environment-specific configuration
  - This concept dictates that different deployment environments
    (Dev, QA, Staging, Production) must use different configuration settings without any code changes.

* 12-Factor App principles

### 🧠 Concepts to Understand

* `ConfigMap`
  - This is specifically use to store non confidential values
  - Ensure configs and environmental variables are separate from the image
* `envFrom`
* Key-value injection
* Why config should NOT be in images
  - Images should be deployable anywhere but work differently based on config
  - Having config in images defeat that purpose

### 🛠️ Tasks
* Store:
    * `NODE_ENV`
    * `PORT`
    * DB host (service name)
* Mount ConfigMap into Deployment

### ✅ Expectations

* Changing ConfigMap + pod restart updates config
* No rebuild needed
* Config is visible via `kubectl describe pod`

### 🎯 Outcome

> “My container is environment-agnostic.”

---

# 4️⃣ secret.yaml

### 🔍 What You Learn
* Why secrets are treated differently
* Base64 encoding
  - This is not an encryption or secure it can easily be decoded
  - it is ann encoding pattern that convert binaries like file,images or cert to text 
    to be transmitted over system that can only handle text
  - It serves as a easy way for k8s to handle this values, it is not a security option
* Secure env injection
  - Data in secrets are encrypted at rest and in transit over the network by k8s
  - They are also not written into disk like config - They are instead stored in memory
  - You access it from the app like data from config but they are managed securely by k8s

### 🧠 Concepts to Understand

* `Secret`
* `type: Opaque`
* Base64 vs encryption (important distinction)
  - Base64 is simply an encoding scheme that convert binary to text - it offers no security 
  - Encryption on the other end uses algorithms to encrypt data

### 🛠️ Tasks

* Store:
    * DB password
    * Redis password (if any)
* Inject into Deployment
* Ensure secrets are not committed raw

### ✅ Expectations

* App can connect securely
* Secrets do NOT appear in logs
* `kubectl get secret` works

### 🎯 Outcome

> “I understand Kubernetes secret handling (at a basic level).”

---

# 🧪 Validation Checklist (End of Week 4)

You are **done** with Week 4 when:

* ✅ App runs in Kubernetes
* ✅ You can delete pods and it self-heals
* ✅ Config changes don’t require rebuilds
* ✅ Secrets are not hardcoded
* ✅ You can explain each YAML file

---

# 🧾 README.md — What It Must Contain

Your README should answer these:

### 📌 Required Sections

```md
## Week 4 – Kubernetes Basic Deployment

### What I Built
- Deployed Node.js API to Kubernetes
- Exposed it using a Service
- Externalized config and secrets

### Key Concepts Learned
- Pods vs Deployments
- Services and networking
- ConfigMaps and Secrets
- Self-healing containers

### How to Run
1. minikube start
2. kubectl apply -f k8s/
3. minikube service api-service
```

### 🧠 Reflection (Important)

Add 3–5 bullets like:

* “Kubernetes replaces Docker Compose but adds self-healing”
* “Services give stable networking”
* “Images should not contain config”



