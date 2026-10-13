export interface CreateUserInput {
  email: string;
  username: string;
  role: string;
  name: string;
  password: string;
}

export interface UserType extends CreateUserInput {
  id: number;
  createdAt: string;
  //updatedAt: string;
}
