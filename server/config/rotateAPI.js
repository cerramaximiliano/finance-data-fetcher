const fs = require('fs');
const path = require('path');
require('dotenv').config();

const envFilePath = path.resolve(__dirname, '..', '..', '.env');

function rotateApiKey(apiPrefix, maxUsage = 100) {
    const keys = Object.keys(process.env).filter(key => key.startsWith(apiPrefix) && key.includes('KEY_'));
    console.log('Available keys:', keys);
    const currentKeyEnv = `${apiPrefix}_CURRENT_KEY`;
    const usageCountEnv = `${apiPrefix}_USAGE_COUNT`;
    let currentKey = process.env[currentKeyEnv];
    let usageCount = parseInt(process.env[usageCountEnv], 10);
    console.log('Current key and usage count:', currentKey, usageCount);
    if (usageCount >= maxUsage) {
        let currentIndex = keys.indexOf(currentKeyEnv);
        // Find the index of the current key in the keys array
        currentIndex = keys.indexOf(currentKey);
        console.log('Current index:', currentIndex);
        // Rotate to the next key
        currentKey = keys[(currentIndex + 1) % keys.length];
        usageCount = 0;
        updateEnvFile(currentKeyEnv, currentKey, usageCountEnv, usageCount);
    } else {
        usageCount++;
        updateEnvFile(currentKeyEnv, currentKey, usageCountEnv, usageCount);
    }
    console.log('Rotated to key:', currentKey);
    return process.env[currentKey];
}

function updateEnvFile(currentKeyEnv, currentKey, usageCountEnv, usageCount) {
    const envConfig = fs.readFileSync(envFilePath, 'utf-8');
    const newEnvConfig = envConfig
        .replace(new RegExp(`${currentKeyEnv}=.*`), `${currentKeyEnv}=${currentKey}`)
        .replace(new RegExp(`${usageCountEnv}=.*`), `${usageCountEnv}=${usageCount}`);
    fs.writeFileSync(envFilePath, newEnvConfig);

    // Reload the .env variables
    process.env[currentKeyEnv] = currentKey;
    process.env[usageCountEnv] = usageCount.toString();
}

module.exports = rotateApiKey;