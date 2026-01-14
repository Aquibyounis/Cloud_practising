import type { Topic } from '../../types';

export const serviceModelsTopics: Topic[] = [
    {
        id: 'iaas',
        title: 'IaaS - Infrastructure as a Service',
        slug: 'iaas',
        category: 'service-models',
        zone: 'A',
        icon: 'Server',
        description: 'Core compute, storage, and networking resources on demand',
        estimatedTime: 15,
        content: {
            beginner: `
# IaaS - Infrastructure as a Service

## What is IaaS?

IaaS provides the fundamental building blocks of cloud computing:
- **Virtual Machines** (compute power)
- **Storage** (hard drives in the cloud)
- **Networking** (connections between resources)

Think of it like renting a **bare apartment**: You get the walls, plumbing, and electricity, but you need to bring your own furniture, appliances, and decoration.

## What You Get

✅ Virtual machines (like renting computers)
✅ Storage space
✅ Network infrastructure
✅ IP addresses

## What You Must Manage

🔧 Operating system (install and patch)
🔧 Middleware and runtime
🔧 Applications
🔧 Data

## Real-World Examples

- **AWS EC2** - Virtual servers
- **Azure Virtual Machines**
- **Google Compute Engine**
- **DigitalOcean Droplets**

## Best For

- Development and test environments
- Website hosting with full control
- High-performance computing
- Big data analysis
      `,
            intermediate: `
# IaaS - Technical Deep Dive

## IaaS Architecture

\`\`\`
┌─────────────────────────────────────┐
│     Your Responsibilities           │
├─────────────────────────────────────┤
│  Applications                       │
│  Data                               │
│  Runtime (Java, Python, Node.js)    │
│  Middleware (Web servers)           │
│  Operating System                   │
├─────────────────────────────────────┤
│     Provider Responsibilities       │
├─────────────────────────────────────┤
│  Virtualization (Hypervisor)        │
│  Servers (Physical hardware)        │
│  Storage (SAN, NAS)                 │
│  Networking (Switches, routers)     │
│  Data Center (Power, cooling)       │
└─────────────────────────────────────┘
\`\`\`

## Key IaaS Features

### Compute Options
| Type | Use Case | Example |
|------|----------|---------|
| General Purpose | Web servers, dev | t3.medium |
| Compute Optimized | Batch processing | c5.xlarge |
| Memory Optimized | Databases | r5.large |
| Storage Optimized | Data warehousing | i3.xlarge |
| GPU | ML training | p3.2xlarge |

### Storage Types
- **Block Storage**: Like a hard drive attached to VM (EBS)
- **Object Storage**: For files and media (S3)
- **File Storage**: Shared file systems (EFS)

### Networking
- Virtual Private Cloud (VPC)
- Load Balancers
- DNS management
- VPN connections

## IaaS Pricing Models

1. **On-Demand**: Pay by hour/second, no commitment
2. **Reserved**: Commit 1-3 years, save up to 72%
3. **Spot**: Use spare capacity, save up to 90%
      `,
            advanced: `
# IaaS - Advanced Concepts

## Virtualization Technology

### Type 1 Hypervisors (Bare Metal)
- Runs directly on hardware
- Used by cloud providers
- Examples: VMware ESXi, Xen, KVM, Hyper-V

\`\`\`
┌──────┬──────┬──────┐
│ VM 1 │ VM 2 │ VM 3 │
├──────┴──────┴──────┤
│     Hypervisor     │
├────────────────────┤
│   Physical Hardware│
└────────────────────┘
\`\`\`

### AWS Nitro System
- Custom hardware + software hypervisor
- Near bare-metal performance
- Enhanced security isolation

## Advanced Networking

### Software-Defined Networking (SDN)
- Network configuration via APIs
- Dynamic routing
- Micro-segmentation

### Network Virtualization
\`\`\`
Physical Network
├── Virtual Network 1 (Customer A)
│   ├── Subnet 1 (Web Tier)
│   ├── Subnet 2 (App Tier)
│   └── Subnet 3 (DB Tier)
└── Virtual Network 2 (Customer B)
    └── Completely isolated
\`\`\`

## IaaS Security Responsibilities

| Layer | Owner | Actions Required |
|-------|-------|------------------|
| Physical | Provider | N/A for customer |
| Hypervisor | Provider | N/A for customer |
| Guest OS | Customer | Patching, hardening |
| Network | Shared | Security groups, NACLs |
| Application | Customer | Secure coding |
| Data | Customer | Encryption, backup |

## Multi-Tenancy Considerations

- **Noisy Neighbor**: Other VMs on same host affecting performance
- **Dedicated Hosts**: Reserve physical server for compliance
- **Dedicated Instances**: Isolated at hardware level
      `,
        },
        keyPoints: [
            'IaaS provides virtualized computing resources over the internet',
            'Customer manages: OS, middleware, runtime, applications, data',
            'Provider manages: virtualization, servers, storage, networking',
            'Maximum flexibility and control among cloud service models',
            'Examples: AWS EC2, Azure VMs, Google Compute Engine',
            'Best for: dev/test, hosting, HPC, organizations needing full control',
        ],
        realWorldExamples: [
            {
                title: 'NASA JPL Mars Mission',
                company: 'NASA',
                scenario: 'Needed massive compute for Mars Curiosity rover image processing',
                solution: 'Used AWS EC2 instances that could scale for landing event',
                outcome: 'Processed and distributed millions of images within hours of landing',
            },
        ],
        mcqs: [
            {
                id: 'iaas-1',
                question: 'In IaaS, who is responsible for patching the operating system?',
                options: ['Cloud provider', 'Customer', 'Both equally', 'Neither'],
                correctAnswer: 1,
                explanation: 'In IaaS, the customer is responsible for everything from the OS up, including patching, security updates, and maintenance.',
                difficulty: 'easy',
                tags: ['iaas', 'responsibility'],
            },
            {
                id: 'iaas-2',
                question: 'Which is an example of IaaS?',
                options: ['Gmail', 'Salesforce', 'AWS EC2', 'Microsoft 365'],
                correctAnswer: 2,
                explanation: 'AWS EC2 provides virtual machines (infrastructure). Gmail, Salesforce, and Microsoft 365 are SaaS products.',
                difficulty: 'easy',
                tags: ['iaas', 'examples'],
            },
            {
                id: 'iaas-3',
                question: 'IaaS provides which of the following?',
                options: [
                    'Only storage',
                    'Complete applications',
                    'Virtualized compute, storage, and networking',
                    'Only databases'
                ],
                correctAnswer: 2,
                explanation: 'IaaS provides the core infrastructure: virtualized compute (VMs), storage, and networking resources.',
                difficulty: 'easy',
                tags: ['iaas', 'definition'],
            },
        ],
        commonMistakes: [
            'Thinking the cloud provider patches your VM operating system',
            'Confusing IaaS with PaaS - IaaS gives you VMs, PaaS gives you platforms',
            'Assuming IaaS is always cheapest (it requires more management overhead)',
            'Not understanding that networking configuration is still your responsibility',
        ],
        comparisons: [
            {
                title: 'IaaS Provider Comparison',
                headers: ['Feature', 'AWS EC2', 'Azure VM', 'GCP Compute'],
                rows: [
                    ['Instance Types', '400+', '700+', '30+'],
                    ['Regions', '30+', '60+', '35+'],
                    ['Spot Pricing', 'Up to 90% off', 'Up to 90% off', 'Up to 91% off'],
                    ['GPU Support', 'Yes', 'Yes', 'Yes'],
                ],
            },
        ],
        summary: 'IaaS provides virtualized compute, storage, and networking. Customer manages OS and above, provider manages hardware and virtualization. Most flexible but most responsibility. Examples: EC2, Azure VMs.',
        cheatsheet: [
            'IaaS = Virtual machines + Storage + Network',
            'You manage: OS, apps, data',
            'Provider manages: hardware, virtualization',
            'Examples: EC2, Azure VM, GCE',
            'Most control, most responsibility',
        ],
        relatedTopics: ['paas', 'saas', 'shared-responsibility', 'virtual-machines'],
    },
    {
        id: 'paas',
        title: 'PaaS - Platform as a Service',
        slug: 'paas',
        category: 'service-models',
        zone: 'A',
        icon: 'Layers',
        description: 'Ready-to-use platform for developing and deploying applications',
        estimatedTime: 12,
        content: {
            beginner: `
# PaaS - Platform as a Service

## What is PaaS?

PaaS provides a ready-to-use platform for developing, running, and managing applications without worrying about infrastructure.

Think of it like a **fully furnished apartment**: You just bring your clothes and move in. The furniture, appliances, and utilities are already set up.

## What You Get

✅ Runtime environment (Java, Python, Node.js ready)
✅ Development tools
✅ Database management
✅ Automatic scaling
✅ Load balancing

## What You Focus On

💻 Your application code
📊 Your data

## Real-World Examples

- **AWS Elastic Beanstalk** - Deploy web apps
- **Google App Engine** - Run applications
- **Heroku** - Developer-friendly platform
- **Azure App Service** - Web and API hosting
- **Vercel** - Frontend deployment

## Best For

- Rapid application development
- Teams without infrastructure expertise
- Startups wanting to focus on product
- API development
      `,
            intermediate: `
# PaaS - Technical Overview

## PaaS Architecture

\`\`\`
┌─────────────────────────────────────┐
│     Your Responsibilities           │
├─────────────────────────────────────┤
│  Applications                       │
│  Data                               │
├─────────────────────────────────────┤
│     Provider Responsibilities       │
├─────────────────────────────────────┤
│  Runtime (Node.js, Python, Java)    │
│  Middleware (Web servers)           │
│  Operating System                   │
│  Virtualization                     │
│  Servers, Storage, Networking       │
└─────────────────────────────────────┘
\`\`\`

## PaaS Features

### Development Tools
- Integrated debugging
- Version control integration
- CI/CD pipelines
- Testing frameworks

### Managed Services
| Service | Traditional | PaaS |
|---------|------------|------|
| Database setup | Days | Minutes |
| Scaling | Manual | Automatic |
| Patching | Your job | Provider |
| Monitoring | Set up yourself | Built-in |

### Deployment Models

1. **Container-based**: Deploy Docker containers
2. **Buildpack-based**: Just push code, platform detects runtime
3. **Function-based**: Deploy individual functions (overlaps with FaaS)

## PaaS Workflow

\`\`\`
Developer writes code
        ↓
Git push to PaaS
        ↓
Platform detects language/framework
        ↓
Builds and packages application
        ↓
Deploys to managed infrastructure
        ↓
Auto-scaling handles traffic
\`\`\`
      `,
            advanced: `
# PaaS - Advanced Considerations

## PaaS Categories

### 1. General Purpose PaaS
- Heroku, Elastic Beanstalk
- Run any web application

### 2. Database PaaS (DBaaS)
- AWS RDS, Azure SQL Database
- Managed database services

### 3. Integration PaaS (iPaaS)
- MuleSoft, Dell Boomi
- Connect different systems

### 4. Mobile Backend PaaS (MBaaS)
- Firebase, AWS Amplify
- Backend for mobile apps

## PaaS Trade-offs

### Advantages
- Faster development
- No infrastructure management
- Built-in best practices
- Automatic scaling

### Disadvantages
| Concern | Description |
|---------|-------------|
| Vendor lock-in | Dependencies on platform-specific features |
| Limited customization | Can't optimize at OS level |
| Pricing complexity | Can become expensive at scale |
| Outage impact | Platform issues affect all users |

## Migration Considerations

### IaaS → PaaS Migration
\`\`\`
Step 1: Assess application dependencies
Step 2: Identify platform-specific features needed
Step 3: Refactor for 12-factor app principles
Step 4: Set up CI/CD pipeline
Step 5: Migrate database
Step 6: Deploy and test
Step 7: Cut over traffic
\`\`\`

### 12-Factor App Principles (PaaS Best Practices)
1. Codebase in version control
2. Explicitly declare dependencies
3. Store config in environment
4. Treat backing services as resources
5. Separate build and run stages
...
      `,
        },
        keyPoints: [
            'PaaS provides development platform with runtime, middleware, OS managed',
            'Customer manages: applications and data only',
            'Provider manages: everything else including OS patching',
            'Focus on code, not infrastructure',
            'Examples: Heroku, Elastic Beanstalk, App Engine, Azure App Service',
            'Best for: rapid development, startups, teams without DevOps',
        ],
        realWorldExamples: [
            {
                title: 'Twitter Early Days',
                company: 'Twitter',
                scenario: 'Startup needed to scale quickly without infrastructure team',
                solution: 'Originally built on Heroku PaaS for rapid iteration',
                outcome: 'Could focus on product features instead of server management',
            },
        ],
        mcqs: [
            {
                id: 'paas-1',
                question: 'In PaaS, who manages the operating system?',
                options: ['Customer', 'Cloud provider', 'Both', 'Third-party vendor'],
                correctAnswer: 1,
                explanation: 'In PaaS, the cloud provider manages the OS, runtime, and middleware. Customer only manages applications and data.',
                difficulty: 'easy',
                tags: ['paas', 'responsibility'],
            },
            {
                id: 'paas-2',
                question: 'Which is an example of PaaS?',
                options: ['AWS EC2', 'Heroku', 'Microsoft 365', 'Dropbox'],
                correctAnswer: 1,
                explanation: 'Heroku is a PaaS that provides a platform for deploying applications. EC2 is IaaS, M365 and Dropbox are SaaS.',
                difficulty: 'easy',
                tags: ['paas', 'examples'],
            },
            {
                id: 'paas-3',
                question: 'What is a main advantage of PaaS over IaaS?',
                options: [
                    'More control over hardware',
                    'Faster application development',
                    'Lower cost always',
                    'Better performance always',
                ],
                correctAnswer: 1,
                explanation: 'PaaS enables faster development by handling infrastructure concerns, letting developers focus on code.',
                difficulty: 'medium',
                tags: ['paas', 'benefits'],
            },
        ],
        commonMistakes: [
            'Thinking PaaS gives you access to configure the OS',
            'Assuming PaaS is always cheaper than IaaS',
            'Not considering vendor lock-in implications',
            'Expecting unlimited customization options',
        ],
        comparisons: [
            {
                title: 'IaaS vs PaaS',
                headers: ['Aspect', 'IaaS', 'PaaS'],
                rows: [
                    ['OS Management', 'Customer', 'Provider'],
                    ['Flexibility', 'High', 'Medium'],
                    ['Development Speed', 'Slower', 'Faster'],
                    ['Learning Curve', 'Steeper', 'Gentler'],
                    ['Control', 'Maximum', 'Limited'],
                ],
            },
        ],
        summary: 'PaaS provides a managed platform for application development. Provider manages OS, runtime, middleware. Customer focuses only on code and data. Enables rapid development but with some vendor lock-in risk.',
        cheatsheet: [
            'PaaS = Platform ready for your code',
            'You manage: Application + Data only',
            'Provider manages: OS, runtime, middleware',
            'Examples: Heroku, Elastic Beanstalk',
            'Trade-off: Speed vs Control',
        ],
        relatedTopics: ['iaas', 'saas', 'faas', 'cicd-basics'],
    },
    {
        id: 'saas',
        title: 'SaaS - Software as a Service',
        slug: 'saas',
        category: 'service-models',
        zone: 'A',
        icon: 'AppWindow',
        description: 'Complete software applications delivered over the internet',
        estimatedTime: 10,
        content: {
            beginner: `
# SaaS - Software as a Service

## What is SaaS?

SaaS delivers complete, ready-to-use software applications over the internet. You just open a browser and start using the software.

Think of it like **staying at a hotel**: Everything is provided - bed, furniture, housekeeping. You just show up and enjoy.

## What You Get

✅ Complete application ready to use
✅ Accessible from any device with internet
✅ Automatic updates
✅ No installation needed

## What You Manage

📝 Your data and content
👥 User accounts and access

## Real-World Examples

### Productivity
- **Google Workspace** (Gmail, Docs, Sheets)
- **Microsoft 365** (Word, Excel, Outlook)
- **Notion** (Notes and collaboration)

### Business
- **Salesforce** (CRM)
- **Slack** (Communication)
- **Zoom** (Video conferencing)

### Personal
- **Netflix** (Streaming)
- **Spotify** (Music)
- **Dropbox** (Storage)

## Best For

- End users (non-technical)
- Ready-to-use solutions
- Subscription-based software needs
- Collaborative tools
      `,
            intermediate: `
# SaaS - Business Perspective

## SaaS Architecture

\`\`\`
┌─────────────────────────────────────┐
│     Your Responsibilities           │
├─────────────────────────────────────┤
│  Data (what you create/store)       │
│  User access management             │
├─────────────────────────────────────┤
│     Provider Responsibilities       │
├─────────────────────────────────────┤
│  Application                        │
│  Runtime                            │
│  Middleware                         │
│  Operating System                   │
│  Virtualization                     │
│  Servers, Storage, Networking       │
└─────────────────────────────────────┘
\`\`\`

## SaaS Characteristics

### Multi-Tenancy
- Single application serves all customers
- Each customer's data is isolated
- Updates apply to everyone simultaneously

### Subscription Pricing

| Model | Description | Example |
|-------|-------------|---------|
| Per User | Price per seat | $10/user/month |
| Tiered | Feature-based tiers | Free, Pro, Enterprise |
| Usage-based | Pay for what you use | API calls, storage |
| Freemium | Free tier + paid upgrades | Spotify, Dropbox |

## SaaS Benefits

### For Users
- No installation or updates
- Access from anywhere
- Lower upfront cost
- Automatic backups

### For Organizations
- Reduced IT overhead
- Predictable costs
- Easy scaling (add users)
- Always current version

## SaaS Considerations

| Consideration | Impact |
|--------------|--------|
| Data location | May affect compliance |
| Internet dependency | Requires connectivity |
| Customization limits | Take it or leave it |
| Vendor lock-in | Data export challenges |
      `,
            advanced: `
# SaaS - Enterprise Considerations

## SaaS Security Model

### Provider Responsibilities
- Application security
- Infrastructure security
- Patching and updates
- Availability

### Customer Responsibilities
- User access control
- Data governance
- Compliance with regulations
- Integration security

## Enterprise SaaS Architecture

\`\`\`
┌─────────────────────────────────────┐
│          Load Balancer              │
├─────────────────────────────────────┤
│       Application Servers           │
│   (Stateless, horizontally scaled)  │
├─────────────────────────────────────┤
│         Data Layer                  │
│   ┌──────────┬──────────┐          │
│   │ Customer │ Customer │ ...      │
│   │    A     │    B     │          │
│   │   Data   │   Data   │          │
│   └──────────┴──────────┘          │
│      (Logically isolated)           │
└─────────────────────────────────────┘
\`\`\`

## SaaS Integration Patterns

### APIs and Webhooks
- REST/GraphQL APIs for data access
- Webhooks for real-time events
- OAuth for authentication

### Integration Platforms
- Zapier, Workato, MuleSoft
- Connect different SaaS applications
- Automate workflows

## Enterprise SaaS Selection Criteria

| Criteria | Questions |
|----------|-----------|
| Security | SOC 2 certified? Encryption? |
| Compliance | GDPR, HIPAA ready? |
| SLA | Uptime guarantee? |
| Data portability | Export options? |
| Integration | API availability? |
| Support | 24/7? Response times? |

## SaaS Governance

### Shadow IT Risk
- Employees using unauthorized SaaS
- Data scattered across services
- Security and compliance gaps

### SaaS Management Platforms
- Discover all SaaS usage
- Manage licenses and costs
- Enforce security policies
      `,
        },
        keyPoints: [
            'SaaS delivers complete applications over the internet',
            'Customer manages: data and user access only',
            'Provider manages: entire application stack',
            'Subscription-based pricing model',
            'Examples: Gmail, Salesforce, Microsoft 365, Slack, Zoom',
            'Best for: end users, ready-to-use solutions, minimal IT involvement',
        ],
        realWorldExamples: [
            {
                title: 'Salesforce CRM',
                company: 'Salesforce',
                scenario: 'Companies needed CRM without building/hosting software',
                solution: 'Salesforce provides complete CRM as a web service',
                outcome: 'Companies focus on selling, not software maintenance',
            },
        ],
        mcqs: [
            {
                id: 'saas-1',
                question: 'In SaaS, what does the customer primarily manage?',
                options: ['Operating system', 'Application code', 'User access and data', 'Network configuration'],
                correctAnswer: 2,
                explanation: 'In SaaS, customers only manage their data and user access. The provider handles everything else.',
                difficulty: 'easy',
                tags: ['saas', 'responsibility'],
            },
            {
                id: 'saas-2',
                question: 'Which is an example of SaaS?',
                options: ['AWS EC2', 'Heroku', 'Microsoft 365', 'Docker'],
                correctAnswer: 2,
                explanation: 'Microsoft 365 is SaaS - complete office applications delivered online. EC2 is IaaS, Heroku is PaaS.',
                difficulty: 'easy',
                tags: ['saas', 'examples'],
            },
            {
                id: 'saas-3',
                question: 'What is a potential drawback of SaaS?',
                options: [
                    'Too much control over infrastructure',
                    'Limited customization options',
                    'Need to manage OS updates',
                    'Complex installation process',
                ],
                correctAnswer: 1,
                explanation: 'SaaS offers limited customization - you use the application as provided. This is a trade-off for convenience.',
                difficulty: 'medium',
                tags: ['saas', 'limitations'],
            },
        ],
        commonMistakes: [
            'Thinking you can customize the underlying infrastructure in SaaS',
            'Assuming all data can be easily exported from any SaaS',
            'Overlooking compliance implications of data stored in SaaS',
            'Not considering internet dependency for SaaS applications',
        ],
        comparisons: [
            {
                title: 'IaaS vs PaaS vs SaaS',
                headers: ['Aspect', 'IaaS', 'PaaS', 'SaaS'],
                rows: [
                    ['User manages', 'OS+Apps+Data', 'Apps+Data', 'Data only'],
                    ['Control level', 'High', 'Medium', 'Low'],
                    ['Examples', 'EC2, VMs', 'Heroku, App Engine', 'Gmail, Salesforce'],
                    ['Target user', 'IT admins', 'Developers', 'End users'],
                ],
            },
        ],
        summary: 'SaaS delivers complete applications over the internet on a subscription basis. Provider manages everything. Customer manages only data and users. Easiest to use but least customizable.',
        cheatsheet: [
            'SaaS = Complete app, just use it',
            'You manage: Data + Users only',
            'Provider manages: Everything else',
            'Examples: Gmail, Salesforce, M365',
            'Subscription model, no installation',
        ],
        relatedTopics: ['iaas', 'paas', 'shared-responsibility'],
    },
    {
        id: 'faas',
        title: 'FaaS - Function as a Service',
        slug: 'faas',
        category: 'service-models',
        zone: 'A',
        icon: 'Zap',
        description: 'Serverless computing model for running individual functions',
        estimatedTime: 12,
        content: {
            beginner: `
# FaaS - Function as a Service

## What is FaaS?

FaaS lets you run individual functions (small pieces of code) without managing any servers. Also called "serverless computing."

Think of it like a **vending machine**: You put in a request, get your result, and pay only for that transaction. No need to own the machine.

## How It Works

1. You write a function (small piece of code)
2. Upload it to the cloud
3. Define what triggers it (HTTP request, file upload, etc.)
4. Function runs only when triggered
5. You pay only for the execution time

## What You Manage

✅ Your function code
✅ Function configuration

## What Provider Manages

🔧 Everything else! Servers, scaling, patching...

## Real-World Examples

- **AWS Lambda** - Most popular FaaS
- **Azure Functions**
- **Google Cloud Functions**
- **Cloudflare Workers**

## Use Cases

- Image processing when files are uploaded
- API backends
- Scheduled tasks (like cron jobs)
- Event processing
- Chatbots
      `,
            intermediate: `
# FaaS - How Serverless Works

## FaaS Architecture

\`\`\`
Event Source (Trigger)
        ↓
    API Gateway / Event Bus
        ↓
    Function Invocation
        ↓ (spin up if needed)
    Function Container
        ↓
    Execute Code
        ↓
    Return Response
        ↓
    (Container may be kept warm or terminated)
\`\`\`

## Trigger Types

| Trigger | Description | Use Case |
|---------|-------------|----------|
| HTTP | API Gateway request | REST APIs |
| Schedule | Cron expression | Cleanup jobs |
| Storage | File uploaded | Image processing |
| Queue | Message in queue | Async processing |
| Database | Record changed | Audit logging |
| Stream | Real-time data | Analytics |

## FaaS Pricing Model

You pay for:
1. **Number of requests**
2. **Duration** (per 100ms typically)
3. **Memory allocated**

**Example AWS Lambda Pricing:**
\`\`\`
1 million requests: $0.20
400,000 GB-seconds: $0.0000166667/GB-second

Free tier: 1M requests + 400,000 GB-seconds/month
\`\`\`

## Cold Starts

When a function hasn't run recently:

\`\`\`
Request arrives
    ↓
No warm container
    ↓
Start new container (100ms - 3s)  ← Cold Start Delay
    ↓
Load function code
    ↓
Execute
\`\`\`

### Mitigation Strategies
- Keep functions warm with scheduled pings
- Use provisioned concurrency
- Optimize function size
- Use faster runtimes (Go, Rust)
      `,
            advanced: `
# FaaS - Advanced Patterns

## Serverless Architecture Patterns

### 1. Simple Function
\`\`\`
HTTP Request → Lambda → Response
\`\`\`

### 2. Function + Database
\`\`\`
HTTP → API Gateway → Lambda → DynamoDB
                          ↓
                      Response
\`\`\`

### 3. Event-Driven Processing
\`\`\`
S3 Upload → Lambda → Process Image → Store Result
    ↓
SNS Notification
\`\`\`

### 4. Choreography Pattern
\`\`\`
Order Created
    ↓
Lambda: Validate → Event
    ↓
Lambda: Charge Payment → Event
    ↓
Lambda: Ship Order → Event
    ↓
Lambda: Send Notification
\`\`\`

## FaaS Limitations

| Limitation | Maximum | Workaround |
|------------|---------|------------|
| Execution time | 15 min (Lambda) | Use Step Functions |
| Memory | 10 GB | Use containers |
| Deployment size | 250 MB | Use container images |
| Concurrent executions | 1000 default | Request increase |
| Stateless | No persistent storage | Use external storage |

## Comparison: FaaS vs Containers vs VMs

| Aspect | VM | Container | FaaS |
|--------|-------|-----------|------|
| Startup | Minutes | Seconds | Milliseconds |
| Scaling | Manual | Semi-auto | Automatic |
| Billing | Always on | Usually on | Per invocation |
| Stateful | Yes | Yes | No |
| Long-running | Yes | Yes | Limited |

## When NOT to Use FaaS

- Long-running processes (>15 min)
- Applications needing local state
- High-memory workloads
- Consistent low-latency requirements
- WebSocket connections (long-lived)
      `,
        },
        keyPoints: [
            'FaaS runs individual functions without server management (serverless)',
            'Pay only for actual execution time',
            'Automatically scales from zero to thousands of instances',
            'Cold starts can add latency',
            'Examples: AWS Lambda, Azure Functions, Google Cloud Functions',
            'Best for: event-driven, API backends, scheduled tasks',
        ],
        realWorldExamples: [
            {
                title: 'Coca-Cola Vending Machines',
                company: 'Coca-Cola',
                scenario: 'Needed backend for smart vending machines',
                solution: 'AWS Lambda processes transactions from 300,000+ machines',
                outcome: '50% cost reduction, handles 25 million transactions/month',
            },
        ],
        mcqs: [
            {
                id: 'faas-1',
                question: 'What is another term for FaaS?',
                options: ['Containerless', 'Serverless', 'Hostless', 'Cloudless'],
                correctAnswer: 1,
                explanation: 'FaaS is commonly called "serverless computing" because users don\'t manage any servers.',
                difficulty: 'easy',
                tags: ['faas', 'terminology'],
            },
            {
                id: 'faas-2',
                question: 'Which is an example of FaaS?',
                options: ['EC2', 'S3', 'Lambda', 'RDS'],
                correctAnswer: 2,
                explanation: 'AWS Lambda is a FaaS service. EC2 is IaaS, S3 is storage, RDS is database.',
                difficulty: 'easy',
                tags: ['faas', 'examples'],
            },
            {
                id: 'faas-3',
                question: 'What is a "cold start" in FaaS?',
                options: [
                    'When the data center is too cold',
                    'Delay when spinning up a new function container',
                    'When the function fails',
                    'When you first deploy a function',
                ],
                correctAnswer: 1,
                explanation: 'Cold start is the latency when a function container needs to be started fresh, typically 100ms to 3 seconds.',
                difficulty: 'medium',
                tags: ['faas', 'cold-start'],
            },
        ],
        commonMistakes: [
            'Thinking "serverless" means no servers exist (servers are just managed by provider)',
            'Ignoring cold start impact on latency-sensitive applications',
            'Not considering function timeout limits for long processes',
            'Assuming FaaS is always cheaper (can be expensive at high scale)',
        ],
        comparisons: [
            {
                title: 'Service Models Hierarchy',
                headers: ['Service', 'Control', 'Management'],
                rows: [
                    ['IaaS', 'High', 'High effort'],
                    ['PaaS', 'Medium', 'Medium effort'],
                    ['SaaS', 'Low', 'Low effort'],
                    ['FaaS', 'Lowest', 'Lowest effort'],
                ],
            },
        ],
        summary: 'FaaS (serverless) runs individual functions without server management. Pay only for execution time. Auto-scales from zero. Cold starts can add latency. Best for event-driven workloads and APIs.',
        cheatsheet: [
            'FaaS = Serverless = Run functions only',
            'Pay per invocation + duration',
            'Auto-scale from 0 to ∞',
            'Cold starts = startup delay',
            'Examples: Lambda, Azure Functions',
            'Limit: Usually 15 min max',
        ],
        relatedTopics: ['paas', 'aws-lambda', 'event-driven-systems'],
    },
];

export default serviceModelsTopics;
