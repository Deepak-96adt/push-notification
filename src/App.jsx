import { useState, useEffect } from "react";

const NotificationApp = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const fetchNotifications = () => {
      fetch("http://192.168.1.18:8080/send/notification") // Replace with your API
        .then((res) => res.json())
        .then((data) => {
          const newCount = data.unreadCount;
          setCount(newCount);

          // Update the title bar with notification count
          document.title = newCount > 0 ? `🔔 (${newCount}) My PWA` : "My PWA";

          // Show a system notification
          if (newCount > 0) {
            new Notification("New Notifications!", {
              body: `You have ${newCount} new notifications`,
              icon: "/icon.png",
            });

            // Update the taskbar badge (PWA only)
            if ("setAppBadge" in navigator) {
              navigator.setAppBadge(newCount).catch((err) => console.error(err));
            }
          }
        })
        .catch((err) => console.error("Error fetching notifications", err));
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000); // Poll every 10 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Hello, World!</h1>
      <h2>🔔 Notifications: {count}</h2>
    </div>
  );
};

export default NotificationApp;
