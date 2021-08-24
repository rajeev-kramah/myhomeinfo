import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
export const alertmesage = {
  createNotification(status, message) {
    switch (status) {
      case 200:
        return NotificationManager.info(message);
      case 201:
        return NotificationManager.success(message);
      case 404:
        return NotificationManager.warning(message);
      case 500:
        return NotificationManager.error(message);
      case 422:
        return NotificationManager.error(message);
      default:
    }
  }
};
