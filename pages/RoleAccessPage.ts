import { Page, expect } from '@playwright/test';

export class RoleAccessPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToRoleAdmin() {
    await this.page.goto('/admin/role');
    await this.page.waitForSelector('text=ROLE ADMIN');
  }

  async toggleFirstCheckboxAndSave(type: 'Menu' | 'Permission', roleName: string) {
    const roleRow = this.page.locator('tr', { hasText: roleName });

    await roleRow.getByRole('button', { name: new RegExp(`Manage ${type}`, 'i') }).click();
    await expect(this.page.getByText(type, { exact: true })).toBeVisible();

    await this.page.getByRole('checkbox').first().click();

    await expect(
      this.page.getByText('Unsaved changes', { exact: true }),
      'DEFECT: Unsaved changes pop-up missing.'
    ).toBeVisible();

    await this.page.getByRole('button', { name: /save changes/i }).click();
  }
}