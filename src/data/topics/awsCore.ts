import type { Topic } from '../../types';

export const awsCoreTopics: Topic[] = [
    {
        id: 'aws-ec2',
        title: 'AWS EC2 - Elastic Compute Cloud',
        slug: 'aws-ec2',
        category: 'aws-core',
        zone: 'A',
        icon: 'Server',
        description: 'Virtual servers in the AWS cloud',
        estimatedTime: 15,
        content: {
            beginner: `
# AWS EC2 - Elastic Compute Cloud

## What is EC2?

EC2 provides **virtual servers (instances)** in the AWS cloud. You can launch instances with various configurations of CPU, memory, storage, and networking.

Think of it like **renting computers by the hour**: Choose the specs you need, use them, and stop paying when done.

## Key Concepts

- **Instance**: A virtual server
- **AMI**: Amazon Machine Image (template for OS + software)
- **Instance Type**: Configuration (CPU, RAM, etc.)
- **EBS**: Elastic Block Store (persistent storage)
- **Security Group**: Virtual firewall

## Common Instance Types

| Family | Optimized For | Example Use |
|--------|--------------|-------------|
| t3, t3a | General/Burst | Web servers, dev |
| m5, m6i | General Purpose | Application servers |
| c5, c6i | Compute | Batch processing |
| r5, r6i | Memory | Databases |
| p4, g5 | GPU | ML training |

## EC2 Features

✅ Elastic IPs (static public IP)
✅ Auto Scaling (add/remove instances)
✅ Placement Groups (network performance)
✅ User Data (startup scripts)
      `,
            intermediate: `
# EC2 - Technical Details

## EC2 Pricing Models

| Model | Description | Savings | Best For |
|-------|-------------|---------|----------|
| On-Demand | Pay by second | 0% | Variable workloads |
| Reserved | 1-3 year commit | Up to 72% | Steady workloads |
| Spot | Spare capacity | Up to 90% | Fault-tolerant |
| Savings Plans | Flexible commit | Up to 72% | Predictable usage |
| Dedicated | Physical server | Varies | Compliance |

## Instance Lifecycle

\`\`\`
AMI → Launch → Running → Stop → Start → Terminate
                  ↓
              Reboot
\`\`\`

## Storage Options

| Type | Persistence | Speed | Use Case |
|------|------------|-------|----------|
| EBS | Persists after stop | Fast | Boot volume, databases |
| Instance Store | Lost on stop | Fastest | Temp data, cache |
| EFS | Shared across instances | Good | Shared file storage |

## Security Groups vs NACLs

| Aspect | Security Group | NACL |
|--------|---------------|------|
| Level | Instance | Subnet |
| State | Stateful | Stateless |
| Rules | Allow only | Allow + Deny |
| Default | Deny all inbound | Allow all |
      `,
            advanced: `
# EC2 - Advanced Features

## Placement Groups

| Type | Description | Use Case |
|------|-------------|----------|
| Cluster | Same rack, low latency | HPC, big data |
| Spread | Separate hardware | Critical instances |
| Partition | Separate failure domains | Hadoop, Cassandra |

## EC2 Instance Metadata

\`\`\`bash
# Access from within instance
curl http://169.254.169.254/latest/meta-data/

# Common endpoints
/instance-id
/local-ipv4
/public-ipv4
/iam/security-credentials/
\`\`\`

## Auto Scaling

\`\`\`
CloudWatch Alarm → Scaling Policy → ASG → Launch/Terminate
\`\`\`

### Scaling Types
- **Target Tracking**: Maintain CPU at 70%
- **Step Scaling**: Add 2 if CPU > 80%
- **Scheduled**: Scale up weekdays 9am

## EC2 Networking

- **ENI**: Elastic Network Interface
- **ENA**: Enhanced Networking Adapter (up to 100 Gbps)
- **EFA**: Elastic Fabric Adapter (HPC, MPI)

## AWS Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| EC2 | Virtual Machines | Compute Engine |
| AMI | VM Images | Machine Images |
| EBS | Managed Disks | Persistent Disk |
      `,
        },
        keyPoints: [
            'EC2 provides virtual servers (instances) on demand',
            'Instance types optimized for compute, memory, storage, GPU',
            'Pricing: On-Demand, Reserved (72% savings), Spot (90% savings)',
            'EBS provides persistent block storage',
            'Security Groups act as instance-level firewalls',
            'Auto Scaling adjusts capacity based on demand',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Streaming',
                company: 'Netflix',
                scenario: 'Global streaming with millions of concurrent users',
                solution: 'Thousands of EC2 instances with Auto Scaling',
                outcome: 'Handles 250+ million subscribers worldwide',
            },
        ],
        mcqs: [
            {
                id: 'ec2-1',
                question: 'Which EC2 pricing model offers up to 90% discount?',
                options: ['On-Demand', 'Reserved', 'Spot', 'Dedicated'],
                correctAnswer: 2,
                explanation: 'Spot instances use spare EC2 capacity and offer up to 90% discount, but can be interrupted.',
                difficulty: 'easy',
                tags: ['aws', 'ec2', 'pricing'],
            },
            {
                id: 'ec2-2',
                question: 'What is an AMI?',
                options: ['A storage volume', 'A template for launching instances', 'A network configuration', 'A security policy'],
                correctAnswer: 1,
                explanation: 'AMI (Amazon Machine Image) is a template containing OS, applications, and configurations.',
                difficulty: 'easy',
                tags: ['aws', 'ec2'],
            },
            {
                id: 'ec2-3',
                question: 'Security Groups in EC2 are:',
                options: ['Stateless', 'Applied at subnet level', 'Stateful', 'Can have deny rules'],
                correctAnswer: 2,
                explanation: 'Security Groups are stateful (return traffic automatically allowed) and only have allow rules.',
                difficulty: 'medium',
                tags: ['aws', 'security'],
            },
        ],
        commonMistakes: [
            'Forgetting that Spot instances can be terminated with 2-min notice',
            'Confusing Security Groups (stateful) with NACLs (stateless)',
            'Not realizing instance store data is lost when instance stops',
        ],
        comparisons: [],
        summary: 'EC2 provides virtual servers with various instance types. Pricing includes On-Demand, Reserved, and Spot. EBS for persistent storage. Security Groups for access control. Auto Scaling for elasticity.',
        cheatsheet: ['EC2 = Virtual servers', 'Spot = 90% off, can interrupt', 'Reserved = 72% off, 1-3yr', 'Security Groups = Stateful', 'EBS = Persistent storage'],
        relatedTopics: ['aws-s3', 'aws-vpc', 'iaas', 'virtual-machines'],
    },
    {
        id: 'aws-s3',
        title: 'AWS S3 - Simple Storage Service',
        slug: 'aws-s3',
        category: 'aws-core',
        zone: 'A',
        icon: 'Database',
        description: 'Scalable object storage in the cloud',
        estimatedTime: 12,
        content: {
            beginner: `
# AWS S3 - Simple Storage Service

## What is S3?

S3 is **object storage** for the cloud. Store unlimited files (objects) of up to 5TB each. Highly durable and available.

Think of it like **unlimited cloud storage**: Store files, access from anywhere, pay only for what you use.

## Key Concepts

- **Bucket**: Container for objects (unique name globally)
- **Object**: File + metadata (up to 5TB)
- **Key**: Unique identifier (path) within bucket
- **Region**: Geographic location for data

## S3 Features

✅ **99.999999999% durability** (11 nines!)
✅ **Versioning**: Keep multiple versions
✅ **Encryption**: SSE-S3, SSE-KMS, SSE-C
✅ **Static website hosting**
✅ **Event notifications**

## S3 Storage Classes

| Class | Use Case | Cost |
|-------|----------|------|
| Standard | Frequent access | Highest |
| Intelligent-Tiering | Unknown patterns | Auto-optimize |
| Standard-IA | Infrequent access | Lower |
| Glacier | Archives | Very low |
| Glacier Deep Archive | Long-term | Lowest |
      `,
            intermediate: `
# S3 - Storage Classes & Lifecycle

## Storage Class Comparison

| Class | Retrieval | Min Storage | Use Case |
|-------|-----------|-------------|----------|
| Standard | Instant | None | Active data |
| Standard-IA | Instant | 30 days | Backups |
| One Zone-IA | Instant | 30 days | Reproducible |
| Glacier Instant | Instant | 90 days | Archive w/ fast |
| Glacier Flexible | 1-12 hrs | 90 days | Archives |
| Deep Archive | 12-48 hrs | 180 days | Compliance |

## S3 Lifecycle Rules

\`\`\`
Upload → Standard
   ↓ (30 days)
Standard-IA
   ↓ (60 days)
Glacier Flexible
   ↓ (365 days)
Delete
\`\`\`

## S3 Security

| Method | Description |
|--------|-------------|
| Bucket Policy | JSON policy on bucket |
| ACLs | Legacy, per-object |
| Block Public Access | Account-wide setting |
| Pre-signed URLs | Temporary access |

## S3 Versioning

- Protects against accidental deletion
- Delete marker instead of actual delete
- MFA Delete for critical buckets
- Increases storage costs
      `,
            advanced: `
# S3 - Advanced Features

## S3 Performance Optimization

| Technique | Benefit |
|-----------|---------|
| Prefix randomization | Avoid hot spots |
| Multipart upload | Large files (>100MB) |
| S3 Transfer Acceleration | Fast long-distance |
| Byte-range fetches | Parallel downloads |

## S3 Event Notifications

\`\`\`
S3 Event → SNS / SQS / Lambda / EventBridge
\`\`\`

Events: PUT, POST, COPY, DELETE, etc.

## S3 Replication

| Type | Description |
|------|-------------|
| SRR | Same-Region Replication |
| CRR | Cross-Region Replication |

Requirements: Versioning enabled on both

## S3 Object Lock

- **Governance Mode**: Can be overridden with permission
- **Compliance Mode**: Cannot be overridden by anyone
- Retention periods for regulatory compliance

## AWS Equivalents

| AWS S3 | Azure | GCP |
|--------|-------|-----|
| S3 Standard | Blob Hot | Standard |
| S3 IA | Blob Cool | Nearline |
| Glacier | Blob Archive | Coldline/Archive |
      `,
        },
        keyPoints: [
            'S3 is object storage with unlimited scalability',
            '99.999999999% durability (11 nines)',
            'Storage classes: Standard, IA, Glacier, Deep Archive',
            'Lifecycle policies automate data movement',
            'Security: Bucket policies, ACLs, Block Public Access',
            'Use cases: backup, static websites, data lakes',
        ],
        realWorldExamples: [
            {
                title: 'Dropbox Storage',
                company: 'Dropbox',
                scenario: 'Store files for millions of users',
                solution: 'S3 as primary object storage backend',
                outcome: 'Handles exabytes of user data reliably',
            },
        ],
        mcqs: [
            {
                id: 's3-1',
                question: 'S3 durability is:',
                options: ['99.9%', '99.99%', '99.999999999%', '100%'],
                correctAnswer: 2,
                explanation: 'S3 offers 99.999999999% (11 nines) durability, meaning extremely low chance of data loss.',
                difficulty: 'easy',
                tags: ['aws', 's3'],
            },
            {
                id: 's3-2',
                question: 'Which S3 class is cheapest for long-term archives?',
                options: ['Standard', 'Standard-IA', 'Glacier', 'Glacier Deep Archive'],
                correctAnswer: 3,
                explanation: 'Glacier Deep Archive is the lowest cost for data accessed once a year or less. Retrieval takes 12-48 hours.',
                difficulty: 'easy',
                tags: ['aws', 's3', 'storage-classes'],
            },
            {
                id: 's3-3',
                question: 'S3 bucket names must be:',
                options: ['Unique within region', 'Unique within account', 'Globally unique', 'Same as folder name'],
                correctAnswer: 2,
                explanation: 'S3 bucket names must be globally unique across all AWS accounts and regions.',
                difficulty: 'medium',
                tags: ['aws', 's3'],
            },
        ],
        commonMistakes: [
            'Thinking S3 is block storage (it is object storage)',
            'Forgetting bucket names are globally unique',
            'Not understanding retrieval times for Glacier',
        ],
        comparisons: [],
        summary: 'S3 is object storage with 11-nines durability. Storage classes from Standard to Deep Archive. Lifecycle policies automate transitions. Security via bucket policies and encryption.',
        cheatsheet: ['S3 = Object storage', '11 nines durability', 'Glacier = Archive tier', 'Bucket names = Globally unique', 'Max object = 5TB'],
        relatedTopics: ['aws-ec2', 'aws-rds', 'storage-fundamentals'],
    },
    {
        id: 'aws-iam',
        title: 'AWS IAM - Identity & Access Management',
        slug: 'aws-iam',
        category: 'aws-core',
        zone: 'A',
        icon: 'Shield',
        description: 'Securely manage access to AWS services and resources',
        estimatedTime: 15,
        content: {
            beginner: `
# AWS IAM - Identity & Access Management

## What is IAM?

IAM controls **who can access what** in your AWS account. It's the security gatekeeper.

## Key Concepts

- **Users**: People or applications with credentials
- **Groups**: Collection of users with same permissions  
- **Roles**: Temporary permissions (for services/apps)
- **Policies**: JSON documents defining permissions

## IAM Best Practices

✅ Enable MFA on root account
✅ Create individual users (not share root)
✅ Use groups for permissions
✅ Apply least privilege principle
✅ Use roles for AWS services
✅ Rotate credentials regularly

## Policy Example

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*"
  }]
}
\`\`\`

## Root User vs IAM User

| Aspect | Root User | IAM User |
|--------|-----------|----------|
| Access | Full (cannot restrict) | Policy-based |
| Usage | Billing, initial setup | Daily work |
| MFA | Critical | Recommended |
      `,
            intermediate: `
# IAM - Policies and Roles

## Policy Types

| Type | Attached To | Use Case |
|------|-------------|----------|
| AWS Managed | User/Group/Role | Common use cases |
| Customer Managed | User/Group/Role | Custom requirements |
| Inline | Single entity | Strict 1:1 |
| Resource-based | Resources | Cross-account |

## IAM Roles

Roles provide **temporary credentials**:

\`\`\`
Entity → Assume Role → Get Temp Credentials → Access Resources
\`\`\`

### Common Role Use Cases
- EC2 accessing S3
- Lambda accessing DynamoDB
- Cross-account access
- External identity federation

## Policy Evaluation Logic

\`\`\`
1. Explicit DENY? → DENY
2. Explicit ALLOW? → ALLOW
3. Default → DENY
\`\`\`

## IAM Credentials

| Credential | Use |
|------------|-----|
| Password + MFA | Console login |
| Access Keys | CLI/SDK |
| Signing Certificates | Some AWS services |
| SSH Keys | CodeCommit |
      `,
            advanced: `
# IAM - Advanced Security

## Permission Boundaries

Limits the maximum permissions a user/role can have:

\`\`\`
Effective = Identity Policy ∩ Permission Boundary
\`\`\`

## Service Control Policies (SCPs)

Organization-level controls:
- Apply to entire accounts
- Guardrails for all IAM entities
- Part of AWS Organizations

## Cross-Account Access

\`\`\`
Account A (Trusting) ←→ Account B (Trusted)
     Role                   User
     
1. Account A creates role with trust policy for Account B
2. Account B user assumes role in Account A
3. Get temporary credentials for Account A
\`\`\`

## Identity Federation

| Type | Use Case |
|------|----------|
| SAML 2.0 | Enterprise SSO |
| Web Identity | Mobile apps, social login |
| AWS SSO | Multi-account access |
| Cognito | Application users |

## AWS Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| IAM | Azure AD | Cloud IAM |
| IAM Role | Managed Identity | Service Account |
| IAM Policy | RBAC Role | IAM Policy |
      `,
        },
        keyPoints: [
            'IAM controls access to AWS resources',
            'Users, Groups, Roles, and Policies',
            'Roles provide temporary credentials',
            'Apply least privilege principle',
            'Explicit DENY always wins',
            'Never use root account for daily tasks',
        ],
        realWorldExamples: [
            {
                title: 'Enterprise SSO',
                company: 'Large Enterprise',
                scenario: 'Thousands of employees need AWS access',
                solution: 'SAML federation with corporate AD',
                outcome: 'Single sign-on, centralized audit, easy offboarding',
            },
        ],
        mcqs: [
            {
                id: 'iam-1',
                question: 'IAM Roles provide:',
                options: ['Permanent credentials', 'Temporary credentials', 'No credentials', 'Password-based access'],
                correctAnswer: 1,
                explanation: 'IAM Roles provide temporary security credentials that expire automatically.',
                difficulty: 'easy',
                tags: ['aws', 'iam', 'security'],
            },
            {
                id: 'iam-2',
                question: 'If a policy has both ALLOW and DENY for the same action:',
                options: ['ALLOW wins', 'DENY wins', 'Error occurs', 'Depends on order'],
                correctAnswer: 1,
                explanation: 'In IAM, explicit DENY always takes precedence over ALLOW.',
                difficulty: 'medium',
                tags: ['aws', 'iam'],
            },
            {
                id: 'iam-3',
                question: 'Which is the best practice for root account?',
                options: ['Use for daily work', 'Share with team', 'Enable MFA and rarely use', 'Delete after setup'],
                correctAnswer: 2,
                explanation: 'Root account should have MFA enabled and only be used for tasks that require it.',
                difficulty: 'easy',
                tags: ['aws', 'security'],
            },
        ],
        commonMistakes: [
            'Using root account for daily work',
            'Not enabling MFA',
            'Attaching policies to users instead of groups',
            'Creating overly permissive policies',
        ],
        comparisons: [],
        summary: 'IAM manages access through Users, Groups, Roles, and Policies. Roles provide temporary credentials. Apply least privilege. Explicit DENY wins. Protect root account with MFA.',
        cheatsheet: ['IAM = Who can do what', 'Roles = Temp credentials', 'DENY > ALLOW', 'Root = MFA + minimal use', 'Groups for permissions'],
        relatedTopics: ['cloud-security-basics', 'aws-ec2', 'shared-responsibility'],
    },
    {
        id: 'aws-lambda',
        title: 'AWS Lambda - Serverless Compute',
        slug: 'aws-lambda',
        category: 'aws-core',
        zone: 'A',
        icon: 'Zap',
        description: 'Run code without provisioning servers',
        estimatedTime: 12,
        content: {
            beginner: `
# AWS Lambda - Serverless Compute

## What is Lambda?

Lambda lets you run code **without managing servers**. Upload code, define triggers, and AWS handles everything else.

## How It Works

1. Write your function code
2. Upload to Lambda
3. Configure triggers (API, S3, schedule, etc.)
4. Lambda runs your code when triggered
5. Pay only for execution time

## Key Concepts

- **Function**: Your code + configuration
- **Trigger**: What invokes the function
- **Runtime**: Language environment (Python, Node, etc.)
- **Handler**: Entry point function

## Supported Runtimes

- Python 3.x
- Node.js 18.x, 20.x
- Java 17, 21
- .NET 6, 8
- Go
- Ruby
- Custom (via container images)

## Use Cases

✅ API backends
✅ File processing (S3 triggers)
✅ Scheduled tasks (cron)
✅ Real-time data processing
✅ Chatbots
      `,
            intermediate: `
# Lambda - Technical Details

## Lambda Limits

| Limit | Value |
|-------|-------|
| Timeout | 15 minutes max |
| Memory | 128 MB - 10 GB |
| Deployment size | 250 MB (unzipped) |
| Concurrent executions | 1000 (default quota) |
| Payload size | 6 MB (sync), 256 KB (async) |

## Lambda Pricing

- **Requests**: $0.20 per 1 million
- **Duration**: $0.0000166667 per GB-second
- **Free tier**: 1M requests + 400,000 GB-seconds/month

## Cold Start

\`\`\`
Request → No warm container → Initialize → Run
                   ↓
            Cold Start (100ms - 3s)
\`\`\`

### Reducing Cold Starts
- Provisioned Concurrency
- Keep functions small
- Use faster runtimes (Python, Node > Java)

## Lambda Destinations

\`\`\`
Lambda → Success → SQS/SNS/Lambda/EventBridge
      → Failure → SQS/SNS/Lambda/EventBridge
\`\`\`
      `,
            advanced: `
# Lambda - Advanced Patterns

## Lambda Layers

Shared code/libraries across functions:

\`\`\`
Function A ─┐
Function B ─┼─→ Common Layer (dependencies)
Function C ─┘
\`\`\`

## Lambda with VPC

- Access private resources (RDS, ElastiCache)
- Requires VPC configuration
- NAT Gateway for internet access
- Cold starts may be longer

## Lambda Versions & Aliases

\`\`\`
$LATEST → Version 1 → Version 2
              ↓           ↓
           alias:dev   alias:prod
\`\`\`

## Step Functions Integration

For complex workflows:

\`\`\`
Start → Lambda 1 → Choice → Lambda 2a → End
                       ↘ Lambda 2b ↗
\`\`\`

## AWS Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| Lambda | Azure Functions | Cloud Functions |
| Step Functions | Durable Functions | Workflows |
| EventBridge | Event Grid | Eventarc |
      `,
        },
        keyPoints: [
            'Lambda runs code without server management',
            'Pay per request and execution duration',
            'Maximum 15 minute timeout',
            'Cold starts add latency on first invocation',
            'Triggers include API Gateway, S3, scheduled events',
            'Supports Python, Node, Java, .NET, Go, Ruby',
        ],
        realWorldExamples: [
            {
                title: 'iRobot Roomba',
                company: 'iRobot',
                scenario: 'Process commands for millions of Roomba robots',
                solution: 'Lambda for serverless command processing',
                outcome: 'Handles millions of events with zero server management',
            },
        ],
        mcqs: [
            {
                id: 'lambda-1',
                question: 'Lambda maximum timeout is:',
                options: ['5 minutes', '10 minutes', '15 minutes', '30 minutes'],
                correctAnswer: 2,
                explanation: 'Lambda functions can run for a maximum of 15 minutes per invocation.',
                difficulty: 'easy',
                tags: ['aws', 'lambda'],
            },
            {
                id: 'lambda-2',
                question: 'Cold start in Lambda refers to:',
                options: ['Server cooling', 'Initial container startup delay', 'Function timeout', 'Memory allocation'],
                correctAnswer: 1,
                explanation: 'Cold start is the delay when Lambda needs to initialize a new container to run your function.',
                difficulty: 'medium',
                tags: ['aws', 'lambda', 'faas'],
            },
        ],
        commonMistakes: [
            'Expecting Lambda for long-running processes (>15 min)',
            'Ignoring cold start impact on latency',
            'Not considering VPC cold start penalties',
        ],
        comparisons: [],
        summary: 'Lambda runs code without servers. 15-min max timeout. Pay per request and GB-second. Cold starts add latency. Great for event-driven, APIs, file processing.',
        cheatsheet: ['Lambda = Serverless functions', 'Max 15 min timeout', 'Pay: requests + duration', 'Cold start = startup delay', 'Triggers: API, S3, schedule'],
        relatedTopics: ['faas', 'aws-ec2', 'event-driven-systems'],
    },
    {
        id: 'aws-rds',
        title: 'AWS RDS - Relational Database Service',
        slug: 'aws-rds',
        category: 'aws-core',
        zone: 'A',
        icon: 'Database',
        description: 'Managed relational databases in the cloud',
        estimatedTime: 12,
        content: {
            beginner: `
# AWS RDS - Relational Database Service

## What is RDS?

RDS is a **managed relational database** service. AWS handles patches, backups, and maintenance.

## Supported Engines

- Amazon Aurora (MySQL/PostgreSQL compatible)
- MySQL
- PostgreSQL
- MariaDB
- Oracle
- Microsoft SQL Server

## What AWS Manages

✅ Provisioning
✅ Patching
✅ Backup
✅ Recovery
✅ Scaling (storage)
✅ High availability

## What You Manage

🔧 Schema design
🔧 Query optimization
🔧 Application connections

## Key Features

- **Multi-AZ**: Automatic failover
- **Read Replicas**: Scale read traffic
- **Automated Backups**: Point-in-time recovery
- **Encryption**: At rest and in transit
      `,
            intermediate: `
# RDS - Deep Dive

## Multi-AZ Deployment

\`\`\`
┌─────────────────┐    ┌─────────────────┐
│   Primary DB    │───→│  Standby DB     │
│  (AZ-1)         │sync│  (AZ-2)         │
└────────┬────────┘    └─────────────────┘
         │
    Application
\`\`\`

- Synchronous replication
- Automatic failover
- Not for read scaling

## Read Replicas

\`\`\`
┌─────────────────┐
│   Primary DB    │
└────────┬────────┘
    async│replication
  ┌──────┼──────┐
  ↓      ↓      ↓
Read   Read   Read
Rep 1  Rep 2  Rep 3
\`\`\`

- Asynchronous replication
- For read scaling
- Can be cross-region

## RDS vs Aurora

| Feature | RDS | Aurora |
|---------|-----|--------|
| Performance | Standard | 5x MySQL, 3x Postgres |
| Storage | Up to 64 TB | Auto-scales to 128 TB |
| Replicas | Up to 5 | Up to 15 |
| Failover | 60-120 seconds | <30 seconds |
      `,
            advanced: `
# RDS - Advanced Features

## Aurora Architecture

\`\`\`
┌─────────┐  ┌─────────┐
│Primary  │  │Replicas │
│Instance │  │(up to 15)│
└────┬────┘  └────┬────┘
     │            │
┌────┴────────────┴────┐
│   Shared Storage     │
│   (6 copies, 3 AZs)  │
└──────────────────────┘
\`\`\`

## Aurora Serverless

- Auto-scales compute
- Pay per ACU (Aurora Capacity Unit)
- Great for variable workloads

## RDS Proxy

- Connection pooling
- Reduces database connections
- Helps with Lambda

## Parameter Groups

Customize database settings at:
- **Cluster level**: Shared across all instances
- **Instance level**: Specific instance settings

## AWS Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| RDS | Azure SQL Database | Cloud SQL |
| Aurora | Azure SQL Hyperscale | - |
| DynamoDB | Cosmos DB | Firestore/Bigtable |
      `,
        },
        keyPoints: [
            'RDS provides managed relational databases',
            'Supports MySQL, PostgreSQL, Oracle, SQL Server, MariaDB, Aurora',
            'Multi-AZ for high availability (sync replication)',
            'Read Replicas for read scaling (async)',
            'Aurora offers 5x MySQL, 3x PostgreSQL performance',
            'Automated backups and point-in-time recovery',
        ],
        realWorldExamples: [
            {
                title: 'Airbnb Database',
                company: 'Airbnb',
                scenario: 'Handle millions of bookings globally',
                solution: 'RDS MySQL with Read Replicas',
                outcome: 'Reliable database with automatic failover',
            },
        ],
        mcqs: [
            {
                id: 'rds-1',
                question: 'RDS Multi-AZ uses what type of replication?',
                options: ['Asynchronous', 'Synchronous', 'Manual', 'Eventual'],
                correctAnswer: 1,
                explanation: 'Multi-AZ uses synchronous replication to ensure the standby is always in sync.',
                difficulty: 'medium',
                tags: ['aws', 'rds', 'database'],
            },
            {
                id: 'rds-2',
                question: 'Read Replicas are used for:',
                options: ['High availability', 'Read scaling', 'Write scaling', 'Backup'],
                correctAnswer: 1,
                explanation: 'Read Replicas offload read traffic from the primary database for scaling.',
                difficulty: 'easy',
                tags: ['aws', 'rds'],
            },
        ],
        commonMistakes: [
            'Confusing Multi-AZ (HA) with Read Replicas (scaling)',
            'Expecting Read Replicas for high availability (use Multi-AZ)',
            'Not understanding Aurora vs standard RDS differences',
        ],
        comparisons: [],
        summary: 'RDS provides managed databases. Multi-AZ for HA (sync). Read Replicas for scaling (async). Aurora offers better performance. Automated backups and patching included.',
        cheatsheet: ['RDS = Managed database', 'Multi-AZ = HA (sync)', 'Read Replica = Scale reads (async)', 'Aurora = 5x MySQL perf', 'Engines: MySQL, Postgres, Oracle...'],
        relatedTopics: ['aws-dynamodb', 'database-fundamentals', 'storage-fundamentals'],
    },
];

export default awsCoreTopics;
