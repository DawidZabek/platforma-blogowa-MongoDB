import { useEffect, useState } from "react";

export function useNotifications() {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = () => {
        fetch("/api/notifications")
            .then(r => r.json())
            .then(data => setNotifications(Array.isArray(data) ? data : []))
            .catch(() => {});
    };

    useEffect(() => {
        fetchNotifications();

        const source = new EventSource("/api/notifications/stream");
        source.onmessage = (e) => {
            const notification = JSON.parse(e.data);
            setNotifications(prev => [notification, ...prev]);
        };

        const interval = setInterval(fetchNotifications, 3000);

        return () => {
            source.close();
            clearInterval(interval);
        };
    }, []);

    const now = new Date();
    return notifications.filter(n => new Date(n.expireAt) > now);
}
