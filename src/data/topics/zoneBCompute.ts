import type { Topic } from '../../types';

export const zoneBComputeTopics: Topic[] = [
    {
        id: 'ec2-advanced',
        title: 'EC2 Advanced Patterns',
        slug: 'ec2-advanced',
        category: 'compute-deep',
        zone: 'B',
        icon: 'Server',
        description: 'Advanced EC2 architectures and optimization',
        estimatedTime: 20,
        content: {
            beginner: `
# EC2 Advanced Patterns

## Beyond Basic EC2

This topic covers advanced EC2 concepts for production workloads:
- Instance selection strategies
- Placement and performance
- Cost optimization at scale
- High availability patterns

## Key Areas

1. **Instance Families**: Choosing right type
2. **Placement Groups**: Network performance
3. **Fleet Management**: Mixed instance strategies
4. **Spot Strategies**: Advanced spot usage
      `,
            intermediate: `
# EC2 - Production Patterns

## Instance Selection Matrix

| Workload | Family | Reason |
|----------|--------|--------|
| Web servers | T3, M5 | Balanced |
| Batch jobs | C5, C6i | Compute |
| Databases | R5, R6i | Memory |
| ML Training | P4, G5 | GPU |
| Analytics | I3, D3 | Storage |

## Placement Groups Deep Dive

### Cluster Placement
\`\`\`
┌─────────────────────────┐
│        Same Rack        │
│  ┌───┐ ┌───┐ ┌───┐     │
│  │VM1│ │VM2│ │VM3│     │
│  └───┘ └───┘ └───┘     │
│    Low latency network  │
└─────────────────────────┘
\`\`\`
- Use: HPC, big data
- Risk: Rack failure affects all

### Spread Placement
- Maximum 7 instances per AZ
- Different underlying hardware
- Use: Critical instances

### Partition Placement
- Groups of instances on separate hardware
- Use: Hadoop, Cassandra, Kafka

## EC2 Fleet

\`\`\`
EC2 Fleet Request:
  TargetCapacity: 100
  SpotAllocationStrategy: capacity-optimized
  OnDemandBaseCapacity: 20
  LaunchTemplates:
    - m5.large (weight: 1)
    - m5.xlarge (weight: 2)
    - c5.large (weight: 1)
\`\`\`
      `,
            advanced: `
# EC2 - Expert Patterns

## Nitro System

AWS custom hardware + hypervisor:
- Near bare-metal performance
- Enhanced security
- Hardware-level encryption

## Advanced Networking

| Feature | Speed | Use Case |
|---------|-------|----------|
| ENA | 100 Gbps | General |
| EFA | 400 Gbps | HPC, MPI |
| ENI | Standard | Multi-homing |

## Capacity Management

### Capacity Reservations
- Reserve capacity in specific AZ
- No long-term commitment
- Pay regardless of usage

### On-Demand Capacity Reservations
\`\`\`
Reserve: m5.xlarge x 10 in us-east-1a
Benefit: Guaranteed availability
Cost: Pay even if not used
\`\`\`

## Spot Instance Strategies

### Capacity-Optimized Allocation
- Launches from pools with most capacity
- Lowest interruption risk

### Lowest-Price Allocation
- Launches cheapest
- Higher interruption risk

### Diversified
- Spreads across pools
- Balanced approach
      `,
        },
        keyPoints: [
            'Choose instance family based on workload type',
            'Placement groups for network performance vs availability',
            'EC2 Fleet for mixed instance strategies',
            'Nitro provides near bare-metal performance',
            'EFA for HPC workloads (400 Gbps)',
            'Capacity reservations guarantee availability',
        ],
        realWorldExamples: [],
        mcqs: [
            {
                id: 'ec2-adv-1',
                question: 'Cluster placement group is best for:',
                options: ['High availability', 'Low latency between instances', 'Geographic distribution', 'Cost savings'],
                correctAnswer: 1,
                explanation: 'Cluster puts instances close together for lowest latency, ideal for HPC workloads.',
                difficulty: 'medium',
                tags: ['ec2', 'placement'],
            },
        ],
        commonMistakes: [
            'Using cluster placement for fault tolerance (its opposite)',
            'Not diversifying Spot pools',
        ],
        comparisons: [],
        summary: 'Advanced EC2: Choose instance family for workload. Placement groups for network/availability tradeoff. Fleets for mixed strategies. Nitro for performance. EFA for HPC.',
        cheatsheet: ['Cluster = Low latency', 'Spread = Availability', 'Fleet = Mixed instances', 'Nitro = Performance', 'EFA = HPC 400Gbps'],
        relatedTopics: ['aws-ec2', 'auto-scaling', 'spot-strategies'],
    },
    {
        id: 'containers-kubernetes',
        title: 'Kubernetes & Container Orchestration',
        slug: 'containers-kubernetes',
        category: 'compute-deep',
        zone: 'B',
        icon: 'Box',
        description: 'Container orchestration with Kubernetes',
        estimatedTime: 25,
        content: {
            beginner: `
# Kubernetes & Container Orchestration

## What is Kubernetes (K8s)?

Kubernetes is an **open-source container orchestration platform** that automates deploying, scaling, and managing containerized applications.

## Why Kubernetes?

Without orchestration:
- Manual container management
- No auto-scaling
- Complex networking
- Manual failover

With Kubernetes:
- Declarative deployments
- Auto-scaling
- Service discovery
- Self-healing

## K8s Core Concepts

- **Pod**: Smallest unit (one or more containers)
- **Deployment**: Manages pod replicas
- **Service**: Network access to pods
- **Namespace**: Virtual cluster isolation
      `,
            intermediate: `
# K8s Architecture

## Control Plane

\`\`\`
┌─────────────────────────────────────┐
│           Control Plane              │
├─────────────────────────────────────┤
│  API Server │ Scheduler │ etcd      │
│  Controller │ Manager   │           │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│           Worker Nodes               │
├─────────┬─────────┬─────────────────┤
│ kubelet │ kube-proxy │ Container RT │
├─────────┴─────────┴─────────────────┤
│     Pod     │     Pod    │   Pod    │
└─────────────────────────────────────┘
\`\`\`

## Key Resources

| Resource | Purpose |
|----------|---------|
| Pod | Run containers |
| Deployment | Manage replicas |
| Service | Network access |
| ConfigMap | Configuration |
| Secret | Sensitive data |
| PersistentVolume | Storage |
| Ingress | HTTP routing |

## Example Deployment

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: web
  template:
    metadata:
      labels:
        app: web
    spec:
      containers:
      - name: web
        image: nginx:1.21
        ports:
        - containerPort: 80
\`\`\`
      `,
            advanced: `
# K8s - Advanced Topics

## Managed Kubernetes

| Service | Provider |
|---------|----------|
| EKS | AWS |
| AKS | Azure |
| GKE | Google (gold standard) |

## Advanced Patterns

### Pod Autoscaling (HPA)

\`\`\`yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
\`\`\`

### Service Mesh (Istio/Linkerd)

- Traffic management
- Security (mTLS)
- Observability
- Policy enforcement

### GitOps with ArgoCD/Flux

\`\`\`
Git Repo → ArgoCD → K8s Cluster
           watches    syncs
\`\`\`

## K8s Security

- RBAC for authorization
- Network Policies for isolation
- Pod Security Standards
- Secret encryption
- Image scanning
      `,
        },
        keyPoints: [
            'Kubernetes orchestrates container deployment and scaling',
            'Pod is smallest unit, Deployment manages replicas',
            'Service provides network access to pods',
            'HPA auto-scales based on metrics',
            'Managed K8s: EKS, AKS, GKE',
            'Service mesh adds security and observability',
        ],
        realWorldExamples: [
            {
                title: 'Pinterest K8s Migration',
                company: 'Pinterest',
                scenario: 'Manage thousands of microservices',
                solution: 'Migrated to Kubernetes on AWS',
                outcome: '80% reduction in machine count, faster deployments',
            },
        ],
        mcqs: [
            {
                id: 'k8s-1',
                question: 'The smallest deployable unit in Kubernetes is:',
                options: ['Container', 'Pod', 'Deployment', 'Node'],
                correctAnswer: 1,
                explanation: 'Pod is the smallest unit in K8s. It contains one or more containers.',
                difficulty: 'easy',
                tags: ['kubernetes', 'containers'],
            },
            {
                id: 'k8s-2',
                question: 'HPA in Kubernetes stands for:',
                options: ['High Performance Array', 'Horizontal Pod Autoscaler', 'Host Port Allocation', 'Hypervisor Pod Access'],
                correctAnswer: 1,
                explanation: 'HPA automatically scales pods based on CPU, memory, or custom metrics.',
                difficulty: 'medium',
                tags: ['kubernetes', 'scaling'],
            },
        ],
        commonMistakes: [
            'Confusing Pod with Container',
            'Not setting resource limits',
            'Storing secrets in ConfigMaps',
        ],
        comparisons: [],
        summary: 'K8s orchestrates containers. Pod = smallest unit. Deployment manages replicas. Service for networking. HPA for auto-scaling. Managed: EKS, AKS, GKE.',
        cheatsheet: ['Pod = 1+ containers', 'Deployment = manage replicas', 'Service = networking', 'HPA = autoscale', 'EKS/AKS/GKE = managed'],
        relatedTopics: ['containers-vs-vms', 'devops-overview', 'microservices'],
    },
];

export default zoneBComputeTopics;
