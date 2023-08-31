import { Tab } from 'bootstrap';
import React from 'react'
import { useState } from 'react';
import { Tabs } from 'react-bootstrap';
import UnitOutStanding from '../Tables/UnitOutStanding';
import CustomerOutStanding from '../Tables/CustomerOutStanding';

export default function TabData() {

    const [key, setKey] = useState("tabdata");

  return (
    <div>
      <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 mt-3 tab_font"
    >
      <Tab eventKey="tabdata" title="Unit Outstanding">
      <UnitOutStanding/>
      </Tab>

      <Tab eventKey="Programs Processing" title="Customer Outstanding">
        <CustomerOutStanding/>
      </Tab>
    </Tabs>
    </div>
  )
}
