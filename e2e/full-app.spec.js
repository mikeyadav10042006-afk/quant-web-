import { test, expect } from '@playwright/test';

async function skipSplashAndLoad(page) {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => sessionStorage.setItem('hasSeenSplashScreen', 'true'));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('nav', { timeout: 15000 });
}

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('loads and displays hero heading', async ({ page }) => {
    await expect(page).toHaveTitle(/quantionic/i);
    const hero = page.locator('h1').first();
    await expect(hero).toBeVisible({ timeout: 10000 });
  });

  test('navbar is visible with logo', async ({ page }) => {
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    await expect(page.getByText('QUAN')).toBeVisible();
    await expect(page.getByText('TIONIC')).toBeVisible();
  });

  test('skip to main content link exists', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('stats section displays Client Retention', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 3));
    await expect(page.getByText('Client Retention')).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Navigation: Homepage → Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('clicking Contact nav link navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.waitForURL('**/contact');
    expect(page.url()).toContain('/contact');
  });

  test('contact page displays the form heading', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.waitForURL('**/contact');
    await expect(page.getByText(/send us a message/i)).toBeVisible({ timeout: 15000 });
  });

  test('contact page displays phone number', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.waitForURL('**/contact');
    await expect(page.getByText('+91 124 4077 001')).toBeVisible({ timeout: 15000 });
  });

  test('Back to Home link returns to homepage', async ({ page }) => {
    await page.getByRole('link', { name: 'Contact' }).click();
    await page.waitForURL('**/contact');
    await page.getByRole('link', { name: /back to home/i }).click();
    await page.waitForURL('/');
    expect(page.url()).toBe('http://localhost:5173/');
  });
});

test.describe('Navigation: Homepage Section Links', () => {
  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('Services nav link scrolls to services section', async ({ page }) => {
    await page.getByRole('button', { name: 'Services' }).click();
    await expect(page.locator('#services')).toBeVisible({ timeout: 10000 });
  });

  test('Team nav link scrolls to team section', async ({ page }) => {
    await page.getByRole('button', { name: 'Team' }).click();
    await expect(page.locator('#team')).toBeVisible({ timeout: 10000 });
  });

  test('Book a Call button navigates to /contact', async ({ page }) => {
    await page.getByRole('link', { name: /book a call/i }).first().click();
    await page.waitForURL('**/contact');
    expect(page.url()).toContain('/contact');
  });
});

test.describe('AI Consultant Modal', () => {
  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('clicking AI Consultant button opens chat modal', async ({ page }) => {
    await page.getByRole('button', { name: /ai consultant/i }).first().click();
    const dialog = page.getByRole('dialog', { name: /ai consultant chat/i });
    await expect(dialog).toBeVisible({ timeout: 10000 });
  });

  test('chat modal displays greeting message', async ({ page }) => {
    await page.getByRole('button', { name: /ai consultant/i }).first().click();
    await expect(page.getByText(/hello.*quantionic ai consultant/i)).toBeVisible({ timeout: 10000 });
  });

  test('chat modal has input field and send button', async ({ page }) => {
    await page.getByRole('button', { name: /ai consultant/i }).first().click();
    await expect(page.getByPlaceholderText(/ask about technologies/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
  });

  test('close button closes the chat modal', async ({ page }) => {
    await page.getByRole('button', { name: /ai consultant/i }).first().click();
    const dialog = page.getByRole('dialog', { name: /ai consultant chat/i });
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /close ai chat/i }).click();
    await expect(dialog).not.toBeVisible({ timeout: 5000 });
  });
});

