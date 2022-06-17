import {useEffect, useState} from "react";
import {NotificationServices} from "../../services/NotificationServices";

export default function Notification() {
    let notificationServices = new NotificationServices();
    let [notifications,setNotifications] = useState([]);

    useEffect(() => {
        setNotifications(notifications.setnotificationServices.get(id));
    }, []);

    return (<div className={"d-flex flex-row flex-wrap justify-content-around align-items-center"}>
        {renderAlbums()}
    </div>)
}