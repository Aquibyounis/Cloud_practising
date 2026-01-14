import type { Topic } from '../../types';

export const zoneBArchitectureTopics: Topic[] = [
    {
        id: 'microservices',
        title: 'Microservices Architecture',
        slug: 'microservices',
        category: 'architecture-patterns',
        zone: 'B',
        icon: 'Grid',
        description: 'Building distributed applications with microservices',
        estimatedTime: 20,
        content: {
            beginner: `
# Microservices Architecture

## What are Microservices?

Microservices is an architecture where an application is built as a **collection of small, independent services** that communicate over APIs.

## Monolith vs Microservices

| Monolith | Microservices |
|----------|---------------|
| Single codebase | Multiple services |
| One deployment | Independent deploys |
| Shared database | Database per service |
| Scale entire app | Scale individual services |

## Benefits

✅ Independent deployment
✅ Technology flexibility
✅ Team autonomy
✅ Fault isolation
✅ Scalability per service

## Challenges

❌ Distributed system complexity
❌ Network latency
❌ Data consistency
❌ Operational overhead
❌ Testing complexity
      `,
            intermediate: `
# Microservices - Design Patterns

## Communication Patterns

### Synchronous
\`\`\`
Service A → REST/gRPC → Service B
           ↓
        Wait for response
\`\`\`

### Asynchronous
\`\`\`
Service A → Message Queue → Service B
              (SQS, Kafka)
           ↓
        Continue immediately
\`\`\`

## Service Discovery

\`\`\`
Services register → Service Registry ← Clients lookup
                  (Consul, eureka)
\`\`\`

## API Gateway Pattern

\`\`\`
Clients → API Gateway → Service A
             ↓         → Service B
         Auth, Rate    → Service C
         limiting
\`\`\`

AWS: API Gateway, ALB
Others: Kong, Nginx

## Database Patterns

| Pattern | Description |
|---------|-------------|
| Database per Service | Each service owns data |
| Saga | Distributed transactions |
| CQRS | Separate read/write models |
| Event Sourcing | Store events, derive state |
      `,
            advanced: `
# Microservices - Advanced

## Saga Pattern

\`\`\`
Order Service → Payment Service → Inventory Service
     ↓               ↓                  ↓
 Order Created → Payment Done → Stock Reserved
     ↑               ↑                  ↑
 Compensate ← Refund ← Release Stock (on failure)
\`\`\`

## Circuit Breaker

\`\`\`
Closed (normal) → Failures exceed threshold → Open (fail fast)
                                                   ↓
                       Half-Open ← Timeout expires
                           ↓
                  Success → Closed
                  Failure → Open
\`\`\`

## Observability

### Three Pillars
1. **Logs**: What happened
2. **Metrics**: Numerical measurements
3. **Traces**: Request flow across services

### Distributed Tracing
- Trace ID propagated across services
- Tools: Jaeger, Zipkin, X-Ray

## AWS Microservices Stack

| Need | Service |
|------|---------|
| Containers | ECS, EKS |
| Serverless | Lambda |
| API | API Gateway |
| Service Mesh | App Mesh |
| Messaging | SQS, SNS, EventBridge |
      `,
        },
        keyPoints: [
            'Microservices = independent, small services communicating via API',
            'Each service owns its data (database per service)',
            'Synchronous (REST) vs Asynchronous (queues) communication',
            'API Gateway handles routing, auth, rate limiting',
            'Saga pattern for distributed transactions',
            'Circuit breaker prevents cascade failures',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Microservices',
                company: 'Netflix',
                scenario: 'Monolith couldnt scale for global streaming',
                solution: 'Broke into 1000+ microservices',
                outcome: 'Handles 250M+ subscribers with independent scaling',
            },
        ],
        mcqs: [
            {
                id: 'micro-1',
                question: 'Each microservice should have:',
                options: ['Shared database', 'Its own database', 'No database', 'Same codebase'],
                correctAnswer: 1,
                explanation: 'Database per service ensures loose coupling and independent deployability.',
                difficulty: 'medium',
                tags: ['microservices', 'architecture'],
            },
        ],
        commonMistakes: [
            'Creating too many small services (nano-services)',
            'Sharing databases between services',
            'Not handling distributed failures',
        ],
        comparisons: [],
        summary: 'Microservices are independent services with their own databases. Use API Gateway for routing. Async messaging for decoupling. Saga for transactions. Circuit breaker for resilience.',
        cheatsheet: ['1 service = 1 database', 'API Gateway = routing', 'Saga = distributed tx', 'Circuit breaker = resilience', 'Logs + Metrics + Traces'],
        relatedTopics: ['devops-overview', 'containers-kubernetes', 'event-driven'],
    },
    {
        id: 'serverless-patterns',
        title: 'Serverless Architecture Patterns',
        slug: 'serverless-patterns',
        category: 'architecture-patterns',
        zone: 'B',
        icon: 'Zap',
        description: 'Building applications without managing servers',
        estimatedTime: 18,
        content: {
            beginner: `
# Serverless Architecture

## What is Serverless?

Serverless means building and running applications **without managing servers**. The cloud provider handles all infrastructure.

## Serverless Services

| Type | AWS | Azure | GCP |
|------|-----|-------|-----|
| Functions | Lambda | Functions | Cloud Functions |
| Containers | Fargate | Container Apps | Cloud Run |
| API | API Gateway | API Management | Cloud Endpoints |
| Database | DynamoDB | Cosmos DB | Firestore |
| Storage | S3 | Blob | Cloud Storage |

## Benefits

✅ No server management
✅ Auto-scaling (including to zero)
✅ Pay per execution
✅ Built-in high availability
✅ Faster time to market

## Use Cases

- API backends
- Event processing
- Scheduled jobs
- File processing
- Chatbots
      `,
            intermediate: `
# Serverless Patterns

## Event-Driven Pattern

\`\`\`
S3 Upload → Lambda → Process → Store in DynamoDB
                         ↓
                   SNS Notification
\`\`\`

## API Backend Pattern

\`\`\`
Client → API Gateway → Lambda → DynamoDB
              ↓
         Cognito Auth
\`\`\`

## Fan-Out Pattern

\`\`\`
SQS Queue → Lambda 1
         → Lambda 2
         → Lambda 3
\`\`\`

## Step Functions (Orchestration)

\`\`\`
Start → Validate → Process → Notify → End
              ↓         ↓
          Error →   Retry
              ↓
          Fail Path
\`\`\`

## Serverless Best Practices

| Practice | Benefit |
|----------|---------|
| Small functions | Fast cold starts |
| Async when possible | Better scaling |
| External state | Stateless functions |
| Idempotent design | Safe retries |
      `,
            advanced: `
# Serverless - Advanced

## Cold Start Optimization

| Strategy | Benefit |
|----------|---------|
| Provisioned Concurrency | Eliminate cold starts |
| Keep dependencies small | Faster init |
| Use faster runtimes | Node > Java |
| Connection pooling | Proxy for RDS |

## Serverless Framework

\`\`\`yaml
service: my-api
provider:
  name: aws
  runtime: nodejs18.x
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          path: /hello
          method: get
\`\`\`

## Cost Optimization

| Factor | Impact |
|--------|--------|
| Memory allocation | Pay per GB-second |
| Duration | Minimize execution time |
| Invocations | Batch when possible |
| Provisioned | Fixed cost vs on-demand |

## When NOT to Use Serverless

- Long-running processes (>15 min)
- WebSocket connections (use AppSync)
- High-frequency, consistent load
- GPU workloads
      `,
        },
        keyPoints: [
            'Serverless = no server management, auto-scaling, pay per use',
            'Lambda, Fargate, DynamoDB are serverless',
            'Event-driven architecture is natural fit',
            'Cold starts can add latency',
            'Step Functions for orchestration',
            'Not suitable for long-running or stateful processes',
        ],
        realWorldExamples: [],
        mcqs: [
            {
                id: 'serverless-1',
                question: 'Serverless functions should be:',
                options: ['Stateful', 'Stateless', 'Long-running', 'GPU-intensive'],
                correctAnswer: 1,
                explanation: 'Serverless functions should be stateless; state should be external (DynamoDB, S3, etc.).',
                difficulty: 'easy',
                tags: ['serverless'],
            },
        ],
        commonMistakes: [
            'Using Lambda for long-running processes',
            'Not considering cold start impact',
            'Storing state inside functions',
        ],
        comparisons: [],
        summary: 'Serverless means no server management. Lambda for functions, Fargate for containers. Event-driven naturally fits. Cold starts require attention. Step Functions for orchestration.',
        cheatsheet: ['No servers to manage', 'Pay per execution', 'Functions = stateless', 'Cold start = startup delay', 'Step Functions = orchestrate'],
        relatedTopics: ['aws-lambda', 'microservices', 'event-driven'],
    },
    {
        id: 'iac-terraform',
        title: 'Infrastructure as Code with Terraform',
        slug: 'iac-terraform',
        category: 'iac-deep',
        zone: 'B',
        icon: 'FileCode',
        description: 'Managing cloud infrastructure with code',
        estimatedTime: 20,
        content: {
            beginner: `
# Infrastructure as Code (IaC)

## What is IaC?

IaC means managing and provisioning infrastructure through **code instead of manual processes**.

## Why IaC?

| Manual | IaC |
|--------|-----|
| Click in console | Write code |
| Hard to replicate | Reproducible |
| No history | Version controlled |
| Prone to errors | Consistent |
| Slow | Automated |

## IaC Tools

| Tool | Type | Provider |
|------|------|----------|
| Terraform | Multi-cloud | HashiCorp |
| CloudFormation | AWS only | AWS |
| ARM/Bicep | Azure only | Microsoft |
| Pulumi | Multi-cloud | Pulumi |
| CDK | AWS (code) | AWS |

## Terraform Basics

\`\`\`hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"
  
  tags = {
    Name = "Web Server"
  }
}
\`\`\`
      `,
            intermediate: `
# Terraform - Core Concepts

## Terraform Workflow

\`\`\`
Write → terraform init → terraform plan → terraform apply
                                              ↓
                                         State stored
\`\`\`

## Key Concepts

| Concept | Description |
|---------|-------------|
| Provider | Plugin for cloud (AWS, Azure, GCP) |
| Resource | Infrastructure component |
| Data Source | Read existing infrastructure |
| Variable | Input parameters |
| Output | Export values |
| State | Current infrastructure state |

## Example with Variables

\`\`\`hcl
variable "instance_type" {
  default = "t3.micro"
}

resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
}

output "public_ip" {
  value = aws_instance.web.public_ip
}
\`\`\`

## State Management

\`\`\`hcl
terraform {
  backend "s3" {
    bucket = "my-terraform-state"
    key    = "prod/terraform.tfstate"
    region = "us-east-1"
  }
}
\`\`\`
      `,
            advanced: `
# Terraform - Advanced

## Modules

\`\`\`hcl
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  
  name = "my-vpc"
  cidr = "10.0.0.0/16"
  
  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}
\`\`\`

## Workspaces

\`\`\`bash
terraform workspace new dev
terraform workspace new prod
terraform workspace select prod
\`\`\`

Different state per workspace.

## State Locking

Prevents concurrent modifications:
- S3 + DynamoDB for AWS
- Azure Blob + lease
- GCS + lock

## Terraform Best Practices

| Practice | Why |
|----------|-----|
| Remote state | Team collaboration |
| State locking | Prevent conflicts |
| Use modules | Reusability |
| Pin versions | Reproducibility |
| CI/CD integration | Automation |

## IaC Comparison

| Feature | Terraform | CloudFormation |
|---------|-----------|----------------|
| Cloud | Multi | AWS only |
| Language | HCL | JSON/YAML |
| State | External | AWS managed |
| Drift Detection | \`terraform plan\` | Drift detection |
      `,
        },
        keyPoints: [
            'IaC manages infrastructure through code, not clicks',
            'Terraform is multi-cloud, CloudFormation is AWS-only',
            'Workflow: init → plan → apply',
            'State tracks current infrastructure',
            'Remote state + locking for teams',
            'Modules for reusability',
        ],
        realWorldExamples: [],
        mcqs: [
            {
                id: 'iac-1',
                question: 'Terraform is different from CloudFormation because:',
                options: ['Its free', 'Works with multiple clouds', 'Only works with Azure', 'Requires no coding'],
                correctAnswer: 1,
                explanation: 'Terraform is multi-cloud (AWS, Azure, GCP, etc.). CloudFormation is AWS-only.',
                difficulty: 'easy',
                tags: ['iac', 'terraform'],
            },
        ],
        commonMistakes: [
            'Not using remote state for teams',
            'Forgetting state locking',
            'Hardcoding values instead of variables',
        ],
        comparisons: [],
        summary: 'IaC = infrastructure in code. Terraform is multi-cloud. Workflow: init→plan→apply. State tracks resources. Use remote state + locking for teams. Modules for reuse.',
        cheatsheet: ['terraform init = setup', 'terraform plan = preview', 'terraform apply = execute', 'State = tracked resources', 'Remote state for teams'],
        relatedTopics: ['devops-overview', 'cicd-basics', 'aws-core'],
    },
];

export default zoneBArchitectureTopics;
