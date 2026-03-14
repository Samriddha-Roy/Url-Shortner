const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up URL Shortener with React Frontend...\n');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ Please run this script from the project root directory');
  process.exit(1);
}

try {
  // Install backend dependencies
  console.log('📦 Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Navigate to frontend and install dependencies
  console.log('\n📦 Installing frontend dependencies...');
  process.chdir('frontend');
  execSync('npm install', { stdio: 'inherit' });

  // Build React app
  console.log('\n🏗️  Building React frontend...');
  execSync('npm run build', { stdio: 'inherit' });

  // Go back to root
  process.chdir('..');

  console.log('\n✅ Setup complete!');
  console.log('\n🎉 To start the application:');
  console.log('   npm run start:full');
  console.log('\n📱 The app will be available at: http://localhost:3000');
  console.log('🔧 API endpoints will be available at: http://localhost:3000/api/*');

} catch (error) {
  console.error('\n❌ Setup failed:', error.message);
  process.exit(1);
}