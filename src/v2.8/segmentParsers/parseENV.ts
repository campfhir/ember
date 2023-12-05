import { EVN, MSH, MessageEvents } from "../../../typings";
import {
  parseExtendedCompositeIdNumberAndNameForPersonFactory,
  hl7StringEscaperFactory,
  hl7ElementMapper,
  parseCodedWithExceptionsFactory,
} from "../utils";

export function parseEVN(
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): EVN {
  const rootName = "EVN";
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const evn = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameForPersonFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);

  return hl7ElementMapper(
    evn,
    {
      eventTypeCode: (field) => hl7StringEscaper(field) as MessageEvents,
      recordedDateTime: (field) => hl7StringEscaper(field) ?? "",
      dateTimePlannedEvent: (field) => hl7StringEscaper(field),
      eventReasonCode: (field, elementPath) =>
        parseCodedWithExceptions(field, elementPath),
      operatorId: (field, elementPath) =>
        field
          .split(repetitionSeparator)
          .map((comp, ind) =>
            parseExtendedCompositeIdNumberAndName(
              comp,
              `${elementPath}[${ind}]`
            )
          ),
      eventOccurred: (field) => hl7StringEscaper(field),
    },
    { rootName }
  );
}
