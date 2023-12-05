import type {
  WrappedResult,
  MSH,
  MessageEvents,
  MessageTypes,
} from "../../../typings";
import {
  getSegmentHeader,
  debugLogger,
  hl7ElementMapper,
  hl7StringEscaperFactory,
  parseHierarchicDesignatorFactory,
  parseCodedWithExceptionsFactory,
  parseEntityIdentifierFactory,
  parseExtendedCompositeNameAndIdForOrganizationsFactory,
} from "../utils";

const debug = debugLogger.extend("parseMSH");

export function parseMSH(segment: string | undefined): WrappedResult<MSH> {
  const rootName = "MSH";
  if (segment == null) {
    debug("Segment is NULL or undefined");
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
  const encodingCharacters = {
    fieldSeparator,
    repetitionSeparator,
    escapeCharacter,
    subComponentSeparator,
    componentSeparator,
  };
  debug("Control Characters => %O", encodingCharacters);

  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
  const parseCodedWithExceptions =
    parseCodedWithExceptionsFactory(encodingCharacters);
  const parseEntityIdentifier =
    parseEntityIdentifierFactory(encodingCharacters);
  const parseExtendedCompositeNameAndIdForOrganizations =
    parseExtendedCompositeNameAndIdForOrganizationsFactory(encodingCharacters);

  const mshHeader = hl7ElementMapper<MSH>(
    msh,
    {
      fieldSeparator: fieldSeparator,
      encodingCharacters,
      sendingApplication: (field, elementPath) =>
        parseHierarchicDesignator(field, elementPath),
      sendingFacility: (field, elementPath) =>
        parseHierarchicDesignator(field, elementPath),
      receivingApplication: (field, elementPath) =>
        parseHierarchicDesignator(field, elementPath),
      receivingFacility: (field, elementPath) =>
        parseHierarchicDesignator(field, elementPath),
      dateTimeOfMessage: (field) => hl7StringEscaper(field),
      security: (field) => hl7StringEscaper(field),
      message: (field) => ({
        type: hl7StringEscaper(
          field?.split(componentSeparator)?.[0]
        ) as MessageTypes,
        event: hl7StringEscaper(
          field?.split(componentSeparator)?.[1]
        ) as MessageEvents,
      }),
      messageControlId: (field) => hl7StringEscaper(field) ?? "",
      processing: (field) => ({
        id: hl7StringEscaper(field?.split(componentSeparator)?.[0]),
        mode: hl7StringEscaper(field?.split(componentSeparator)?.[1]),
      }),
      versionId: (field) => hl7StringEscaper(field) ?? "",
      sequenceNumber: (field) => (field ? parseInt(field, 10) : undefined),
      continuationPointer: (field) => hl7StringEscaper(field),
      acceptAcknowledgementType: (field) => hl7StringEscaper(field),
      applicationAcknowledgementType: (field) => hl7StringEscaper(field),
      countryCode: (field) => hl7StringEscaper(field),
      characterSet: (field) =>
        field
          ?.split(componentSeparator, 3)
          .map((val) => hl7StringEscaper(val) ?? ""),
      principalLanguageOfMessage: (field, elementPath) =>
        parseCodedWithExceptions(field, elementPath),
      alternateCharacterSetHandlingScheme: (field) => hl7StringEscaper(field),
      messageProfileIdentifier: (field, elementPath) =>
        field
          .split(repetitionSeparator)
          .map((rep, ind) =>
            parseEntityIdentifier(rep, `${elementPath}[${ind}]`)
          ),
      sendingResponsibleOrganization: (field, path) =>
        parseExtendedCompositeNameAndIdForOrganizations(field, path),
      receivingResponsibleOrganization: (field, path) =>
        parseExtendedCompositeNameAndIdForOrganizations(field, path),
      sendingNetworkAddress: (field, elementPath) =>
        parseHierarchicDesignator(field, elementPath),
      receivingNetworkAddress: (field, elementPath) =>
        parseHierarchicDesignator(field, elementPath),
    },
    { rootName }
  );

  return { ok: true, val: mshHeader, warnings: [] };
}
