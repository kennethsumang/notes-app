import { notifications } from '@mantine/notifications';

/**
 * useNotification custom hook
 */
export default function useNotification() {
  const success = (message: string, title: string = "") => {
    notifications.show({
      message: "Login successful!",
      color: "blue",
      title: title || undefined,
    });
  }

  const error = (message: string, title: string = "") => {
    notifications.show({
      message: message,
      color: "red",
      title: title || undefined,
    });
  }

  return {
    success,
    error,
  };
}