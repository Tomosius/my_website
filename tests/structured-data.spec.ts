import { test, expect } from '@playwright/test';

test('JSON-LD exists and has @context/@type', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' });

  // Grab all JSON-LD scripts
  const jsonld = await page.$$eval('script[type="application/ld+json"]', (nodes) =>
    nodes.map(n => n.textContent || '').filter(Boolean)
  );

  // If you don’t yet add JSON-LD, you can relax this to expect 0..n
  expect(jsonld.length, 'No JSON-LD found').toBeGreaterThan(0);

  // Basic shape checks (works for single object or array)
  for (const raw of jsonld) {
    let data: unknown;
    try { data = JSON.parse(raw); } catch { throw new Error('Invalid JSON-LD JSON'); }

    const items = Array.isArray(data) ? data : [data];
    for (const item of items) {
      const ctx = (item as any)['@context'];
      const type = (item as any)['@type'];
      expect(typeof ctx).toBe('string');
      expect(ctx).toMatch(/^https?:\/\/schema\.org\/?$/i);
      expect(type).toBeTruthy();
    }
  }
});