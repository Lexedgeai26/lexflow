
async function testOpenAI() {
    const BASE_URL = 'http://localhost:4000';

    console.log('🚀 Starting OpenAI Proxy Verification Test...\n');

    try {
        // 1. Login (Get Token)
        console.log('1️⃣  Authenticating...');
        const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'openai_tester@lexreply.com', name: 'OpenAI Tester' })
        });

        if (!loginRes.ok) throw new Error(`Login failed: ${loginRes.status} ${loginRes.statusText}`);
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('   ✅ Authenticated.');

        // 2. Test OpenAI Generation via Proxy
        // We send a GEMINI-style payload, and expect the proxy to translate it to OpenAI format
        console.log('\n2️⃣  Testing OpenAI Routing (gpt-4o-mini)...');
        console.log('   📤 Sending Gemini-style payload: { model: "gpt-4o-mini", contents: [...] }');

        const genRes = await fetch(`${BASE_URL}/api/ai/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini", // This triggers the OpenAI path
                contents: [{ role: 'user', parts: [{ text: "Are you from OpenAI? Reply Yes or No." }] }]
            })
        });

        if (!genRes.ok) {
            const errorText = await genRes.text();
            throw new Error(`Generation Failed (${genRes.status}): ${errorText}`);
        }

        const genData = await genRes.json();
        console.log('   ✅ Generation Success!');
        console.log('   📝 AI Response:', `"${genData.text}"`);
        console.log('   🔍 Raw Provider Response:', genData.raw?.model || 'No model info in raw');

    } catch (error) {
        console.error('\n❌ TEST FAILED');
        console.error(error);
        process.exit(1);
    }
}

testOpenAI();
