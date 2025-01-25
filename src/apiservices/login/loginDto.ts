export interface CreateUserDTO {
    fullname: string;
    email: string;
    password: string;
  }
  
  export interface UpdateUserDTO {
    fullname?: string;
    email?: string;
    password?: string;
  }
  
  export interface UserResponseDTO {
    id: number;
    fullname: string;
    email: string;
  }