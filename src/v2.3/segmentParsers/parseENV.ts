import { EVN, MSH, MessageEvents } from "../../../typings";
import {
  parseExtendedCompositeIdNumberAndName,
  hl7StringEscaper,
  hl7ElementMapper,
} from "../utils";

export const parseEVN = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): EVN => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const evn = segment.split(fieldSeparator);

  return hl7ElementMapper(evn, {
    eventTypeCode: (field) =>
      hl7StringEscaper(field, controlCharacters) as MessageEvents,
    recordedDateTime: (field) => hl7StringEscaper(field, controlCharacters),
    dateTimePlannedEvent: (field) => hl7StringEscaper(field, controlCharacters),
    eventReasonCode: (field) => hl7StringEscaper(field, controlCharacters),
    operatorId: (field) =>
      parseExtendedCompositeIdNumberAndName(field, controlCharacters),
    eventOccurred: (field) => hl7StringEscaper(field, controlCharacters),
  });
};
