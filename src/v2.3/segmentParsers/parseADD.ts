import { MSH, ADD } from "../../../typings";

export const parseADD = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): ADD => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const add = segment.split(fieldSeparator);
  return {
    addendumContinuationPointer: add[0],
  };
};
