import type { Topic } from '../../types';

export const securityTopics: Topic[] = [
    {
        id: 'cloud-security-basics',
        title: 'Cloud Security Fundamentals',
        slug: 'cloud-security-basics',
        category: 'security-basics',
        zone: 'A',
        icon: 'Shield',
        description: 'Core security concepts for cloud computing',
        estimatedTime: 15,
        content: {
            beginner: `
# Cloud Security Fundamentals

## Why Cloud Security Matters

Cloud security protects your:
- **Data** from unauthorized access
- **Applications** from attacks
- **Infrastructure** from compromise
- **Compliance** with regulations

## Security Principles (CIA Triad)

| Principle | Description |
|-----------|-------------|
| Confidentiality | Only authorized access |
| Integrity | Data not modified |
| Availability | Systems are accessible |

## Key Security Concepts

- **Authentication**: Verify identity (who are you?)
- **Authorization**: Check permissions (what can you do?)
- **Encryption**: Protect data from reading
- **Audit**: Log and monitor activities

## Defense in Depth

Multiple layers of security:

\`\`\`
Physical Security
    ↓
Network Security
    ↓
Identity & Access
    ↓
Application Security
    ↓
Data Security
\`\`\`
      `,
            intermediate: `
# Cloud Security - Implementation

## Encryption Types

| Type | When | Examples |
|------|------|----------|
| At Rest | Stored data | S3 encryption, EBS |
| In Transit | Moving data | TLS/SSL, HTTPS |
| In Use | Processing | Confidential computing |

## Identity Security

### Multi-Factor Authentication (MFA)

\`\`\`
Something you KNOW (password)
       +
Something you HAVE (phone/token)
       +
Something you ARE (biometrics)
\`\`\`

### Least Privilege Principle

Give only the permissions needed, nothing more.

## Network Security

| Control | Purpose |
|---------|---------|
| VPN | Encrypted tunnel |
| Security Groups | Instance firewall |
| NACLs | Subnet firewall |
| WAF | Web app protection |
| DDoS Protection | Availability attacks |

## Security Services

| AWS | Azure | GCP |
|-----|-------|-----|
| GuardDuty | Sentinel | Security Command |
| Inspector | Defender | Security Scanner |
| WAF | WAF | Cloud Armor |
| Shield | DDoS Protection | Cloud Armor |
      `,
            advanced: `
# Cloud Security - Advanced

## Zero Trust Model

"Never trust, always verify"

1. Verify explicitly (every request)
2. Use least privilege
3. Assume breach

## Compliance Frameworks

| Framework | Focus |
|-----------|-------|
| SOC 2 | Service organization controls |
| ISO 27001 | Information security |
| PCI DSS | Payment card data |
| HIPAA | Healthcare (US) |
| GDPR | Data protection (EU) |

## Security Automation

\`\`\`
Code Commit → Security Scan → Deploy → Runtime Protection
                   ↓
            Fix Vulnerabilities
\`\`\`

### DevSecOps Tools
- SAST: Static code analysis
- DAST: Dynamic testing
- SCA: Dependency scanning
- IAST: Interactive testing

## Incident Response

1. **Preparation**: Plans, tools, training
2. **Detection**: Identify incidents
3. **Containment**: Limit damage
4. **Eradication**: Remove threat
5. **Recovery**: Restore operations
6. **Lessons Learned**: Improve
      `,
        },
        keyPoints: [
            'CIA Triad: Confidentiality, Integrity, Availability',
            'Defense in Depth: Multiple security layers',
            'Encryption at rest and in transit',
            'Least Privilege: Minimum required permissions',
            'MFA adds extra authentication layer',
            'Zero Trust: Never trust, always verify',
        ],
        realWorldExamples: [
            {
                title: 'Capital One Breach',
                company: 'Capital One',
                scenario: 'Misconfigured WAF led to data breach',
                solution: 'AWS improved metadata service security (IMDSv2)',
                outcome: 'Industry-wide improvements in cloud security practices',
            },
        ],
        mcqs: [
            {
                id: 'security-1',
                question: 'CIA Triad stands for:',
                options: ['Central Intelligence Agency', 'Confidentiality, Integrity, Availability', 'Cloud Infrastructure Access', 'Compute, Identity, Authorization'],
                correctAnswer: 1,
                explanation: 'CIA Triad represents the three pillars of security: Confidentiality, Integrity, and Availability.',
                difficulty: 'easy',
                tags: ['security', 'fundamentals'],
            },
            {
                id: 'security-2',
                question: 'Least Privilege means:',
                options: ['No access by default', 'Admin access for everyone', 'Minimum required permissions', 'Public access'],
                correctAnswer: 2,
                explanation: 'Least Privilege principle means giving only the minimum permissions needed to perform a task.',
                difficulty: 'easy',
                tags: ['security', 'access-control'],
            },
            {
                id: 'security-3',
                question: 'Encryption at rest protects:',
                options: ['Data being transmitted', 'Stored data', 'Running applications', 'Network traffic'],
                correctAnswer: 1,
                explanation: 'Encryption at rest protects stored data on disks, databases, etc. Encryption in transit protects moving data.',
                difficulty: 'easy',
                tags: ['security', 'encryption'],
            },
        ],
        commonMistakes: [
            'Confusing encryption at rest with in transit',
            'Thinking cloud provider handles all security (shared responsibility)',
            'Overlooking the need for MFA on all accounts',
        ],
        comparisons: [],
        summary: 'Cloud security follows CIA Triad (Confidentiality, Integrity, Availability). Defense in depth with multiple layers. Encryption at rest and in transit. Least privilege for access. MFA for authentication.',
        cheatsheet: ['CIA = Confidentiality, Integrity, Availability', 'Encryption: At Rest + In Transit', 'Least Privilege = Min permissions', 'MFA = Multi-factor auth', 'Defense in Depth = Layers'],
        relatedTopics: ['shared-responsibility', 'aws-iam', 'vpc-basics'],
    },
    {
        id: 'encryption-basics',
        title: 'Encryption in Cloud',
        slug: 'encryption-basics',
        category: 'security-basics',
        zone: 'A',
        icon: 'Lock',
        description: 'Understanding encryption for cloud data protection',
        estimatedTime: 12,
        content: {
            beginner: `
# Encryption in Cloud

## What is Encryption?

Encryption converts readable data (plaintext) into unreadable data (ciphertext) using a key. Only those with the key can decrypt it.

\`\`\`
Plaintext → Encrypt (key) → Ciphertext → Decrypt (key) → Plaintext
\`\`\`

## Types of Encryption

| Type | Keys | Speed | Use Case |
|------|------|-------|----------|
| Symmetric | Same key | Fast | Data encryption |
| Asymmetric | Public/Private | Slow | Key exchange, signatures |

## Encryption in Cloud

### At Rest
- S3 bucket encryption
- EBS volume encryption
- Database encryption

### In Transit
- HTTPS/TLS
- VPN tunnels
- API encryption

## Key Management

- **AWS KMS**: Key Management Service
- **Azure Key Vault**: Secrets and keys
- **GCP Cloud KMS**: Key management
      `,
            intermediate: `
# Encryption - Technical Details

## S3 Encryption Options

| Type | Key Management | Description |
|------|---------------|-------------|
| SSE-S3 | AWS managed | Simplest |
| SSE-KMS | Customer KMS key | Auditable |
| SSE-C | Customer provided | Full control |
| Client-side | Customer | Before upload |

## KMS Key Types

| Type | Managed By | Cost |
|------|-----------|------|
| AWS Managed | AWS | Free |
| Customer Managed | Customer | $1/month/key |
| Imported | Customer | Bring your own |

## Envelope Encryption

\`\`\`
Data Key (encrypts data)
    ↓
KMS Master Key (encrypts data key)
    ↓
Encrypted Data Key stored with data
\`\`\`

Benefits:
- Large data encrypted locally (fast)
- Only small data key needs KMS (secure)

## TLS/SSL

\`\`\`
Client → Hello → Server
        ← Certificate
Server Key Exchange →
        ← Client Key
Encrypted Session ←→
\`\`\`
      `,
            advanced: `
# Encryption - Advanced Topics

## Hardware Security Modules (HSM)

- Dedicated hardware for key storage
- FIPS 140-2 Level 3 certified
- AWS CloudHSM
- Required for some compliance

## Key Rotation

| Strategy | Description |
|----------|-------------|
| Automatic | AWS rotates yearly |
| Manual | Customer rotates |
| Re-encryption | Rotate by re-encrypting |

## Cross-Account Encryption

\`\`\`
Account A (KMS Key)
    ↓ Key Policy allows Account B
Account B → Use key to encrypt/decrypt
\`\`\`

## Encryption Algorithms

| Algorithm | Type | Status |
|-----------|------|--------|
| AES-256 | Symmetric | Current standard |
| RSA-2048+ | Asymmetric | Secure |
| SHA-256 | Hashing | Secure |
| MD5 | Hashing | Deprecated |

## AWS Encryption Equivalents

| AWS | Azure | GCP |
|-----|-------|-----|
| KMS | Key Vault | Cloud KMS |
| CloudHSM | Dedicated HSM | Cloud HSM |
| Secrets Manager | Key Vault Secrets | Secret Manager |
      `,
        },
        keyPoints: [
            'Symmetric encryption uses same key (fast, for data)',
            'Asymmetric uses public/private keys (for key exchange)',
            'Encryption at rest protects stored data',
            'Encryption in transit protects moving data (TLS)',
            'KMS manages encryption keys securely',
            'Envelope encryption: encrypt data key with master key',
        ],
        realWorldExamples: [
            {
                title: 'Bank Data Protection',
                company: 'Financial Institution',
                scenario: 'Customer financial data must be encrypted',
                solution: 'KMS with customer-managed keys, audit logging',
                outcome: 'PCI-DSS compliance achieved',
            },
        ],
        mcqs: [
            {
                id: 'encryption-1',
                question: 'SSE-S3 encryption is managed by:',
                options: ['Customer', 'AWS', 'Third party', 'No one'],
                correctAnswer: 1,
                explanation: 'SSE-S3 uses keys managed by AWS. SSE-KMS uses customer-managed KMS keys. SSE-C uses customer-provided keys.',
                difficulty: 'medium',
                tags: ['encryption', 'aws', 's3'],
            },
            {
                id: 'encryption-2',
                question: 'Symmetric encryption uses:',
                options: ['Different keys for encrypt/decrypt', 'Same key for encrypt/decrypt', 'No keys', 'Only public keys'],
                correctAnswer: 1,
                explanation: 'Symmetric encryption uses the same key for both encryption and decryption. Asymmetric uses different keys.',
                difficulty: 'easy',
                tags: ['encryption'],
            },
        ],
        commonMistakes: [
            'Confusing SSE-S3, SSE-KMS, and SSE-C',
            'Forgetting that encryption in transit requires TLS configuration',
            'Not rotating encryption keys',
        ],
        comparisons: [],
        summary: 'Symmetric encryption (same key) for data, asymmetric (pub/priv) for key exchange. At rest encrypts storage, in transit encrypts transmission. KMS for key management. Envelope encryption for efficiency.',
        cheatsheet: ['Symmetric = Same key', 'Asymmetric = Pub/Priv', 'At Rest = Storage', 'In Transit = TLS/HTTPS', 'KMS = Key management'],
        relatedTopics: ['cloud-security-basics', 'aws-s3', 'compliance'],
    },
    {
        id: 'compliance-overview',
        title: 'Cloud Compliance Basics',
        slug: 'compliance-overview',
        category: 'security-basics',
        zone: 'A',
        icon: 'FileCheck',
        description: 'Understanding compliance requirements in cloud',
        estimatedTime: 10,
        content: {
            beginner: `
# Cloud Compliance Basics

## What is Compliance?

Compliance means following rules, regulations, and standards that apply to your industry or data type.

## Common Compliance Standards

| Standard | Industry | Focus |
|----------|----------|-------|
| SOC 2 | All | Security controls |
| ISO 27001 | All | Information security |
| PCI DSS | Retail/Finance | Payment cards |
| HIPAA | Healthcare | Patient data (US) |
| GDPR | Any with EU data | Privacy (EU) |
| FedRAMP | Government | US federal cloud |

## Cloud Provider Certifications

All major providers (AWS, Azure, GCP) are certified for:
- SOC 1, 2, 3
- ISO 27001, 27017, 27018
- PCI DSS Level 1
- HIPAA (with BAA)
- GDPR compliance

## Your Responsibilities

Provider certification ≠ Your compliance

You must still:
- Configure services properly
- Implement required controls
- Document your compliance
- Pass your own audits
      `,
            intermediate: `
# Compliance - Shared Responsibility

## Who Handles What?

| Area | Provider | Customer |
|------|----------|----------|
| Physical security | ✅ | |
| Network infrastructure | ✅ | |
| OS patching (managed) | ✅ | |
| OS patching (IaaS) | | ✅ |
| Application security | | ✅ |
| Data encryption | Shared | Shared |
| Access control | | ✅ |
| Audit logging | Setup | Configuration |

## Compliance Tools

| AWS | Purpose |
|-----|---------|
| AWS Config | Configuration compliance |
| AWS Audit Manager | Audit evidence |
| AWS Artifact | Compliance reports |
| Security Hub | Compliance dashboard |

## Compliance Automation

\`\`\`
Define Rules → Monitor → Alert → Remediate
     ↓
  AWS Config Rules
     ↓
  Auto-remediation
\`\`\`
      `,
            advanced: `
# Compliance - Advanced

## Data Residency

| Requirement | Solution |
|-------------|----------|
| Data in specific country | Choose region carefully |
| Data never leaves region | Disable cross-region replication |
| EU data protection | EU regions + DPAs |

## GDPR Key Points

- Right to be forgotten
- Data portability
- Consent requirements
- Breach notification (72 hours)
- Data Protection Officer may be required

## PCI DSS Requirements

1. Build secure network
2. Protect cardholder data
3. Vulnerability management
4. Access control
5. Monitor and test
6. Information security policy

## Audit Evidence Collection

\`\`\`
CloudTrail Logs
      +
VPC Flow Logs
      +
Config Snapshots
      +
Access Reports
      ↓
  Audit Package
\`\`\`
      `,
        },
        keyPoints: [
            'Compliance means following regulations for your industry',
            'Common: SOC 2, ISO 27001, PCI DSS, HIPAA, GDPR',
            'Provider certifications dont make you automatically compliant',
            'Shared Responsibility: Provider + Customer controls',
            'AWS Config for compliance monitoring',
            'Data residency: Choose regions carefully',
        ],
        realWorldExamples: [
            {
                title: 'Healthcare Startup',
                company: 'Health Tech',
                scenario: 'Handling patient data in cloud',
                solution: 'HIPAA-eligible services, BAA with AWS, encryption',
                outcome: 'HIPAA compliance achieved with cloud infrastructure',
            },
        ],
        mcqs: [
            {
                id: 'compliance-1',
                question: 'GDPR applies to:',
                options: ['US healthcare only', 'Payment cards only', 'EU personal data', 'Government systems'],
                correctAnswer: 2,
                explanation: 'GDPR (General Data Protection Regulation) applies to processing personal data of EU residents.',
                difficulty: 'easy',
                tags: ['compliance', 'gdpr'],
            },
            {
                id: 'compliance-2',
                question: 'Cloud provider PCI DSS certification means:',
                options: ['Customer is automatically compliant', 'Provider infrastructure meets requirements', 'No audit needed', 'All data is encrypted'],
                correctAnswer: 1,
                explanation: 'Provider certification means their infrastructure meets requirements. Customers must still implement their own controls.',
                difficulty: 'medium',
                tags: ['compliance', 'pci'],
            },
        ],
        commonMistakes: [
            'Assuming provider compliance covers everything',
            'Not understanding data residency requirements',
            'Ignoring the documentation and audit requirements',
        ],
        comparisons: [],
        summary: 'Compliance follows industry regulations (SOC 2, ISO, PCI, HIPAA, GDPR). Provider certifications dont make you compliant. Shared Responsibility for controls. Use AWS Config for monitoring.',
        cheatsheet: ['SOC 2 = Security controls', 'PCI = Payment cards', 'HIPAA = Healthcare', 'GDPR = EU privacy', 'Provider cert ≠ Your compliance'],
        relatedTopics: ['shared-responsibility', 'cloud-security-basics', 'encryption-basics'],
    },
];

export default securityTopics;
