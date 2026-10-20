// tests/smoke-test.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DetailCardPage } from '../pages/DetailCardPage';
import { StatusCardPage } from '../pages/StatusCardPage'; // For navigation to Status Card Admin
import { RoleAccessPage } from '../pages/RoleAccessPage'; // For navigation to Role Admin
import { getTestUser } from './test-users';

test.describe('FAC-SMOKE-001: Core Application Smoke Test', () => {
  let loginPage: LoginPage;
  let detailCardPage: DetailCardPage;
  let statusCardPage: StatusCardPage;
  let roleAccessPage: RoleAccessPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    detailCardPage = new DetailCardPage(page);
    statusCardPage = new StatusCardPage(page);
    roleAccessPage = new RoleAccessPage(page);

    // All smoke tests will start with a successful login
    const generalUser = getTestUser('generalUser');
    await loginPage.login(generalUser.u, generalUser.p);
  });

  test('ST-001: Verify successful login and Dashboard access', async ({ page }) => {
    // LoginPage.login() already asserts the 'Admin' button is visible,
    // which confirms successful navigation past login.
    // We can add an additional assertion for a unique dashboard element.
    await expect(page.url()).toContain('/dashboard');
    await expect(page.getByText(/todays entry pass statistics/i)).toBeVisible();
    await expect(page.getByText(/mi wahyu/i)).toBeVisible(); // Verify user name is displayed
  });

  test('ST-002: Verify Detail Card view and status update', async ({ page }) => {
    await detailCardPage.navigateToCardList();
    await detailCardPage.openFirstCardDetails();

    // Perform a simplified status update for smoke test
    const smokeTestNote = `Smoke Test Update ${Date.now()}`;
    // Assuming 'Aman' is a valid status that can be selected
    await detailCardPage.updateStatus('Aman', smokeTestNote);

    // Verify the update was successful by checking the note in the timeline
    await expect(page.getByText(smokeTestNote, { exact: true })).toBeVisible({ timeout: 10000 });
  });

  test('ST-003: Verify navigation to Status Card Admin page', async ({ page }) => {
    await statusCardPage.verifyStatusHeaderRemoved(); // This method already navigates to /admin/card-status
    // Add an assertion for a unique element on the Status Card Admin page
    await expect(page.getByText('CARD STATUS ADMIN')).toBeVisible();
    // You might want to add an assertion for a table or list of cards if present
    await expect(page.locator('table')).toBeVisible();
  });

  test('ST-004: Verify navigation to Role Admin page', async ({ page }) => {
    await roleAccessPage.navigateToRoleAdmin();
    // Add an assertion for a unique element on the Role Admin page
    await expect(page.getByText('ROLE ADMIN')).toBeVisible();
    // You might want to add an assertion for a table or list of roles if present
    await expect(page.locator('table')).toBeVisible();
  });
});