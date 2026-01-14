import type { Topic } from '../../types';

export const deploymentModelsTopics: Topic[] = [
    {
        id: 'public-cloud',
        title: 'Public Cloud',
        slug: 'public-cloud',
        category: 'deployment-models',
        zone: 'A',
        icon: 'Globe',
        description: 'Cloud infrastructure shared across multiple organizations',
        estimatedTime: 10,
        content: {
            beginner: `
# Public Cloud

## What is Public Cloud?

Public cloud is cloud infrastructure that is **owned and operated by third-party providers** and shared across multiple organizations (tenants) over the public internet.

Think of it like a **public bus system**: Anyone can use it, you pay per ride, and the bus company handles all maintenance.

## Key Characteristics

✅ **Multi-tenant**: Resources shared among many customers
✅ **Pay-as-you-go**: Only pay for what you use
✅ **No maintenance**: Provider handles everything
✅ **Instant access**: Self-service provisioning
✅ **Global reach**: Data centers worldwide

## Major Public Cloud Providers

| Provider | Market Share | Key Strengths |
|----------|-------------|---------------|
| AWS | ~32% | Most services, largest ecosystem |
| Azure | ~23% | Enterprise integration, hybrid |
| Google Cloud | ~10% | AI/ML, Kubernetes, data analytics |
| Alibaba Cloud | ~5% | Asia-Pacific, e-commerce |

## Best For

- Startups with unpredictable workloads
- Companies wanting to avoid CapEx
- Applications needing global reach
- Development and testing environments
      `,
            intermediate: `
# Public Cloud - Technical Details

## Architecture

\`\`\`
Internet
    ↓
┌─────────────────────────────────┐
│       Public Cloud Provider     │
├─────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐      │
│  │Tenant A │  │Tenant B │ ...  │
│  │ VMs     │  │ VMs     │      │
│  │ Storage │  │ Storage │      │
│  └─────────┘  └─────────┘      │
├─────────────────────────────────┤
│     Shared Physical Infrastructure│
│      (Hypervisor, Network, etc.) │
└─────────────────────────────────┘
\`\`\`

## Isolation in Multi-Tenancy

| Layer | Isolation Method |
|-------|-----------------|
| Network | VPC, Security Groups, NACLs |
| Compute | Hypervisor isolation |
| Storage | Encryption, access controls |
| Identity | IAM, separate accounts |

## Public Cloud Services Categories

1. **Compute**: VMs, Containers, Serverless
2. **Storage**: Object, Block, File
3. **Database**: SQL, NoSQL, Cache
4. **Networking**: VPC, CDN, DNS
5. **AI/ML**: Training, inference
6. **Analytics**: Data warehousing, streaming

## Pricing Considerations

- **On-Demand**: Highest flexibility, highest cost
- **Reserved**: 1-3 year commitment, up to 72% savings
- **Spot**: Spare capacity, up to 90% savings, can be interrupted
- **Data Transfer**: Egress often has costs
      `,
            advanced: `
# Public Cloud - Enterprise Considerations

## Security in Public Cloud

### Provider Responsibilities
- Physical security
- Infrastructure security
- Hypervisor security
- Compliance certifications

### Your Responsibilities
- Data encryption
- Access management
- Application security
- Compliance configuration

## Compliance and Certifications

| Certification | Description |
|--------------|-------------|
| SOC 2 | Security, availability, confidentiality |
| ISO 27001 | Information security management |
| PCI DSS | Payment card data |
| HIPAA | Healthcare data (US) |
| GDPR | EU data protection |

## Multi-Region Architecture

\`\`\`
┌─────────────────────────────────────────┐
│            Global Load Balancer          │
├──────────────┬──────────────┬───────────┤
│   US-East    │   EU-West    │  AP-South │
│   Region     │   Region     │   Region  │
├──────────────┼──────────────┼───────────┤
│ AZ1  AZ2 AZ3 │ AZ1  AZ2 AZ3 │ AZ1  AZ2  │
└──────────────┴──────────────┴───────────┘
\`\`\`

## Vendor Lock-in Concerns

- Proprietary services create dependencies
- Data egress costs discourage migration
- Mitigation: Use containerization, Kubernetes, multi-cloud strategies
      `,
        },
        keyPoints: [
            'Public cloud is shared infrastructure operated by third-party providers',
            'Multi-tenant model with logical isolation between customers',
            'Pay-as-you-go pricing eliminates upfront costs',
            'Major providers: AWS, Azure, Google Cloud',
            'Best for startups and variable workloads',
            'Shared responsibility model applies',
        ],
        realWorldExamples: [
            {
                title: 'Spotify on Google Cloud',
                company: 'Spotify',
                scenario: 'Music streaming to 500M+ users globally',
                solution: 'Migrated from own data centers to Google Cloud',
                outcome: 'Faster feature deployment, reduced operational burden',
            },
        ],
        mcqs: [
            {
                id: 'public-cloud-1',
                question: 'Which is a characteristic of public cloud?',
                options: ['Single-tenant infrastructure', 'Customer owns the hardware', 'Multi-tenant with shared resources', 'Requires on-premises data center'],
                correctAnswer: 2,
                explanation: 'Public cloud is multi-tenant, meaning resources are shared across multiple customers with logical isolation.',
                difficulty: 'easy',
                tags: ['deployment-models', 'public-cloud'],
            },
            {
                id: 'public-cloud-2',
                question: 'Which is NOT a major public cloud provider?',
                options: ['AWS', 'Azure', 'VMware vSphere', 'Google Cloud'],
                correctAnswer: 2,
                explanation: 'VMware vSphere is virtualization software for private clouds. AWS, Azure, and Google Cloud are public cloud providers.',
                difficulty: 'easy',
                tags: ['deployment-models', 'providers'],
            },
        ],
        commonMistakes: [
            'Assuming public cloud is less secure than private (when configured properly, it can be equally secure)',
            'Ignoring data egress costs in TCO calculations',
            'Underestimating vendor lock-in implications',
        ],
        comparisons: [],
        summary: 'Public cloud is third-party operated, multi-tenant infrastructure shared over the internet. Features pay-as-you-go, global reach, and managed services. Major providers: AWS, Azure, GCP.',
        cheatsheet: ['Public = Shared + Multi-tenant', 'Providers: AWS, Azure, GCP', 'Pay-as-you-go model', 'Best for: Startups, variable loads'],
        relatedTopics: ['private-cloud', 'hybrid-cloud', 'shared-responsibility'],
    },
    {
        id: 'private-cloud',
        title: 'Private Cloud',
        slug: 'private-cloud',
        category: 'deployment-models',
        zone: 'A',
        icon: 'Lock',
        description: 'Dedicated cloud infrastructure for a single organization',
        estimatedTime: 10,
        content: {
            beginner: `
# Private Cloud

## What is Private Cloud?

Private cloud is cloud infrastructure that is **dedicated to a single organization**. It can be hosted on-premises or by a third party.

Think of it like owning your **own private bus**: Only your company uses it, you control the routes, but you pay for all maintenance.

## Key Characteristics

✅ **Single-tenant**: Dedicated to one organization
✅ **Full control**: Complete customization
✅ **Enhanced security**: Physical isolation possible
✅ **Compliance**: Easier to meet regulatory requirements
✅ **Higher cost**: Significant CapEx investment

## Types of Private Cloud

1. **On-Premises Private Cloud**: In your own data center
2. **Hosted Private Cloud**: Dedicated infrastructure at provider
3. **Virtual Private Cloud (VPC)**: Isolated section within public cloud

## Best For

- Highly regulated industries (healthcare, finance, government)
- Organizations with strict compliance requirements
- Workloads with consistent, predictable demand
- Companies with existing data center investments
      `,
            intermediate: `
# Private Cloud - Implementation

## Private Cloud Technologies

| Technology | Type | Description |
|------------|------|-------------|
| VMware vSphere | Virtualization | Enterprise virtual infrastructure |
| OpenStack | Open Source | Cloud management platform |
| Microsoft Azure Stack | Hybrid | Azure in your data center |
| Nutanix | HCI | Hyperconverged infrastructure |

## Architecture Components

\`\`\`
┌─────────────────────────────────────────┐
│          Your Organization               │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │      Cloud Management Layer     │    │
│  │   (OpenStack, VMware, etc.)     │    │
│  ├─────────────────────────────────┤    │
│  │      Virtual Resources          │    │
│  │   VMs, Containers, Storage      │    │
│  ├─────────────────────────────────┤    │
│  │      Physical Infrastructure    │    │
│  │   Servers, Storage, Network     │    │
│  └─────────────────────────────────┘    │
│                                          │
│      Firewall/Security Boundary          │
└─────────────────────────────────────────┘
\`\`\`

## Cost Comparison

| Factor | Private Cloud | Public Cloud |
|--------|--------------|--------------|
| Initial Cost | Very High (CapEx) | Low (OpEx) |
| Ongoing Cost | Predictable | Variable |
| Scaling Speed | Slow | Fast |
| Control | Maximum | Limited |
| Expertise Needed | High | Low |
      `,
            advanced: `
# Private Cloud - Enterprise Deployment

## Building Private Cloud

### Infrastructure Requirements
1. Compute: Enterprise servers with virtualization
2. Storage: SAN/NAS with high IOPS
3. Network: 10/25/100 Gbps fabric
4. Management: Cloud orchestration platform

### Software Stack Options

| Component | Options |
|-----------|---------|
| Hypervisor | VMware ESXi, KVM, Hyper-V |
| Orchestration | OpenStack, VMware vCenter |
| Containers | Kubernetes, OpenShift |
| Automation | Terraform, Ansible |

## When Private Cloud Makes Sense

1. **Regulatory Requirements**: HIPAA, PCI-DSS, government
2. **Data Sovereignty**: Data must stay in specific location
3. **Predictable Workloads**: Known capacity requirements
4. **Existing Investment**: Leverage current data centers
5. **Latency Sensitive**: Ultra-low latency requirements

## Hybrid Integration

Modern private clouds often connect to public clouds:
- Cloud bursting for peak demand
- Disaster recovery to public cloud
- Development in public, production in private
      `,
        },
        keyPoints: [
            'Private cloud is dedicated to a single organization',
            'Can be on-premises or hosted by third party',
            'Provides maximum control and customization',
            'Higher cost but better for compliance',
            'Technologies: VMware, OpenStack, Azure Stack',
            'Best for regulated industries and consistent workloads',
        ],
        realWorldExamples: [
            {
                title: 'Bank Private Cloud',
                company: 'Major Banks',
                scenario: 'Financial regulations require data control',
                solution: 'Private cloud for core banking, public for non-sensitive',
                outcome: 'Compliance maintained while gaining cloud benefits',
            },
        ],
        mcqs: [
            {
                id: 'private-cloud-1',
                question: 'Private cloud is characterized by:',
                options: ['Multi-tenant infrastructure', 'Single organization usage', 'Always cheaper than public', 'No need for virtualization'],
                correctAnswer: 1,
                explanation: 'Private cloud is dedicated to a single organization, unlike public cloud which is multi-tenant.',
                difficulty: 'easy',
                tags: ['deployment-models', 'private-cloud'],
            },
            {
                id: 'private-cloud-2',
                question: 'Which is a common private cloud platform?',
                options: ['AWS EC2', 'Google Compute Engine', 'OpenStack', 'Azure Virtual Machines'],
                correctAnswer: 2,
                explanation: 'OpenStack is open-source software for building private clouds. The others are public cloud services.',
                difficulty: 'medium',
                tags: ['deployment-models', 'technologies'],
            },
        ],
        commonMistakes: [
            'Thinking private cloud is always more secure (security depends on implementation)',
            'Underestimating the cost and expertise required',
            'Confusing VPC (Virtual Private Cloud) with true private cloud',
        ],
        comparisons: [],
        summary: 'Private cloud is dedicated single-tenant infrastructure for one organization. Offers maximum control and compliance but requires high investment. Technologies include VMware, OpenStack, Azure Stack.',
        cheatsheet: ['Private = Single-tenant + Dedicated', 'On-prem or hosted', 'High control, high cost', 'Best for: Regulated industries'],
        relatedTopics: ['public-cloud', 'hybrid-cloud', 'virtual-machines'],
    },
    {
        id: 'hybrid-cloud',
        title: 'Hybrid Cloud',
        slug: 'hybrid-cloud',
        category: 'deployment-models',
        zone: 'A',
        icon: 'Combine',
        description: 'Combination of public and private cloud with orchestration',
        estimatedTime: 12,
        content: {
            beginner: `
# Hybrid Cloud

## What is Hybrid Cloud?

Hybrid cloud **combines public and private clouds** with orchestration between them. Workloads can move between environments based on needs.

Think of it like having **both a private car and a bus pass**: Use your car for personal needs, take the bus when it makes sense.

## Key Characteristics

✅ **Flexibility**: Choose best environment for each workload
✅ **Cost optimization**: Balance CapEx and OpEx
✅ **Compliance**: Keep sensitive data private
✅ **Scalability**: Burst to public cloud for demand spikes
✅ **Complexity**: Requires integration and management

## Common Hybrid Patterns

1. **Cloud Bursting**: Overflow to public during peaks
2. **Data Sovereignty**: Sensitive on-prem, others in public
3. **Dev/Test in Public, Prod in Private**
4. **Disaster Recovery**: Backup to public cloud

## Benefits

- Best of both worlds
- Gradual cloud migration
- Regulatory compliance
- Cost optimization
      `,
            intermediate: `
# Hybrid Cloud - Architecture

## Hybrid Connectivity Options

| Option | Latency | Bandwidth | Cost |
|--------|---------|-----------|------|
| VPN over Internet | High | Variable | Low |
| Direct Connect/ExpressRoute | Low | Dedicated | Medium-High |
| SD-WAN | Medium | Optimized | Medium |

## Architecture Pattern

\`\`\`
┌─────────────────┐     ┌─────────────────┐
│  Private Cloud  │     │  Public Cloud   │
│  (On-Premises)  │←───→│  (AWS/Azure)    │
├─────────────────┤     ├─────────────────┤
│ • Core Banking  │     │ • Web Frontend  │
│ • Sensitive Data│     │ • Analytics     │
│ • Legacy Apps   │     │ • Dev/Test      │
└────────┬────────┘     └────────┬────────┘
         │                        │
         └──────┬─────────────────┘
                │
    ┌───────────▼───────────┐
    │  Hybrid Orchestration │
    │  (Management Layer)   │
    └───────────────────────┘
\`\`\`

## Key Technologies

| Vendor | Hybrid Solution |
|--------|-----------------|
| Microsoft | Azure Arc, Azure Stack |
| AWS | Outposts, EKS Anywhere |
| Google | Anthos |
| VMware | VMware Cloud Foundation |

## Workload Placement Decisions

| Keep Private | Move to Public |
|-------------|----------------|
| Regulated data | Variable workloads |
| Ultra-low latency | Development/Test |
| Legacy dependencies | Web applications |
| Compliance requirements | Analytics |
      `,
            advanced: `
# Hybrid Cloud - Enterprise Strategy

## Hybrid Cloud Maturity Model

1. **Siloed**: Separate environments, manual processes
2. **Connected**: Basic connectivity, some automation
3. **Unified**: Common management, policy-based placement
4. **Optimized**: AI-driven placement, seamless portability

## Multi-Cloud vs Hybrid Cloud

| Aspect | Hybrid | Multi-Cloud |
|--------|--------|-------------|
| Definition | Private + Public | Multiple public clouds |
| Primary Goal | Control + Scale | Avoid vendor lock-in |
| Complexity | Medium | High |
| Use Case | Compliance + flexibility | Best-of-breed services |

## Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| Data consistency | Distributed databases, replication |
| Security | Zero Trust, consistent IAM |
| Networking | SD-WAN, consistent addressing |
| Management | Unified control plane |
| Portability | Containers, Kubernetes |

## Implementation Best Practices

1. Start with clear workload classification
2. Establish secure connectivity first
3. Implement unified identity management
4. Use containers for portability
5. Automate with IaC (Terraform)
      `,
        },
        keyPoints: [
            'Hybrid cloud combines public and private clouds',
            'Enables workload flexibility and optimization',
            'Common patterns: cloud bursting, data sovereignty, DR',
            'Requires secure connectivity (VPN, Direct Connect)',
            'Technologies: Azure Arc, AWS Outposts, Google Anthos',
            'More complex but offers best of both worlds',
        ],
        realWorldExamples: [
            {
                title: 'GE Aviation',
                company: 'GE',
                scenario: 'Sensitive aviation data with need for analytics',
                solution: 'Hybrid with on-prem for sensitive, AWS for analytics',
                outcome: 'Maintained IP protection while leveraging cloud AI/ML',
            },
        ],
        mcqs: [
            {
                id: 'hybrid-1',
                question: 'What is hybrid cloud?',
                options: ['Only public cloud services', 'Only private infrastructure', 'Combination of public and private clouds', 'Using multiple public cloud providers'],
                correctAnswer: 2,
                explanation: 'Hybrid cloud combines public and private clouds with orchestration between them. Multi-cloud uses multiple public providers.',
                difficulty: 'easy',
                tags: ['deployment-models', 'hybrid'],
            },
            {
                id: 'hybrid-2',
                question: 'Cloud bursting refers to:',
                options: ['Cloud security breach', 'Expanding to public cloud during demand spikes', 'Deleting cloud resources', 'Migrating away from cloud'],
                correctAnswer: 1,
                explanation: 'Cloud bursting means using public cloud capacity to handle peak demand when private resources are insufficient.',
                difficulty: 'medium',
                tags: ['hybrid', 'scaling'],
            },
        ],
        commonMistakes: [
            'Confusing hybrid cloud with multi-cloud',
            'Underestimating integration complexity',
            'Treating it as two separate environments instead of unified',
        ],
        comparisons: [],
        summary: 'Hybrid cloud combines public and private clouds with orchestration. Enables cloud bursting, data sovereignty compliance, and workload optimization. Requires connectivity solutions and unified management.',
        cheatsheet: ['Hybrid = Private + Public combined', 'Cloud bursting for peaks', 'Direct Connect for low latency', 'Technologies: Azure Arc, Outposts, Anthos'],
        relatedTopics: ['public-cloud', 'private-cloud', 'community-cloud'],
    },
    {
        id: 'community-cloud',
        title: 'Community Cloud',
        slug: 'community-cloud',
        category: 'deployment-models',
        zone: 'A',
        icon: 'Users',
        description: 'Shared cloud infrastructure for organizations with common interests',
        estimatedTime: 8,
        content: {
            beginner: `
# Community Cloud

## What is Community Cloud?

Community cloud is infrastructure **shared by several organizations** that have common concerns (security, compliance, mission).

Think of it like a **shared office building for similar businesses**: Law firms sharing a legal-tech building, with shared security and compliance.

## Key Characteristics

✅ **Shared by specific community**: Not public, not single-tenant
✅ **Common compliance needs**: Same regulatory requirements
✅ **Cost sharing**: Split infrastructure costs
✅ **Governance**: Community-defined policies
✅ **Can be on/off-premises**: Managed by community or third party

## Examples

- **Government clouds**: FedRAMP-compliant clouds for government agencies
- **Healthcare clouds**: HIPAA-compliant shared infrastructure
- **Financial clouds**: PCI-DSS compliant platforms
- **Research clouds**: Academic institution shared resources

## Benefits

- Lower cost than private (shared)
- More control than public
- Pre-configured for compliance
- Collaboration among members
      `,
            intermediate: `
# Community Cloud - Implementation

## Community Cloud Models

| Type | Management | Location |
|------|------------|----------|
| On-Premises | Community member | Member's data center |
| Third-Party Hosted | Provider | Provider's data center |
| Hybrid | Mixed | Mixed locations |

## Government Community Cloud Examples

| Cloud | Description |
|-------|-------------|
| AWS GovCloud | Isolated AWS region for US government |
| Azure Government | Dedicated Azure for government |
| Google Gov Cloud | GCP for government workloads |

## Community Cloud Architecture

\`\`\`
┌────────────────────────────────────────┐
│          Community Cloud                │
├─────────┬─────────┬─────────┬──────────┤
│  Org A  │  Org B  │  Org C  │  Org D   │
│ (Bank)  │ (Bank)  │ (Insure)│ (Insure) │
├─────────┴─────────┴─────────┴──────────┤
│     Shared Compliance Infrastructure    │
│     (PCI-DSS, Encryption, Audit)        │
├────────────────────────────────────────┤
│     Shared Physical Resources           │
└────────────────────────────────────────┘
\`\`\`

## When to Choose Community Cloud

- Multiple organizations with same compliance needs
- Budget constraints for private cloud
- Need more control than public cloud offers
- Collaboration requirements within industry
      `,
            advanced: `
# Community Cloud - Strategic View

## Comparison with Other Models

| Aspect | Public | Private | Community |
|--------|--------|---------|-----------|
| Tenants | Many | One | Several (limited) |
| Control | Low | High | Medium |
| Cost | Lowest | Highest | Medium |
| Compliance | Self-configure | Custom | Pre-configured |

## Governance Structures

1. **Consortium Model**: Members jointly govern
2. **Lead Organization**: One member manages for all
3. **Third-Party Managed**: External provider operates

## Real-World Community Clouds

| Name | Industry | Members |
|------|----------|---------|
| AWS GovCloud | Government | US federal agencies |
| SWIFT | Banking | Financial institutions globally |
| GÉANT | Research | European research networks |

## Challenges

- Governance disagreements among members
- Cost allocation disputes
- Performance impact of shared resources
- Member departures affecting community
      `,
        },
        keyPoints: [
            'Community cloud is shared by organizations with common interests',
            'Provides pre-configured compliance for specific industries',
            'Cost shared among community members',
            'Examples: Government, healthcare, financial clouds',
            'Balance between public (cost) and private (control)',
            'Governance defined by the community',
        ],
        realWorldExamples: [
            {
                title: 'AWS GovCloud',
                company: 'AWS',
                scenario: 'US government agencies need cloud with FedRAMP compliance',
                solution: 'Isolated AWS region with US-only personnel',
                outcome: 'Government agencies can use cloud while meeting security requirements',
            },
        ],
        mcqs: [
            {
                id: 'community-1',
                question: 'Community cloud is best described as:',
                options: ['Cloud for a single organization', 'Cloud shared by anyone', 'Cloud shared by organizations with common interests', 'Local storage cloud'],
                correctAnswer: 2,
                explanation: 'Community cloud is shared by several organizations with common concerns like compliance requirements.',
                difficulty: 'easy',
                tags: ['deployment-models', 'community'],
            },
            {
                id: 'community-2',
                question: 'AWS GovCloud is an example of:',
                options: ['Public cloud', 'Private cloud', 'Community cloud', 'Hybrid cloud'],
                correctAnswer: 2,
                explanation: 'AWS GovCloud is a community cloud for US government agencies with shared compliance infrastructure.',
                difficulty: 'medium',
                tags: ['deployment-models', 'aws'],
            },
        ],
        commonMistakes: [
            'Thinking community cloud is same as public cloud',
            'Assuming any group of organizations can form community cloud (need common compliance needs)',
            'Forgetting governance complexity',
        ],
        comparisons: [],
        summary: 'Community cloud is shared infrastructure for organizations with common interests (compliance, industry). Cost-shared, pre-configured for compliance. Examples: AWS GovCloud, healthcare clouds.',
        cheatsheet: ['Community = Shared by similar orgs', 'Pre-configured compliance', 'Cost sharing among members', 'Examples: GovCloud, healthcare clouds'],
        relatedTopics: ['public-cloud', 'private-cloud', 'hybrid-cloud'],
    },
];

export default deploymentModelsTopics;
