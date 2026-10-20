import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DetailCardPage } from '../../pages/DetailCardPage';
import { getTestUser } from '../test-users';

test.describe('FAC-SIT-004: Detail Card - Update Status', () => {
  let detailCardPage: DetailCardPage;

  test.beforeEach(async ({ page }) => {
    const generalUser = getTestUser('generalUser');
    await new LoginPage(page).login(generalUser.u, generalUser.p);
    detailCardPage = new DetailCardPage(page);
    await detailCardPage.navigateToCardList();
    await detailCardPage.openFirstCardDetails();
  });

  test('TC-1.1 & 1.3: Update with Valid Notes & Special Characters', async ({ page }) => {
    const specialNote = `Test Valid !@#$%^&*()_+ ${Date.now()}`;
    await detailCardPage.updateStatus('Aman', specialNote);

    await expect(
      page.getByText(specialNote, { exact: true }),
      'DEFECT: Note not rendered in Timeline.'
    ).toBeVisible();
  });

  test('TC-1.2 & 1.4: Reject Empty & Whitespace Notes', async ({ page }) => {
    await detailCardPage.updateStatus('Aman', '     ');

    await expect(
      page.getByText('Notes cannot be empty', { exact: true }),
      'DEFECT: Empty/whitespace bypass allowed.'
    ).toBeVisible();
  });
});