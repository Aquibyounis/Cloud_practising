import type { Topic } from '../../types';

export const devopsTopics: Topic[] = [
    {
        id: 'devops-overview',
        title: 'DevOps Overview',
        slug: 'devops-overview',
        category: 'devops-basics',
        zone: 'A',
        icon: 'GitBranch',
        description: 'Understanding DevOps culture and practices',
        estimatedTime: 12,
        content: {
            beginner: `
# DevOps Overview

## What is DevOps?

DevOps is a **culture and set of practices** that brings development (Dev) and operations (Ops) together to deliver software faster and more reliably.

## Traditional vs DevOps

| Traditional | DevOps |
|-------------|--------|
| Dev and Ops separate | Dev and Ops collaborate |
| Manual deployments | Automated pipelines |
| Monthly/quarterly releases | Daily/weekly releases |
| Blame culture | Shared responsibility |

## DevOps Pillars

1. **Culture**: Collaboration, trust
2. **Automation**: Reduce manual work
3. **Measurement**: Track everything
4. **Sharing**: Knowledge transfer

## Key Practices

- CI/CD (Continuous Integration/Deployment)
- Infrastructure as Code
- Monitoring and Logging
- Automated Testing
- Microservices

## Benefits

✅ Faster time to market
✅ Higher quality software
✅ Improved collaboration
✅ Faster recovery from failures
      `,
            intermediate: `
# DevOps - Core Practices

## CI/CD Pipeline

\`\`\`
Code → Build → Test → Deploy → Monitor
  ↑                              ↓
  └──────── Feedback ──────────←┘
\`\`\`

### Continuous Integration (CI)
- Merge code frequently
- Automated build on every commit
- Run automated tests

### Continuous Deployment (CD)
- Automated deployment to staging
- Automated testing in staging
- Automated or approved production deploy

## Infrastructure as Code (IaC)

\`\`\`
# Terraform example
resource "aws_instance" "web" {
  ami           = "ami-12345678"
  instance_type = "t3.micro"
}
\`\`\`

Benefits:
- Version controlled
- Reproducible
- Reviewable
- Automated

## DevOps Tools

| Category | Tools |
|----------|-------|
| Source Control | Git, GitHub, GitLab |
| CI/CD | Jenkins, GitHub Actions, GitLab CI |
| Configuration | Ansible, Chef, Puppet |
| Containers | Docker, Kubernetes |
| IaC | Terraform, CloudFormation |
| Monitoring | Prometheus, Grafana, Datadog |
      `,
            advanced: `
# DevOps - Advanced Practices

## GitOps

\`\`\`
Git Repo (single source of truth)
         ↓
    Automation Watches
         ↓
    Applies Changes to Cluster
\`\`\`

- Declarative infrastructure
- Version control for operations
- Self-healing

## SRE (Site Reliability Engineering)

Google's approach to DevOps:

| Concept | Description |
|---------|-------------|
| SLI | Service Level Indicator |
| SLO | Service Level Objective |
| SLA | Service Level Agreement |
| Error Budget | Allowed failures |

## DevSecOps

Security integrated into DevOps:

\`\`\`
Code → SAST → Build → DAST → Deploy → RASP → Monitor
       ↑              ↑              ↑
    Security      Security        Security
\`\`\`

## Deployment Strategies

| Strategy | Description | Risk |
|----------|-------------|------|
| Rolling | Gradual replacement | Low |
| Blue/Green | Switch environments | Low |
| Canary | Small % first | Very Low |
| Recreate | All at once | High |
      `,
        },
        keyPoints: [
            'DevOps unifies Dev and Ops for faster delivery',
            'CI/CD automates build, test, and deployment',
            'Infrastructure as Code makes infra reproducible',
            'Automation reduces errors and increases speed',
            'Monitoring provides feedback for improvement',
            'Culture of collaboration is essential',
        ],
        realWorldExamples: [
            {
                title: 'Amazon Deployment Speed',
                company: 'Amazon',
                scenario: 'Need rapid feature deployment',
                solution: 'Full DevOps culture and automation',
                outcome: 'Deploy to production every 11.7 seconds',
            },
        ],
        mcqs: [
            {
                id: 'devops-1',
                question: 'DevOps primarily focuses on:',
                options: ['Development only', 'Operations only', 'Collaboration between Dev and Ops', 'Security only'],
                correctAnswer: 2,
                explanation: 'DevOps brings together development and operations teams for faster, more reliable delivery.',
                difficulty: 'easy',
                tags: ['devops'],
            },
            {
                id: 'devops-2',
                question: 'CI/CD stands for:',
                options: ['Code Integration/Code Deployment', 'Continuous Integration/Continuous Deployment', 'Compiled Integration/Compiled Deployment', 'Cloud Integration/Cloud Deployment'],
                correctAnswer: 1,
                explanation: 'CI/CD means Continuous Integration (frequent merging and testing) and Continuous Deployment (automated deployment).',
                difficulty: 'easy',
                tags: ['devops', 'cicd'],
            },
        ],
        commonMistakes: [
            'Thinking DevOps is just tools (its culture + practices)',
            'Skipping automated testing in CI/CD',
            'Not measuring deployment frequency and reliability',
        ],
        comparisons: [],
        summary: 'DevOps combines Dev and Ops for faster delivery. Key practices: CI/CD, IaC, monitoring. Automation reduces errors. Culture of collaboration is foundation.',
        cheatsheet: ['DevOps = Dev + Ops collaboration', 'CI = Frequent merge + test', 'CD = Auto deploy', 'IaC = Infra in code', 'Measure everything'],
        relatedTopics: ['cicd-basics', 'iac-fundamentals', 'containers-vs-vms'],
    },
    {
        id: 'cicd-basics',
        title: 'CI/CD Pipelines',
        slug: 'cicd-basics',
        category: 'devops-basics',
        zone: 'A',
        icon: 'GitMerge',
        description: 'Continuous Integration and Deployment fundamentals',
        estimatedTime: 12,
        content: {
            beginner: `
# CI/CD Pipelines

## What is CI/CD?

**CI (Continuous Integration)**: Developers merge code frequently, automated builds and tests run.

**CD (Continuous Delivery/Deployment)**:
- Delivery: Can deploy any time (manual approval)
- Deployment: Automatically deploys to production

## Why CI/CD?

| Without CI/CD | With CI/CD |
|---------------|------------|
| Integration hell | Smooth merges |
| Manual testing | Automated tests |
| Fear of deploying | Deploy confidently |
| Long feedback loops | Fast feedback |

## CI/CD Pipeline Stages

\`\`\`
1. Source    → Code pushed to repo
2. Build     → Compile/package code
3. Test      → Run automated tests
4. Deploy    → Push to environment
5. Monitor   → Watch for issues
\`\`\`

## CI/CD Tools

- GitHub Actions
- GitLab CI/CD
- Jenkins
- AWS CodePipeline
- Azure DevOps
- CircleCI
      `,
            intermediate: `
# CI/CD - Pipeline Design

## Example Pipeline

\`\`\`yaml
# GitHub Actions example
name: CI/CD Pipeline
on: [push]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build
        run: npm ci && npm run build
      - name: Test
        run: npm test
      - name: Deploy
        run: npm run deploy
\`\`\`

## Testing Levels

| Level | What | When |
|-------|------|------|
| Unit | Functions | Every commit |
| Integration | Components | Every commit |
| E2E | Full flow | Before deploy |
| Performance | Load | Nightly/weekly |

## Environment Promotion

\`\`\`
Dev → Test → Staging → Production
 ↓      ↓       ↓          ↓
Auto   Auto   Auto    Auto/Manual
\`\`\`

## Artifact Management

- Store build outputs
- Version all artifacts
- Deploy same artifact to all envs
- Examples: Nexus, Artifactory, S3
      `,
            advanced: `
# CI/CD - Advanced Patterns

## Deployment Strategies

### Blue/Green

\`\`\`
Blue (current) ←── Traffic
Green (new)

After testing:
Blue
Green (new) ←── Traffic (switched)
\`\`\`

### Canary

\`\`\`
v1 ← 95% traffic
v2 ← 5% traffic (canary)

Gradually increase v2 %
\`\`\`

### Rolling

\`\`\`
Instance 1: v2 (updated)
Instance 2: v1 → v2
Instance 3: v1 → v2
Instance 4: v1 → v2
\`\`\`

## Pipeline Security

- Scan dependencies (SCA)
- Scan code (SAST)
- Scan containers
- Secret management
- Signed artifacts

## AWS CI/CD Services

| Service | Purpose |
|---------|---------|
| CodeCommit | Git repository |
| CodeBuild | Build service |
| CodeDeploy | Deployment |
| CodePipeline | Orchestration |
      `,
        },
        keyPoints: [
            'CI = Frequent integration with automated tests',
            'CD = Automated deployment (Delivery=manual gate, Deployment=auto)',
            'Pipelines: Source → Build → Test → Deploy → Monitor',
            'Blue/Green: Zero-downtime switchover',
            'Canary: Gradual rollout to catch issues',
            'Automated testing is essential for CI/CD',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Deployment',
                company: 'Netflix',
                scenario: 'Deploy to millions of users safely',
                solution: 'Canary deployments with automated rollback',
                outcome: 'Deploy hundreds of times per day',
            },
        ],
        mcqs: [
            {
                id: 'cicd-1',
                question: 'Continuous Integration means:',
                options: ['Deploy to production automatically', 'Integrate code frequently with automated tests', 'Manual code review', 'Weekly deployments'],
                correctAnswer: 1,
                explanation: 'CI means developers integrate (merge) code frequently, with automated builds and tests on each integration.',
                difficulty: 'easy',
                tags: ['cicd', 'devops'],
            },
            {
                id: 'cicd-2',
                question: 'Blue/Green deployment involves:',
                options: ['Gradual rollout', 'Two identical environments', 'Manual deployment', 'Scheduled downtime'],
                correctAnswer: 1,
                explanation: 'Blue/Green uses two identical environments. Traffic switches from one to the other for zero-downtime deploys.',
                difficulty: 'medium',
                tags: ['cicd', 'deployment'],
            },
        ],
        commonMistakes: [
            'Confusing Continuous Delivery with Continuous Deployment',
            'Skipping tests to deploy faster (bad idea)',
            'Not having rollback capability',
        ],
        comparisons: [],
        summary: 'CI = Frequent integration + auto tests. CD = Auto deployment. Pipelines: Source→Build→Test→Deploy. Blue/Green for zero-downtime. Canary for safe rollouts.',
        cheatsheet: ['CI = Merge + Test frequently', 'CD = Auto deploy', 'Blue/Green = 2 environments', 'Canary = Gradual %', 'Always have rollback'],
        relatedTopics: ['devops-overview', 'iac-fundamentals', 'containers-vs-vms'],
    },
];

export default devopsTopics;
