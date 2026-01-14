import type { Topic } from '../../types';

export const zoneBSecurityTopics: Topic[] = [
    {
        id: 'zero-trust',
        title: 'Zero Trust Security Model',
        slug: 'zero-trust',
        category: 'security-advanced',
        zone: 'B',
        icon: 'ShieldCheck',
        description: 'Never trust, always verify security approach',
        estimatedTime: 15,
        content: {
            beginner: `
# Zero Trust Security

## What is Zero Trust?

Zero Trust is a security model based on **"never trust, always verify"**. Every request is treated as if it comes from an untrusted network.

## Traditional vs Zero Trust

| Traditional | Zero Trust |
|-------------|------------|
| Trust inside perimeter | Trust nothing |
| Verify at entry | Verify every request |
| Static permissions | Dynamic/contextual |
| Network-centric | Identity-centric |

## Zero Trust Principles

1. **Verify explicitly**: Authenticate every request
2. **Least privilege**: Minimal permissions
3. **Assume breach**: Design for compromise

## Key Components

- Strong identity verification
- Device health checks
- Network segmentation
- Encryption everywhere
- Continuous monitoring
      `,
            intermediate: `
# Zero Trust Implementation

## Identity Pillar

\`\`\`
User → MFA → Check Device → Check Context → Grant Access
                              ↓
                         Location?
                         Time?
                         Behavior?
\`\`\`

## Network Pillar

### Microsegmentation
\`\`\`
Traditional:
[All Apps] ← Firewall → [Internet]

Zero Trust:
[App A] ←→ [App B] (each connection verified)
\`\`\`

## AWS Zero Trust Services

| Layer | Service |
|-------|---------|
| Identity | IAM, SSO, Cognito |
| Network | Security Groups, PrivateLink |
| Data | KMS, Macie |
| Endpoint | Systems Manager |
| Monitoring | CloudTrail, GuardDuty |

## SASE (Secure Access Service Edge)

Combines networking + security:
- SD-WAN
- Zero Trust Network Access (ZTNA)
- Cloud Access Security Broker (CASB)
- Firewall as a Service (FWaaS)
      `,
            advanced: `
# Zero Trust - Advanced

## BeyondCorp (Google Model)

\`\`\`
Access Decision:
  = f(User identity, Device trust, Context)
  
No VPN required
Every app protected
Device certificates required
\`\`\`

## Implementation Roadmap

1. Inventory users, devices, data
2. Map transaction flows
3. Architect zero trust network
4. Create zero trust policy
5. Monitor and maintain

## Identity Governance

| Aspect | Implementation |
|--------|---------------|
| Authentication | MFA mandatory |
| Authorization | RBAC + ABAC |
| Privileged Access | PAM, just-in-time |
| Review | Periodic access reviews |

## Continuous Verification

\`\`\`
Initial Auth → Continuous Evaluation → Re-auth if risk
                       ↓
              - Location change
              - Time anomaly
              - Behavior change
              - Device risk
\`\`\`
      `,
        },
        keyPoints: [
            'Zero Trust: Never trust, always verify',
            'Three principles: Verify explicitly, least privilege, assume breach',
            'Identity-centric, not network-centric',
            'Microsegmentation for network security',
            'Continuous verification, not one-time auth',
            'BeyondCorp is Googles Zero Trust model',
        ],
        realWorldExamples: [],
        mcqs: [
            {
                id: 'zt-1',
                question: 'Zero Trust is based on:',
                options: ['Trust internal network', 'Never trust, always verify', 'Trust all verified users forever', 'No authentication needed'],
                correctAnswer: 1,
                explanation: 'Zero Trust means never trust any request by default and verify every access attempt.',
                difficulty: 'easy',
                tags: ['security', 'zero-trust'],
            },
        ],
        commonMistakes: [
            'Thinking perimeter security is enough',
            'Not implementing continuous verification',
            'Ignoring device trust',
        ],
        comparisons: [],
        summary: 'Zero Trust = never trust, always verify. Verify explicitly + least privilege + assume breach. Identity-centric with continuous verification. Microsegmentation for network.',
        cheatsheet: ['Never trust, always verify', 'Least privilege', 'Assume breach', 'Verify every request', 'Microsegmentation'],
        relatedTopics: ['cloud-security-basics', 'aws-iam', 'encryption-basics'],
    },
    {
        id: 'devsecops',
        title: 'DevSecOps Practices',
        slug: 'devsecops',
        category: 'security-advanced',
        zone: 'B',
        icon: 'ShieldAlert',
        description: 'Integrating security into DevOps pipelines',
        estimatedTime: 18,
        content: {
            beginner: `
# DevSecOps

## What is DevSecOps?

DevSecOps integrates **security into every phase** of the software development lifecycle, rather than treating it as an afterthought.

## DevOps vs DevSecOps

| DevOps | DevSecOps |
|--------|-----------|
| Dev + Ops | Dev + Sec + Ops |
| Speed focus | Speed + Security |
| Security at end | Security throughout |

## Security Shift Left

\`\`\`
Traditional:    Plan → Build → Test → Deploy → [Security]
DevSecOps:  [Security] throughout →→→→→→→→→→
\`\`\`

## Key Practices

1. Security in design phase
2. Automated security testing
3. Secure coding practices
4. Infrastructure security
5. Continuous monitoring
      `,
            intermediate: `
# DevSecOps Pipeline

## Security in CI/CD

\`\`\`
Code → SAST → Build → Image Scan → Test → DAST → Deploy → Runtime
        ↓                  ↓              ↓              ↓
    Static         Container        Dynamic         RASP
    Analysis         Scan          Testing       Protection
\`\`\`

## Security Testing Types

| Type | When | What |
|------|------|------|
| SAST | Build | Analyze source code |
| SCA | Build | Check dependencies |
| DAST | Test | Test running app |
| IAST | Test | Interactive testing |
| RASP | Runtime | Runtime protection |

## Tools by Stage

| Stage | Tools |
|-------|-------|
| SAST | SonarQube, Checkmarx, Semgrep |
| SCA | Snyk, Dependabot, OWASP DC |
| Container | Trivy, Clair, Aqua |
| DAST | OWASP ZAP, Burp Suite |
| Secrets | GitLeaks, Trufflehog |

## Secure Coding

| Practice | Example |
|----------|---------|
| Input validation | Validate all user input |
| Parameterized queries | Prevent SQL injection |
| Output encoding | Prevent XSS |
| Least privilege | Minimal permissions |
      `,
            advanced: `
# DevSecOps - Advanced

## Security as Code

\`\`\`yaml
# Policy as Code (OPA)
package kubernetes.admission

deny[msg] {
  input.request.kind.kind == "Pod"
  container := input.request.object.spec.containers[_]
  not container.securityContext.runAsNonRoot
  msg := "Containers must run as non-root"
}
\`\`\`

## Threat Modeling

\`\`\`
1. Decompose application
2. Identify threats (STRIDE)
3. Rate threats
4. Determine mitigations
5. Validate mitigations
\`\`\`

### STRIDE Model
- **S**poofing
- **T**ampering
- **R**epudiation
- **I**nformation Disclosure
- **D**enial of Service
- **E**levation of Privilege

## Security Gates

| Gate | Fail Criteria |
|------|---------------|
| SAST | High/Critical findings |
| SCA | Known vulnerabilities |
| Secrets | Any detected |
| Container | CVE score > 7 |
| DAST | OWASP Top 10 |

## AWS Security Services

| Phase | Service |
|-------|---------|
| Code | CodeGuru, Inspector |
| Build | ECR scanning |
| Runtime | GuardDuty, WAF |
| Compliance | Config, Security Hub |
      `,
        },
        keyPoints: [
            'DevSecOps = Security integrated into DevOps',
            'Shift left: Security early, not at end',
            'SAST for code, SCA for dependencies, DAST for runtime',
            'Automate security testing in CI/CD',
            'Security gates prevent insecure deployments',
            'STRIDE for threat modeling',
        ],
        realWorldExamples: [],
        mcqs: [
            {
                id: 'devsecops-1',
                question: 'SAST analyzes:',
                options: ['Running application', 'Source code', 'Network traffic', 'Container images'],
                correctAnswer: 1,
                explanation: 'SAST (Static Application Security Testing) analyzes source code without running it.',
                difficulty: 'medium',
                tags: ['security', 'devsecops'],
            },
        ],
        commonMistakes: [
            'Adding security only at the end',
            'Not automating security testing',
            'Ignoring dependency vulnerabilities',
        ],
        comparisons: [],
        summary: 'DevSecOps integrates security throughout SDLC. Shift left = security early. SAST for code, SCA for dependencies, DAST for runtime. Automate security gates in CI/CD.',
        cheatsheet: ['Shift left = early security', 'SAST = static code', 'SCA = dependencies', 'DAST = running app', 'Automate security tests'],
        relatedTopics: ['cicd-basics', 'cloud-security-basics', 'devops-overview'],
    },
];

export default zoneBSecurityTopics;
