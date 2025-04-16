// 定义用户输入的类型
export interface UserInput {
    username: string;
    age: number;
    email: string;
    isStudent?: boolean;
  }
  
  // 判定邮箱是否合法
  const isValidEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  // 判定年龄是否符合要求
  const isValidAge = (age: number): boolean => age >= 18;
  
  // 判定用户名是否非空
  const isValidUsername = (username: string): boolean =>
    username.trim().length > 0;
  
  // 主函数：验证整个用户输入
  export const validateUserData = (input: UserInput): string[] => {
    const errors: string[] = [];
  
    // 类型保护自动推断 input 各字段类型
    if (!isValidUsername(input.username)) {
      errors.push("Username is required");
    }
  
    if (!isValidAge(input.age)) {
      errors.push("Age must be 18 or older");
    }
  
    if (!isValidEmail(input.email)) {
      errors.push("Email is invalid");
    }
  
    return errors;
  };
  