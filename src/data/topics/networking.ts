import type { Topic } from '../../types';

export const networkingTopics: Topic[] = [
    {
        id: 'vpc-basics',
        title: 'VPC - Virtual Private Cloud',
        slug: 'vpc-basics',
        category: 'networking-basics',
        zone: 'A',
        icon: 'Network',
        description: 'Your own isolated virtual network in the cloud',
        estimatedTime: 15,
        content: {
            beginner: `
# VPC - Virtual Private Cloud

## What is VPC?

VPC is your **own isolated network** in the cloud. It's like having your own private data center, but virtual.

## Key Components

- **VPC**: Your virtual network (IP range)
- **Subnet**: Segment of your VPC (public/private)
- **Internet Gateway**: Connect VPC to internet
- **Route Table**: Traffic routing rules
- **Security Group**: Instance-level firewall
- **NACL**: Subnet-level firewall

## VPC Example

\`\`\`
VPC: 10.0.0.0/16
├── Public Subnet: 10.0.1.0/24
│   └── Web servers (with public IPs)
├── Private Subnet: 10.0.2.0/24
│   └── Application servers
└── Private Subnet: 10.0.3.0/24
    └── Databases
\`\`\`

## Public vs Private Subnet

| Type | Internet Access | Use For |
|------|-----------------|---------|
| Public | Direct (IGW) | Web servers, bastion |
| Private | Via NAT | App servers, databases |
      `,
            intermediate: `
# VPC - Technical Details

## CIDR Notation

\`\`\`
10.0.0.0/16 = 65,536 IP addresses
10.0.1.0/24 = 256 IP addresses
10.0.1.0/28 = 16 IP addresses
\`\`\`

## Route Tables

| Destination | Target |
|-------------|--------|
| 10.0.0.0/16 | local |
| 0.0.0.0/0 | igw-xxx (Internet Gateway) |

## Security Groups vs NACLs

| Aspect | Security Group | NACL |
|--------|---------------|------|
| Level | Instance | Subnet |
| Stateful | Yes | No |
| Rules | Allow only | Allow + Deny |
| Evaluation | All rules | Order matters |
| Default | Deny in, Allow out | Allow all |

## NAT Gateway

For private subnet internet access:

\`\`\`
Private Instance → NAT Gateway → Internet Gateway → Internet
      (Private)       (Public Subnet)
\`\`\`
      `,
            advanced: `
# VPC - Advanced Networking

## VPC Peering

\`\`\`
VPC A ←→ Peering Connection ←→ VPC B
\`\`\`

- Non-overlapping CIDRs required
- No transitive peering
- Cross-region supported

## Transit Gateway

\`\`\`
      VPC A
         ↘
VPC B ──→ Transit Gateway ──→ VPC C
         ↗
      VPC D
\`\`\`

- Hub-and-spoke model
- Transitive routing
- Scales to thousands of VPCs

## VPC Endpoints

| Type | For | Example |
|------|-----|---------|
| Gateway | S3, DynamoDB | Free |
| Interface | Most services | ENI-based |

## AWS Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| VPC | VNet | VPC |
| Subnet | Subnet | Subnet |
| Internet Gateway | Internet Gateway | Cloud NAT |
| NAT Gateway | NAT Gateway | Cloud NAT |
| Security Group | NSG | Firewall Rules |
| NACL | NSG (subnet) | - |
      `,
        },
        keyPoints: [
            'VPC is your isolated virtual network in the cloud',
            'Subnets divide VPC into public and private segments',
            'Internet Gateway enables internet access for public subnets',
            'NAT Gateway allows private subnets to access internet',
            'Security Groups are stateful, per-instance firewalls',
            'NACLs are stateless, per-subnet firewalls',
        ],
        realWorldExamples: [
            {
                title: 'Multi-tier Architecture',
                company: 'E-commerce Company',
                scenario: 'Secure web application with database',
                solution: 'Public subnet for web, private for app/DB',
                outcome: 'Database protected from direct internet access',
            },
        ],
        mcqs: [
            {
                id: 'vpc-1',
                question: 'Security Groups are:',
                options: ['Stateless', 'Stateful', 'Applied at subnet level', 'Can have deny rules'],
                correctAnswer: 1,
                explanation: 'Security Groups are stateful (return traffic automatically allowed). NACLs are stateless.',
                difficulty: 'medium',
                tags: ['networking', 'security'],
            },
            {
                id: 'vpc-2',
                question: 'NAT Gateway is used for:',
                options: ['Public subnet internet access', 'Private subnet internet access', 'VPC peering', 'DNS resolution'],
                correctAnswer: 1,
                explanation: 'NAT Gateway allows private subnet instances to access the internet without exposing their private IPs.',
                difficulty: 'easy',
                tags: ['networking', 'vpc'],
            },
        ],
        commonMistakes: [
            'Confusing Security Groups (stateful) with NACLs (stateless)',
            'Forgetting NAT Gateway for private subnet internet access',
            'Not understanding CIDR notation',
        ],
        comparisons: [],
        summary: 'VPC is your isolated cloud network. Subnets for segmentation. IGW for internet. NAT Gateway for private outbound. Security Groups (stateful) and NACLs (stateless) for security.',
        cheatsheet: ['VPC = Virtual network', 'Subnet = Segment', 'IGW = Internet access', 'NAT = Private outbound', 'SG = Stateful firewall'],
        relatedTopics: ['cloud-networking', 'aws-ec2', 'cloud-security-basics'],
    },
    {
        id: 'dns-basics',
        title: 'DNS in Cloud Computing',
        slug: 'dns-basics',
        category: 'networking-basics',
        zone: 'A',
        icon: 'Globe',
        description: 'Domain Name System fundamentals for cloud',
        estimatedTime: 10,
        content: {
            beginner: `
# DNS in Cloud Computing

## What is DNS?

DNS translates **domain names to IP addresses**. It's the phone book of the internet.

\`\`\`
google.com → 142.250.185.78
\`\`\`

## DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| A | Domain → IPv4 | example.com → 1.2.3.4 |
| AAAA | Domain → IPv6 | example.com → 2001:... |
| CNAME | Domain → Domain | www → example.com |
| MX | Mail servers | → mail.example.com |
| TXT | Text records | SPF, DKIM, verification |
| NS | Name servers | DNS authority |

## Cloud DNS Services

- **AWS Route 53**
- **Azure DNS**
- **Google Cloud DNS**
- **Cloudflare DNS**

## Key Concepts

- **Domain**: example.com
- **Subdomain**: blog.example.com
- **TTL**: Time to Live (caching duration)
- **Hosted Zone**: Container for DNS records
      `,
            intermediate: `
# DNS - Routing Policies

## Route 53 Routing Policies

| Policy | Description | Use Case |
|--------|-------------|----------|
| Simple | Single resource | Basic websites |
| Weighted | Split traffic % | A/B testing |
| Latency | Lowest latency | Global apps |
| Geolocation | By user location | Local content |
| Failover | Primary/standby | High availability |
| Multi-value | Multiple healthy | Simple load balancing |

## DNS Resolution Flow

\`\`\`
User → Recursive Resolver → Root NS → TLD NS → Authoritative NS
              ↑                                        ↓
              └──────── IP Address ←──────────────────┘
\`\`\`

## Health Checks

Route 53 can monitor endpoints:
- HTTP/HTTPS/TCP
- String matching
- CloudWatch alarm integration
- Automatic failover
      `,
            advanced: `
# DNS - Advanced Patterns

## DNS Security

- **DNSSEC**: Cryptographic signatures
- **DNS over HTTPS (DoH)**: Encrypted queries
- **DNS over TLS (DoT)**: Encrypted transport

## Private DNS

\`\`\`
VPC Private Hosted Zone:
internal.mycompany.com → 10.0.1.25
database.internal → 10.0.2.50
\`\`\`

- Resolves only within VPC
- Split-horizon DNS

## Hybrid DNS

\`\`\`
On-premises DNS ←→ Route 53 Resolver ←→ VPC DNS
\`\`\`

- Inbound endpoints: On-prem → AWS
- Outbound endpoints: AWS → On-prem

## AWS Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| Route 53 | Azure DNS | Cloud DNS |
| Route 53 Health Checks | Traffic Manager | Load Balancer Health |
      `,
        },
        keyPoints: [
            'DNS translates domain names to IP addresses',
            'A record maps domain to IPv4, CNAME maps domain to domain',
            'TTL controls how long DNS is cached',
            'Route 53 provides routing policies (weighted, latency, geo)',
            'Health checks enable automatic failover',
            'Private DNS for internal VPC resolution',
        ],
        realWorldExamples: [
            {
                title: 'Global Load Balancing',
                company: 'Streaming Service',
                scenario: 'Users worldwide need low latency',
                solution: 'Route 53 latency-based routing to regional endpoints',
                outcome: 'Users automatically routed to nearest server',
            },
        ],
        mcqs: [
            {
                id: 'dns-1',
                question: 'An A record maps:',
                options: ['Domain to domain', 'Domain to IPv4 address', 'Mail server', 'Name servers'],
                correctAnswer: 1,
                explanation: 'A records map domain names to IPv4 addresses. CNAME maps domain to another domain.',
                difficulty: 'easy',
                tags: ['networking', 'dns'],
            },
            {
                id: 'dns-2',
                question: 'TTL in DNS means:',
                options: ['Transport Layer Level', 'Time to Live', 'Total Transfer Length', 'Top-level Domain'],
                correctAnswer: 1,
                explanation: 'TTL (Time to Live) specifies how long a DNS record can be cached.',
                difficulty: 'easy',
                tags: ['dns'],
            },
        ],
        commonMistakes: [
            'Confusing A record with CNAME',
            'Setting TTL too low (more DNS queries) or too high (slow updates)',
            'Not understanding DNS propagation delay',
        ],
        comparisons: [],
        summary: 'DNS maps domains to IPs. A record for IPv4, CNAME for domain aliases. TTL controls caching. Cloud DNS services offer advanced routing policies and health checks.',
        cheatsheet: ['A = Domain → IPv4', 'CNAME = Domain → Domain', 'TTL = Cache duration', 'Route 53 = AWS DNS', 'Health checks for failover'],
        relatedTopics: ['vpc-basics', 'load-balancers', 'cdn-fundamentals'],
    },
    {
        id: 'load-balancers',
        title: 'Load Balancers',
        slug: 'load-balancers',
        category: 'networking-basics',
        zone: 'A',
        icon: 'Share2',
        description: 'Distribute traffic across multiple targets',
        estimatedTime: 12,
        content: {
            beginner: `
# Load Balancers

## What is a Load Balancer?

A load balancer **distributes incoming traffic** across multiple servers to ensure no single server is overwhelmed.

## Why Load Balancing?

✅ **High Availability**: If one server fails, others handle traffic
✅ **Scalability**: Add servers to handle more traffic
✅ **Performance**: Prevent any server from being overloaded
✅ **Health Checks**: Route only to healthy servers

## AWS Load Balancer Types

| Type | Layer | Use Case |
|------|-------|----------|
| ALB | Layer 7 (HTTP) | Web apps, APIs |
| NLB | Layer 4 (TCP) | High performance, gaming |
| GLB | Layer 3 | Third-party appliances |
| CLB | Layer 4/7 | Legacy (deprecated) |

## Load Balancing Flow

\`\`\`
Users → Load Balancer → Server 1
                    → Server 2
                    → Server 3
\`\`\`
      `,
            intermediate: `
# Load Balancers - Deep Dive

## ALB vs NLB

| Aspect | ALB | NLB |
|--------|-----|-----|
| Layer | 7 (HTTP/HTTPS) | 4 (TCP/UDP) |
| Latency | Milliseconds | Microseconds |
| Static IP | No (use Global Accelerator) | Yes |
| WebSockets | Yes | Yes |
| SSL Termination | Yes | Optional |
| Path routing | Yes | No |

## ALB Routing

\`\`\`
/api/* → API Target Group
/images/* → Static Target Group
Host: mobile.* → Mobile Target Group
\`\`\`

## Health Checks

| Setting | Description |
|---------|-------------|
| Protocol | HTTP, HTTPS, TCP |
| Path | /health, / |
| Interval | How often to check |
| Threshold | Failed checks before unhealthy |

## Target Types

- **Instance**: EC2 instances
- **IP**: Specific IP addresses
- **Lambda**: Serverless functions (ALB only)
      `,
            advanced: `
# Load Balancers - Advanced

## Cross-Zone Load Balancing

\`\`\`
Without: Traffic split by AZ, then by instance
With: Traffic evenly split across all instances
\`\`\`

## Sticky Sessions

- Route user to same server
- Cookie-based (ALB)
- Use case: Stateful applications

## Connection Draining

- Graceful shutdown
- In-flight requests complete
- No new requests to draining instance

## AWS Global Accelerator

\`\`\`
User → Anycast IP → AWS Edge → ALB/NLB → Application
\`\`\`

- Static IP addresses
- AWS global network
- 60% faster than internet

## Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| ALB | App Gateway | HTTP(S) LB |
| NLB | Azure LB | TCP/UDP LB |
| Global Accelerator | Front Door | Cloud CDN |
      `,
        },
        keyPoints: [
            'Load balancers distribute traffic across servers',
            'ALB for HTTP/HTTPS (Layer 7), NLB for TCP/UDP (Layer 4)',
            'Health checks route traffic only to healthy targets',
            'ALB supports path-based and host-based routing',
            'NLB provides static IPs and ultra-low latency',
            'Cross-zone balancing ensures even distribution',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Traffic Distribution',
                company: 'Netflix',
                scenario: 'Handle millions of streaming requests',
                solution: 'Multiple load balancers with health checks',
                outcome: '99.99% availability for streaming service',
            },
        ],
        mcqs: [
            {
                id: 'lb-1',
                question: 'ALB operates at which layer?',
                options: ['Layer 3', 'Layer 4', 'Layer 7', 'Layer 2'],
                correctAnswer: 2,
                explanation: 'ALB (Application Load Balancer) operates at Layer 7 (HTTP/HTTPS) and can route based on URL paths, headers, etc.',
                difficulty: 'easy',
                tags: ['networking', 'load-balancing'],
            },
            {
                id: 'lb-2',
                question: 'NLB provides:',
                options: ['Path-based routing', 'Static IP addresses', 'Cookie-based sessions', 'URL rewriting'],
                correctAnswer: 1,
                explanation: 'NLB provides static IP addresses and operates at Layer 4 for ultra-low latency.',
                difficulty: 'medium',
                tags: ['networking', 'aws'],
            },
        ],
        commonMistakes: [
            'Using ALB when NLB is needed for performance',
            'Not configuring proper health checks',
            'Forgetting sticky sessions for stateful apps',
        ],
        comparisons: [],
        summary: 'Load balancers distribute traffic for availability and scale. ALB for HTTP (Layer 7) with path routing. NLB for TCP (Layer 4) with static IPs. Health checks ensure traffic goes to healthy targets.',
        cheatsheet: ['ALB = HTTP/Layer 7', 'NLB = TCP/Layer 4 + Static IP', 'Health checks = Route to healthy', 'Sticky = Same server', 'Cross-zone = Even distribution'],
        relatedTopics: ['vpc-basics', 'dns-basics', 'auto-scaling'],
    },
];

export default networkingTopics;
