import { MSH, UAC } from "../../../typings";
import { hl7ElementMapper, parseCodedWithExceptionsFactory } from "../utils";

export function parseUAC(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): UAC {
  const rootName = "UAC";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const uac = segment.split(fieldSeparator);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  return hl7ElementMapper(
    uac,
    {
      credentialTypeCode: (field, element) =>
        parseCodedWithExceptions(field, element),
      credential: (field, element) => parseCodedWithExceptions(field, element),
    },
    { rootName }
  );
}
