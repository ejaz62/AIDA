import {
  FounderInfo,
  CoreLearningProgramme,
  BusinessSolutionArea,
  Course,
  ClaudeCredential,
  LearningPrinciple,
} from '../types';

export const FOUNDER_DATA: FounderInfo = {
  name: 'Muhammad Ejaz',
  academy: 'AIDA — Artificial Intelligence Digital Academy',
  email: 'mentorsvalley@gmail.com',
  mobile: '+92 322 7204898',
  location: 'Lahore, Pakistan',
  preferredDomain: 'learnwithaida.com',
};

export const CORE_LEARNING_PROGRAMMES: CoreLearningProgramme[] = [
  {
    id: 'ai-agents-and-employees',
    number: '01',
    title: 'AI Agents and AI Employees',
    shortDescription:
      'Learn to build intelligent AI agents and autonomous digital employees designed to perform real business tasks.',
    fullDescription:
      'Move beyond simple conversational chatbots. Master the architecture of intelligent AI employees capable of goal-driven task planning, autonomous tool usage, memory management, and structured execution to assist businesses with real day-to-day operations.',
    keyHighlights: [
      'Understanding agent loops, reasoning frameworks (ReAct), and task decomposition',
      'Connecting AI agents to databases, knowledge repositories, and external APIs',
      'Designing human-in-the-loop oversight and safe operational boundaries',
      'Structuring digital employees for administrative, research, and operational duties',
    ],
    businessApplication:
      'Enables students to design autonomous digital employees that streamline repetitive enterprise tasks, research, and internal workflows.',
    scopeTag: 'Core Discipline',
  },
  {
    id: 'website-development-using-ai',
    number: '02',
    title: 'Website Development Using AI',
    shortDescription:
      'Use modern AI coding tools and agents to design, construct, and launch professional business websites.',
    fullDescription:
      'Discover how to pair-program with frontier AI tools, code generation engines, and AI agents to build production-grade, responsive websites. Learn repository navigation, clean code architecture, modern styling, and rapid prototype-to-production workflows.',
    keyHighlights: [
      'Pair-programming with AI assistants (Claude Code, terminal agents, and modern IDE tools)',
      'Prompting AI models for clean TypeScript, modern component structures, and responsive layouts',
      'Rapid debugging, syntax error correction, and automated multi-file refactoring',
      'Building performant, mobile-friendly commercial landing pages and business sites',
    ],
    businessApplication:
      'Equips students with the practical capability to create and deliver bespoke websites for local and international business clients quickly and reliably.',
    scopeTag: 'Applied Development',
  },
  {
    id: 'ai-agent-deployment',
    number: '03',
    title: 'AI Agent Deployment',
    shortDescription:
      'Learn to configure, deploy, test, monitor, and maintain AI agents for reliable real-world production use.',
    fullDescription:
      'Building an AI agent is only the first step; keeping it stable, secure, and accurate in production is what makes it valuable. Learn end-to-end deployment pipelines, runtime configuration, environmental secret management, regression testing, and long-term agent maintenance.',
    keyHighlights: [
      'Production configuration: environment variables, rate limiting, and API security',
      'Deploying agents to modern cloud containers, serverless environments, and webhook endpoints',
      'Automated testing suites, hallucination mitigation, and edge-case validation',
      'Ongoing agent monitoring, token usage tracking, and client maintenance protocols',
    ],
    businessApplication:
      'Prepares students to operate as dependable implementation specialists who do not just build prototypes, but reliably launch and support live client solutions.',
    scopeTag: 'Production & Infrastructure',
  },
  {
    id: 'whatsapp-ai-employees',
    number: '04',
    title: 'WhatsApp AI Employees',
    shortDescription:
      'Build and deploy AI employees specifically for WhatsApp to handle customer enquiries, share business information, and provide 24/7 service.',
    fullDescription:
      'Exclusively focused on WhatsApp, this practical programme teaches you how to construct intelligent, reliable AI assistants that live on the world’s most popular communication channel. Help business owners respond instantly to incoming customer queries, share pricing catalogs, answer frequently asked questions, and route warm leads round the clock.',
    keyHighlights: [
      'Connecting LLMs and agent logic directly with official WhatsApp Business APIs and webhooks',
      'Training WhatsApp AI employees on verified business documentation, FAQs, and service catalogs',
      'Configuring polite conversational tone, accurate guardrails, and seamless escalation to human staff',
      'Providing 24/7 real-time responsiveness for customer enquiries and service intake',
    ],
    businessApplication:
      'A high-demand commercial solution for retailers, clinics, service providers, and agencies needing round-the-clock WhatsApp support without hiring multiple shifts.',
    scopeTag: 'Exclusive Channel: WhatsApp',
  },
];

