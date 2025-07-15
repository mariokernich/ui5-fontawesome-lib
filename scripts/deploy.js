#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment process...');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
    console.error('❌ package.json not found. Please run this script from the project root.');
    process.exit(1);
}

// Read package.json to get current version
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const currentVersion = packageJson.version;

console.log(`📦 Current version: ${currentVersion}`);

// Check if user is logged in to npm
try {
    execSync('npm whoami', { stdio: 'pipe' });
    console.log('✅ Logged in to npm');
} catch (error) {
    console.error('❌ Not logged in to npm. Please run: npm login');
    process.exit(1);
}

// Check if dist folder exists
if (!fs.existsSync('dist')) {
    console.log('📦 Building project...');
    try {
        execSync('npm run build', { stdio: 'inherit' });
        console.log('✅ Build completed');
    } catch (error) {
        console.error('❌ Build failed');
        process.exit(1);
    }
}

// Check if package is already published
try {
    const packageInfo = execSync(`npm view ui5-fontawesome-lib version`, { stdio: 'pipe' }).toString().trim();
    if (packageInfo === currentVersion) {
        console.log(`⚠️  Version ${currentVersion} is already published.`);
        console.log('💡 To publish a new version, update the version in package.json first.');
        console.log('   You can use: npm version patch|minor|major');
        process.exit(0);
    }
} catch (error) {
    // Package doesn't exist yet, which is fine for first publish
    console.log('📦 Package not found on npm, ready for first publish');
}

// Run tests
/*
console.log('🧪 Running tests...');
try {
    execSync('npm test', { stdio: 'inherit' });
    console.log('✅ Tests passed');
} catch (error) {
    console.error('❌ Tests failed');
    process.exit(1);
}*/

// Publish to npm
console.log('📤 Publishing to npm...');
try {
    execSync('npm publish --access public', { stdio: 'inherit' });
    console.log('✅ Successfully published to npm!');
    console.log(`🌐 Package available at: https://www.npmjs.com/package/ui5-fontawesome-lib`);
} catch (error) {
    console.error('❌ Failed to publish to npm');
    process.exit(1);
}
