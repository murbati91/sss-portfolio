#!/usr/bin/env node
/**
 * TSS Portfolio - Verify All Project Links
 *
 * Usage:
 *   node verify-links.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const PROJECTS_FILE = path.join(__dirname, 'projects.json');

// Check URL status
function checkUrl(url) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { timeout: 10000 }, (res) => {
      resolve({ url, status: res.statusCode, location: res.headers.location });
    });
    req.on('error', (err) => resolve({ url, status: 'ERROR', error: err.message }));
    req.on('timeout', () => { req.destroy(); resolve({ url, status: 'TIMEOUT' }); });
  });
}

// Main
async function main() {
  console.log('\n🔍 TSS Portfolio Link Verification\n');
  console.log('═'.repeat(60));

  const data = JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
  const results = { working: [], auth: [], broken: [] };

  for (const project of data.projects) {
    process.stdout.write(`Checking ${project.title}... `);
    const result = await checkUrl(project.url);

    if (result.status >= 200 && result.status < 300) {
      console.log(`✅ ${result.status}`);
      results.working.push(project);
      project.verified = true;
      project.status = 'live';
    } else if (result.status === 301 || result.status === 302) {
      console.log(`↪️  ${result.status} → ${result.location}`);
      results.working.push(project);
      project.verified = true;
    } else if (result.status === 401 || result.status === 403) {
      console.log(`🔒 ${result.status} (Auth Required)`);
      results.auth.push(project);
      project.verified = true;
      project.status = 'auth_required';
    } else {
      console.log(`❌ ${result.status}`);
      results.broken.push(project);
      project.verified = false;
      project.status = 'broken';
    }
  }

  // Summary
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 SUMMARY\n');
  console.log(`✅ Working:       ${results.working.length}`);
  console.log(`🔒 Auth Required: ${results.auth.length}`);
  console.log(`❌ Broken:        ${results.broken.length}`);

  if (results.broken.length > 0) {
    console.log('\n⚠️  BROKEN LINKS:');
    results.broken.forEach(p => console.log(`   - ${p.title}: ${p.url}`));
  }

  // Update projects.json
  data.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2));
  console.log('\n✅ Updated projects.json with verification results');
}

main().catch(console.error);
