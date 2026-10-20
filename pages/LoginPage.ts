import { Page, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async login(udomain: string, pass: string) {
    await this.page.goto('/login');

    await this.page.fill(
      'input[name="username"], input[name="userName"], input[type="text"], input[placeholder*="Username"], input[placeholder*="User"], input[placeholder*="NIK"]',
      udomain
    );

    await this.page.fill('input[name="password"]', pass);
    await this.page.getByRole('button', { name: /login/i }).click();

    await expect(this.page.getByRole('button', { name: 'Admin' })).toBeVisible({ timeout: 15000 });
  }
}