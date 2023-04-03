import { MSH, OBX } from "../../../typings";

export const parseOBX = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): OBX => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const obx = segment.split(fieldSeparator);
  throw new Error("Not implemented");
};
