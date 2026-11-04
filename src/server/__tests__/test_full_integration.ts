/**
 * Automated Verification Suite for AIDA AI Assistant & Existing Website Services
 */

import http from 'http';
import { createApiApp } from '../createApiApp';
import { AIDA_KNOWLEDGE_BASE, AIDA_SYSTEM_INSTRUCTION } from '../knowledgeBase';

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting AIDA AI Assistant Integration Test Suite');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}${detail ? ` -> ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. KNOWLEDGE BASE TESTS
  console.log('[1] Testing Knowledge Base Ground Truth:');
  assert(
    AIDA_KNOWLEDGE_BASE.academyName === 'Artificial Intelligence Digital Academy (AIDA)',
    'Academy Name is verified'
  );
  assert(
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.duration === '10 days',
    'Course Duration is confirmed as 10 days'
  );
  assert(
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.fees.pkr === 15000 &&
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.fees.sar === 200 &&
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.fees.usd === 55,
    'Course Fees confirmed in PKR, SAR, and USD (15,000 / 200 / 55)'
  );
  assert(
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.refundPolicy.includes('100%') ||
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.refundPolicy.includes('Full'),
    'Full 1st-day refund policy is documented'
  );
  assert(
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.prerequisites.includes('No previous coding'),
    'No previous coding prerequisite verified'
  );
  assert(
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.teachingLanguages.includes('English') &&
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.teachingLanguages.includes('Urdu') &&
    AIDA_KNOWLEDGE_BASE.confirmedCourseDetails.teachingLanguages.includes('Roman Urdu'),
    'Instruction languages include English, Urdu, and Roman Urdu'
  );

  const planned = AIDA_KNOWLEDGE_BASE.plannedLearningAreas;
  const expectedPlanned = [
    'Claude and other AI tools',
    'Website development using AI',
    'AI agent development and deployment',
    'AI agents and AI employees',
    'WhatsApp AI assistants',
    'Practical AI automation',
  ];
  const allPlannedPresent = expectedPlanned.every((area) => planned.includes(area));
  assert(allPlannedPresent, 'All 6 planned learning areas are present and accounted for');

  assert(
    AIDA_SYSTEM_INSTRUCTION.includes('PLANNED LEARNING AREAS') &&
    AIDA_SYSTEM_INSTRUCTION.includes('STRICT BOUNDARIES & ANTI-HALLUCINATION RULES') &&
    AIDA_SYSTEM_INSTRUCTION.includes('Language Matching'),
    'System prompt enforces language matching, planned distinctions, and anti-hallucination rules'
  );

  // 2. SERVER ENDPOINT TESTS
  console.log('\n[2] Testing Server Endpoints & Routing:');
  const app = createApiApp();
  const server = http.createServer(app);

  await new Promise<void>((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve());
  });

  const addr = server.address() as any;
  const baseUrl = `http://127.0.0.1:${addr.port}`;

  try {
    // 2a. Health check
    const healthRes = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthRes.json();
    assert(healthRes.status === 200 && healthData.status === 'ok', 'GET /api/health responds with status ok');

    // 2b. Existing courses API
    const coursesRes = await fetch(`${baseUrl}/api/courses`);
    const coursesData = await coursesRes.json();
    assert(
      coursesRes.status === 200 && Array.isArray(coursesData.courses),
      'GET /api/courses returns courses array'
    );

    // 2c. Existing Admin login endpoint with bad credentials
    const badLoginRes = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'wrong@example.com', password: 'wrong' }),
    });
    assert(badLoginRes.status === 401, 'POST /api/admin/login rejects invalid credentials with 401');

    // 2d. Existing Admin login endpoint with default credentials
    const goodLoginRes = await fetch(`${baseUrl}/api/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@learnwithaida.com', password: 'AidaAdmin2026!Secure' }),
    });
    const goodLoginData = await goodLoginRes.json();
    assert(
      goodLoginRes.status === 200 && typeof goodLoginData.token === 'string',
      'POST /api/admin/login succeeds with valid admin credentials'
    );

    // 2e. Chat endpoint - Empty request body
    const emptyChatRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    assert(emptyChatRes.status === 400, 'POST /api/chat returns 400 when message is missing');

    // 2f. Chat endpoint - Whitespace only message
    const whitespaceChatRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: '   ' }),
    });
    assert(whitespaceChatRes.status === 400, 'POST /api/chat returns 400 for whitespace-only message');

    // 2g. Chat endpoint - Oversized message (> 2000 chars)
    const longMessage = 'A'.repeat(2001);
    const oversizedChatRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: longMessage }),
    });
    assert(oversizedChatRes.status === 400, 'POST /api/chat returns 400 for message > 2000 chars');

    // 2h. Chat endpoint - Server response when GEMINI_API_KEY is not set or placeholder
    const savedApiKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;

    const noKeyChatRes = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'What is the course fee?' }),
    });
    const noKeyData = await noKeyChatRes.json();
    assert(
      noKeyChatRes.status === 503 && typeof noKeyData.error === 'string',
      'POST /api/chat returns 503 Service Unavailable when GEMINI_API_KEY is unset'
    );

    // 2i. Test Netlify rewrite path compatibility: /.netlify/functions/api/chat
    const netlifyRewriteRes = await fetch(`${baseUrl}/.netlify/functions/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Hello' }),
    });
    assert(
      netlifyRewriteRes.status === 503,
      'POST /.netlify/functions/api/chat routes identically via Netlify Functions path'
    );

    // Restore key if it was set
    if (savedApiKey) {
      process.env.GEMINI_API_KEY = savedApiKey;
    }

  } finally {
    server.close();
  }

  console.log('\n====================================================');
  console.log(`📊 Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Unhandled test failure:', err);
  process.exit(1);
});
