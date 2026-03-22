const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Read the categorized URLs
const categorizedData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'indexed-urls-categorized.json'), 'utf-8')
);

// Extract content pages that need recovery
const pagesToRecover = [
  ...categorizedData.budgetBackpacks,
  ...categorizedData.travelBackpacks,
  ...categorizedData.hikingBackpacks
];

console.log(`Found ${pagesToRecover.length} pages to recover\n`);

// Results tracking
const results = {
  successful: [],
  failed: [],
  total: pagesToRecover.length
};

// Function to check Wayback Machine availability
function checkWaybackAvailability(url) {
  return new Promise((resolve, reject) => {
    const apiUrl = `https://archive.org/wayback/available?url=${encodeURIComponent(url)}`;

    https.get(apiUrl, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to download archived page
function downloadArchivedPage(archiveUrl, outputPath) {
  return new Promise((resolve, reject) => {
    // Convert http:// to https:// for Wayback Machine URLs
    const url = archiveUrl.replace('http://', 'https://');

    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadArchivedPage(res.headers.location, outputPath)
          .then(resolve)
          .catch(reject);
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        fs.writeFileSync(outputPath, data);
        resolve(outputPath);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Main recovery function
async function recoverPages() {
  const recoveryDir = path.join(__dirname, 'wayback_recovered');

  // Create recovery directory if it doesn't exist
  if (!fs.existsSync(recoveryDir)) {
    fs.mkdirSync(recoveryDir);
  }

  for (let i = 0; i < pagesToRecover.length; i++) {
    const page = pagesToRecover[i];
    const { url, slug, pathname } = page;

    console.log(`[${i + 1}/${pagesToRecover.length}] Checking: ${slug}`);
    console.log(`  URL: ${url}`);

    try {
      // Check if archived version exists
      const availability = await checkWaybackAvailability(url);

      if (availability.archived_snapshots && availability.archived_snapshots.closest) {
        const snapshot = availability.archived_snapshots.closest;
        const archiveUrl = snapshot.url;
        const timestamp = snapshot.timestamp;

        console.log(`  ✓ Found snapshot: ${timestamp}`);
        console.log(`  Archive URL: ${archiveUrl}`);

        // Download the archived page
        const filename = `${slug}_${timestamp}.html`;
        const outputPath = path.join(recoveryDir, filename);

        await downloadArchivedPage(archiveUrl, outputPath);

        const fileSize = fs.statSync(outputPath).size;
        console.log(`  ✓ Downloaded: ${filename} (${(fileSize / 1024).toFixed(1)} KB)`);

        results.successful.push({
          url,
          slug,
          pathname,
          archiveUrl,
          timestamp,
          filename,
          fileSize
        });

      } else {
        console.log(`  ✗ No archived snapshots found`);
        results.failed.push({
          url,
          slug,
          pathname,
          reason: 'No snapshots available'
        });
      }

    } catch (error) {
      console.log(`  ✗ Error: ${error.message}`);
      results.failed.push({
        url,
        slug,
        pathname,
        reason: error.message
      });
    }

    console.log('');

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Generate recovery report
  const report = generateReport(results);
  fs.writeFileSync(
    path.join(__dirname, 'wayback-recovery-report.md'),
    report
  );

  // Save results JSON
  fs.writeFileSync(
    path.join(recoveryDir, 'recovery-metadata.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('═══════════════════════════════════════');
  console.log('RECOVERY COMPLETE');
  console.log('═══════════════════════════════════════');
  console.log(`Total pages: ${results.total}`);
  console.log(`Successfully recovered: ${results.successful.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Success rate: ${((results.successful.length / results.total) * 100).toFixed(1)}%`);
  console.log('');
  console.log(`Report saved to: wayback-recovery-report.md`);
  console.log(`Files saved to: wayback_recovered/`);
}

// Function to generate markdown report
function generateReport(results) {
  let report = '# Wayback Machine Recovery Report\n\n';
  report += `**Date:** ${new Date().toISOString().split('T')[0]}\n`;
  report += `**Total Pages:** ${results.total}\n`;
  report += `**Successfully Recovered:** ${results.successful.length}\n`;
  report += `**Failed:** ${results.failed.length}\n`;
  report += `**Success Rate:** ${((results.successful.length / results.total) * 100).toFixed(1)}%\n\n`;

  report += '---\n\n';

  if (results.successful.length > 0) {
    report += '## ✅ Successfully Recovered\n\n';
    results.successful.forEach((item, idx) => {
      report += `### ${idx + 1}. ${item.slug}\n`;
      report += `- **Original URL:** ${item.url}\n`;
      report += `- **Archive URL:** ${item.archiveUrl}\n`;
      report += `- **Snapshot Date:** ${item.timestamp}\n`;
      report += `- **Downloaded File:** ${item.filename}\n`;
      report += `- **File Size:** ${(item.fileSize / 1024).toFixed(1)} KB\n\n`;
    });
  }

  if (results.failed.length > 0) {
    report += '## ❌ Failed to Recover\n\n';
    results.failed.forEach((item, idx) => {
      report += `### ${idx + 1}. ${item.slug}\n`;
      report += `- **Original URL:** ${item.url}\n`;
      report += `- **Reason:** ${item.reason}\n\n`;
    });
  }

  report += '---\n\n';
  report += '## Next Steps\n\n';
  report += '1. Review recovered HTML files in `wayback_recovered/`\n';
  report += '2. Convert HTML to Markdown format\n';
  report += '3. Extract metadata and content\n';
  report += '4. Migrate to Astro content collections\n';
  report += '5. For failed recoveries, plan AI content generation\n';

  return report;
}

// Run recovery
console.log('═══════════════════════════════════════');
console.log('WAYBACK MACHINE RECOVERY SCRIPT');
console.log('═══════════════════════════════════════\n');

recoverPages().catch(console.error);
