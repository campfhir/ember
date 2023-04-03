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
  unescapeStrings,
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
    dateTimeOfMessage: unescapeStrings(msh[6], controlCharacters),
    security: unescapeStrings(msh[7], controlCharacters),
    message: {
      type: unescapeStrings(
        msh[8]?.split(componentSeparator)?.[0],
        controlCharacters
      ) as MessageTypes,
      event: unescapeStrings(
        msh[8]?.split(componentSeparator)?.[1],
        controlCharacters
      ) as MessageEvents,
    },
    messageControlId: unescapeStrings(msh[9], controlCharacters),
    processing: {
      id: unescapeStrings(
        msh[10]?.split(componentSeparator)?.[0],
        controlCharacters
      ),
      mode: unescapeStrings(
        msh[10]?.split(componentSeparator)?.[1],
        controlCharacters
      ),
    },
    versionId: unescapeStrings(msh[11], controlCharacters),
    sequenceNumber: msh[12] == null ? parseInt(msh[12], 10) : undefined,
    continuationPointer: unescapeStrings(msh[13], controlCharacters),
    acceptAcknowledgementType: unescapeStrings(msh[14], controlCharacters),
    applicationAcknowledgementType: unescapeStrings(msh[15], controlCharacters),
    countryCode: unescapeStrings(msh[16], controlCharacters),
    characterSet: msh[17]
      ?.split(componentSeparator, 3)
      ?.map((val) => unescapeStrings(val, controlCharacters)),
    principalLanguageOfMessage: parseCodedElement(msh[18], controlCharacters),
  };

  return { ok: true, val: mshHeader, warnings: [] };
};
