import { SegmentHeader } from "./Segments";

export * from "./MessageSegments";
export * from "./DataTypes";
export * from "./MessageTypes";
export * from "./MessageEvents";
export * from "./events";
export * from "./Segments";
export type HeaderResults = {
  header: SegmentHeader;
  fieldString: string;
};
