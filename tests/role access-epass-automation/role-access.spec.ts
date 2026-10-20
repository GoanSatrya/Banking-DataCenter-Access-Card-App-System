import { test } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { RoleAccessPage } from '../../pages/RoleAccessPage';
import { EnforcementPage } from '../../pages/EnforcementPage';
import { getTestUser } from '../test-users';

test.describe('FAC-SIT-005: Role Access Enforcement', () => {
  test('TC 1: SysAdmin Configuration Flow', async ({ page }) => {
    const sysAdmin = getTestUser('sysAdmin');
    await new LoginPage(page).login(sysAdmin.u, sysAdmin.p);

    const rolePage = new RoleAccessPage(page);
    await rolePage.navigateToRoleAdmin();
    await rolePage.toggleFirstCheckboxAndSave('Menu', 'Network Operator');

    await rolePage.navigateToRoleAdmin();
    await rolePage.toggleFirstCheckboxAndSave('Permission', 'Network Operator');
  });

  test('TC 2: Network Operator (Restricted)', async ({ page }) => {
    const networkOp = getTestUser('networkOp');
    await new LoginPage(page).login(networkOp.u, networkOp.p);

    const enforcement = new EnforcementPage(page);
    await enforcement.navigateAndVerifyAccessCard('Network Operator');
    await enforcement.navigateAndVerifyCardStatus('Network Operator', true);
  });

  test('TC 3: TL Network Op (Full Access)', async ({ page }) => {
    const tlNetworkOp = getTestUser('tlNetworkOp');
    await new LoginPage(page).login(tlNetworkOp.u, tlNetworkOp.p);

    const enforcement = new EnforcementPage(page);
    await enforcement.navigateAndVerifyAccessCard('TL Network Op');
    await enforcement.navigateAndVerifyCardStatus('TL Network Op', false);
  });

  test('TC 4: Shift Leader (Full Access)', async ({ page }) => {
    const shiftLeader = getTestUser('shiftLeader');
    await new LoginPage(page).login(shiftLeader.u, shiftLeader.p);

    const enforcement = new EnforcementPage(page);
    await enforcement.navigateAndVerifyAccessCard('Shift Leader');
    await enforcement.navigateAndVerifyCardStatus('Shift Leader', false);
  });

  test('TC 5: SysAdmin (Full Access)', async ({ page }) => {
    const sysAdmin = getTestUser('sysAdmin');
    await new LoginPage(page).login(sysAdmin.u, sysAdmin.p);

    const enforcement = new EnforcementPage(page);
    await enforcement.navigateAndVerifyAccessCard('SysAdmin');
    await enforcement.navigateAndVerifyCardStatus('SysAdmin', false);
  });
});