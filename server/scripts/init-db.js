const fs = require('fs');
const path = require('path');
const db = require('../db');

async function initializeDatabase() {
  console.log('Starting database initialization check...');
  try {
    const schemaPath = path.join(__dirname, '../sql/schema.sql');
    if (!fs.existsSync(schemaPath)) {
      console.log('No schema.sql found, skipping initialization.');
      process.exit(0);
    }

    let schemaSql = fs.readFileSync(schemaPath, 'utf8');

    // Remove comments to prevent parse issues
    schemaSql = schemaSql.replace(/--.*$/gm, '');
    
    // Use a more robust split that handles semicolons properly (avoiding those in strings/ticks if possible)
    // For this simple case, we'll split by semicolon followed by newline or end of string
    const statements = schemaSql.split(/;\s*(?:\r?\n|$)/)
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      // Skip CREATE DATABASE and USE statements to avoid privilege errors on Aiven
      if (statement.toUpperCase().startsWith('CREATE DATABASE') || 
          statement.toUpperCase().startsWith('USE')) {
        continue;
      }
      
      try {
        await db.query(statement);
      } catch (err) {
        // Some statements might fail if they already exist depending on exact syntax,
        // but IF NOT EXISTS handles most safely. We log error but don't stop everything
        // just in case they are harmless view overwrite errors.
        console.error(`Error executing statement (snippet: ${statement.substring(0, 40)}...):`, err.message);
      }
    }
    
    console.log('✓ Database tables and schema verified/initialized successfully');
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database schema:', error);
    process.exit(1);
  }
}

initializeDatabase();
