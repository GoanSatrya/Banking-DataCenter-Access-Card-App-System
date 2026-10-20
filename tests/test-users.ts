type TestUser = 'generalUser' | 'sysAdmin' | 'networkOp' | 'tlNetworkOp' | 'shiftLeader';

const USER_ENV: Record<TestUser, { username: string; password: string }> = {
  generalUser: {
    username: 'FAC_GENERAL_USERNAME',
    password: 'FAC_GENERAL_PASSWORD',
  },
  sysAdmin: {
    username: 'FAC_SYSADMIN_USERNAME',
    password: 'FAC_SYSADMIN_PASSWORD',
  },
  networkOp: {
    username: 'FAC_NETWORK_OP_USERNAME',
    password: 'FAC_NETWORK_OP_PASSWORD',
  },
  tlNetworkOp: {
    username: 'FAC_TL_NETWORK_OP_USERNAME',
    password: 'FAC_TL_NETWORK_OP_PASSWORD',
  },
  shiftLeader: {
    username: 'FAC_SHIFT_LEADER_USERNAME',
    password: 'FAC_SHIFT_LEADER_PASSWORD',
  },
};

export function getTestUser(user: TestUser): { u: string; p: string } {
  const { username: usernameVariable, password: passwordVariable } = USER_ENV[user];
  const username = process.env[usernameVariable];
  const password = process.env[passwordVariable];

  if (!username || !password) {
    const missingVariables = [
      ...(username ? [] : [usernameVariable]),
      ...(password ? [] : [passwordVariable]),
    ];
    throw new Error(`Missing required test credentials: ${missingVariables.join(', ')}`);
  }

  return { u: username, p: password };
}
