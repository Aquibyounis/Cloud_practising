import type { Topic } from '../../types';

export const virtualizationTopics: Topic[] = [
    {
        id: 'virtualization-basics',
        title: 'Virtualization Fundamentals',
        slug: 'virtualization-basics',
        category: 'virtualization',
        zone: 'A',
        icon: 'Layers',
        description: 'Foundation technology enabling cloud computing',
        estimatedTime: 12,
        content: {
            beginner: `
# Virtualization Fundamentals

## What is Virtualization?

Virtualization creates **virtual versions** of physical resources (servers, storage, networks). One physical machine can run multiple virtual machines.

## How It Works

\`\`\`
┌─────┬─────┬─────┐
│ VM1 │ VM2 │ VM3 │  ← Virtual Machines
├─────┴─────┴─────┤
│   Hypervisor    │  ← Virtualization Layer
├─────────────────┤
│Physical Hardware│
└─────────────────┘
\`\`\`

## Types of Virtualization

| Type | What's Virtualized | Example |
|------|-------------------|---------|
| Server | Compute resources | VMs |
| Storage | Disk/storage | SAN, vSAN |
| Network | Network resources | VLANs, SDN |
| Desktop | User desktops | VDI |

## Benefits

✅ Better resource utilization
✅ Reduced hardware costs
✅ Faster provisioning
✅ Easier disaster recovery
✅ Isolation between workloads
      `,
            intermediate: `
# Virtualization - Technical

## Hypervisor Types

| Type | Description | Examples |
|------|-------------|----------|
| Type 1 (Bare Metal) | Runs on hardware | VMware ESXi, Xen, Hyper-V |
| Type 2 (Hosted) | Runs on OS | VirtualBox, VMware Workstation |

\`\`\`
Type 1:                    Type 2:
┌────────────┐             ┌────────────┐
│    VMs     │             │    VMs     │
├────────────┤             ├────────────┤
│ Hypervisor │             │ Hypervisor │
├────────────┤             ├────────────┤
│  Hardware  │             │  Host OS   │
└────────────┘             ├────────────┤
                           │  Hardware  │
                           └────────────┘
\`\`\`

## VM Components

- **vCPU**: Virtual CPU cores
- **vRAM**: Virtual memory
- **vDisk**: Virtual hard drive (VMDK, VHD)
- **vNIC**: Virtual network interface

## Resource Overcommitment

- Allocate more virtual resources than physical
- Works due to typical underutilization
- Ratio: 4:1 CPU, 1.5:1 memory common
      `,
            advanced: `
# Virtualization - Advanced

## Hardware-Assisted Virtualization

| Technology | Vendor | Benefit |
|------------|--------|---------|
| Intel VT-x | Intel | CPU virtualization |
| AMD-V | AMD | CPU virtualization |
| Intel VT-d | Intel | I/O virtualization |
| SR-IOV | Both | Direct device access |

## Live Migration

Move running VM between hosts:

\`\`\`
Host A → Memory Copy → Host B
         ↓
    Iterative sync
         ↓
    Final cutover (<100ms)
\`\`\`

## VM vs Container

| Aspect | VM | Container |
|--------|-------|-----------|
| Isolation | Strong (separate OS) | Process-level |
| Size | GB | MB |
| Boot time | Minutes | Seconds |
| Overhead | High | Low |
| Portability | Medium | High |

## Cloud Provider Virtualization

| Provider | Technology |
|----------|------------|
| AWS | Nitro (custom) |
| Azure | Hyper-V |
| GCP | KVM |
      `,
        },
        keyPoints: [
            'Virtualization creates virtual resources from physical',
            'Hypervisor manages virtual machines',
            'Type 1 (bare metal) for production, Type 2 (hosted) for development',
            'VMs have vCPU, vRAM, vDisk, vNIC',
            'Resource overcommitment increases efficiency',
            'Live migration moves running VMs',
        ],
        realWorldExamples: [
            {
                title: 'Data Center Consolidation',
                company: 'Enterprise IT',
                scenario: 'Hundreds of underutilized physical servers',
                solution: 'VMware virtualization consolidation',
                outcome: '80% reduction in physical servers, lower costs',
            },
        ],
        mcqs: [
            {
                id: 'virt-1',
                question: 'Type 1 hypervisor runs on:',
                options: ['Host operating system', 'Bare metal hardware', 'Virtual machine', 'Container'],
                correctAnswer: 1,
                explanation: 'Type 1 (bare metal) hypervisors run directly on hardware. Type 2 runs on a host OS.',
                difficulty: 'easy',
                tags: ['virtualization', 'hypervisor'],
            },
            {
                id: 'virt-2',
                question: 'Which is a Type 1 hypervisor?',
                options: ['VirtualBox', 'VMware Workstation', 'VMware ESXi', 'Parallels Desktop'],
                correctAnswer: 2,
                explanation: 'VMware ESXi is a bare metal (Type 1) hypervisor. The others are hosted (Type 2).',
                difficulty: 'medium',
                tags: ['virtualization'],
            },
        ],
        commonMistakes: [
            'Confusing Type 1 and Type 2 hypervisors',
            'Thinking virtualization and containerization are the same',
            'Over-overcommitting resources leading to performance issues',
        ],
        comparisons: [],
        summary: 'Virtualization creates virtual resources via hypervisors. Type 1 on bare metal (production), Type 2 on host OS (dev). VMs include vCPU, vRAM, vDisk. Foundation for cloud computing.',
        cheatsheet: ['Hypervisor = VM manager', 'Type 1 = Bare metal', 'Type 2 = On host OS', 'VM = vCPU + vRAM + vDisk', 'Live migration = Move running VM'],
        relatedTopics: ['iaas', 'aws-ec2', 'containers-vs-vms'],
    },
    {
        id: 'containers-vs-vms',
        title: 'Containers vs Virtual Machines',
        slug: 'containers-vs-vms',
        category: 'virtualization',
        zone: 'A',
        icon: 'Box',
        description: 'Understanding the differences between containers and VMs',
        estimatedTime: 10,
        content: {
            beginner: `
# Containers vs Virtual Machines

## Virtual Machines

Each VM has its own **complete operating system**.

\`\`\`
┌─────┬─────┬─────┐
│App 1│App 2│App 3│
├─────┼─────┼─────┤
│ OS  │ OS  │ OS  │  ← Full OS each
├─────┴─────┴─────┤
│   Hypervisor    │
├─────────────────┤
│    Hardware     │
└─────────────────┘
\`\`\`

## Containers

Containers share the **host OS kernel**.

\`\`\`
┌─────┬─────┬─────┐
│App 1│App 2│App 3│
├─────┴─────┴─────┤
│ Container Engine│
├─────────────────┤
│    Host OS      │
├─────────────────┤
│    Hardware     │
└─────────────────┘
\`\`\`

## Key Differences

| Aspect | VM | Container |
|--------|-------|-----------|
| Size | GBs | MBs |
| Boot | Minutes | Seconds |
| Isolation | Strong | Moderate |
| OS | Separate | Shared kernel |
      `,
            intermediate: `
# Containers vs VMs - When to Use

## Choose VMs When:

✅ Need strong isolation
✅ Running different OS types
✅ Legacy applications
✅ Compliance requires it
✅ Need complete OS control

## Choose Containers When:

✅ Microservices architecture
✅ Rapid scaling needed
✅ Consistent dev/prod environments
✅ CI/CD pipelines
✅ Resource efficiency critical

## Hybrid Approach

\`\`\`
┌─────────────────────────┐
│    Container           │
│  ┌─────┬─────┬─────┐  │
│  │App 1│App 2│App 3│  │
│  ├─────┴─────┴─────┤  │
│  │ Container Engine │  │
├──┴─────────────────┴──┤
│        VM OS          │
├───────────────────────┤
│      Hypervisor       │
└───────────────────────┘
\`\`\`

Many clouds run containers inside VMs for best of both.
      `,
            advanced: `
# Containers - Security Considerations

## Isolation Comparison

| Layer | VM Isolation | Container Isolation |
|-------|-------------|---------------------|
| Kernel | Separate | Shared |
| Namespace | N/A | pid, net, mnt |
| Resources | Hypervisor | cgroups |
| Filesystem | Separate | Union FS |

## Container Security Risks

- Kernel vulnerabilities affect all containers
- Container escape attacks
- Image vulnerabilities
- Misconfigured privileges

## Mitigation Strategies

- Use minimal base images
- Scan images for vulnerabilities
- Run non-root containers
- Enable seccomp/AppArmor
- Use gVisor/Kata for stronger isolation

## Cloud Container Services

| Service Type | AWS | Azure | GCP |
|--------------|-----|-------|-----|
| Managed K8s | EKS | AKS | GKE |
| Serverless Containers | Fargate | Container Apps | Cloud Run |
| Container Registry | ECR | ACR | GCR |
      `,
        },
        keyPoints: [
            'VMs have separate OS, containers share kernel',
            'Containers are smaller (MBs) and faster (seconds)',
            'VMs provide stronger isolation',
            'Containers ideal for microservices and CI/CD',
            'Many clouds run containers inside VMs',
            'Container security requires image scanning and minimal privileges',
        ],
        realWorldExamples: [
            {
                title: 'Netflix Containerization',
                company: 'Netflix',
                scenario: 'Deploy microservices at scale',
                solution: 'Containers on AWS with custom orchestration',
                outcome: 'Thousands of containers, rapid deployment',
            },
        ],
        mcqs: [
            {
                id: 'cont-vm-1',
                question: 'Containers share this with the host:',
                options: ['Nothing', 'OS kernel', 'Entire OS', 'Hardware'],
                correctAnswer: 1,
                explanation: 'Containers share the host OS kernel, making them lightweight. VMs have their own OS.',
                difficulty: 'easy',
                tags: ['containers', 'virtualization'],
            },
            {
                id: 'cont-vm-2',
                question: 'Which boots faster?',
                options: ['Virtual Machine', 'Container', 'Same speed', 'Depends on size'],
                correctAnswer: 1,
                explanation: 'Containers boot in seconds because they dont need to start a full OS. VMs take minutes.',
                difficulty: 'easy',
                tags: ['containers', 'vms'],
            },
        ],
        commonMistakes: [
            'Thinking containers and VMs are mutually exclusive (often used together)',
            'Assuming containers provide VM-level isolation',
            'Ignoring container security concerns',
        ],
        comparisons: [],
        summary: 'VMs have separate OS (strong isolation, slower, larger). Containers share kernel (fast, lightweight, moderate isolation). Often used together. Containers for microservices, VMs for legacy/compliance.',
        cheatsheet: ['VM = Separate OS', 'Container = Shared kernel', 'VM = GBs, minutes', 'Container = MBs, seconds', 'Often combined in cloud'],
        relatedTopics: ['virtualization-basics', 'docker', 'kubernetes'],
    },
];

export default virtualizationTopics;
