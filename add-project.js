#!/usr/bin/env node
/**
 * TSS Portfolio - Add New Project
 *
 * Usage:
 *   node add-project.js
 *
 * Or with arguments:
 *   node add-project.js --title "My Project" --url "https://example.com" --category "ai"
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const PROJECTS_FILE = path.join(__dirname, 'projects.json');

// Load current projects
function loadProjects() {
  try {
    return JSON.parse(fs.readFileSync(PROJECTS_FILE, 'utf8'));
  } catch (err) {
    console.error('Error loading projects.json:', err.message);
    process.exit(1);
  }
}

// Save projects
function saveProjects(data) {
  data.lastUpdated = new Date().toISOString().split('T')[0];
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(data, null, 2));
  console.log('\n✅ Project added successfully!');
  console.log(`📁 Updated: ${PROJECTS_FILE}`);
}

// Verify URL is accessible
async function verifyUrl(url) {
  try {
    const https = require('https');
    const http = require('http');
    const client = url.startsWith('https') ? https : http;

    return new Promise((resolve) => {
      const req = client.get(url, { timeout: 10000 }, (res) => {
        resolve({
          status: res.statusCode,
          working: res.statusCode >= 200 && res.statusCode < 400
        });
      });
      req.on('error', () => resolve({ status: 0, working: false }));
      req.on('timeout', () => { req.destroy(); resolve({ status: 0, working: false }); });
    });
  } catch {
    return { status: 0, working: false };
  }
}

// Interactive prompt
async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Main function
async function main() {
  console.log('\n🚀 TSS Portfolio - Add New Project\n');
  console.log('═'.repeat(40));

  const data = loadProjects();
  const categories = Object.entries(data.categories)
    .map(([k, v]) => `  ${k}: ${v}`)
    .join('\n');

  // Get project details
  const title = await prompt('Project Title: ');
  if (!title) { console.log('Cancelled.'); return; }

  const url = await prompt('Live URL: ');
  if (!url) { console.log('Cancelled.'); return; }

  const description = await prompt('Description (1-2 sentences): ');

  console.log('\nAvailable categories:\n' + categories);
  const category = await prompt('\nCategory (e.g., ai, enterprise): ');

  const tagsInput = await prompt('Tags (comma-separated): ');
  const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

  const image = await prompt('Image path (or press Enter for auto): ');

  // Generate ID from title
  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-');

  // Verify URL
  console.log('\n🔍 Verifying URL...');
  const verification = await verifyUrl(url);

  let status = 'live';
  if (!verification.working) {
    if (verification.status === 401 || verification.status === 403) {
      status = 'auth_required';
      console.log('⚠️  URL requires authentication (401/403)');
    } else {
      status = 'broken';
      console.log(`⚠️  URL returned status ${verification.status || 'timeout'}`);
    }
  } else {
    console.log('✅ URL is accessible');
  }

  // Create project object
  const newProject = {
    id,
    title,
    url,
    image: image || `/projects/${id}.png`,
    description: description || title,
    category: category || 'platforms',
    tags: tags.length ? tags : ['New'],
    status,
    verified: verification.working,
    addedDate: new Date().toISOString().split('T')[0]
  };

  // Show preview
  console.log('\n📋 Project Preview:');
  console.log(JSON.stringify(newProject, null, 2));

  const confirm = await prompt('\nAdd this project? (y/n): ');
  if (confirm.toLowerCase() !== 'y') {
    console.log('Cancelled.');
    return;
  }

  // Add to projects array
  data.projects.push(newProject);
  saveProjects(data);

  console.log('\n📝 Next steps:');
  console.log('1. Add screenshot to /projects/' + id + '.png');
  console.log('2. Rebuild and deploy the portfolio site');
  console.log('3. Test on https://techsierrasolutions.com');
}

// Run
main().catch(console.error);
