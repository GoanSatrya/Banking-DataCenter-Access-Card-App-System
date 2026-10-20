import { Page, expect } from '@playwright/test';

export class StatusCardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyStatusHeaderRemoved() {
    await this.page.goto('/admin/card-status');
    const headerToggle = this.page.locator('#status-active-inactive-toggle, .status-header-control');
    await expect(
      headerToggle,
      'DEFECT: Status header toggle still visible.'
    ).toBeHidden();
  }

  async verifyAllCardsActiveByDefault() {
    await this.page.goto('/admin/access-card');
    await expect(
      this.page.locator('tr:has-text("Inactive")'),
      'DEFECT: Found Inactive cards.'
    ).toHaveCount(0);
  }

  async createNewCardAndVerifyActive(cardName: string) {
  await this.page.goto('/admin/access-card');

  await this.page.getByRole('button', { name: /add new/i }).click();

  const cardNameInput = this.page.locator('input[placeholder="Input card name here"]');
  await expect(cardNameInput).toBeVisible();
  await cardNameInput.fill(cardName);

  const mifareInput = this.page.locator('input[placeholder="Input card mifare code here"]');
  await expect(mifareInput).toBeVisible();
  await mifareInput.fill(`MIFARE_${Date.now()}`);

  const saveButton = this.page
    .locator('button[data-slot="custom-button"]')
    .filter({ has: this.page.locator('svg.lucide-save') });

  await expect(saveButton).toBeVisible();
  await saveButton.click();

  const cardRow = this.page.locator('tr', { hasText: cardName });
  await expect(cardRow, `DEFECT: Card ${cardName} not found.`).toBeVisible();
  await expect(cardRow.locator('text=Inactive'), `DEFECT: Card ${cardName} saved as Inactive.`).toBeHidden();
  
  }
}