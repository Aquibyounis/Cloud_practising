import type { Topic } from '../../types';

export const cloudFundamentalsTopics: Topic[] = [
    {
        id: 'what-is-cloud',
        title: 'What is Cloud Computing?',
        slug: 'what-is-cloud',
        category: 'cloud-fundamentals',
        zone: 'A',
        icon: 'Cloud',
        description: 'Understanding the fundamental concept of cloud computing and its core principles',
        estimatedTime: 15,
        content: {
            beginner: `
# What is Cloud Computing?

Cloud computing is the delivery of computing services—including servers, storage, databases, networking, software, analytics, and intelligence—over the Internet ("the cloud") to offer faster innovation, flexible resources, and economies of scale.

## Simple Analogy
Think of cloud computing like electricity from a power grid. Instead of generating your own electricity with a personal generator, you simply plug into the grid and pay for what you use. Similarly, instead of buying and maintaining your own servers, you "plug into" the cloud and pay for computing resources as you use them.

## The 5 Essential Characteristics (NIST Definition)

1. **On-demand Self-service**: Get computing resources automatically without human interaction
2. **Broad Network Access**: Access from anywhere via standard mechanisms (laptop, phone, tablet)
3. **Resource Pooling**: Provider's resources serve multiple customers dynamically
4. **Rapid Elasticity**: Scale up/down quickly based on demand
5. **Measured Service**: Pay only for what you use (metered like utilities)

## Real-World Example
Netflix doesn't own massive data centers to stream videos to 200+ million subscribers. Instead, they use Amazon Web Services (AWS) cloud. During peak hours (evenings, weekends), Netflix automatically scales up. During off-peak hours, they scale down and save money.
      `,
            intermediate: `
# Cloud Computing - Intermediate Concepts

## How Cloud Computing Works

Cloud providers maintain massive data centers filled with physical servers. Through **virtualization technology**, these physical resources are divided into virtual resources that can be allocated to different customers.

### The Technology Stack

\`\`\`
┌─────────────────────────────────────┐
│         Applications                │  ← Your apps running in cloud
├─────────────────────────────────────┤
│         Data                        │  ← Your data stored in cloud
├─────────────────────────────────────┤
│         Runtime                     │  ← Java, Python, Node.js, etc.
├─────────────────────────────────────┤
│         Middleware                  │  ← Web servers, queues
├─────────────────────────────────────┤
│         Operating System            │  ← Linux, Windows
├─────────────────────────────────────┤
│         Virtualization              │  ← Hypervisor layer
├─────────────────────────────────────┤
│         Servers/Storage/Networking  │  ← Physical infrastructure
├─────────────────────────────────────┤
│         Data Center                 │  ← Building, power, cooling
└─────────────────────────────────────┘
\`\`\`

## Types of Cloud Users

1. **Consumers**: Use cloud services (Gmail, Dropbox, Netflix)
2. **Developers**: Build applications on cloud platforms
3. **IT Administrators**: Manage cloud infrastructure
4. **Business Decision Makers**: Choose cloud strategies

## Cloud vs Traditional IT

| Aspect | Traditional IT | Cloud Computing |
|--------|---------------|-----------------|
| Initial Cost | High (CapEx) | Low (OpEx) |
| Scaling | Weeks/Months | Minutes |
| Maintenance | Your responsibility | Provider's responsibility |
| Location | On-premises | Anywhere |
| Flexibility | Limited | High |
      `,
            advanced: `
# Cloud Computing - Advanced Concepts

## Cloud Architecture Principles

### 1. Design for Failure
In cloud environments, individual components WILL fail. The key is designing systems that continue operating despite failures.

**Strategies:**
- Multiple availability zones
- Auto-healing mechanisms
- Graceful degradation
- Circuit breakers

### 2. Decouple Components
Loosely coupled architectures allow:
- Independent scaling
- Fault isolation
- Easier updates
- Technology flexibility

### 3. Implement Elasticity
True cloud-native applications dynamically scale:
- Horizontal scaling (add/remove instances)
- Vertical scaling (resize instances)
- Predictive scaling (anticipate demand)

## Multi-Tenancy Architecture

Cloud providers achieve efficiency through multi-tenancy:

\`\`\`
┌───────────────────────────────────────────┐
│              Shared Infrastructure         │
├─────────┬─────────┬─────────┬─────────────┤
│ Tenant  │ Tenant  │ Tenant  │   Tenant    │
│    A    │    B    │    C    │      D      │
├─────────┴─────────┴─────────┴─────────────┤
│         Isolation & Security Layer         │
├───────────────────────────────────────────┤
│           Physical Resources               │
└───────────────────────────────────────────┘
\`\`\`

## Economic Models

### Reserved Capacity
- Commit to 1-3 year terms
- Up to 72% discount
- Best for predictable workloads

### Spot/Preemptible
- Use spare capacity
- Up to 90% discount
- Can be terminated anytime
- Best for fault-tolerant batch jobs

### Savings Plans
- Commit to $/hour usage
- Flexibility across services
- Automatic discounts applied
      `,
        },
        keyPoints: [
            'Cloud computing delivers IT resources over the internet on a pay-as-you-go basis',
            'Five essential characteristics: On-demand, Broad access, Resource pooling, Elasticity, Measured service',
            'Enables faster innovation and reduced infrastructure management burden',
            'Uses virtualization to share physical resources among multiple customers',
            'Fundamental shift from CapEx (buying) to OpEx (renting) model',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Streaming Infrastructure',
                company: 'Netflix',
                scenario: 'Netflix needs to stream video to 200+ million subscribers globally with varying demand throughout the day',
                solution: 'Uses AWS for compute, storage, and content delivery. Scales automatically based on viewer demand.',
                outcome: 'Handles peak loads during prime time without owning data centers, saves millions in infrastructure costs',
            },
            {
                title: 'Airbnb Rapid Scaling',
                company: 'Airbnb',
                scenario: 'Startup needed to scale from thousands to millions of users without building data centers',
                solution: 'Built entirely on AWS, using auto-scaling and managed services',
                outcome: 'Scaled to handle 500 million guest arrivals without owning physical infrastructure',
            },
        ],
        mcqs: [
            {
                id: 'cloud-basics-1',
                question: 'Which of the following is NOT one of the five essential characteristics of cloud computing according to NIST?',
                options: [
                    'On-demand self-service',
                    'Broad network access',
                    'Unlimited free storage',
                    'Measured service',
                ],
                correctAnswer: 2,
                explanation: 'The five NIST characteristics are: On-demand self-service, Broad network access, Resource pooling, Rapid elasticity, and Measured service. "Unlimited free storage" is not a characteristic.',
                difficulty: 'easy',
                tags: ['cloud-fundamentals', 'nist', 'characteristics'],
            },
            {
                id: 'cloud-basics-2',
                question: 'What technology enables cloud providers to divide physical servers into multiple virtual environments?',
                options: [
                    'Containerization',
                    'Virtualization',
                    'Encryption',
                    'Load balancing',
                ],
                correctAnswer: 1,
                explanation: 'Virtualization technology, implemented through hypervisors, allows physical servers to be divided into multiple virtual machines, enabling multi-tenancy in cloud environments.',
                difficulty: 'easy',
                tags: ['cloud-fundamentals', 'virtualization'],
            },
            {
                id: 'cloud-basics-3',
                question: 'Which cloud computing characteristic ensures you only pay for resources consumed?',
                options: [
                    'Resource pooling',
                    'Rapid elasticity',
                    'Measured service',
                    'Broad network access',
                ],
                correctAnswer: 2,
                explanation: 'Measured service (also called metered service) automatically controls and optimizes resource use with metering capability, allowing pay-per-use billing.',
                difficulty: 'easy',
                tags: ['cloud-fundamentals', 'billing'],
            },
            {
                id: 'cloud-basics-4',
                question: 'A company experiences heavy traffic during business hours but minimal traffic at night. Which cloud characteristic addresses this scenario?',
                options: [
                    'On-demand self-service',
                    'Rapid elasticity',
                    'Broad network access',
                    'Resource pooling',
                ],
                correctAnswer: 1,
                explanation: 'Rapid elasticity allows resources to be provisioned and released quickly to scale out/in with demand. This handles variable workloads efficiently.',
                difficulty: 'medium',
                tags: ['cloud-fundamentals', 'elasticity', 'scaling'],
            },
            {
                id: 'cloud-basics-5',
                question: 'In cloud computing, multiple customers share the same physical infrastructure while remaining isolated. This is called:',
                options: [
                    'Multi-tenancy',
                    'Hybrid computing',
                    'Edge computing',
                    'Distributed computing',
                ],
                correctAnswer: 0,
                explanation: 'Multi-tenancy is an architecture where multiple customers (tenants) share the same physical resources while maintaining logical isolation between their workloads.',
                difficulty: 'medium',
                tags: ['cloud-fundamentals', 'architecture', 'multi-tenancy'],
            },
        ],
        commonMistakes: [
            'Confusing cloud computing with simply storing files online (like basic file storage)',
            'Thinking cloud means "someone else\'s computer" without understanding the service model differences',
            'Assuming cloud is always cheaper - it requires proper design and management',
            'Believing cloud eliminates all IT responsibilities - shared responsibility still applies',
            'Mixing up the 5 NIST characteristics with benefits or service models',
        ],
        comparisons: [
            {
                title: 'Cloud vs On-Premises',
                headers: ['Aspect', 'Cloud Computing', 'On-Premises'],
                rows: [
                    ['Upfront Cost', 'Low (pay-as-you-go)', 'High (capital investment)'],
                    ['Scaling Speed', 'Minutes', 'Weeks to Months'],
                    ['Maintenance', 'Provider handles', 'Your team handles'],
                    ['Flexibility', 'High', 'Limited'],
                    ['Control', 'Shared', 'Full'],
                    ['Data Location', 'Provider\'s data centers', 'Your premises'],
                ],
            },
        ],
        summary: 'Cloud computing delivers IT resources over the internet with pay-as-you-go pricing. It has 5 essential characteristics (NIST): on-demand self-service, broad network access, resource pooling, rapid elasticity, and measured service. Uses virtualization to enable multi-tenancy. Key shift from CapEx to OpEx spending model.',
        cheatsheet: [
            'NIST 5 Characteristics: On-demand, Broad access, Pooling, Elasticity, Measured',
            'Cloud = IT resources + Internet delivery + Pay-per-use',
            'Virtualization enables multi-tenancy',
            'Elasticity handles variable workloads',
            'Measured service = pay for what you use',
        ],
        relatedTopics: ['cloud-benefits', 'capex-vs-opex', 'shared-responsibility', 'iaas', 'paas', 'saas'],
    },
    {
        id: 'cloud-benefits',
        title: 'Benefits of Cloud Computing',
        slug: 'cloud-benefits',
        category: 'cloud-fundamentals',
        zone: 'A',
        icon: 'Sparkles',
        description: 'Key advantages and benefits organizations gain from cloud adoption',
        estimatedTime: 12,
        content: {
            beginner: `
# Benefits of Cloud Computing

Cloud computing offers transformative benefits for businesses of all sizes. Let's explore the key advantages.

## 1. Cost Efficiency 💰

### No Upfront Investment
- No need to buy expensive hardware
- No data center construction costs
- Reduced IT staff requirements

### Pay-As-You-Go Model
- Pay only for resources you use
- Like a utility bill (electricity, water)
- Scale costs with business needs

**Example**: A startup pays $100/month initially, scaling to $10,000/month as they grow - no upfront millions needed.

## 2. Scalability and Elasticity 📈

### Scale Up When Needed
- Handle traffic spikes effortlessly
- Add resources in minutes, not months
- No capacity planning nightmares

**Example**: An e-commerce site handles Black Friday traffic by automatically scaling from 10 to 1000 servers.

## 3. Global Reach 🌍

### Deploy Worldwide
- Data centers across the globe
- Reduce latency for global users
- Expand to new markets instantly

## 4. Reliability 🛡️

### Built-in Redundancy
- Multiple data centers
- Automatic failover
- Data replication

## 5. Security 🔒

### Enterprise-Grade Security
- 24/7 security teams
- Regular compliance audits
- Advanced threat protection
      `,
            intermediate: `
# Cloud Benefits - Deeper Analysis

## Business Agility Benefits

### Faster Time-to-Market
Traditional approach:
1. Budget approval (weeks)
2. Procurement (weeks)
3. Shipping & installation (weeks)
4. Configuration (weeks)
**Total: 2-6 months**

Cloud approach:
1. Create account
2. Launch resources
3. Deploy application
**Total: Hours to days**

### Innovation Enablement
- Access to cutting-edge technologies
- AI/ML services ready to use
- No infrastructure barriers to experimentation

## Operational Benefits

### Reduced Management Overhead
| Task | Traditional | Cloud |
|------|------------|-------|
| Hardware procurement | You | Provider |
| Physical security | You | Provider |
| Patching | You | Shared/Provider |
| Capacity planning | You | Automatic |
| Disaster recovery | Complex | Simplified |

### Automatic Updates
- Latest security patches
- New features automatically
- No maintenance windows

## Technical Benefits

### High Availability Architecture
\`\`\`
Region: US-East
├── Availability Zone 1
│   └── Your App Instance 1
├── Availability Zone 2
│   └── Your App Instance 2
└── Availability Zone 3
    └── Your App Instance 3

→ One zone fails? Others continue serving traffic!
\`\`\`

### Disaster Recovery Made Simple
- Geographic data replication
- Automated backups
- One-click restore capabilities
      `,
            advanced: `
# Cloud Benefits - Strategic Perspective

## Total Cost of Ownership (TCO) Analysis

### Hidden Costs of On-Premises

Traditional infrastructure costs often missed:
- **Real estate**: Data center space
- **Power**: Electricity, backup generators
- **Cooling**: HVAC systems
- **Personnel**: 24/7 operations staff
- **Compliance**: Audit and certification costs
- **Depreciation**: Hardware obsolescence

### Cloud TCO Advantages
- Variable expense model
- Eliminate over-provisioning waste
- Reduce operational complexity
- Leverage economies of scale

## Strategic Business Benefits

### 1. Competitive Advantage
- Faster feature delivery
- Lower barriers to entry
- Focus on differentiation vs infrastructure

### 2. Business Continuity
- Geographic redundancy built-in
- Recovery time objectives (RTO) in minutes
- Recovery point objectives (RPO) near-zero

### 3. Sustainability
- Shared infrastructure = efficiency
- Provider optimization of resource usage
- Carbon-neutral commitments from major providers

## Advanced Elasticity Patterns

### Predictive Scaling
Using ML to anticipate demand:
\`\`\`
Historical Pattern Analysis
        ↓
Traffic Prediction Model
        ↓
Pre-emptive Scaling Actions
        ↓
Resources Ready Before Demand
\`\`\`

### Event-Driven Scaling
- Marketing campaign launches
- Product releases
- Seasonal patterns

## Risk Mitigation Benefits

1. **Technology Risk**: Provider handles hardware failures
2. **Security Risk**: Enterprise security investments shared
3. **Compliance Risk**: Pre-certified infrastructure
4. **Business Risk**: Lower upfront investment = lower financial risk
      `,
        },
        keyPoints: [
            'Cost efficiency through pay-as-you-go and elimination of upfront CapEx',
            'Scalability and elasticity to handle variable workloads',
            'Global reach with data centers worldwide',
            'High availability and reliability built into the infrastructure',
            'Faster time-to-market accelerating business agility',
            'Reduced operational overhead and management burden',
        ],
        realWorldExamples: [
            {
                title: 'Capital One Cloud Migration',
                company: 'Capital One',
                scenario: 'Major bank needed to modernize infrastructure and improve agility',
                solution: 'Migrated 100% to AWS, closed 8 data centers',
                outcome: 'Reduced data center footprint, improved deployment speed from months to minutes',
            },
        ],
        mcqs: [
            {
                id: 'benefits-1',
                question: 'Which cloud benefit allows a company to handle sudden traffic spikes without advance planning?',
                options: [
                    'Cost efficiency',
                    'Elasticity',
                    'Global reach',
                    'Security',
                ],
                correctAnswer: 1,
                explanation: 'Elasticity is the ability to scale resources up or down automatically based on demand, handling sudden spikes without pre-planning.',
                difficulty: 'easy',
                tags: ['benefits', 'elasticity'],
            },
            {
                id: 'benefits-2',
                question: 'A startup wants to minimize initial investment while building their product. Which cloud benefit addresses this?',
                options: [
                    'High availability',
                    'Pay-as-you-go pricing',
                    'Multi-region deployment',
                    'Managed services',
                ],
                correctAnswer: 1,
                explanation: 'Pay-as-you-go pricing means no upfront capital expenditure. Startups pay only for what they use, starting small and scaling costs with growth.',
                difficulty: 'easy',
                tags: ['benefits', 'cost', 'pricing'],
            },
            {
                id: 'benefits-3',
                question: 'Which is NOT typically considered a primary benefit of cloud computing?',
                options: [
                    'Reduced time-to-market',
                    'Complete control over physical hardware',
                    'Automatic scaling',
                    'Global deployment capability',
                ],
                correctAnswer: 1,
                explanation: 'Cloud computing abstracts physical hardware. Complete control over physical hardware is actually given up in exchange for other benefits.',
                difficulty: 'medium',
                tags: ['benefits', 'traps'],
            },
        ],
        commonMistakes: [
            'Assuming cloud is always cheaper without analyzing total cost of ownership',
            'Overlooking hidden costs like data egress charges',
            'Expecting same level of control as on-premises infrastructure',
            'Underestimating the learning curve for cloud operations',
        ],
        comparisons: [
            {
                title: 'Cloud Benefits by Business Size',
                headers: ['Benefit', 'Startup', 'Enterprise', 'Impact'],
                rows: [
                    ['Low upfront cost', 'Critical', 'Important', 'Enables innovation'],
                    ['Scalability', 'Important', 'Critical', 'Handles growth'],
                    ['Global reach', 'Nice to have', 'Critical', 'Market expansion'],
                    ['Security', 'Rely on provider', 'Shared responsibility', 'Reduces risk'],
                ],
            },
        ],
        summary: 'Cloud computing provides cost efficiency (pay-as-you-go), scalability/elasticity, global reach, high availability, and faster time-to-market. Key benefits include reduced upfront costs, automatic scaling, and operational efficiency.',
        cheatsheet: [
            'Pay-as-you-go = No upfront costs',
            'Elasticity = Handle traffic spikes automatically',
            'Global reach = Deploy worldwide in minutes',
            'High availability = Built-in redundancy',
            'Agility = Deploy in hours, not months',
        ],
        relatedTopics: ['what-is-cloud', 'capex-vs-opex', 'auto-scaling', 'pricing-models'],
    },
    {
        id: 'capex-vs-opex',
        title: 'CapEx vs OpEx',
        slug: 'capex-vs-opex',
        category: 'cloud-fundamentals',
        zone: 'A',
        icon: 'Calculator',
        description: 'Understanding Capital Expenditure vs Operational Expenditure in cloud context',
        estimatedTime: 10,
        content: {
            beginner: `
# CapEx vs OpEx

## What is CapEx (Capital Expenditure)?

**Capital Expenditure** is money spent to buy, maintain, or improve fixed assets like:
- Buildings
- Servers and hardware
- Data center equipment

### CapEx Characteristics
- Large upfront investment
- Owned asset (depreciates over time)
- Long-term commitment
- Tax deductible through depreciation

**Example**: Buying a $100,000 server that you'll use for 5 years.

## What is OpEx (Operational Expenditure)?

**Operational Expenditure** is money spent on day-to-day operations:
- Cloud service subscriptions
- Utilities (like electricity)
- Software licenses

### OpEx Characteristics
- Pay-as-you-go
- No asset ownership
- Flexible, cancellable
- Fully tax deductible in current year

**Example**: Paying $500/month for cloud servers.

## The Cloud Shift: CapEx → OpEx

Traditional IT = Heavy CapEx (buy everything upfront)
Cloud Computing = Primarily OpEx (rent what you need)

| Traditional IT | Cloud Computing |
|---------------|-----------------|
| Buy servers | Rent servers |
| Build data center | Use provider's data center |
| Large upfront cost | Small monthly payments |
| Depreciate over years | Expense immediately |
      `,
            intermediate: `
# CapEx vs OpEx - Financial Analysis

## Detailed Comparison

### Capital Expenditure Deep Dive

**Accounting Treatment:**
- Recorded as an asset on balance sheet
- Depreciated over useful life (typically 3-5 years for IT)
- Tax benefits spread over multiple years

**Example Calculation:**
\`\`\`
Server Cost: $100,000
Useful Life: 5 years
Annual Depreciation: $20,000/year

Year 1: $20,000 expense recognized
Year 2: $20,000 expense recognized
... and so on
\`\`\`

### Operational Expenditure Deep Dive

**Accounting Treatment:**
- Expensed immediately in current period
- No asset recorded
- Full tax benefit in current year

**Cloud Example:**
\`\`\`
Monthly Cloud Bill: $5,000
Annual Cloud Cost: $60,000

Year 1: $60,000 fully expensed
(No depreciation, immediate tax benefit)
\`\`\`

## Financial Impact Comparison

| Factor | CapEx | OpEx |
|--------|-------|------|
| Cash flow timing | Large outflow upfront | Small, regular outflows |
| Balance sheet | Increases assets | No asset recorded |
| P&L impact | Gradual (depreciation) | Immediate (full expense) |
| Financial ratios | May affect debt covenants | Operating expense ratio |
| Tax benefit | Spread over years | Immediate, full |
| Flexibility | Committed | Cancellable |

## When Each Makes Sense

### CapEx May Be Better When:
- Workloads are very stable and predictable
- You have cheap capital access
- Regulatory requirements require on-premises
- Total cost over 5+ years is significantly lower

### OpEx May Be Better When:
- Workloads are variable or unpredictable
- You want to preserve cash for core business
- You need flexibility to scale up/down
- You want to reduce infrastructure management
      `,
            advanced: `
# CapEx vs OpEx - Strategic Considerations

## Total Cost of Ownership (TCO) Analysis

### True CapEx Costs (Often Underestimated)

\`\`\`
Direct Costs:
├── Hardware purchase
├── Software licenses
├── Installation
└── Initial configuration

Indirect Costs:
├── Real estate (data center space)
├── Power and cooling
├── Network connectivity
├── Physical security
├── Staff training
├── Ongoing maintenance
├── Insurance
├── Compliance audits
└── Eventual decommissioning
\`\`\`

### True OpEx Costs (Cloud)

\`\`\`
Compute costs
├── On-demand instances
├── Reserved capacity discounts
└── Spot instance savings

Storage costs
├── Standard storage
└── Data transfer (egress)

Hidden costs to watch:
├── Data egress charges
├── API call costs
├── Cross-region traffic
└── Premium support
\`\`\`

## Financial Strategy Implications

### Impact on Key Metrics

| Metric | CapEx Model | OpEx Model |
|--------|-------------|------------|
| EBITDA | Higher (depreciation excluded) | Lower (full expense) |
| Free Cash Flow | Lower (investment) | Higher initially |
| ROA | Lower (asset heavy) | Higher (asset light) |
| Credit Rating | May be affected | Usually neutral |

### Strategic Flexibility

**CapEx Lock-in:**
- Committed to technology choices
- Difficult to pivot
- Stranded assets if needs change

**OpEx Flexibility:**
- Switch providers more easily
- Adopt new technologies quickly
- Scale with business needs

## Hybrid Considerations

Modern strategies often combine:

1. **Reserved Instances (Cloud CapEx-like)**
   - Commit to 1-3 years
   - Significant discounts (40-70%)
   - Still OpEx accounting

2. **On-Demand (Pure OpEx)**
   - Maximum flexibility
   - Higher unit cost
   - Best for variable workloads

3. **Spot/Preemptible (Opportunistic OpEx)**
   - Lowest cost
   - Interruptible
   - Best for fault-tolerant batch
      `,
        },
        keyPoints: [
            'CapEx = large upfront investment in owned assets (traditional IT)',
            'OpEx = pay-as-you-go for services (cloud model)',
            'Cloud shifts IT spending from CapEx to OpEx',
            'OpEx provides better flexibility and lower initial costs',
            'CapEx offers tax depreciation benefits but ties up capital',
            'Both have different impacts on financial statements',
        ],
        realWorldExamples: [
            {
                title: 'GE Digital Transformation',
                company: 'GE',
                scenario: 'Industrial giant needed to modernize legacy IT without massive upfront investment',
                solution: 'Shifted from CapEx-heavy data centers to cloud-based OpEx model',
                outcome: 'Reduced IT capital requirements and improved agility for digital initiatives',
            },
        ],
        mcqs: [
            {
                id: 'capex-opex-1',
                question: 'A company wants to avoid large upfront IT investments. Which expense model should they prefer?',
                options: [
                    'CapEx',
                    'OpEx',
                    'Both equally',
                    'Neither',
                ],
                correctAnswer: 1,
                explanation: 'OpEx (Operational Expenditure) involves pay-as-you-go spending without large upfront investments, which is the cloud computing model.',
                difficulty: 'easy',
                tags: ['capex-opex', 'finance'],
            },
            {
                id: 'capex-opex-2',
                question: 'Buying a physical server for your data center is an example of:',
                options: [
                    'Operational Expenditure',
                    'Capital Expenditure',
                    'Variable Cost',
                    'Marketing Expense',
                ],
                correctAnswer: 1,
                explanation: 'Purchasing physical assets like servers is Capital Expenditure (CapEx) - a large upfront investment in a fixed asset.',
                difficulty: 'easy',
                tags: ['capex-opex', 'definitions'],
            },
            {
                id: 'capex-opex-3',
                question: 'Which statement about cloud computing and expenses is TRUE?',
                options: [
                    'Cloud eliminates all IT expenses',
                    'Cloud converts CapEx to OpEx',
                    'Cloud only involves CapEx',
                    'Cloud is always cheaper than on-premises',
                ],
                correctAnswer: 1,
                explanation: 'Cloud computing shifts from CapEx (buying infrastructure) to OpEx (paying for services). It doesn\'t eliminate expenses nor is it always cheaper.',
                difficulty: 'medium',
                tags: ['capex-opex', 'cloud-benefits'],
            },
        ],
        commonMistakes: [
            'Thinking OpEx is always cheaper than CapEx (depends on usage patterns)',
            'Ignoring hidden CapEx costs like power, cooling, and staff',
            'Forgetting that Reserved Instances are still OpEx despite upfront payment',
            'Not considering the flexibility value of OpEx model',
        ],
        comparisons: [
            {
                title: 'CapEx vs OpEx Summary',
                headers: ['Factor', 'CapEx', 'OpEx'],
                rows: [
                    ['Payment', 'Large upfront', 'Pay-as-you-go'],
                    ['Asset', 'Owned', 'Rented/Subscribed'],
                    ['Flexibility', 'Low', 'High'],
                    ['Tax Treatment', 'Depreciation', 'Immediate expense'],
                    ['Risk', 'Technology obsolescence', 'Vendor dependency'],
                    ['Example', 'Buy servers', 'Cloud subscription'],
                ],
            },
        ],
        summary: 'CapEx involves large upfront investments in owned assets (traditional IT), while OpEx is pay-as-you-go (cloud model). Cloud computing shifts IT from CapEx to OpEx, providing flexibility and reducing initial costs. Both models have different financial and strategic implications.',
        cheatsheet: [
            'CapEx = Buy it (own it)',
            'OpEx = Rent it (subscribe)',
            'Cloud = CapEx → OpEx shift',
            'CapEx = Depreciate over years',
            'OpEx = Expense immediately',
        ],
        relatedTopics: ['cloud-benefits', 'pricing-models', 'reserved-instances'],
    },
    {
        id: 'shared-responsibility',
        title: 'Shared Responsibility Model',
        slug: 'shared-responsibility',
        category: 'cloud-fundamentals',
        zone: 'A',
        icon: 'Users',
        description: 'Understanding security and compliance responsibilities between cloud provider and customer',
        estimatedTime: 15,
        content: {
            beginner: `
# The Shared Responsibility Model

## What Is It?

The Shared Responsibility Model defines who is responsible for what when using cloud services. It's like renting an apartment:
- **Landlord (Cloud Provider)**: Responsible for the building structure, common areas, utilities
- **Tenant (You)**: Responsible for your belongings, what you do inside, who you let in

## The Basic Division

### Cloud Provider Responsibilities
The provider is responsible for **Security OF the Cloud**:
- Physical data centers
- Hardware (servers, storage, networking)
- Hypervisor/virtualization layer
- Global infrastructure

### Customer Responsibilities  
You are responsible for **Security IN the Cloud**:
- Your data
- Your applications
- Access management (who can access what)
- Configuration of services
- Encryption choices

## Simple Visual

\`\`\`
┌─────────────────────────────────────┐
│  YOUR RESPONSIBILITY (Security IN)  │
│  - Data                             │
│  - Applications                     │
│  - Identity & Access                │
│  - OS patching (sometimes)          │
└─────────────────────────────────────┘
         ↑ You control this
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
         ↓ Provider controls this
┌─────────────────────────────────────┐
│ PROVIDER RESPONSIBILITY (OF Cloud)  │
│  - Physical security                │
│  - Network infrastructure           │
│  - Hypervisor                       │
│  - Hardware                         │
└─────────────────────────────────────┘
\`\`\`
      `,
            intermediate: `
# Shared Responsibility - By Service Model

## How Responsibility Changes

The responsibility split varies based on the service model you use:

### IaaS (Infrastructure as a Service)
**Most responsibility on you**

\`\`\`
Customer Manages:
├── Data
├── Applications  
├── Runtime
├── Middleware
├── Operating System (patching, configuration)
└── Network configuration

Provider Manages:
├── Virtualization
├── Servers
├── Storage
└── Networking (physical)
\`\`\`

**Example**: EC2 instance - You must patch the OS, configure firewall, secure the application

### PaaS (Platform as a Service)
**Shared responsibility**

\`\`\`
Customer Manages:
├── Data
├── Applications
└── Some configuration

Provider Manages:
├── Runtime
├── Middleware
├── Operating System
├── Virtualization
└── Infrastructure
\`\`\`

**Example**: AWS Elastic Beanstalk - Provider patches OS, you focus on your code

### SaaS (Software as a Service)
**Least responsibility on you**

\`\`\`
Customer Manages:
├── Data (content you create)
├── User access
└── Some configuration

Provider Manages:
├── Everything else
└── The entire application stack
\`\`\`

**Example**: Microsoft 365 - Provider manages everything, you manage your documents and users

## Key Responsibilities Table

| Responsibility | IaaS | PaaS | SaaS |
|---------------|------|------|------|
| Data Classification | Customer | Customer | Customer |
| Identity Management | Customer | Customer | Customer |
| Application Security | Customer | Customer | Provider |
| OS Patching | Customer | Provider | Provider |
| Network Controls | Customer | Shared | Provider |
| Physical Security | Provider | Provider | Provider |
      `,
            advanced: `
# Shared Responsibility - Advanced Security Considerations

## Responsibility Matrix Across Providers

### AWS Shared Responsibility Model

\`\`\`
┌────────────────────────────────────────────────────┐
│                 CUSTOMER (IN the Cloud)             │
├────────────────────────────────────────────────────┤
│ Customer Data                                       │
│ Platform, Applications, IAM                         │
│ Operating System, Network & Firewall Config         │
│ Client-side Encryption | Server-side Encryption    │
│ Network Traffic Protection                          │
├────────────────────────────────────────────────────┤
│                   AWS (OF the Cloud)                │
├────────────────────────────────────────────────────┤
│ Software: Compute, Storage, Database, Networking    │
│ Hardware/AWS Global Infrastructure                  │
│ Regions, Availability Zones, Edge Locations        │
└────────────────────────────────────────────────────┘
\`\`\`

## Critical Security Responsibilities

### Always Customer Responsibility
1. **Data Classification & Compliance**
   - Understanding data sensitivity
   - Meeting regulatory requirements
   - Data residency decisions

2. **Identity & Access Management**
   - User authentication
   - Authorization policies
   - Principle of least privilege

3. **Application Security**
   - Secure code practices
   - Input validation
   - Security testing

### Common Compliance Misconceptions

| Misconception | Reality |
|--------------|---------|
| "AWS is PCI compliant, so we are too" | AWS infrastructure is compliant, your configuration may not be |
| "Provider handles all encryption" | You must enable and manage encryption |
| "Cloud is automatically HIPAA compliant" | You must configure BAA and compliant architecture |

## Defense in Depth Strategy

\`\`\`
Layer 1: Physical (Provider)
    └── Data center security, hardware
    
Layer 2: Network (Shared)
    └── VPC, Security Groups, NACLs
    
Layer 3: Host (Varies by service model)
    └── OS hardening, patching
    
Layer 4: Application (Customer)
    └── Secure code, input validation
    
Layer 5: Data (Customer)
    └── Encryption, access controls
    
Layer 6: Policies (Customer)
    └── Governance, compliance
\`\`\`

## Incident Response Considerations

### Provider Responsibilities in Incidents:
- Physical/infrastructure level incidents
- Hypervisor vulnerabilities
- Platform security issues

### Customer Responsibilities in Incidents:
- Application-level breaches
- Misconfigurations leading to exposure
- Compromised credentials
- Data breaches due to inadequate encryption
      `,
        },
        keyPoints: [
            'Provider: Security OF the cloud (infrastructure)',
            'Customer: Security IN the cloud (data, configuration)',
            'Responsibility varies by service model (IaaS > PaaS > SaaS)',
            'Customer ALWAYS responsible for data and access management',
            'Using a compliant cloud doesn\'t automatically make you compliant',
            'Understanding the model is critical for security and compliance',
        ],
        realWorldExamples: [
            {
                title: 'Capital One Data Breach',
                company: 'Capital One',
                scenario: 'Major data breach exposed 100+ million customer records',
                solution: 'The breach was due to a misconfigured WAF (customer responsibility), not AWS infrastructure failure',
                outcome: 'Highlighted that customer misconfigurations are a major risk - shared responsibility in action',
            },
        ],
        mcqs: [
            {
                id: 'shared-resp-1',
                question: 'In the AWS Shared Responsibility Model, who is responsible for patching the operating system on an EC2 instance?',
                options: [
                    'AWS',
                    'The customer',
                    'Both AWS and customer',
                    'Neither',
                ],
                correctAnswer: 1,
                explanation: 'For IaaS services like EC2, the customer is responsible for patching and maintaining the operating system. AWS manages the underlying infrastructure.',
                difficulty: 'easy',
                tags: ['shared-responsibility', 'aws', 'ec2'],
            },
            {
                id: 'shared-resp-2',
                question: 'Which of the following is ALWAYS the customer\'s responsibility regardless of the service model?',
                options: [
                    'Physical data center security',
                    'Hypervisor patching',
                    'Data classification and access management',
                    'Network infrastructure',
                ],
                correctAnswer: 2,
                explanation: 'Customers are always responsible for their data, including classification, access management, and encryption decisions, regardless of whether they use IaaS, PaaS, or SaaS.',
                difficulty: 'medium',
                tags: ['shared-responsibility', 'security'],
            },
            {
                id: 'shared-resp-3',
                question: 'A company uses AWS Lambda (serverless). Who is responsible for OS patching?',
                options: [
                    'The customer',
                    'AWS',
                    'Shared equally',
                    'A third-party vendor',
                ],
                correctAnswer: 1,
                explanation: 'With serverless services like Lambda, AWS manages the entire runtime environment including OS patching. The customer focuses on their code and configuration.',
                difficulty: 'medium',
                tags: ['shared-responsibility', 'serverless', 'lambda'],
            },
            {
                id: 'shared-resp-4',
                question: 'A data breach occurs due to an improperly configured S3 bucket made public. Who is responsible?',
                options: [
                    'AWS, as they host the data',
                    'The customer, as configuration is their responsibility',
                    'Both equally',
                    'The end users who accessed the data',
                ],
                correctAnswer: 1,
                explanation: 'Configuration of cloud services is the customer\'s responsibility. AWS provides secure defaults and tools, but incorrect configurations are customer errors.',
                difficulty: 'medium',
                tags: ['shared-responsibility', 's3', 'security'],
            },
        ],
        commonMistakes: [
            'Thinking the cloud provider handles all security automatically',
            'Assuming compliance certifications of the cloud provider extend to your workloads',
            'Neglecting to patch EC2 instances because "it\'s in the cloud"',
            'Not understanding that S3 bucket policies are customer-configured',
            'Believing encryption is automatic for all data at rest',
        ],
        comparisons: [
            {
                title: 'Responsibility by Service Model',
                headers: ['Component', 'IaaS', 'PaaS', 'SaaS'],
                rows: [
                    ['Data', 'Customer', 'Customer', 'Customer'],
                    ['Applications', 'Customer', 'Customer', 'Provider'],
                    ['Runtime', 'Customer', 'Provider', 'Provider'],
                    ['OS', 'Customer', 'Provider', 'Provider'],
                    ['Virtualization', 'Provider', 'Provider', 'Provider'],
                    ['Infrastructure', 'Provider', 'Provider', 'Provider'],
                ],
            },
        ],
        summary: 'The Shared Responsibility Model divides security between provider (OF the cloud - infrastructure) and customer (IN the cloud - data, configuration). IaaS has most customer responsibility, SaaS has least. Customer is ALWAYS responsible for data and access management. Using a compliant cloud doesn\'t automatically make you compliant.',
        cheatsheet: [
            'Provider = Security OF the cloud',
            'Customer = Security IN the cloud',
            'IaaS = Most customer responsibility',
            'SaaS = Least customer responsibility',
            'Data + Access = ALWAYS customer',
            'Misconfiguration = Customer fault',
        ],
        relatedTopics: ['iaas', 'paas', 'saas', 'iam-basics', 'security-groups'],
    },
];

export default cloudFundamentalsTopics;
