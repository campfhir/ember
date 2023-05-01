import { MSH, NTE } from "../../../typings";
import {
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseCodedWithExceptionsFactory,
  parseExtendedCompositeIdNumberAndNameForPerson,
  parseExtendedCompositeIdNumberAndNameForPersonFactory,
} from "../utils";

export const parseNTE = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): NTE => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const NTE = segment.split(fieldSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndNameForPerson =
    parseExtendedCompositeIdNumberAndNameForPersonFactory(encodingCharacters);
  return hl7ElementMapper(
    NTE,
    {
      setId: (field) => hl7StringEscaper(field),
      sourceOfComment: (field) => hl7StringEscaper(field),
      comment: (field) =>
        field
          ?.split(repetitionSeparator)
          .map((comp) => hl7StringEscaper(comp)!),
      commentType: (field, elementPath) =>
        parseCodedWithExceptions(field, elementPath),
      enteredBy: (field, elementPath) =>
        parseExtendedCompositeIdNumberAndNameForPerson(field, elementPath),
      enteredDateTime: (field) => hl7StringEscaper(field),
      effectiveStartDate: (field) => hl7StringEscaper(field),
      expirationDate: (field) => hl7StringEscaper(field),
    },
    { rootName: "NTE" }
  );
};
