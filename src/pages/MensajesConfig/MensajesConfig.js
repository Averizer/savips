import React, { useEffect } from "react";
import ListPatient from "../../components/MenuRight/ListPatient/ListPatient";

export default function MensajesConfig({
  setNotificationsContent,
  setNotificationHide,
  userInfo,
}) {
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      setNotificationHide(true);
      setNotificationsContent(<ListPatient userInfo={userInfo} flag={false} />);
    }
  }, [userInfo]);
  return <div></div>;
}
