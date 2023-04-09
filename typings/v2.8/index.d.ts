import { MessageSegments, SegmentHeaders } from "./MessageSegments";
export * from "./MessageSegments";
export * from "./DataTypes";
export * from "./MessageTypes";
export * from "./MessageEvents";
export * from "./events";
export * from "./Segments";
export type HeaderResults = {
  header: SegmentHeaders;
  fieldString: string;
};
