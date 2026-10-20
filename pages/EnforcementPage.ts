import { Page, expect } from '@playwright/test';

export class EnforcementPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateAndVerifyAccessCard(role: string) {
    await this.page.goto('/admin/access-card');

    await expect(
      this.page.getByRole('button', { name: /add new/i }),
      `DEFECT: Add New missing for ${role}`
    ).toBeVisible();

    await expect(
      this.page.getByRole('button', { name: /view details/i }).first(),
      `DEFECT: View Details missing for ${role}`
    ).toBeVisible();
  }

  async navigateAndVerifyCardStatus(role: string, isRestricted: boolean) {
    await this.page.goto('/admin/card-status');

    const addNewBtn = this.page.getByRole('button', { name: /add new/i });
    const editIcon = this.page.locator('button').filter({
      has: this.page.locator('svg.lucide-pencil-line')
    }).first();

    if (isRestricted) {
      await expect(addNewBtn, `DEFECT: Add New visible for restricted role ${role}`).toBeHidden();
      await expect(editIcon, `DEFECT: Edit icon visible for restricted role ${role}`).toBeHidden();
    } else {
      await expect(addNewBtn, `DEFECT: Add New missing for ${role}`).toBeVisible();
      await expect(editIcon, `DEFECT: Edit icon missing for ${role}`).toBeVisible();
    }
  }
}