import * as React from 'react';

import * as vistimeline from 'vis-timeline/esnext';
import * as visdata from 'vis-data/esnext';
import 'vis-timeline/dist/vis-timeline-graph2d.min.css';
import dynamic from 'next/dynamic';

const VisTimeline = dynamic(
  () => import('vis-timeline/esnext').then((pkg) => pkg.Timeline),
  { ssr: false }
);


type TLProps = {
  items: vistimeline.DataItemCollectionType,
  groups: vistimeline.DataGroupCollectionType,
  options?: vistimeline.TimelineOptions,
  rangeChangeHandler?: (props: any) => void,
}

export const VisTimeline: React.FC<TLProps> = (props) => {

  const { items, groups, options, rangeChangeHandler } = props;

  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  const [timeline, setTimeline] = React.useState<vistimeline.Timeline | null>(null);

  React.useEffect(() => {
      if (element) {
          const tl = new vistimeline.Timeline(element, []);
          setTimeline(tl);
          return () => tl.destroy();
      }
  }, [element]);

  React.useEffect(() => {
      timeline?.setGroups(groups);
  }, [timeline, groups]);

  React.useEffect(() => {
      timeline?.setItems(items);
  }, [timeline, items]);

  React.useEffect(() => {
      if (options && timeline) {
          timeline.setOptions(options);
      }
  }, [timeline, options]);

//   React.useEffect(() => {
//       if (timeline && rangeChangeHandler) {
//           timeline.on('rangechange', rangeChangeHandler);
//           return () => timeline.off('rangechange', rangeChangeHandler);
//       }
//   }, [timeline, rangeChangeHandler]);

  return <div ref={r => setElement(r)} />;
};
