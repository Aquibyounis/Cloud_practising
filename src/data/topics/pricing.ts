import type { Topic } from '../../types';

export const pricingTopics: Topic[] = [
    {
        id: 'cloud-pricing-models',
        title: 'Cloud Pricing Models',
        slug: 'cloud-pricing-models',
        category: 'pricing-models',
        zone: 'A',
        icon: 'DollarSign',
        description: 'Understanding how cloud providers charge for services',
        estimatedTime: 12,
        content: {
            beginner: `
# Cloud Pricing Models

## How Cloud Pricing Works

Cloud computing uses **pay-as-you-go** pricing. You pay for what you use, like electricity.

## Common Pricing Models

| Model | Description | Best For |
|-------|-------------|----------|
| On-Demand | Pay per hour/second | Variable workloads |
| Reserved | Commit 1-3 years | Steady workloads |
| Spot/Preemptible | Use spare capacity | Fault-tolerant |
| Savings Plans | Flexible commitment | Mixed workloads |

## What You Pay For

- **Compute**: CPU/memory time
- **Storage**: GB stored per month
- **Data Transfer**: Data going OUT
- **Requests**: API calls, queries
- **Features**: Premium features extra

## Free Tier

All major providers offer free tiers:
- AWS: 12 months free for many services
- Azure: 12 months + always free services
- GCP: 90-day $300 credit + always free

## Cost Optimization Tips

✅ Right-size instances
✅ Use reserved/savings plans
✅ Delete unused resources
✅ Use auto-scaling
✅ Monitor with cost tools
      `,
            intermediate: `
# Cloud Pricing - Deep Dive

## AWS Pricing Comparison

| Model | Savings | Commitment |
|-------|---------|------------|
| On-Demand | 0% | None |
| Reserved (Standard) | Up to 72% | 1-3 years |
| Savings Plans | Up to 72% | 1-3 years (flexible) |
| Spot | Up to 90% | None (can interrupt) |
| Dedicated Host | Varies | Physical server |

## Reserved Instance Types

| Type | Flexibility | Savings |
|------|-------------|---------|
| Standard RI | Low | Highest |
| Convertible RI | Medium | Lower |
| Savings Plans | High | Medium |

## Billing Dimensions

| Service | Billing Model |
|---------|--------------|
| EC2 | Per second (min 60s) |
| S3 | GB stored + requests |
| RDS | Instance hour + storage |
| Lambda | Requests + GB-seconds |
| Data Transfer | GB out (inbound free) |

## Data Transfer Costs

\`\`\`
Internet → AWS: FREE
AWS → Internet: $0.09/GB (first 10TB)
Same Region (AZ to AZ): $0.01/GB
Cross Region: $0.02/GB
Same AZ: FREE
\`\`\`
      `,
            advanced: `
# Cloud Cost Optimization

## TCO (Total Cost of Ownership)

On-premises vs Cloud comparison:

| Factor | On-Premises | Cloud |
|--------|------------|-------|
| Hardware | Buy | Rent |
| Maintenance | Your team | Provider |
| Power/Cooling | Your cost | Included |
| Scaling | Lead time | Instant |
| Utilization | Often low | Pay for use |

## Cost Optimization Strategies

### 1. Right-Sizing
- Monitor utilization
- Downsize underutilized
- Use AWS Compute Optimizer

### 2. Scheduling
- Stop non-prod after hours
- Use Instance Scheduler
- Weekend shutdowns

### 3. Storage Optimization
- S3 Intelligent-Tiering
- Lifecycle policies
- Delete old snapshots

## Cost Management Tools

| AWS | Azure | GCP |
|-----|-------|-----|
| Cost Explorer | Cost Management | Billing Console |
| Budgets | Budgets | Budgets |
| Compute Optimizer | Advisor | Recommender |
| Trusted Advisor | Advisor | Recommendations |
      `,
        },
        keyPoints: [
            'Pay-as-you-go: Pay only for what you use',
            'Reserved/Savings Plans: 72% savings with commitment',
            'Spot instances: 90% savings, can be interrupted',
            'Data transfer OUT costs money, IN is usually free',
            'Right-sizing and scheduling reduce costs',
            'Use provider cost tools for optimization',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Cost Strategy',
                company: 'Netflix',
                scenario: 'Massive EC2 usage for encoding',
                solution: 'Heavy use of Spot instances for encoding jobs',
                outcome: 'Significant cost savings on fault-tolerant workloads',
            },
        ],
        mcqs: [
            {
                id: 'pricing-1',
                question: 'Reserved Instances offer savings up to:',
                options: ['25%', '50%', '72%', '90%'],
                correctAnswer: 2,
                explanation: 'Reserved Instances offer up to 72% savings. Spot instances offer up to 90% but can be interrupted.',
                difficulty: 'easy',
                tags: ['pricing', 'aws'],
            },
            {
                id: 'pricing-2',
                question: 'Data transfer INTO AWS is typically:',
                options: ['Most expensive', 'Free', 'Same as out', 'By request'],
                correctAnswer: 1,
                explanation: 'Data transfer IN to AWS is free. Data transfer OUT costs money (egress charges).',
                difficulty: 'easy',
                tags: ['pricing'],
            },
            {
                id: 'pricing-3',
                question: 'Spot instances are best for:',
                options: ['Production databases', 'Fault-tolerant batch jobs', 'Critical web servers', 'Long-running stateful apps'],
                correctAnswer: 1,
                explanation: 'Spot instances can be interrupted, so they are best for fault-tolerant, stateless workloads like batch processing.',
                difficulty: 'medium',
                tags: ['pricing', 'spot'],
            },
        ],
        commonMistakes: [
            'Using on-demand for steady workloads (waste money)',
            'Using Spot for critical production (can be interrupted)',
            'Ignoring data transfer costs in architecture',
        ],
        comparisons: [],
        summary: 'Cloud uses pay-as-you-go pricing. Reserved = 72% savings with commitment. Spot = 90% savings but can interrupt. Data IN is free, OUT costs. Right-size and schedule to optimize.',
        cheatsheet: ['On-Demand = No commitment', 'Reserved = 72% off, commit', 'Spot = 90% off, interrupts', 'Data IN = Free', 'Data OUT = Costs'],
        relatedTopics: ['capex-opex', 'cloud-fundamentals', 'aws-ec2'],
    },
    {
        id: 'cost-optimization',
        title: 'Cloud Cost Optimization',
        slug: 'cost-optimization',
        category: 'pricing-models',
        zone: 'A',
        icon: 'TrendingDown',
        description: 'Strategies to reduce cloud spending',
        estimatedTime: 10,
        content: {
            beginner: `
# Cloud Cost Optimization

## Why Optimize?

Cloud costs can grow quickly without proper management. Common causes:
- Oversized instances
- Unused resources
- Running 24/7 when not needed
- Wrong pricing model

## Quick Wins

### 1. Delete Unused Resources
- Unattached EBS volumes
- Old snapshots
- Idle load balancers
- Unused Elastic IPs

### 2. Right-Size Instances
- Monitor CPU/memory usage
- Downgrade if < 40% utilized
- Use AWS Compute Optimizer

### 3. Use Scheduling
- Stop dev/test at night
- Weekend shutdowns
- Auto-stop after hours

### 4. Review Pricing Model
- On-demand → Reserved for steady
- Standard → Spot for batch jobs
      `,
            intermediate: `
# Cost Optimization - Strategies

## Cost Allocation

### Tagging Strategy

\`\`\`
Key: CostCenter    Value: Engineering
Key: Environment   Value: Production
Key: Owner         Value: TeamA
Key: Project       Value: WebApp
\`\`\`

### Cost Allocation Reports
- Break down by department
- Track project costs
- Identify waste

## Reserved Instance Planning

1. Analyze 12-month usage history
2. Identify steady-state workloads
3. Calculate break-even point
4. Purchase appropriate RIs
5. Monitor utilization

## Savings Plans vs RIs

| Aspect | Savings Plans | Reserved Instances |
|--------|--------------|-------------------|
| Flexibility | High | Low-Medium |
| Applies to | Any EC2, Fargate, Lambda | Specific instance |
| Region locked | No (Compute SP) | Yes (Standard RI) |

## Storage Optimization

- S3 Intelligent-Tiering
- EBS volume type selection
- Snapshot lifecycle policies
- S3 Glacier for archives
      `,
            advanced: `
# Cost Optimization - Advanced

## FinOps Practices

1. **Visibility**: Know where money goes
2. **Optimization**: Reduce waste
3. **Governance**: Prevent waste

## Architectural Cost Patterns

| Pattern | Description | Savings |
|---------|-------------|---------|
| Serverless | Pay per execution | Variable |
| Containers | Higher density | 20-40% |
| Spot fleets | Mixed instances | 60-80% |
| Multi-region | Traffic-based | Varies |

## Cost Anomaly Detection

AWS Cost Anomaly Detection:
- ML-based anomaly detection
- Automatic alerts
- Root cause analysis

## Chargeback/Showback

\`\`\`
Total Bill → Split by Tags → Department Bills
              or
Total Bill → Show Usage → Awareness (no charge)
\`\`\`

## Commitment Strategy

\`\`\`
80% baseline → Reserved/Savings Plans
15% variable → On-Demand
5% burst → Spot
\`\`\`
      `,
        },
        keyPoints: [
            'Delete unused resources (volumes, IPs, snapshots)',
            'Right-size instances based on utilization',
            'Use scheduling for non-prod environments',
            'Tag resources for cost allocation',
            'Savings Plans offer flexibility over RIs',
            'Use tiered storage for cost efficiency',
        ],
        realWorldExamples: [
            {
                title: 'Lyft Cost Reduction',
                company: 'Lyft',
                scenario: 'Cloud costs growing faster than revenue',
                solution: 'FinOps team, rightsizing, Spot instances',
                outcome: '30% reduction in cloud spending',
            },
        ],
        mcqs: [
            {
                id: 'cost-opt-1',
                question: 'First step in cost optimization is:',
                options: ['Buy reserved instances', 'Delete everything', 'Gain visibility into costs', 'Switch providers'],
                correctAnswer: 2,
                explanation: 'You cant optimize what you dont understand. First, gain visibility into where costs are coming from.',
                difficulty: 'easy',
                tags: ['cost', 'optimization'],
            },
            {
                id: 'cost-opt-2',
                question: 'Tagging helps with:',
                options: ['Performance', 'Security', 'Cost allocation', 'Availability'],
                correctAnswer: 2,
                explanation: 'Tags allow you to categorize resources for cost allocation and tracking by department, project, etc.',
                difficulty: 'easy',
                tags: ['cost', 'tagging'],
            },
        ],
        commonMistakes: [
            'Optimizing without understanding current costs first',
            'Buying RIs without analyzing usage patterns',
            'Not tagging resources (makes tracking impossible)',
        ],
        comparisons: [],
        summary: 'Optimize by: 1) Delete unused resources, 2) Right-size instances, 3) Use scheduling, 4) Apply reserved/savings plans, 5) Tag for allocation, 6) Use tiered storage.',
        cheatsheet: ['Delete unused first', 'Right-size < 40% util', 'Schedule non-prod', 'Tag everything', 'Savings Plans > RIs flex'],
        relatedTopics: ['cloud-pricing-models', 'capex-opex', 'cloud-fundamentals'],
    },
];

export default pricingTopics;