test.describe('Login Modal', () => {
  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('clicking Admin button opens login modal', async ({ page }) => {
    await page.getByRole('button', { name: /admin/i }).click();
    const dialog = page.getByRole('dialog', { name: /admin login/i });
    await expect(dialog).toBeVisible({ timeout: 10000 });
  });

  test('login modal displays email and password fields', async ({ page }) => {
    await page.getByRole('button', { name: /admin/i }).click();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
  });

  test('login modal has sign in button', async ({ page }) => {
    await page.getByRole('button', { name: /admin/i }).click();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
  });

  test('close button closes login modal', async ({ page }) => {
    await page.getByRole('button', { name: /admin/i }).click();
    const dialog = page.getByRole('dialog', { name: /admin login/i });
    await expect(dialog).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /close login modal/i }).click();
    await expect(dialog).not.toBeVisible({ timeout: 5000 });
  });
});

test.describe('Footer Booking Form', () => {
  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('booking form is visible with all fields', async ({ page }) => {
    await expect(page.getByText(/book a technical consultation/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByPlaceholderText('e.g. Rahul Sharma')).toBeVisible();
    await expect(page.getByPlaceholderText('e.g. rahul@enterprise.com')).toBeVisible();
    await expect(page.getByPlaceholderText('e.g. Apex Health Systems')).toBeVisible();
    await expect(page.getByPlaceholderText(/What automated flows/i)).toBeVisible();
  });

  test('newsletter section is visible', async ({ page }) => {
    await expect(page.getByText(/subscribe to newsletter/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByPlaceholderText('Enter your enterprise email')).toBeVisible();
  });
});

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test.beforeEach(async ({ page }) => {
    await skipSplashAndLoad(page);
  });

  test('hamburger menu is visible on mobile', async ({ page }) => {
    await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
  });

  test('clicking hamburger opens mobile drawer with nav links', async ({ page }) => {
    await page.getByRole('button', { name: /open menu/i }).click();
    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
    await expect(page.getByText('Services')).toBeVisible();
    await expect(page.getByText('Contact')).toBeVisible();
    await expect(page.getByText('Team')).toBeVisible();
  });

  test('close button closes mobile drawer', async ({ page }) => {
    await page.getByRole('button', { name: /open menu/i }).click();
    await expect(page.getByRole('button', { name: /close menu/i })).toBeVisible();
    await page.getByRole('button', { name: /close menu/i }).click();
    await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible();
  });

  test('AI Consultant button visible on mobile navbar', async ({ page }) => {
    await expect(page.getByRole('button', { name: /open ai consultant/i })).toBeVisible();
  });

  test('mobile AI Consultant opens the chat', async ({ page }) => {
    await page.getByRole('button', { name: /open ai consultant/i }).click();
    const dialog = page.getByRole('dialog', { name: /ai consultant chat/i });
    await expect(dialog).toBeVisible({ timeout: 10000 });
  });
});

test.describe('404 Page', () => {
  test('unknown route shows 404 page', async ({ page }) => {
    await page.goto('/nonexistent-page', { waitUntil: 'domcontentloaded' });
    await expect(page.getByText(/404|not found|page not found/i)).toBeVisible({ timeout: 15000 });
  });

  test('404 page has a link back to home', async ({ page }) => {
    await page.goto('/nonexistent-page', { waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('link', { name: /back to home|go home/i })).toBeVisible({ timeout: 15000 });
  });
});

test.describe('Full User Journey: Homepage → AI Chat → Contact → Back', () => {
  test('complete user flow works end to end', async ({ page }) => {
    await skipSplashAndLoad(page);

    await expect(page.locator('nav').first()).toBeVisible();

    await page.getByRole('button', { name: /ai consultant/i }).first().click();
    await expect(page.getByRole('dialog', { name: /ai consultant chat/i })).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /close ai chat/i }).click();
    await expect(page.getByRole('dialog', { name: /ai consultant chat/i })).not.toBeVisible({ timeout: 5000 });

    await page.getByRole('link', { name: 'Contact' }).click();
    await page.waitForURL('**/contact');
    await expect(page.getByText(/send us a message/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('+91 124 4077 001')).toBeVisible();

    await page.getByRole('link', { name: /back to home/i }).click();
    await page.waitForURL('/');
    await expect(page.locator('nav').first()).toBeVisible();
  });
});
