import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, StyleSheet } from 'react-native';
import { SignUp } from './Services/auth'; // Подключаем ваш сервис

function App(): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError(''); // Очистка ошибки перед новой попыткой

    try {
      const response = await SignUp(email, password, userName);
      console.log("Регистрация успешна", response);  // Если регистрация успешна, выводим ответ сервера
      // Можете сделать что-то после успешной регистрации, например, редирект или очистку полей
    } catch (err: any) {
      setError(err.message); // Устанавливаем ошибку в состояние
      console.error("Ошибка регистрации:", err);  // Логируем ошибку
    } finally {
      setLoading(false); // Завершаем загрузку
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Введите email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Введите userName"
        value={userName}
        onChangeText={setUserName}
      />

      <TextInput
        style={styles.input}
        placeholder="Введите пароль"
        value={password}
        onChangeText={setPassword} 
        secureTextEntry={true}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button
        title={loading ? 'Загрузка...' : 'Зарегистрироваться'}
        onPress={handleSignUp}
        disabled={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default App;