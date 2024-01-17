'use client'
import React, { useState, useEffect, useRef } from "react";

import moment from "moment";

import { VisTimeline } from "./VisTimeline";

import "./Timeline.scss";
import { TimelineOptions } from "vis-timeline";

const Home: React.FC = () => {
  const [startEnd] = React.useState([
    moment()
      .subtract(1, "d")
      .toDate(),
    moment().toDate()
  ]);

  const options: TimelineOptions = {
    start: startEnd[0],
    end: startEnd[1],
    min: startEnd[0],
    max: startEnd[1],
    horizontalScroll: true,
    zoomKey: "ctrlKey",
    orientation: "both",
    zoomMin: 1000 * 60 * 60 * 240
  };

  const groups = [
    {
      id: 1,
      content: "Group1"
    },
    {
      id: 2,
      content: "Group2",
      treeLevel: 1
    }
  ];

  const items = [
    {
      id: 11,
      group: 1,
      start: startEnd[0],
      end: startEnd[1],
      content: "Hello",
      className: "tl-item"
    },
    {
      id: 22,
      group: 2,
      start: startEnd[0],
      end: startEnd[1],
      content: "Nested Hello",
      className: "tl-item"
    }
  ];

  return <VisTimeline groups={groups} options={options} items={items} />;
};

export default Home;


