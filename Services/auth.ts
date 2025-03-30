import axios from "axios";

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

async function SignUp(email: string, password: string, userName: string) {
  try {
    ValidateEmail(email);
    ValidatePassword(password);
    ValidateUserName(userName);

    const response = await axios.post("http://127.0.0.1:5252/api/Auth/signup", {
      email,
      password,
      userName,
    });

    if (response && response.data) {
      // Возвращаем успешный ответ с email
      return response.data; 
    } else {
      console.error("Ответ от сервера пустой или некорректный");
      throw new Error("Ответ от сервера пустой или некорректный");
    }

  } catch (error: any) {
    // Логируем ошибку и передаем сообщение об ошибке
    console.error("Ошибка регистрации:", error.response ? error.response.data : error.message);

    if (error.response) {
      // Сервер вернул ошибку
      throw new Error(error.response.data);  // Бросаем ошибку с сообщением, которое пришло от сервера
    } else if (error.message) {
      // Ошибка валидации или запроса
      throw new Error(error.message);  // Бросаем ошибку с локальным сообщением
    } else {
      // Для других случаев
      throw new Error("Неизвестная ошибка");
    }
  }
}

export { SignUp };