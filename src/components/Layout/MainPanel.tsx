import React from "react";
import styled from "styled-components";
import AttributeList from "@components/AttributeList";

const MainPanel: React.FC = () => (
  <Panel>
    <AttributeList />
  </Panel>
);

const Panel = styled.div`
  padding: 8px;
  overflow-y: hidden;
  height: 100%;
`;

export default MainPanel;
