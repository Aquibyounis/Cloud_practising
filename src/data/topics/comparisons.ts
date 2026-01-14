import type { Topic } from '../../types';

export const comparisonTopics: Topic[] = [
    {
        id: 'aws-azure-gcp',
        title: 'AWS vs Azure vs GCP Comparison',
        slug: 'aws-azure-gcp',
        category: 'comparisons',
        zone: 'A',
        icon: 'Scale',
        description: 'Comparing major cloud providers',
        estimatedTime: 15,
        content: {
            beginner: `
# AWS vs Azure vs GCP

## The Big Three

| Provider | Parent | Launched | Strength |
|----------|--------|----------|----------|
| AWS | Amazon | 2006 | Most services, largest |
| Azure | Microsoft | 2010 | Enterprise, hybrid |
| GCP | Google | 2008 | AI/ML, containers |

## Market Share (2024)

\`\`\`
AWS   ████████████████████████████████ 32%
Azure ████████████████████████ 23%
GCP   ██████████ 10%
Others████████████████████████████████████ 35%
\`\`\`

## Quick Comparison

| Aspect | AWS | Azure | GCP |
|--------|-----|-------|-----|
| VMs | EC2 | Virtual Machines | Compute Engine |
| Storage | S3 | Blob Storage | Cloud Storage |
| Database | RDS | SQL Database | Cloud SQL |
| Serverless | Lambda | Functions | Cloud Functions |
| Kubernetes | EKS | AKS | GKE |

## When to Choose

- **AWS**: Most services, flexibility, largest ecosystem
- **Azure**: Microsoft shop, hybrid, enterprise
- **GCP**: AI/ML, big data, containers
      `,
            intermediate: `
# Provider Deep Comparison

## Compute Services

| Service Type | AWS | Azure | GCP |
|--------------|-----|-------|-----|
| VMs | EC2 | Virtual Machines | Compute Engine |
| Containers | ECS, EKS | ACI, AKS | Cloud Run, GKE |
| Serverless | Lambda | Functions | Cloud Functions |
| Batch | Batch | Batch | Cloud Batch |

## Storage Services

| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| Object | S3 | Blob | Cloud Storage |
| Block | EBS | Managed Disks | Persistent Disk |
| File | EFS | Files | Filestore |
| Archive | Glacier | Archive | Coldline/Archive |

## Database Services

| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| Relational | RDS, Aurora | SQL DB, PostgreSQL | Cloud SQL, Spanner |
| NoSQL | DynamoDB | Cosmos DB | Firestore, Bigtable |
| Cache | ElastiCache | Cache for Redis | Memorystore |
| Data Warehouse | Redshift | Synapse | BigQuery |

## Networking

| Feature | AWS | Azure | GCP |
|---------|-----|-------|-----|
| VPC | VPC | VNet | VPC |
| Load Balancer | ELB/ALB/NLB | Load Balancer | Cloud LB |
| DNS | Route 53 | Azure DNS | Cloud DNS |
| CDN | CloudFront | CDN | Cloud CDN |
      `,
            advanced: `
# Strategic Differences

## Pricing Models

| Aspect | AWS | Azure | GCP |
|--------|-----|-------|-----|
| Billing | Per second | Per minute | Per second |
| Commitments | 1,3 yr Reserved | 1,3 yr Reserved | 1,3 yr Committed |
| Spot | Up to 90% off | Up to 90% off | Up to 91% off |

## Strengths by Domain

| Domain | Leader | Why |
|--------|--------|-----|
| Enterprise | Azure | Microsoft integration |
| Startups | AWS | Flexibility, credits |
| AI/ML | GCP | TensorFlow, TPUs |
| Hybrid | Azure | Azure Arc, Stack |
| Containers | GCP | Kubernetes origin |
| Serverless | AWS | Lambda ecosystem |

## Multi-Cloud Strategy

Many enterprises use multiple clouds:

\`\`\`
AWS  → Core workloads, largest ecosystem
Azure → Microsoft apps, enterprise
GCP  → AI/ML, analytics
\`\`\`

## Certification Paths

| Level | AWS | Azure | GCP |
|-------|-----|-------|-----|
| Entry | Cloud Practitioner | AZ-900 | Cloud Digital Leader |
| Associate | Solutions Architect | AZ-104 | Associate Cloud Engineer |
| Professional | DevOps, Architect | AZ-305 | Professional Cloud Architect |
      `,
        },
        keyPoints: [
            'AWS has most services and largest market share',
            'Azure strong for Microsoft/enterprise customers',
            'GCP leads in AI/ML and Kubernetes',
            'Service names differ but concepts similar',
            'All offer similar core capabilities',
            'Multi-cloud is increasingly common',
        ],
        realWorldExamples: [
            {
                title: 'Spotify Multi-Cloud',
                company: 'Spotify',
                scenario: 'Originally GCP, needed specific AWS services',
                solution: 'Multi-cloud approach using both providers',
                outcome: 'Best services from each provider',
            },
        ],
        mcqs: [
            {
                id: 'compare-1',
                question: 'Azure equivalent of AWS EC2 is:',
                options: ['Compute Engine', 'Virtual Machines', 'Lambda', 'Cloud Functions'],
                correctAnswer: 1,
                explanation: 'Azure Virtual Machines = AWS EC2 = GCP Compute Engine. All provide virtual servers.',
                difficulty: 'easy',
                tags: ['comparison', 'azure', 'aws'],
            },
            {
                id: 'compare-2',
                question: 'Which provider originated Kubernetes?',
                options: ['AWS', 'Azure', 'Google', 'Oracle'],
                correctAnswer: 2,
                explanation: 'Google created Kubernetes (based on internal Borg). GKE is considered the gold standard for managed K8s.',
                difficulty: 'medium',
                tags: ['comparison', 'kubernetes'],
            },
            {
                id: 'compare-3',
                question: 'AWS S3 equivalent in Azure is:',
                options: ['Files', 'Managed Disks', 'Blob Storage', 'SQL Database'],
                correctAnswer: 2,
                explanation: 'Azure Blob Storage is object storage like AWS S3. GCP equivalent is Cloud Storage.',
                difficulty: 'easy',
                tags: ['comparison', 'storage'],
            },
        ],
        commonMistakes: [
            'Assuming one provider is best for everything',
            'Not knowing service name equivalents across providers',
            'Ignoring pricing differences between providers',
        ],
        comparisons: [
            {
                title: 'Core Service Mapping',
                headers: ['Service', 'AWS', 'Azure', 'GCP'],
                rows: [
                    ['VMs', 'EC2', 'Virtual Machines', 'Compute Engine'],
                    ['Object Storage', 'S3', 'Blob Storage', 'Cloud Storage'],
                    ['Serverless', 'Lambda', 'Functions', 'Cloud Functions'],
                    ['Containers', 'EKS', 'AKS', 'GKE'],
                    ['SQL DB', 'RDS', 'SQL Database', 'Cloud SQL'],
                ],
            },
        ],
        summary: 'AWS largest with most services. Azure for Microsoft/enterprise. GCP for AI/ML and K8s. Core services similar, names different. Know the equivalents for exams.',
        cheatsheet: ['AWS = Largest, most services', 'Azure = Microsoft, hybrid', 'GCP = AI/ML, K8s', 'EC2 = VM = Compute Engine', 'S3 = Blob = Cloud Storage'],
        relatedTopics: ['aws-ec2', 'aws-s3', 'cloud-fundamentals'],
    },
    {
        id: 'mcq-traps',
        title: 'MCQ Trap Concepts',
        slug: 'mcq-traps',
        category: 'comparisons',
        zone: 'A',
        icon: 'AlertTriangle',
        description: 'Common tricky questions in cloud exams',
        estimatedTime: 15,
        content: {
            beginner: `
# MCQ Trap Concepts

## Most Common Traps

### 1. Durability vs Availability

| Term | Meaning | Example |
|------|---------|---------|
| Durability | Data wont be lost | S3: 11 nines |
| Availability | Service is accessible | S3: 99.99% |

**Trap**: Confusing these two terms!

### 2. Stateful vs Stateless

| Security Group | NACL |
|---------------|------|
| Stateful | Stateless |
| Return traffic auto-allowed | Must allow both ways |

### 3. Encryption Locations

| Type | What |
|------|------|
| At Rest | Stored data |
| In Transit | Moving data |

### 4. Multi-AZ vs Read Replica

| Feature | Multi-AZ | Read Replica |
|---------|----------|--------------|
| Purpose | HA (failover) | Scaling reads |
| Replication | Synchronous | Asynchronous |
| Readable | No* | Yes |
      `,
            intermediate: `
# More Exam Traps

## 5. Reserved vs Spot

| Reserved | Spot |
|----------|------|
| Guaranteed | Can be interrupted |
| 72% savings | 90% savings |
| Steady workloads | Fault-tolerant |

**Trap**: Spot for production databases = WRONG!

## 6. S3 Storage Classes

| Class | Retrieval |
|-------|-----------|
| Standard | Instant |
| IA | Instant (higher retrieval cost) |
| Glacier Instant | Instant |
| Glacier Flexible | 1-12 hours |
| Deep Archive | 12-48 hours |

**Trap**: Glacier ≠ immediate access!

## 7. EC2 Instance Types

| Family | Optimized For |
|--------|--------------|
| T | Burstable/general |
| M | General purpose |
| C | Compute |
| R | Memory |
| P/G | GPU |

**Trap**: Wrong instance for workload!

## 8. IaaS vs PaaS vs SaaS

| You Manage | IaaS | PaaS | SaaS |
|------------|------|------|------|
| OS | ✅ | ❌ | ❌ |
| Data | ✅ | ✅ | ✅ |
| App | ✅ | ✅ | ❌ |
      `,
            advanced: `
# Advanced Traps

## 9. Lambda Limits

| Limit | Value |
|-------|-------|
| Timeout | 15 min |
| Memory | 10 GB |
| Package | 250 MB |

**Trap**: Lambda for 30-min jobs = WRONG!

## 10. VPC Subnets

**Trap**: "Private subnet" doesnt mean secure!
- Still needs security groups
- Needs NACLs
- Needs proper IAM

## 11. CloudFormation vs Terraform

| CloudFormation | Terraform |
|---------------|-----------|
| AWS only | Multi-cloud |
| JSON/YAML | HCL |
| Free | Free (open source) |

## 12. IAM Evaluation

\`\`\`
1. Explicit DENY → DENY
2. Explicit ALLOW → ALLOW  
3. Default → DENY
\`\`\`

**Trap**: DENY always wins, even with ALLOW!

## 13. Load Balancer Layers

| ALB | NLB |
|-----|-----|
| Layer 7 | Layer 4 |
| HTTP paths | TCP/UDP |
| Slower | Faster |

## Memory Tricks

- **S3 durability**: "11 nines" = 99.999999999%
- **Reserved savings**: "72%" 
- **Spot savings**: "90%"
- **Lambda timeout**: "15 minutes"
      `,
        },
        keyPoints: [
            'Durability ≠ Availability (data loss vs uptime)',
            'Security Groups stateful, NACLs stateless',
            'Multi-AZ for HA, Read Replicas for scaling',
            'Spot for fault-tolerant only (can interrupt)',
            'Glacier retrieval takes hours',
            'Lambda max 15 minutes',
        ],
        realWorldExamples: [],
        mcqs: [
            {
                id: 'trap-1',
                question: 'S3 11 nines durability means:',
                options: ['99.99% uptime', '99.999999999% data will not be lost', 'Free storage', '11 storage classes'],
                correctAnswer: 1,
                explanation: 'Durability means data protection (99.999999999%). Availability is about uptime.',
                difficulty: 'medium',
                tags: ['trap', 's3'],
            },
            {
                id: 'trap-2',
                question: 'Spot instances are suitable for:',
                options: ['Production database', 'Batch processing', 'Primary web server', 'Banking transactions'],
                correctAnswer: 1,
                explanation: 'Spot can be interrupted with 2-min notice. Only use for fault-tolerant workloads.',
                difficulty: 'medium',
                tags: ['trap', 'ec2'],
            },
            {
                id: 'trap-3',
                question: 'To scale READ traffic in RDS, use:',
                options: ['Multi-AZ', 'Read Replicas', 'Reserved Instances', 'Larger instance'],
                correctAnswer: 1,
                explanation: 'Read Replicas scale read traffic. Multi-AZ provides high availability (failover).',
                difficulty: 'medium',
                tags: ['trap', 'rds'],
            },
        ],
        commonMistakes: [
            'All of them - thats why this topic exists!',
        ],
        comparisons: [],
        summary: 'Key traps: Durability vs Availability, Stateful vs Stateless, Multi-AZ vs Read Replica, Reserved vs Spot, Glacier retrieval times, Lambda limits, DENY beats ALLOW.',
        cheatsheet: ['Durability ≠ Availability', 'SG = Stateful, NACL = Stateless', 'Multi-AZ = HA, Replica = Scale', 'Spot = Interruptible', 'Glacier = Hours retrieval', 'Lambda = 15 min max'],
        relatedTopics: ['aws-ec2', 'aws-s3', 'aws-rds'],
    },
];

export default comparisonTopics;
