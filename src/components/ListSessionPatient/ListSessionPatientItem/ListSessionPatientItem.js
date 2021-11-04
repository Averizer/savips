import React from "react";
import { List, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

import "./ListSessionPatientItem.scss";

export default function ListSessionPatientItem(props) {
  const { session } = props;

  return (
    <Link to="/patientSessionDescription">
      <List.Item>
        <div className="itemSession">
          <Label circular size="big" className="labelItem">
            HL
          </Label>
          <List.Content>
            <List.Header className="headerItem">{session.id}</List.Header>
          </List.Content>
        </div>
      </List.Item>
    </Link>
  );
}
