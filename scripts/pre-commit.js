#!/usr/bin/env node

/**
 * Pre-commit hook script
 * Runs tests and linting before allowing commits
 */

const { execSync } = require('child_process');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function runCommand(command, cwd, description) {
  try {
    log(`\n${description}...`, 'blue');
    execSync(command, {
      cwd,
      stdio: 'inherit',
      env: { ...process.env, FORCE_COLOR: '1' },
    });
    log(`✓ ${description} passed`, 'green');
    return true;
  } catch (error) {
    log(`✗ ${description} failed`, 'red');
    return false;
  }
}

function main() {
  log('\n🚀 Running pre-commit checks...\n', 'blue');

  const rootDir = path.resolve(__dirname, '..');
  const serverDir = path.join(rootDir, 'server');
  const clientDir = path.join(rootDir, 'client');

  const results = [];

  // Run linting (fast, runs first)
  log('\n📝 Running linting...', 'blue');
  results.push(
    runCommand('yarn lint', serverDir, 'Server linting'),
  );
  results.push(
    runCommand('yarn lint', clientDir, 'Client linting'),
  );

  // If linting fails, stop here
  if (results.some((r) => !r)) {
    log(
      '\n❌ Pre-commit hook failed: Linting errors found',
      'red',
    );
    log(
      'Please fix the linting errors before committing.',
      'yellow',
    );
    process.exit(1);
  }

  // Run tests
  log('\n🧪 Running tests...', 'blue');
  
  // Client tests don't require MongoDB - run these first
  results.push(
    runCommand('yarn test --run', clientDir, 'Client tests'),
  );
  
  // Check if MongoDB is available for server tests
  let mongoAvailable = false;
  try {
    execSync('mongosh --eval "db.runCommand({ ping: 1 })"', {
      stdio: 'ignore',
      timeout: 2000,
    });
    mongoAvailable = true;
  } catch (error) {
    log(
      '\n⚠️  MongoDB not available, skipping server tests',
      'yellow',
    );
    log(
      '   Server tests will run in CI. To test locally, start MongoDB first.',
      'yellow',
    );
  }

  // Run server tests if MongoDB is available
  if (mongoAvailable) {
    results.push(
      runCommand('yarn test', serverDir, 'Server tests'),
    );
  }

  // Check if all checks passed
  if (results.every((r) => r)) {
    log('\n✅ All pre-commit checks passed!', 'green');
    process.exit(0);
  } else {
    log(
      '\n❌ Pre-commit hook failed: Some checks failed',
      'red',
    );
    log(
      'Please fix the errors before committing.',
      'yellow',
    );
    process.exit(1);
  }
}

main();

