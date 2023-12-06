import d from "debug";
import {
  DischargeLocation,
  DriversLicenseNumber,
  ExtendedCompositeIdNumberAndNameForPerson,
  ExtendedTelecommunicationNumber,
  FinancialClass,
  MSH,
  WrappedResult,
  PersonLocation,
  ExtendedCompositeNameAndIdForOrganizations,
  JobCodeClass,
  SegmentHeaders,
  CodedWithExceptions,
  EntityIdentifier,
  ExtendedAddress,
  ExtendedCompositeIdWithCheckDigit,
  ExtendedPersonName,
  HeaderResults,
  HierarchicDesignator,
  CodedWithNoExceptions,
  DateRange,
} from "../../../typings";

export const debugLogger = d("ember");
const utilDebug = debugLogger.extend("utils");

export function parseEntityIdentifier(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string | undefined
): EntityIdentifier {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  if (component == null) return {};
  return hl7ElementMapper(
    component,
    {
      entityIdentifier: (element) => hl7StringEscaper(element),
      namespaceId: (element) => hl7StringEscaper(element),
      universalId: (element) => hl7StringEscaper(element),
      universalIdType: (element) => hl7StringEscaper(element),
    },
    { rootName: element }
  );
}

export function parseEntityIdentifierFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (field: string | undefined, element?: string) {
    return parseEntityIdentifier(field, encodingCharacters, element);
  };
}

export function parseExtendedAddress(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element?: string
): ExtendedAddress {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  if (component == null) return {};
  return hl7ElementMapper(
    component,
    {
      streetAddress: (element) => hl7StringEscaper(element),
      otherDesignation: (element) => hl7StringEscaper(element),
      city: (element) => hl7StringEscaper(element),
      stateOrProvince: (element) => hl7StringEscaper(element),
      zipOrPostalCode: (element) => hl7StringEscaper(element),
      country: (element) => hl7StringEscaper(element),
      addressType: (element) => hl7StringEscaper(element),
      otherGeographicDesignation: (element) => hl7StringEscaper(element),
      countyParishCode: (element) => hl7StringEscaper(element),
      censusTract: (element) => hl7StringEscaper(element),
    },
    { rootName: element }
  );
}

export function parseExtendedAddressFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseExtendedAddress(
      input,
      {
        fieldSeparator,
        componentSeparator,
        subComponentSeparator,
        repetitionSeparator,
        escapeCharacter,
      },
      element
    );
  };
}

export function parseDriversLicenseNumberFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseDriversLicenseNumber(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        componentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parseDriversLicenseNumber(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): DriversLicenseNumber {
  if (field == null) return {};
  const { componentSeparator } = encodingCharacters;
  const components = field.split(componentSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    components,
    {
      driversLicenseNumber: (field) => hl7StringEscaper(field),
      issuingStateProvinceCounty: (field) => hl7StringEscaper(field),
      expirationDate: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseDateRangeFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseDateRange(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        componentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parseDateRange(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): DateRange {
  if (field == null) return {};
  const { componentSeparator } = encodingCharacters;
  const components = field.split(componentSeparator);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    components,
    {
      rangeStartDateTime: (field) => hl7StringEscaper(field),
      rangeEndDateTime: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseExtendedTelecommunicationNumberFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseExtendedTelecommunicationNumber(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        repetitionSeparator,
        escapeCharacter,
        componentSeparator,
      },
      element
    );
  };
}

export function parseExtendedTelecommunicationNumber(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): ExtendedTelecommunicationNumber {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      telephoneNumber: (field) => hl7StringEscaper(field),
      telecommunicationUseCode: (field) => hl7StringEscaper(field),
      telecommunicationEquipmentType: (field) => hl7StringEscaper(field),
      communicationAddress: (field) => hl7StringEscaper(field),
      countryCode: (field) => hl7StringEscaper(field),
      areaCityCode: (field) => hl7StringEscaper(field),
      extension: (field) => hl7StringEscaper(field),
      anyText: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseExtendPersonNameFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseExtendPersonName(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        componentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parseExtendPersonName(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): ExtendedPersonName {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      familyName: (field) => hl7StringEscaper(field),
      givenName: (field) => hl7StringEscaper(field),
      middleInitialOrName: (field) => hl7StringEscaper(field),
      suffix: (field) => hl7StringEscaper(field),
      prefix: (field) => hl7StringEscaper(field),
      degree: (field) => hl7StringEscaper(field),
      nameTypeCode: (field) => hl7StringEscaper(field),
      nameRepresentationCode: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseCodedWithExceptionsFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (field: string | undefined, element?: string) {
    return parseCodedWithExceptions(
      field,
      {
        fieldSeparator,
        componentSeparator,
        repetitionSeparator,
        subComponentSeparator,
        escapeCharacter,
      },
      element
    );
  };
}

export function parseCodedWithExceptions(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element?: string
): CodedWithExceptions {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      identifier: (field) => hl7StringEscaper(field),
      text: (field) => hl7StringEscaper(field),
      nameOfCodingSystem: (field) => hl7StringEscaper(field),
      alternateIdentifier: (field) => hl7StringEscaper(field),
      alternateText: (field) => hl7StringEscaper(field),
      nameOfAlternateCodingSystem: (field) => hl7StringEscaper(field),
      codingSystemVersionId: (field) => hl7StringEscaper(field),
      alternateCodingSystemVersionId: (field) => hl7StringEscaper(field),
      originalText: (field) => hl7StringEscaper(field),
      secondAlternateIdentifier: (field) => hl7StringEscaper(field),
      secondAlternateText: (field) => hl7StringEscaper(field),
      nameOfSecondAlternateCodingSystem: (field) => hl7StringEscaper(field),
      secondAlternateCodingSystemVersionId: (field) => hl7StringEscaper(field),
      codingSystemOID: (field) => hl7StringEscaper(field),
      valueSetOID: (field) => hl7StringEscaper(field),
      valueSetVersionId: (field) => hl7StringEscaper(field),
      alternateCodingSystemOID: (field) => hl7StringEscaper(field),
      alternateValueSetOID: (field) => hl7StringEscaper(field),
      alternateValueSetVersionId: (field) => hl7StringEscaper(field),
      secondAlternateCodingSystemOID: (field) => hl7StringEscaper(field),
      secondAlternateValueSetOID: (field) => hl7StringEscaper(field),
      secondAlternateValueSetVersionId: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseCodedWithNoExceptionsFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (field: string | undefined, element?: string) {
    return parseCodedWithNoExceptions(
      field,
      {
        fieldSeparator,
        componentSeparator,
        repetitionSeparator,
        subComponentSeparator,
        escapeCharacter,
      },
      element
    );
  };
}

export function parseCodedWithNoExceptions(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element?: string
): CodedWithNoExceptions {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null)
    return {
      identifier: "",
    };
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      identifier: (field) => hl7StringEscaper(field) ?? "",
      text: (field) => hl7StringEscaper(field),
      nameOfCodingSystem: (field) => hl7StringEscaper(field),
      alternateIdentifier: (field) => hl7StringEscaper(field),
      alternateText: (field) => hl7StringEscaper(field),
      nameOfAlternateCodingSystem: (field) => hl7StringEscaper(field),
      codingSystemVersionId: (field) => hl7StringEscaper(field),
      alternateCodingSystemVersionId: (field) => hl7StringEscaper(field),
      originalText: (field) => hl7StringEscaper(field),
      secondAlternateIdentifier: (field) => hl7StringEscaper(field),
      secondAlternateText: (field) => hl7StringEscaper(field),
      nameOfSecondAlternateCodingSystem: (field) => hl7StringEscaper(field),
      secondAlternateCodingSystemVersionId: (field) => hl7StringEscaper(field),
      codingSystemOID: (field) => hl7StringEscaper(field),
      valueSetOID: (field) => hl7StringEscaper(field),
      valueSetVersionId: (field) => hl7StringEscaper(field),
      alternateCodingSystemOID: (field) => hl7StringEscaper(field),
      alternateValueSetOID: (field) => hl7StringEscaper(field),
      alternateValueSetVersionId: (field) => hl7StringEscaper(field),
      secondAlternateCodingSystemOID: (field) => hl7StringEscaper(field),
      secondAlternateValueSetOID: (field) => hl7StringEscaper(field),
      secondAlternateValueSetVersionId: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseJobCodeClassFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseJobCodeClass(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        repetitionSeparator,
        componentSeparator,
        escapeCharacter,
      },
      element
    );
  };
}

export function parseJobCodeClass(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): JobCodeClass {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      jobCode: (field) => hl7StringEscaper(field),
      jobClass: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseExtendedCompositeNameAndIdForOrganizationsFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, rootName?: string) {
    return parseExtendedCompositeNameAndIdForOrganizations(
      input,
      {
        fieldSeparator,
        componentSeparator,
        subComponentSeparator,
        repetitionSeparator,
        escapeCharacter,
      },
      rootName
    );
  };
}

export function parseExtendedCompositeNameAndIdForOrganizations(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element?: string
): ExtendedCompositeNameAndIdForOrganizations {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      organizationName: (field) => hl7StringEscaper(field),
      organizationNameTypeCode: (field) => hl7StringEscaper(field),
      idNumber: component[2] ? parseInt(component[2], 10) : undefined,
      checkDigit: (field) => hl7StringEscaper(field),
      checkDigitScheme: (field) => hl7StringEscaper(field),
      assigningAuthority: (field, element) =>
        parseHierarchicDesignator(field, `${element}`),
      identifierTypeCode: (field) => hl7StringEscaper(field),
      assigningFacility: (field, element) =>
        parseHierarchicDesignator(field, `${element}`),
    },
    { rootName: element }
  );
}

export function parseExtendedCompositeIdWithCheckDigitFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseExtendedCompositeIdWithCheckDigit(
      input,
      {
        fieldSeparator,
        componentSeparator,
        subComponentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parseExtendedCompositeIdWithCheckDigit(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): ExtendedCompositeIdWithCheckDigit {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    component,
    {
      id: (field) => hl7StringEscaper(field),
      checkDigit: (field) => hl7StringEscaper(field),
      codeIdentifyingTheCheckDigitSchemeEmployed: (field) =>
        hl7StringEscaper(field),
      assigningAuthority: (field, elementPath) =>
        parseHierarchicDesignator(field, `${elementPath}`),
      identifierTypeCode: (field) => hl7StringEscaper(field),
      assigningFacility: (field, elementPath) =>
        parseHierarchicDesignator(field, `${elementPath}`),
    },
    { rootName: element }
  );
}

export function parseHierarchicDesignatorFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseHierarchicDesignator(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        componentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parseHierarchicDesignator(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): HierarchicDesignator {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    components,
    {
      namespaceId: (field) => hl7StringEscaper(field),
      universalId: (field) => hl7StringEscaper(field),
      universalIdType: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

const getSegmentDebug = utilDebug.extend("getSegmentHeader");

export function isValidSegmentHeader(header: string): header is SegmentHeaders {
  if (
    header === "ACC" ||
    header === "ADD" ||
    header === "AIG" ||
    header === "AIL" ||
    header === "AIP" ||
    header === "AIS" ||
    header === "AL1" ||
    header === "APR" ||
    header === "ARQ" ||
    header === "AUT" ||
    header === "BHS" ||
    header === "BLG" ||
    header === "BTS" ||
    header === "CDM" ||
    header === "CM0" ||
    header === "CM1" ||
    header === "CM2" ||
    header === "CSP" ||
    header === "CSR" ||
    header === "CSS" ||
    header === "CTD" ||
    header === "CTI" ||
    header === "DB1" ||
    header === "DG1" ||
    header === "DRG" ||
    header === "DSC" ||
    header === "DSP" ||
    header === "EQL" ||
    header === "ERQ" ||
    header === "ERR" ||
    header === "EVN" ||
    header === "FAC" ||
    header === "FHS" ||
    header === "FT1" ||
    header === "FTS" ||
    header === "GOL" ||
    header === "GT1" ||
    header === "IN1" ||
    header === "IN2" ||
    header === "IN3" ||
    header === "LCC" ||
    header === "LCH" ||
    header === "LDP" ||
    header === "LOC" ||
    header === "LRL" ||
    header === "MFA" ||
    header === "MFE" ||
    header === "MFI" ||
    header === "MRG" ||
    header === "MSA" ||
    header === "MSH" ||
    header === "NCK" ||
    header === "NK1" ||
    header === "NPU" ||
    header === "NSC" ||
    header === "NST" ||
    header === "NTE" ||
    header === "OBR" ||
    header === "OBX" ||
    header === "ODS" ||
    header === "ODT" ||
    header === "OM1" ||
    header === "OM2" ||
    header === "OM3" ||
    header === "OM4" ||
    header === "OM5" ||
    header === "OM6" ||
    header === "ORC" ||
    header === "PCR" ||
    header === "PD1" ||
    header === "PDA" ||
    header === "PDC" ||
    header === "PEO" ||
    header === "PES" ||
    header === "PID" ||
    header === "PR1" ||
    header === "PRA" ||
    header === "PRB" ||
    header === "PRC" ||
    header === "PRD" ||
    header === "PSH" ||
    header === "PTH" ||
    header === "PV1" ||
    header === "PV2" ||
    header === "QAK" ||
    header === "QRD" ||
    header === "QRF" ||
    header === "RDF" ||
    header === "RDT" ||
    header === "RF1" ||
    header === "RGS" ||
    header === "ROL" ||
    header === "RQ1" ||
    header === "RQD" ||
    header === "RXA" ||
    header === "RXC" ||
    header === "RXD" ||
    header === "RXE" ||
    header === "RXG" ||
    header === "RXO" ||
    header === "RXR" ||
    header === "SCH" ||
    header === "SPR" ||
    header === "STF" ||
    header === "TXA" ||
    header === "UB1" ||
    header === "UB2" ||
    header === "URD" ||
    header === "URS" ||
    header === "VAR" ||
    header === "VTQ" ||
    header.match(/^Z[\w|\d]{2}$/) != null
  ) {
    return true;
  }
  return false;
}

export function getSegmentHeader(
  segment: string
): WrappedResult<HeaderResults> {
  const debug = getSegmentDebug;
  const header = segment.substring(0, 3) as SegmentHeaders;
  if (header.length < 3) {
    debug("Header %s is less than 3 characters", header);
    return {
      ok: false,
      err: new Error("Header is not 3 characters in length"),
    };
  }

  if (!isValidSegmentHeader(header)) {
    debug("%s is an invalid HL7v2 header", header);
    return { ok: false, err: new Error("Not a valid HL7 header") };
  }
  const fieldString =
    header === "MSH" ? segment.substring(3) : segment.substring(4);
  debug("%s => %O", header, fieldString);
  return {
    ok: true,
    val: { header, fieldString },
    warnings: [],
  };
}

export function parseFinancialFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined, element: string) {
    return parseFinancial(input, encodingCharacters, element);
  };
}

export function parseFinancial(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): FinancialClass {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    components,
    {
      class: (field) => hl7StringEscaper(field),
      effectiveDate: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseDischargeToLocationFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseDischargeToLocation(
      input,
      {
        fieldSeparator,
        componentSeparator,
        subComponentSeparator,
        repetitionSeparator,
        escapeCharacter,
      },
      element
    );
  };
}

export function parseDischargeToLocation(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): DischargeLocation {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(
    components,
    {
      location: (field) => hl7StringEscaper(field),
      effectiveDate: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function parseExtendedCompositeIdNumberAndNameForPersonFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parseExtendedCompositeIdNumberAndNameForPerson(
      input,
      {
        fieldSeparator,
        componentSeparator,
        subComponentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parseExtendedCompositeIdNumberAndNameForPerson(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): ExtendedCompositeIdNumberAndNameForPerson {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
  return hl7ElementMapper(
    components,
    {
      idNumber: (field) => hl7StringEscaper(field),
      familyName: (field) => hl7StringEscaper(field),
      givenName: (field) => hl7StringEscaper(field),
      middleInitialOrName: (field) => hl7StringEscaper(field),
      suffix: (field) => hl7StringEscaper(field),
      prefix: (field) => hl7StringEscaper(field),
      degree: (field) => hl7StringEscaper(field),
      sourceTable: (field) => hl7StringEscaper(field),
      assigningAuthority: (field, elementPath) =>
        parseHierarchicDesignator(field, `${element}.${elementPath}`),
      nameType: (field) => hl7StringEscaper(field),
      identifierCheckDigit: (field) => hl7StringEscaper(field),
      codeIdentifyingTheCheckDigitSchemeEmployed: (field) =>
        hl7StringEscaper(field),
      identifierTypeCode: (field) => hl7StringEscaper(field),
      assigningFacilityId: (field, elementPath) =>
        parseHierarchicDesignator(field, `${element}.${elementPath}`),
    },
    { rootName: element }
  );
}

export function parsePersonLocationFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined, element: string) {
    return parsePersonLocation(
      input,
      {
        fieldSeparator,
        subComponentSeparator,
        componentSeparator,
        escapeCharacter,
        repetitionSeparator,
      },
      element
    );
  };
}

export function parsePersonLocation(
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"],
  element: string
): PersonLocation {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  const parseHierarchicDesignator =
    parseHierarchicDesignatorFactory(encodingCharacters);
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);

  return hl7ElementMapper(
    components,
    {
      pointOfCare: (field) => hl7StringEscaper(field),
      room: (field) => hl7StringEscaper(field),
      bed: (field) => hl7StringEscaper(field),
      facility: (field, elementPath) =>
        parseHierarchicDesignator(field, `${elementPath}`),
      locationStatus: (field) => hl7StringEscaper(field),
      personLocationType: (field) => hl7StringEscaper(field),
      building: (field) => hl7StringEscaper(field),
      floor: (field) => hl7StringEscaper(field),
      locationType: (field) => hl7StringEscaper(field),
    },
    { rootName: element }
  );
}

export function hl7StringEscaperFactory(
  encodingCharacters?: MSH["encodingCharacters"]
) {
  const fieldSeparator = encodingCharacters?.fieldSeparator ?? "|";
  const componentSeparator = encodingCharacters?.componentSeparator ?? "^";
  const subComponentSeparator =
    encodingCharacters?.subComponentSeparator ?? "&";
  const repetitionSeparator = encodingCharacters?.repetitionSeparator ?? "~";
  const escapeCharacter = encodingCharacters?.escapeCharacter ?? "\\";

  return function (input: string | undefined) {
    return hl7StringEscaper(input, {
      fieldSeparator,
      subComponentSeparator,
      repetitionSeparator,
      escapeCharacter,
      componentSeparator,
    });
  };
}

export function hl7StringEscaper(
  input: string,
  encodingCharacters: MSH["encodingCharacters"]
): string;
export function hl7StringEscaper(
  input: undefined,
  encodingCharacters: MSH["encodingCharacters"]
): undefined;
export function hl7StringEscaper(
  input: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): string | undefined;
export function hl7StringEscaper(
  input: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): string | undefined {
  if (input == null) {
    const data = undefined;
    return data;
  }
  const {
    escapeCharacter,
    repetitionSeparator,
    fieldSeparator,
    componentSeparator,
    subComponentSeparator,
  } = encodingCharacters;
  const data = input
    .replace(`${escapeCharacter}.br${escapeCharacter}`, String.fromCharCode(13))
    .replace(`${escapeCharacter}F${escapeCharacter}`, fieldSeparator)
    .replace(`${escapeCharacter}R${escapeCharacter}`, repetitionSeparator)
    .replace(`${escapeCharacter}S${escapeCharacter}`, componentSeparator)
    .replace(`${escapeCharacter}T${escapeCharacter}`, subComponentSeparator)
    .replace(`${escapeCharacter}E${escapeCharacter}`, escapeCharacter)
    .replace(`${escapeCharacter}X0A${escapeCharacter}`, String.fromCharCode(10))
    .replace(
      `${escapeCharacter}X0D${escapeCharacter}`,
      String.fromCharCode(13)
    );
  return data;
}

const hl7ElementMapperDebug = utilDebug.extend("hl7ElementMapper");

/**
 * Takes an array of string and maps in order of a definition and returns an object
 *
 * @example
 * let elements = ["Hello", "Sam", "21", "San Francisco"]
 * let definition = {
 *  greeting: (field) => field + " World",
 *  name: (field) => field,
 *  age: 18
 * }
 *
 * let result = hl7ElementMapper(elements, definition)
 *
 * expect(result.greeting).to.be.equal("Hello World")
 * expect(result.name).to.be.equal("Same")
 * expect(result.age).to.be.equal(12) // Since we have a literal value the string at elements[2] is ignored
 *
 *  San Francisco would not be mapped since there is no forth key in the definition
 *
 * @param elements String values to map
 * @param definition The definition of how to map the strings, order of the keys defines which index in the array is
 *        mapped to the return object keys arr[0] => first defined key
 *        definitions can be a function or a literal value
 * @param options
 * @param options.rootName Omits this string value during debug logs %s => %O where %s is the rootName and %O is the result of the function or literal
 * @returns A mapped object from an array
 */
export function hl7ElementMapper<K extends object>(
  elements: string[],
  definition: {
    [P in keyof K]: ((element: string | undefined, ind: string) => K[P]) | K[P];
  },
  options?: {
    rootName?: string;
  }
): K {
  const rootName = options?.rootName ?? "UNK";
  const debug = hl7ElementMapperDebug.extend(rootName);
  let item: any = {};
  let keys = [...Object.keys(definition)];
  for (const ind in keys) {
    const delimiter = rootName.includes("-") ? "." : "-";
    const elementPath = rootName.concat(
      delimiter,
      (parseInt(ind, 10) + 1).toFixed(0)
    );
    const key = keys[ind];
    const val = elements[ind];

    let res = definition[key as keyof K];
    if (typeof res === "function") item[key] = res(val, elementPath);
    else item[key] = res;
    debug("%s => %O", elementPath, item[key]);
  }
  return item as K;
}
