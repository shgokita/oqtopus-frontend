// 承認ステータス
// approved: 承認済
// unapproved: 未承認
// suspended: 停止中
export type UserStatus = 'approved' | 'unapproved' | 'suspended';

export interface User {
  id: string;
  email: string;
  name: string;
  organization: string;
  status: UserStatus;
}

export function getStatus(status: UserStatus): string {
  let statusValue = '';
  switch (status) {
    case 'approved':
      statusValue = '承認済';
      break;
    case 'unapproved':
      statusValue = '未承認';
      break;
    case 'suspended':
      statusValue = '停止中';
      break;
  }
  return statusValue;
}
