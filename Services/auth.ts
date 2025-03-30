import axios from "axios";
import { User } from "../Models/User";

function ValidateUserName(userName: string): boolean {
  if (userName.length >= 15) {
    throw new Error("Длина userName должна быть меньше 16 символов");
  }
  return true;
}

function ValidatePassword(password: string): boolean {
  if (password.length < 6) {
    throw new Error("Пароль должен содержать минимум 6 символов");
  }
  return true;
}

function ValidateEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(email)) {
    throw new Error("Некорректный формат email");
  }
  return true;
}

async function SignUp(email: string, password: string, userName: string): Promise<User> {
    ValidateEmail(email);
    ValidatePassword(password);
    ValidateUserName(userName);

    try {
        const response = await axios.post("http://127.0.0.1:5252/api/Auth/signup", {
            email, password, userName
        });
        return new User(response.data.email, response.data.userName);
    } catch (error: any) {
        throw new Error(error.response?.data || "Ошибка регистрации");
    }
}

export { SignUp };