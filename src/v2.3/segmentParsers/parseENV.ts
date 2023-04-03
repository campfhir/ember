import { EVN, MSH, MessageEvents } from "../../../typings";
import {
  parseExtendedCompositeIdNumberAndName,
  unescapeStrings,
} from "../utils";

export const parseEVN = (
  segment: string,
  controlCharacters: MSH["controlCharacters"]
): EVN => {
  const { fieldSeparator, repetitionSeparator } = controlCharacters;
  const evn = segment.split(fieldSeparator);

  return {
    eventTypeCode: unescapeStrings(evn[1], controlCharacters) as MessageEvents,
    recordedDateTime: unescapeStrings(evn[2], controlCharacters),
    dateTimePlannedEvent: unescapeStrings(evn[3], controlCharacters),
    eventReasonCode: unescapeStrings(evn[4], controlCharacters),
    operatorId: parseExtendedCompositeIdNumberAndName(
      evn[5],
      controlCharacters
    ),
    eventOccurred: unescapeStrings(evn[6], controlCharacters),
  };
};
