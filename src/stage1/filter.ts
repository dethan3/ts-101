export type User = {
    id: number;
    name: string;
    age: number;
    email?: string;
    isActive: boolean;
  };
  
  export const filterUsers = (users: User[], minAge: number): User[] =>
    users.filter((u) => u.age >= minAge && u.isActive);
  
  export const getFirstItem = <T>(arr: T[]): T | undefined => arr[0];
  
  export const printUserEmail = (user: User): void => {
    const email = user.email?.toLowerCase() ?? 'No email';
    console.log(`📧 Email: ${email}`);
  };
  