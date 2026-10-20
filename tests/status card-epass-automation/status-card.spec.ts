import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { StatusCardPage } from '../../pages/StatusCardPage';
import { getTestUser } from '../test-users';

test.describe('FAC-SIT-006: Status Card Header & Active Enforcement', () => {
  let statusPage: StatusCardPage;

  test.beforeEach(async ({ page }) => {
    const generalUser = getTestUser('generalUser');
    await new LoginPage(page).login(generalUser.u, generalUser.p);
    statusPage = new StatusCardPage(page);
  });

  test('TC 1: Status Header Control Removal', async () => {
    await statusPage.verifyStatusHeaderRemoved();
  });

  test('TC 2: Default Active Behavior', async () => {
    await statusPage.verifyAllCardsActiveByDefault();
    await statusPage.createNewCardAndVerifyActive(`AutoCard_${Date.now()}`);
  });
});