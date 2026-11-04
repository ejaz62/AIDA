/**
 * Mock & Behavior Unit Tests for Gemini Chat Handler
 */

import http from 'http';
import { chatHandler } from '../chatHandler';

async function runGeminiBehaviorTests() {
  console.log('====================================================');
  console.log('🧪 Testing Gemini Chat Handler Behavior & Mock Flow');
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

  // Set a dummy key to test past the 503 check
  process.env.GEMINI_API_KEY = 'TEST_DUMMY_KEY';

  // Test 1: Invalid API Key error handled gracefully (returns 500, never crashes, no secret leaks)
  console.log('[1] Testing error handling with dummy key (Gemini API error handling):');
  const reqMock = {
    body: {
      message: 'Hello, what is the fee?',
      history: [],
    },
  } as any;

  let statusCode = 0;
  let responseJson: any = null;

  const resMock = {
    status(code: number) {
      statusCode = code;
      return this;
    },
    json(data: any) {
      responseJson = data;
      return this;
    },
  } as any;

  await chatHandler(reqMock, resMock);

  assert(
    statusCode === 500,
    'Returns status 500 when Gemini API rejects test key'
  );
  assert(
    typeof responseJson?.error === 'string' &&
    !responseJson.error.includes('TEST_DUMMY_KEY') &&
    responseJson.error.includes('Failed to generate response'),
    'Error response is sanitized, friendly, and does not leak API keys'
  );

  // Clean up
  delete process.env.GEMINI_API_KEY;

  console.log('\n====================================================');
  console.log(`📊 Gemini Handler Behavior Summary: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runGeminiBehaviorTests().catch((e) => {
  console.error(e);
  process.exit(1);
});
