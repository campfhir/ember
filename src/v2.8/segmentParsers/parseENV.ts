import { EVN, MSH, MessageEvents } from "../../../typings";
import {
  parseExtendedCompositeIdNumberAndNameFactory,
  hl7StringEscaperFactory,
  hl7ElementMapper,
} from "../utils";

const rootName = "EVN";
export const parseEVN = (
  segment: string,
  encodingCharacters: MSH["encodingCharacters"]
): EVN => {
  const { fieldSeparator, repetitionSeparator } = encodingCharacters;
  const evn = segment.split(fieldSeparator);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseExtendedCompositeIdNumberAndName =
    parseExtendedCompositeIdNumberAndNameFactory(encodingCharacters);

  return hl7ElementMapper(
    evn,
    {
      eventTypeCode: (field) => hl7StringEscaper(field) as MessageEvents,
      recordedDateTime: (field) => hl7StringEscaper(field) ?? "",
      dateTimePlannedEvent: (field) => hl7StringEscaper(field),
      eventReasonCode: (field) => hl7StringEscaper(field),
      operatorId: (field, elementPath) =>
        parseExtendedCompositeIdNumberAndName(field, `${elementPath}`),
      eventOccurred: (field) => hl7StringEscaper(field),
    },
    { rootName }
  );
};