export const BUSINESS_SOLUTIONS_DATA: BusinessSolutionArea[] = [
  {
    id: 'solution-whatsapp',
    number: '01',
    title: '24/7 WhatsApp Customer Care Employees',
    clientProblem:
      'Small and mid-sized businesses frequently lose potential customers outside business hours or struggle to answer repetitive WhatsApp queries in a timely manner.',
    aiSolutionDescription:
      'Students learn to deploy custom WhatsApp AI employees trained on verified company facts. These employees converse naturally, provide product or service details, answer FAQs, and escalate complex requests to human managers.',
    marketableSkill:
      'Building, testing, and maintaining bespoke WhatsApp AI assistants for commercial clients.',
  },
  {
    id: 'solution-websites',
    number: '02',
    title: 'AI-Accelerated Business Website Creation',
    clientProblem:
      'Traditional web development can be slow and cost-prohibitive for growing businesses seeking modern, responsive web presences.',
    aiSolutionDescription:
      'Students master terminal-based coding agents and AI pair-programming to build clean, fast, and accessible business websites in days rather than months, adhering to strict design standards.',
    marketableSkill:
      'Shipping responsive, high-converting business websites using modern AI development workflows.',
  },
  {
    id: 'solution-operations',
    number: '03',
    title: 'Internal Operational AI Agents',
    clientProblem:
      'Business teams spend hundreds of hours manually reviewing documents, organizing unstructured notes, and routing customer records across software tools.',
    aiSolutionDescription:
      'Students learn how to configure autonomous internal AI agents that parse documents, draft structured summaries, and connect to company databases to eliminate routine administrative bottlenecks.',
    marketableSkill:
      'Auditing operational bottlenecks and building automated AI task runners for client teams.',
  },
  {
    id: 'solution-deployment',
    number: '04',
    title: 'Production Deployment & Agent Maintenance',
    clientProblem:
      'Companies often experiment with basic chatbots but lack the technical expertise to deploy, secure, and reliably maintain AI agents in everyday production.',
    aiSolutionDescription:
      'Students are trained in end-to-end agent operations: cloud hosting, API key protection, token budgeting, continuous accuracy testing, and proactive error recovery.',
    marketableSkill:
      'Offering reliable deployment, monitoring, and ongoing support services as an independent AI specialist.',
  },
];


