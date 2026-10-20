import { Page, expect } from '@playwright/test';

export class DetailCardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToCardList() {
    await this.page.goto('/admin/access-card');
    await expect(this.page.getByText('Card', { exact: true })).toBeVisible();
  }

  async openFirstCardDetails() {
    const viewDetailsButton = this.page.getByRole('button', { name: /view details/i }).first();
    await expect(viewDetailsButton).toBeVisible();
    await viewDetailsButton.click();

    await expect(this.page.getByText(/history timeline/i)).toBeVisible();
  }

  async updateStatus(status: string, notes: string) {
  const statusDropdown = this.page.getByRole('combobox').first();
  await expect(statusDropdown).toBeVisible();
  await statusDropdown.click();

  await this.page.locator('[role="option"]', { hasText: status }).click();

  const notesInput = this.page.locator('textarea[name="notes"]');
  await expect(notesInput).toBeVisible();
  await notesInput.fill(notes);

  await this.page.getByRole('button', { name: /update status/i }).click();
  }
}