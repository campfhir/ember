import { MSH, AL1 } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaper,
  parseCodedElement,
} from "../utils";

export const parseAL1 = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): AL1 => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const al1 = segment.split(fieldSeparator);
  return hl7ElementMapper<AL1>(al1, {
    setId: (field) => hl7StringEscaper(field, controlCharacters) ?? "",
    allergyType: (field) => hl7StringEscaper(field, controlCharacters),
    allergyCode: (field) => parseCodedElement(field, controlCharacters),
    allergyReaction: (field) => hl7StringEscaper(field, controlCharacters),
    identificationDate: (field) => hl7StringEscaper(field, controlCharacters),
  });
};