export const COURSES_DATA: Course[] = [
  {
    id: 'ai-fundamentals-for-beginners',
    number: '01',
    title: 'AI Fundamentals for Beginners',
    shortDescription:
      'A structured, jargon-free introduction to modern Artificial Intelligence, large language models, prompt engineering, and everyday digital productivity.',
    fullDescription:
      'Designed specifically for learners with zero computer science background. Understand how modern AI models think, formulate effective prompts, avoid common pitfalls like hallucinations, and integrate accessible AI tools into your daily academic or business workflow.',
    status: 'Coming Soon',
    isPublished: true,
    price: 'Curriculum Proposed',
    thumbnail: '',
    level: 'Beginner',
    category: 'Fundamentals',
    durationEstimate: '4–6 Weeks (Self-paced or Cohort)',
    keyOutcomes: [
      'Grasp foundational concepts of LLMs, neural networks, and generative AI',
      'Master prompt crafting frameworks for consistent, accurate outputs',
      'Select the right AI tool for text synthesis, research, and analysis',
      'Apply responsible AI ethics, data privacy, and verification routines',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Core Concepts & Modern AI Landscape',
        summary: 'How generative models work, understanding tokens, context windows, and model types.',
      },
      {
        moduleNumber: '02',
        title: 'Systematic Prompt Engineering',
        summary: 'Role-based prompts, few-shot examples, multi-turn reasoning, and output structuring.',
      },
      {
        moduleNumber: '03',
        title: 'Essential AI Tool Suite',
        summary: 'Hands-on practice with leading text, vision, and productivity tools.',
      },
      {
        moduleNumber: '04',
        title: 'Responsible AI & Quality Verification',
        summary: 'Detecting hallucinations, ethical guidelines, data safety, and fact-checking protocols.',
      },
    ],
  },
  {
    id: 'claude-ai-and-productivity',
    number: '02',
    title: 'Claude AI and AI Productivity',
    shortDescription:
      'Harness Claude’s deep reasoning, long context window, and writing nuances to accelerate research, document analysis, and executive workflow speed.',
    fullDescription:
      'Explore the architectural strengths of Anthropic Claude. Learn to analyze long reports (200k+ tokens), extract structured JSON/tables from messy documents, draft executive communications, and structure complex multi-step reasoning tasks.',
    status: 'Coming Soon',
    isPublished: true,
    price: 'Curriculum Proposed',
    thumbnail: '',
    level: 'Beginner to Intermediate',
    category: 'Productivity & Code',
    durationEstimate: '4 Weeks',
    keyOutcomes: [
      'Leverage massive context windows for comprehensive file and document synthesis',
      'Master Claude Projects, custom project instructions, and knowledge bases',
      'Extract structured data (tables, CSV, JSON) from complex PDFs and transcripts',
      'Design reliable multi-step research and briefing workflows',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Claude Architecture & Context Mastery',
        summary: 'Understanding context retention, Artifacts, and conversational memory.',
      },
      {
        moduleNumber: '02',
        title: 'Knowledge Bases & Claude Projects',
        summary: 'Organizing domain documents, defining project instructions, and workflow templates.',
      },
      {
        moduleNumber: '03',
        title: 'Advanced Analytical & Writing Workflows',
        summary: 'Executive briefs, research papers, contract summaries, and competitive audits.',
      },
      {
        moduleNumber: '04',
        title: 'Prompt Optimization & XML Tagging',
        summary: 'Using XML tags, thinking tags, and structured guidelines for deterministic reasoning.',
      },
    ],
  },
  {
    id: 'claude-code-assisted-development',
    number: '03',
    title: 'Claude Code and AI-Assisted Development',
    shortDescription:
      'Learn how to leverage Claude Code, terminal-based AI tools, and smart code generation to build web applications, scripts, and software prototypes.',
    fullDescription:
      'Bridge the gap between ideas and functional software. Learn how terminal-driven AI tools like Claude Code inspect repositories, edit multi-file codebases, execute unit tests, and help junior developers or career switchers ship production-grade code with confidence.',
    status: 'Coming Soon',
    isPublished: true,
    price: 'Curriculum Proposed',
    thumbnail: '',
    level: 'Beginner to Intermediate',
    category: 'Productivity & Code',
    durationEstimate: '6 Weeks',
    keyOutcomes: [
      'Install and operate terminal-based AI development assistants safely',
      'Understand project architectures, repo navigation, and automated git commits',
      'Debug runtime errors, lint failures, and refactor legacy code using AI pair-programming',
      'Build and deploy responsive modern web interfaces from scratch',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Terminal Fundamentals & AI CLI Setup',
        summary: 'Setting up the environment, CLI essentials, safety boundaries, and workspace permissions.',
      },
      {
        moduleNumber: '02',
        title: 'Repo Navigation & Multi-File Architecture',
        summary: 'Instructing AI agents to read file trees, plan changes, and execute precise refactors.',
      },
      {
        moduleNumber: '03',
        title: 'Building Interactive Web Applications',
        summary: 'Creating TypeScript, React, and API integrations with real-time feedback loops.',
      },
      {
        moduleNumber: '04',
        title: 'Testing, Debugging, and Safe Version Control',
        summary: 'Writing tests, interpreting stack traces, creating git pull requests, and automated deployment.',
      },
    ],
  },
  {
    id: 'ai-agents-and-intelligent-assistants',
    number: '04',
    title: 'AI Agents and Intelligent Assistants',
    shortDescription:
      'Move beyond simple chatbots to autonomous AI agents capable of planning, using tools, searching the web, executing tasks, and handling memory.',
    fullDescription:
      'Dive into the next frontier of artificial intelligence. Master agentic loops, task decomposition, external tool invocation, memory architectures, and human-in-the-loop oversight to create reliable digital assistants that perform real work.',
    status: 'In Development',
    isPublished: true,
    price: 'Curriculum Proposed',
    thumbnail: '',
    level: 'Intermediate to Advanced',
    category: 'Agents & Automation',
    durationEstimate: '6–8 Weeks',
    keyOutcomes: [
      'Understand ReAct (Reason + Act) patterns and autonomous execution loops',
      'Equip AI agents with custom tools, web search, calculators, and API callers',
      'Implement structured memory systems and context management strategies',
      'Design safety guardrails, human validation checkpoints, and failure recovery',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'The Agentic Paradigm & Anatomy',
        summary: 'Sensors, reasoning engines, memory stores, and action actuators.',
      },
      {
        moduleNumber: '02',
        title: 'Tool Calling & API Integrations',
        summary: 'Function calling schemas, handling API payloads, and response parsing.',
      },
      {
        moduleNumber: '03',
        title: 'Multi-Step Planning & Self-Correction',
        summary: 'Reflective loops, error recovery strategies, and verification steps.',
      },
      {
        moduleNumber: '04',
        title: 'Human-in-the-Loop & Safety Boundaries',
        summary: 'Confidence thresholds, confirmation modals, and boundary constraints.',
      },
    ],
  },
  {
    id: 'ai-automation-and-business-workflows',
    number: '05',
    title: 'AI Automation and Business Workflows',
    shortDescription:
      'Connect AI intelligence with business apps like email, spreadsheets, CRMs, and messaging channels to streamline client operations and save hundreds of hours.',
    fullDescription:
      'A practical programme focused on commercial business impact. Discover how small businesses, agencies, and freelancers can automate customer inquiry triage, lead nurturing, document parsing, invoice processing, and content workflows using AI integrations.',
    status: 'In Development',
    isPublished: true,
    price: 'Curriculum Proposed',
    thumbnail: '',
    level: 'Beginner to Intermediate',
    category: 'Agents & Automation',
    durationEstimate: '5 Weeks',
    keyOutcomes: [
      'Map repetitive business processes and identify high-ROI AI automation targets',
      'Connect LLMs with webhooks, spreadsheets, email triggers, and CRM databases',
      'Build automated client onboarding, quote generators, and support triage systems',
      'Package and sell automation solutions as an independent freelancer or agency',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Workflow Auditing & Opportunity Assessment',
        summary: 'Identifying time sinks, quantifying automation ROI, and business readiness.',
      },
      {
        moduleNumber: '02',
        title: 'No-Code & Low-Code AI Connectors',
        summary: 'Connecting webhook triggers, email parsing, Google Sheets, and Slack alerts.',
      },
      {
        moduleNumber: '03',
        title: 'Document Processing & Data Extraction',
        summary: 'Extracting structured data from PDF receipts, supplier invoices, and contracts.',
      },
      {
        moduleNumber: '04',
        title: 'Commercial Freelancing & Client Delivery',
        summary: 'Scoping automation projects, writing proposals, pricing services, and maintenance contracts.',
      },
    ],
  },
  {
    id: 'building-and-deploying-ai-solutions',
    number: '06',
    title: 'Building and Deploying AI Solutions',
    shortDescription:
      'End-to-end engineering: from prototyping an AI application on your laptop to hosting, domain configuration, production security, and client handoff.',
    fullDescription:
      'Take your AI products to the world. Learn full-stack fundamentals, environment variables security, serverless hosting (Vercel, Cloud Run), client rate-limiting, user feedback instrumentation, and ongoing model monitoring.',
    status: 'Curriculum Proposed',
    isPublished: true,
    price: 'Curriculum Proposed',
    thumbnail: '',
    level: 'Intermediate to Advanced',
    category: 'Deployment',
    durationEstimate: '6 Weeks',
    keyOutcomes: [
      'Build full-stack AI web applications with robust frontend and backend architectures',
      'Secure API keys, handle CORS, and implement server-side proxy layers safely',
      'Deploy applications to modern cloud hosting platforms with continuous delivery',
      'Monitor token usage, latency, and system reliability in production environments',
    ],
    syllabus: [
      {
        moduleNumber: '01',
        title: 'Full-Stack Architecture for AI Apps',
        summary: 'Decoupling UI from backend logic, streaming responses, and optimistic updates.',
      },
      {
        moduleNumber: '02',
        title: 'Security & Secret Management',
        summary: 'Protecting keys, rate limiting, token budgets, and preventing prompt injection.',
      },
      {
        moduleNumber: '03',
        title: 'Cloud Deployment & Custom Domains',
        summary: 'Deploying containers, setting up SSL certificates, DNS routing, and CI/CD.',
      },
      {
        moduleNumber: '04',
        title: 'Monitoring, Telemetry & Iteration',
        summary: 'Tracking cost per user, latency monitoring, error handling, and gathering user feedback.',
      },
    ],
  },
];

