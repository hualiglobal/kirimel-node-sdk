// Node.js SDK Test - All Resources (Including New)

const { Client } = require('./dist/index.js');

const apiKey = 'kiri_test_b5846f3e0ddb5d402d1cd836b2117772';
const baseUrl = 'http://localhost/api';

const client = new Client({ apiKey, baseUrl });

let testsPassed = 0;
let testsFailed = 0;

async function test(name, fn) {
  process.stdout.write(`\n📋 ${name}`);
  try {
    const result = await fn();
    if (result) {
      console.log(` ✅ ${result}`);
    } else {
      console.log(' ✅');
    }
    testsPassed++;
  } catch (e) {
    console.log(` ❌ ${e.message}`);
    testsFailed++;
  }
}

console.log('=== Node.js SDK Test - All Resources (Including New) ===');
console.log(`Base URL: ${baseUrl}\n`);

async function runTests() {
  // Get IDs for testing
  const listsResult = await client.lists.list({ limit: 1 });
  const listId = listsResult.data?.items?.[0]?.id;

  console.log('\n🎨 TEMPLATES (NEW)');
  await test('List templates', async () => {
    const r = await client.templates.list();
    return `${r.data?.items?.length || 0} templates`;
  });

  await test('Get categories', async () => {
    const r = await client.templates.categories();
    return `${r.data?.categories?.length || 0} categories`;
  });

  console.log('\n📊 SEGMENTS (NEW)');
  if (listId) {
    await test('List segments', async () => {
      const r = await client.segments.list(listId);
      return `${r.data?.segments?.length || 0} segments`;
    });
  }

  await test('Get segment fields', async () => {
    const r = await client.segments.fields();
    return `${r.data?.fields?.length || 0} fields`;
  });

  console.log('\n📝 FORMS (NEW)');
  await test('List forms', async () => {
    const r = await client.forms.list();
    return `${r.data?.items?.length || 0} forms`;
  });

  console.log('\n💰 CONVERSIONS (NEW)');
  await test('List conversion goals', async () => {
    const r = await client.conversions.list();
    return `${r.data?.items?.length || 0} goals`;
  });

  console.log('\n🌐 LANDING PAGES (NEW)');
  await test('List landing pages', async () => {
    const r = await client.landingPages.list();
    return `${r.data?.items?.length || 0} pages`;
  });

  await test('Get landing page templates', async () => {
    const r = await client.landingPages.templates();
    return `${r.data?.templates?.length || 0} templates`;
  });

  console.log('\n⚙️ WORKFLOWS (NEW)');
  await test('List workflows', async () => {
    const r = await client.workflows.list();
    return `${r.data?.items?.length || 0} workflows`;
  });

  await test('Get workflow templates', async () => {
    const r = await client.workflows.templates();
    return `${r.data?.templates?.length || 0} templates`;
  });

  console.log('\n📢 CAMPAIGNS (EXISTING)');
  await test('List campaigns', async () => {
    const r = await client.campaigns.list({ limit: 5 });
    return `${r.data?.items?.length || 0} campaigns`;
  });

  console.log('\n👥 SUBSCRIBERS (EXISTING)');
  if (listId) {
    await test('List subscribers', async () => {
      const r = await client.subscribers.list(listId, { limit: 5 });
      return `${r.data?.items?.length || 0} subscribers`;
    });
  }

  console.log('\n🔗 WEBHOOKS (EXISTING)');
  await test('List webhooks', async () => {
    const r = await client.webhooks.list({ limit: 5 });
    return `${r.data?.items?.length || 0} webhooks`;
  });

  const percentage = Math.round((testsPassed / (testsPassed + testsFailed)) * 1000) / 10;
  console.log(`\n\n📊 RESULTS: ✅ ${testsPassed} | ❌ ${testsFailed} | ${percentage}%`);
}

runTests().catch(console.error);
