import { MSH, ADD } from "../../../typings";
import { hl7ElementMapper, hl7StringEscaperFactory } from "../utils";

export const parseADD = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): ADD => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const add = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);

  return hl7ElementMapper(
    add,
    {
      addendumContinuationPointer: (field) => hl7StringEscaper(field),
    },
    { rootName: "ADD" }
  );
};
