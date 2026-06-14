import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Badge from "react-bootstrap/Badge";

function NotificationBell({ notifications }) {
    const [show, setShow] = useState(false);

    return (
        <Dropdown show={show} onToggle={setShow} align="end">
            <Dropdown.Toggle variant="dark" className="position-relative border-0">
                Powiadomienia
                {notifications.length > 0 && (
                    <Badge bg="danger" pill className="ms-1">
                        {notifications.length}
                    </Badge>
                )}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: "300px", maxHeight: "400px", overflowY: "auto" }}>
                {notifications.length === 0 ? (
                    <Dropdown.ItemText className="text-muted">Brak powiadomień</Dropdown.ItemText>
                ) : (
                    notifications.map((n) => (
                        <Dropdown.ItemText key={n._id} className="border-bottom py-2">
                            <div>{n.content}</div>
                            <small className="text-muted">
                                Wygasa: {new Date(n.expireAt).toLocaleDateString("pl-PL")}
                            </small>
                        </Dropdown.ItemText>
                    ))
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default NotificationBell;
