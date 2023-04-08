import type {
  WrappedResult,
  MSH,
  MessageEvents,
  MessageTypes,
} from "../../../typings";
import {
  getSegmentHeader,
  parseCodedElement,
  parseHierarchicDesignator,
  hl7StringEscaper,
} from "../utils";

export const parseMSH = (segment: string | undefined): WrappedResult<MSH> => {
  if (segment == null) {
    return { ok: false, err: new Error("No header present in empty string") };
  }
  const res = getSegmentHeader(segment);
  if (!res.ok) return { ok: false, err: new Error("Could not parse header") };

  const { header, fieldString } = res.val;
  if (header !== "MSH") {
    return { ok: false, err: new Error("Cannot parse a non-MSH segment") };
  }

  const fieldSeparator = fieldString[0],
    componentSeparator = fieldString[1],
    repetitionSeparator = fieldString[2],
    escapeCharacter = fieldString[3],
    subComponentSeparator = fieldString[4];
  const msh = fieldString.split(fieldSeparator);
  const controlCharacters = {
    fieldSeparator,
    repetitionSeparator,
    escapeCharacter,
    subComponentSeparator,
    componentSeparator,
  };
  const mshHeader: MSH = {
    controlCharacters,
    sendingApplication: parseHierarchicDesignator(msh[2], controlCharacters),
    sendingFacility: parseHierarchicDesignator(msh[3], controlCharacters),
    receivingApplication: parseHierarchicDesignator(msh[4], controlCharacters),
    receivingFacility: parseHierarchicDesignator(msh[5], controlCharacters),
    dateTimeOfMessage: hl7StringEscaper(msh[6], controlCharacters),
    security: hl7StringEscaper(msh[7], controlCharacters),
    message: {
      type: hl7StringEscaper(
        msh[8]?.split(componentSeparator)?.[0],
        controlCharacters
      ) as MessageTypes,
      event: hl7StringEscaper(
        msh[8]?.split(componentSeparator)?.[1],
        controlCharacters
      ) as MessageEvents,
    },
    messageControlId: hl7StringEscaper(msh[9], controlCharacters),
    processing: {
      id: hl7StringEscaper(
        msh[10]?.split(componentSeparator)?.[0],
        controlCharacters
      ),
      mode: hl7StringEscaper(
        msh[10]?.split(componentSeparator)?.[1],
        controlCharacters
      ),
    },
    versionId: hl7StringEscaper(msh[11], controlCharacters),
    sequenceNumber: msh[12] == null ? parseInt(msh[12], 10) : undefined,
    continuationPointer: hl7StringEscaper(msh[13], controlCharacters),
    acceptAcknowledgementType: hl7StringEscaper(msh[14], controlCharacters),
    applicationAcknowledgementType: hl7StringEscaper(
      msh[15],
      controlCharacters
    ),
    countryCode: hl7StringEscaper(msh[16], controlCharacters),
    characterSet: msh[17]
      ?.split(componentSeparator, 3)
      .map((val) => hl7StringEscaper(val, controlCharacters)),
    principalLanguageOfMessage: parseCodedElement(msh[18], controlCharacters),
  };

  return { ok: true, val: mshHeader, warnings: [] };
};