export const CLAUDE_CREDENTIALS_DATA: ClaudeCredential[] = [
  {
    id: 'claude-101',
    number: '01',
    title: 'Claude Academy: Claude 101',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Foundational capabilities, conversational dynamics, and core strengths of Claude models.',
    syllabusOverview:
      'Introduces students to the Claude model family, conversational ergonomics, core reasoning abilities, and how Claude approaches context and tone.',
    targetAudience: 'Beginners, knowledge workers, and aspiring AI practitioners.',
    curriculumHighlights: [
      'Model family overview: Haiku, Sonnet, and Opus specifications',
      'Prompt structuring and multi-turn conversational hygiene',
      'Context handling and memory preservation basics',
      'Responsible usage guidelines and safety foundations',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Core principles integrated directly into AIDA beginner-friendly coaching.',
  },
  {
    id: 'claude-code-101',
    number: '02',
    title: 'Claude Academy: Claude Code 101',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Terminal-based coding agent fundamentals, CLI commands, and safety controls.',
    syllabusOverview:
      'Explores how to install, configure, and operate Claude Code from the command line to assist in codebase exploration and task execution.',
    targetAudience: 'Programmers, technical analysts, and developers learning agentic coding.',
    curriculumHighlights: [
      'CLI toolchain installation and authentication procedures',
      'Granting safe file system permissions and tool execution limits',
      'Directing Claude to read directory trees and summarize architectures',
      'Executing single-file edits and verifying syntax',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. CLI workflow patterns applied in AIDA terminal development workshops.',
  },
  {
    id: 'intro-to-claude-cowork',
    number: '03',
    title: 'Claude Academy: Introduction to Claude Cowork',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Collaborative workspaces, team knowledge integration, and document co-creation.',
    syllabusOverview:
      'Focuses on leveraging Claude within shared organization workflows, team project spaces, and cross-functional document development.',
    targetAudience: 'Project managers, cross-functional teams, and content leaders.',
    curriculumHighlights: [
      'Shared workspace configuration and member access models',
      'Knowledge curation and document upload guidelines',
      'Collaborative brainstorming, drafting, and iterative critique',
      'Team prompt libraries and standard operating procedures',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Team collaboration strategies taught in AIDA business productivity modules.',
  },
  {
    id: 'claude-platform-101',
    number: '04',
    title: 'Claude Academy: Claude Platform 101',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Anthropic Console, API key generation, rate limits, and Workbench prototyping.',
    syllabusOverview:
      'Covers the developer platform infrastructure, system prompts, temperature controls, token budgets, and API testing consoles.',
    targetAudience: 'Software engineers, technical founders, and product developers.',
    curriculumHighlights: [
      'Navigating the Anthropic Console and managing workspaces',
      'Crafting and testing prompts in the interactive Workbench',
      'Understanding token limits, rate tiers, and pricing mechanics',
      'Generating API keys and configuring secure request headers',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Practical developer workflows utilized throughout AIDA technical tracks.',
  },
  {
    id: 'claude-code-in-action',
    number: '05',
    title: 'Claude Academy: Claude Code in Action',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Real-world repository refactoring, automated testing, and multi-file code editing.',
    syllabusOverview:
      'Advanced practical applications of Claude Code, solving genuine GitHub issues, updating outdated libraries, and authoring unit tests.',
    targetAudience: 'Full-stack engineers, QA automation specialists, and tech leads.',
    curriculumHighlights: [
      'Autonomous debugging from terminal error logs and test reports',
      'Coordinated multi-file refactoring across large repos',
      'Automated git branch creation, diff checking, and commit messages',
      'Managing context compaction in long-running development sessions',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Hands-on multi-file refactoring patterns taught in AIDA coding tracks.',
  },
  {
    id: 'intro-to-model-context-protocol',
    number: '06',
    title: 'Claude Academy: Introduction to Model Context Protocol',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'MCP architecture, client-host-server topology, and standard context servers.',
    syllabusOverview:
      'Explains the Model Context Protocol (MCP) open standard created by Anthropic to securely connect AI models with local and cloud data sources.',
    targetAudience: 'Developers, system architects, and technical integrators.',
    curriculumHighlights: [
      'The open standard protocol specification and core philosophy',
      'Client, host, and server relationships in MCP',
      'Configuring community MCP servers (GitHub, Postgres, Filesystem, Brave)',
      'Security boundaries, read-only permissions, and local socket communication',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. MCP architecture fundamentals demonstrated in AIDA hands-on integration labs.',
  },
  {
    id: 'model-context-protocol-advanced-topics',
    number: '07',
    title: 'Claude Academy: Model Context Protocol: Advanced topics',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Authoring custom MCP servers, bidirectional streaming, prompts, and tool registration.',
    syllabusOverview:
      'Deep dive into building bespoke MCP servers in TypeScript or Python, exposing proprietary APIs, custom databases, and dynamic tools.',
    targetAudience: 'Senior developers, infrastructure engineers, and enterprise architects.',
    curriculumHighlights: [
      'Building a production MCP server using the official TypeScript/Python SDKs',
      'Exposing typed resources, dynamic prompt templates, and executable tools',
      'Handling transport layers: stdio vs HTTP Server-Sent Events (SSE)',
      'Enterprise authentication, rate limiting, and production monitoring',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Advanced tool creation techniques embedded in AIDA agent development curricula.',
  },
  {
    id: 'ai-fluency-framework-and-foundations',
    number: '08',
    title: 'Claude Academy: AI Fluency: Framework and foundations',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Conceptual mental models for AI capabilities, frontier reasoning, and strategic alignment.',
    syllabusOverview:
      'Equips professionals with critical frameworks for evaluating AI feasibility, understanding model boundaries, and making informed strategic technology decisions.',
    targetAudience: 'Business leaders, consultants, educators, and technology strategists.',
    curriculumHighlights: [
      'Mental models for model capabilities and stochastic generation',
      'Evaluating tasks for AI suitability vs deterministic algorithms',
      'Benchmarking reasoning, factual accuracy, and domain depth',
      'Organizational adoption strategies and change management',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Strategic AI evaluation models integrated into AIDA business advisory offerings.',
  },
  {
    id: 'building-effective-human-agent-teams-beta',
    number: '09',
    title: 'Claude Academy: Building effective human-agent teams (beta)',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Human-in-the-loop workflows, delegation strategies, agent oversight, and teaming dynamics.',
    syllabusOverview:
      'Investigates the emerging science of human-agent collaboration, designing intuitive interfaces where human supervisors and AI agents partner effectively.',
    targetAudience: 'Product designers, operations directors, and AI researchers.',
    curriculumHighlights: [
      'Optimal delegation matrices between humans and autonomous agents',
      'Designing friction-free human confirmation and escalation points',
      'Multi-agent orchestration with human governance checkpoints',
      'Audit logs, traceability, and failure-mode containment',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Agent teaming frameworks utilized in AIDA intelligent assistant courses.',
  },
  {
    id: 'intro-to-claude-tag',
    number: '10',
    title: 'Claude Academy: Introduction to Claude Tag',
    attribution: 'Anthropic',
    recipient: 'Muhammad Ejaz',
    status: 'Completed Credential',
    competencyFocus: 'Prompt encapsulation, XML tagging semantics, and deterministic document parsing.',
    syllabusOverview:
      'Detailed exploration of Anthropic’s prompt conventions using XML tags (<thinking>, <context>, <document>) for pristine instruction separation.',
    targetAudience: 'Prompt engineers, workflow developers, and content automation builders.',
    curriculumHighlights: [
      'XML syntax benefits for multi-modal and complex inputs',
      'Structuring prompts with system, context, instruction, and output tags',
      'Using thinking tags for explicit chain-of-thought verification',
      'Programmatic output formatting and JSON extraction reliability',
    ],
    preparationNotice:
      'Completed by founder Muhammad Ejaz. Systematic prompt encapsulation techniques taught across all AIDA tracks.',
  },
];

export const LEARNING_PRINCIPLES: LearningPrinciple[] = [
  {
    id: 'principle-1',
    number: '01',
    title: 'Beginner-Friendly Explanations',
    subtitle: 'Clarity over jargon',
    description:
      'We deconstruct complex artificial intelligence concepts into intuitive, plain-language lessons. No prior coding or computer science degree is required to get started.',
    pedagogicalFocus: 'Accessible foundations, intuitive analogies, and guided progressive learning steps.',
  },
  {
    id: 'principle-2',
    number: '02',
    title: 'Practical, Project-Based Learning',
    subtitle: 'Learn by building',
    description:
      'Theory without application is quickly forgotten. Every lesson is anchored in real projects—from parsing actual documents to assembling working digital tools.',
    pedagogicalFocus: 'Tangible deliverables, portfolio assets, and hands-on skill verification.',
  },
  {
    id: 'principle-3',
    number: '03',
    title: 'Modern AI Tools & Workflows',
    subtitle: 'Current industry toolsets',
    description:
      'The AI ecosystem moves rapidly. We teach current, battle-tested tools including Claude, Claude Code, model context interfaces, and modern productivity suites.',
    pedagogicalFocus: 'Modern tool literacy, keyboard shortcuts, and workflow acceleration.',
  },
  {
    id: 'principle-4',
    number: '04',
    title: 'AI Agents & Automation',
    subtitle: 'Beyond standard chat',
    description:
      'Move past basic question-answering. Discover how autonomous agents, tool integrations, and background automation loops perform real work for businesses.',
    pedagogicalFocus: 'Agent architectures, tool use, trigger-action flows, and task autonomy.',
  },
  {
    id: 'principle-5',
    number: '05',
    title: 'Skills for Freelancing & Business',
    subtitle: 'Commercial viability',
    description:
      'Learn skills that directly translate into income—whether delivering AI automation for clients, offering consulting services, or boosting your own business efficiency.',
    pedagogicalFocus: 'Client discovery, project scoping, solution packaging, and freelance economics.',
  },
  {
    id: 'principle-6',
    number: '06',
    title: 'Responsible & Effective Use of AI',
    subtitle: 'Ethical, reliable standards',
    description:
      'AI power requires intellectual rigor. We teach thorough verification, hallucination checks, copyright awareness, and responsible data management practices.',
    pedagogicalFocus: 'Accuracy verification, privacy compliance, ethical considerations, and safety.',
  },
];
