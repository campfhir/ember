import { MSH, AL1 } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
} from "../utils";

export const parseAL1 = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): AL1 => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const al1 = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);

  return hl7ElementMapper<AL1>(
    al1,
    {
      setId: (field) => hl7StringEscaper(field) ?? "",
      allergyType: (field) => hl7StringEscaper(field),
      allergyCode: (field) => parseCodedWithExceptions(field),
      allergyReaction: (field) => hl7StringEscaper(field),
      identificationDate: (field) => hl7StringEscaper(field),
    },
    { rootName: "AL1" }
  );
};
