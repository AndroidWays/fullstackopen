
const { test, expect } = require('@playwright/test');

test.describe('Blog app', () => {
  const appUrl = 'http://localhost:5173';
  const apiUrl = 'http://localhost:3003'; // Adjust to your API endpoint

  const user = {
    username: 'testuser',
    password: 'password123'
  };

  const newBlog = {
    title: 'A new blog',
    author: 'Test Author',
    url: 'http://newblog.com'
  };

  async function resetDatabase(request) {
    await request.post(`${apiUrl}/reset`);
  }

  async function createUser(request) {
    await request.post(`${apiUrl}/users`, {
      data: user
    });
  }

  test.beforeEach(async ({ page, request }) => {
    await resetDatabase(request);
    await createUser(request);
    await page.goto(appUrl);
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
  });

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.fill('#username', user.username);
      await page.fill('#password', user.password);
      await page.click('button[type="submit"]');

      // Take a screenshot to debug
      await page.screenshot({ path: 'screenshot-success.png' });

      // Update the selector based on actual application
      //await expect(page.locator('text=Welcome')).toBeVisible(); // Adjust based on actual success message or element
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.fill('#username', 'wronguser');
      await page.fill('#password', 'wrongpassword');
      await page.click('button[type="submit"]');

      // Take a screenshot to debug
      await page.screenshot({ path: 'screenshot-error.png' });

      // Update the selector based on actual application
      //await expect(page.locator('text=Invalid credentials')).toBeVisible(); // Adjust based on actual error message or element
    });
  });

  test.describe('When logged in', () => {
    test('a new blog can be created', async ({ page }) => {
      // Log in before creating a blog
      await page.fill('#username', user.username);
      await page.fill('#password', user.password);
      await page.click('button[type="submit"]');

    });
  });
});


