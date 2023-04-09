import d from "debug";
import {
  DischargeLocation,
  DriversLicenseNumber,
  ExtendedCompositeIdNumberAndName,
  ExtendedTelecommunicationNumber,
  FinancialClass,
  MSH,
  WrappedResult,
  PersonLocation,
  ExtendedCompositeNameAndIdForOrganizations,
  JobCodeClass,
  SegmentHeaders,
  CodedWithExceptions,
} from "../../../typings";
import {
  CodedElement,
  ExtendedAddress,
  ExtendedCompositeIdWithCheckDigit,
  ExtendedPersonName,
  HeaderResults,
  HierarchicDesignator,
} from "../../../typings";

export const debugLogger = d("ember");
const utilDebug = debugLogger.extend("utils");

export function parseExtendedAddressFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseExtendedAddress(input, encodingCharacters);
  };
}

export const parseExtendedAddress = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): ExtendedAddress => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    streetAddress: hl7StringEscaper(component[0], encodingCharacters),
    otherDesignation: hl7StringEscaper(component[1], encodingCharacters),
    city: hl7StringEscaper(component[2], encodingCharacters),
    stateOrProvince: hl7StringEscaper(component[3], encodingCharacters),
    zipOrPostalCode: hl7StringEscaper(component[4], encodingCharacters),
    country: hl7StringEscaper(component[5], encodingCharacters),
    addressType: hl7StringEscaper(component[6], encodingCharacters),
    otherGeographicDesignation: hl7StringEscaper(
      component[7],
      encodingCharacters
    ),
    countyParishCode: hl7StringEscaper(component[8], encodingCharacters),
    censusTract: hl7StringEscaper(component[9], encodingCharacters),
  };
};

export function parseDriversLicenseNumberFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseDriversLicenseNumber(input, encodingCharacters);
  };
}

export const parseDriversLicenseNumber = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): DriversLicenseNumber => {
  if (field == null) return {};
  const { componentSeparator } = encodingCharacters;
  const components = field.split(componentSeparator);
  return {
    driversLicenseNumber: hl7StringEscaper(components[0], encodingCharacters),
    issuingStateProvinceCounty: hl7StringEscaper(
      components[1],
      encodingCharacters
    ),
    expirationDate: hl7StringEscaper(components[2], encodingCharacters),
  };
};

export function parseExtendedTelecommunicationNumberFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseExtendedTelecommunicationNumber(input, encodingCharacters);
  };
}

export const parseExtendedTelecommunicationNumber = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): ExtendedTelecommunicationNumber => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    telephoneNumber: hl7StringEscaper(component[0], encodingCharacters),
    telecommunicationUseCode: hl7StringEscaper(
      component[1],
      encodingCharacters
    ) as
      | "ASN"
      | "BPN"
      | "EMR"
      | "NET"
      | "ORN"
      | "PRN"
      | "VHN"
      | "WPN"
      | undefined,
    telecommunicationEquipmentType: hl7StringEscaper(
      component[2],
      encodingCharacters
    ) as "BP" | "CP" | "FX" | "Internet" | "MD" | "PH" | "X.400" | undefined,
    communicationAddress: hl7StringEscaper(component[3], encodingCharacters),
    countryCode: component[4],
    areaCityCode: component[5],
    extension: component[7],
    anyText: component[8],
  };
};

export function parseExtendPersonNameFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseExtendPersonName(input, encodingCharacters);
  };
}

export const parseExtendPersonName = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): ExtendedPersonName => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    familyName: hl7StringEscaper(component[0], encodingCharacters),
    givenName: hl7StringEscaper(component[1], encodingCharacters),
    middleInitialOrName: hl7StringEscaper(component[2], encodingCharacters),
    suffix: hl7StringEscaper(component[3], encodingCharacters),
    prefix: hl7StringEscaper(component[4], encodingCharacters),
    degree: hl7StringEscaper(component[5], encodingCharacters),
    nameTypeCode: hl7StringEscaper(component[6], encodingCharacters) as
      | "A"
      | "C"
      | "D"
      | "L"
      | "M"
      | "O"
      | undefined,
    nameRepresentationCode: hl7StringEscaper(
      component[7],
      encodingCharacters
    ) as "A" | "I" | "P" | undefined,
  };
};

export function parseCodedWithExceptionsFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (field: string | undefined) {
    return parseCodedWithExceptions(field, encodingCharacters);
  };
}

export const parseCodedWithExceptions = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): CodedWithExceptions => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  const hl7StringEscaper = hl7StringEscaperFactory(encodingCharacters);
  return hl7ElementMapper(component, {
    identifier: (comp) => hl7StringEscaper(comp),
    text: (comp) => hl7StringEscaper(comp),
    nameOfCodingSystem: (comp) => hl7StringEscaper(comp),
    alternateIdentifier: (comp) => hl7StringEscaper(comp),
    alternateText: (comp) => hl7StringEscaper(comp),
    nameOfAlternateCodingSystem: (comp) => hl7StringEscaper(comp),
    codingSystemVersionId: (comp) => hl7StringEscaper(comp),
    alternateCodingSystemVersionId: (comp) => hl7StringEscaper(comp),
    originalText: (comp) => hl7StringEscaper(comp),
    secondAlternateIdentifier: (comp) => hl7StringEscaper(comp),
    secondAlternateText: (comp) => hl7StringEscaper(comp),
    nameOfSecondAlternateCodingSystem: (comp) => hl7StringEscaper(comp),
    secondAlternateCodingSystemVersionId: (comp) => hl7StringEscaper(comp),
    codingSystemOID: (comp) => hl7StringEscaper(comp),
    valueSetOID: (comp) => hl7StringEscaper(comp),
    valueSetVersionId: (comp) => hl7StringEscaper(comp),
    alternateCodingSystemOID: (comp) => hl7StringEscaper(comp),
    alternateValueSetOID: (comp) => hl7StringEscaper(comp),
    alternateValueSetVersionId: (comp) => hl7StringEscaper(comp),
    secondAlternateCodingSystemOID: (comp) => hl7StringEscaper(comp),
    secondAlternateValueSetOID: (comp) => hl7StringEscaper(comp),
    secondAlternateValueSetVersionId: (comp) => hl7StringEscaper(comp),
  });
};

export function parseJobCodeClassFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseJobCodeClass(input, encodingCharacters);
  };
}

export const parseJobCodeClass = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): JobCodeClass => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};

  return {
    jobCode: hl7StringEscaper(component[0], encodingCharacters),
    jobClass: hl7StringEscaper(component[1], encodingCharacters),
  };
};

export function parseExtendedCompositeNameAndIdForOrganizationsFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseExtendedCompositeNameAndIdForOrganizations(
      input,
      encodingCharacters
    );
  };
}

export const parseExtendedCompositeNameAndIdForOrganizations = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): ExtendedCompositeNameAndIdForOrganizations => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    organizationName: hl7StringEscaper(component[0], encodingCharacters),
    organizationNameTypeCode: hl7StringEscaper(
      component[1],
      encodingCharacters
    ),
    idNumber: component[2] ? parseInt(component[2], 10) : undefined,
    checkDigit: hl7StringEscaper(component[3], encodingCharacters),
    codeIdentifyingTheCheckDigitSchemeEmployed: hl7StringEscaper(
      component[4],
      encodingCharacters
    ),
    assigningAuthority: parseHierarchicDesignator(
      component[5],
      encodingCharacters
    ),
    identifierTypeCode: hl7StringEscaper(component[6], encodingCharacters),
    assigningFacilityId: parseHierarchicDesignator(
      component[7],
      encodingCharacters
    ),
  };
};

export function parseExtendedCompositeIdWithCheckDigitFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseExtendedCompositeIdWithCheckDigit(input, encodingCharacters);
  };
}

export const parseExtendedCompositeIdWithCheckDigit = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): ExtendedCompositeIdWithCheckDigit => {
  const { componentSeparator } = encodingCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    id: hl7StringEscaper(component[0], encodingCharacters),
    checkDigit: hl7StringEscaper(component[1], encodingCharacters),
    codeIdentifyingTheCheckDigitSchemeEmployed: hl7StringEscaper(
      component[2],
      encodingCharacters
    ),
    assigningAuthority: parseHierarchicDesignator(
      component[3],
      encodingCharacters
    ),

    identifierTypeCode: hl7StringEscaper(component[4], encodingCharacters),
    assigningFacility: parseHierarchicDesignator(
      component[5],
      encodingCharacters
    ),
  };
};

export function parseHierarchicDesignatorFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseHierarchicDesignator(input, encodingCharacters);
  };
}

export const parseHierarchicDesignator = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): HierarchicDesignator => {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  return {
    namespaceId: hl7StringEscaper(components[0], encodingCharacters),
    universalId: hl7StringEscaper(components[1], encodingCharacters),
    universalIdType: hl7StringEscaper(components[2], encodingCharacters),
  };
};

const getSegmentDebug = utilDebug.extend("getSegmentHeader");

export const getSegmentHeader = (
  segment: string
): WrappedResult<HeaderResults> => {
  const debug = getSegmentDebug;
  const header = segment.substring(0, 3) as SegmentHeaders;
  if (header.length < 3) {
    debug("Header %s is less than 3 characters", header);
    return {
      ok: false,
      err: new Error("Header is not 3 characters in length"),
    };
  }

  if (
    header !== "ACC" &&
    header !== "ADD" &&
    header !== "AIG" &&
    header !== "AIL" &&
    header !== "AIP" &&
    header !== "AIS" &&
    header !== "AL1" &&
    header !== "APR" &&
    header !== "ARQ" &&
    header !== "AUT" &&
    header !== "BHS" &&
    header !== "BLG" &&
    header !== "BTS" &&
    header !== "CDM" &&
    header !== "CM0" &&
    header !== "CM1" &&
    header !== "CM2" &&
    header !== "CSP" &&
    header !== "CSR" &&
    header !== "CSS" &&
    header !== "CTD" &&
    header !== "CTI" &&
    header !== "DB1" &&
    header !== "DG1" &&
    header !== "DRG" &&
    header !== "DSC" &&
    header !== "DSP" &&
    header !== "EQL" &&
    header !== "ERQ" &&
    header !== "ERR" &&
    header !== "EVN" &&
    header !== "FAC" &&
    header !== "FHS" &&
    header !== "FT1" &&
    header !== "FTS" &&
    header !== "GOL" &&
    header !== "GT1" &&
    header !== "IN1" &&
    header !== "IN2" &&
    header !== "IN3" &&
    header !== "LCC" &&
    header !== "LCH" &&
    header !== "LDP" &&
    header !== "LOC" &&
    header !== "LRL" &&
    header !== "MFA" &&
    header !== "MFE" &&
    header !== "MFI" &&
    header !== "MRG" &&
    header !== "MSA" &&
    header !== "MSH" &&
    header !== "NCK" &&
    header !== "NK1" &&
    header !== "NPU" &&
    header !== "NSC" &&
    header !== "NST" &&
    header !== "NTE" &&
    header !== "OBR" &&
    header !== "OBX" &&
    header !== "ODS" &&
    header !== "ODT" &&
    header !== "OM1" &&
    header !== "OM2" &&
    header !== "OM3" &&
    header !== "OM4" &&
    header !== "OM5" &&
    header !== "OM6" &&
    header !== "ORC" &&
    header !== "PCR" &&
    header !== "PD1" &&
    header !== "PDC" &&
    header !== "PEO" &&
    header !== "PES" &&
    header !== "PID" &&
    header !== "PR1" &&
    header !== "PRA" &&
    header !== "PRB" &&
    header !== "PRC" &&
    header !== "PRD" &&
    header !== "PSH" &&
    header !== "PTH" &&
    header !== "PV1" &&
    header !== "PV2" &&
    header !== "QAK" &&
    header !== "QRD" &&
    header !== "QRF" &&
    header !== "RDF" &&
    header !== "RDT" &&
    header !== "RF1" &&
    header !== "RGS" &&
    header !== "ROL" &&
    header !== "RQ1" &&
    header !== "RQD" &&
    header !== "RXA" &&
    header !== "RXC" &&
    header !== "RXD" &&
    header !== "RXE" &&
    header !== "RXG" &&
    header !== "RXO" &&
    header !== "RXR" &&
    header !== "SCH" &&
    header !== "SPR" &&
    header !== "STF" &&
    header !== "TXA" &&
    header !== "UB1" &&
    header !== "UB2" &&
    header !== "URD" &&
    header !== "URS" &&
    header !== "VAR" &&
    header !== "VTQ" &&
    header[0] !== "Z"
  ) {
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
};

export function parseFinancialFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseFinancial(input, encodingCharacters);
  };
}

export const parseFinancial = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): FinancialClass => {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  return {
    class: hl7StringEscaper(components[0], encodingCharacters),
    effectiveDate: hl7StringEscaper(components[1], encodingCharacters),
  };
};

export function parseDischargeToLocationFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseDischargeToLocation(input, encodingCharacters);
  };
}

export const parseDischargeToLocation = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): DischargeLocation => {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};

  return {
    location: hl7StringEscaper(components[0], encodingCharacters),
    effectiveDate: hl7StringEscaper(components[1], encodingCharacters),
  };
};

export function parseExtendedCompositeIdNumberAndNameFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parseExtendedCompositeIdNumberAndName(input, encodingCharacters);
  };
}

export const parseExtendedCompositeIdNumberAndName = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): ExtendedCompositeIdNumberAndName => {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};

  return {
    idNumber: hl7StringEscaper(components[0], encodingCharacters),
    familyName: hl7StringEscaper(components[1], encodingCharacters),
    givenName: hl7StringEscaper(components[2], encodingCharacters),
    middleInitialOrName: hl7StringEscaper(components[3], encodingCharacters),
    suffix: hl7StringEscaper(components[4], encodingCharacters),
    prefix: hl7StringEscaper(components[5], encodingCharacters),
    degree: hl7StringEscaper(components[6], encodingCharacters),
    sourceTable: hl7StringEscaper(components[7], encodingCharacters),
    assigningAuthority: parseHierarchicDesignator(
      components[8],
      encodingCharacters
    ),
    nameType: hl7StringEscaper(components[9], encodingCharacters),
    identifierCheckDigit: hl7StringEscaper(components[10], encodingCharacters),
    codeIdentifyingTheCheckDigitSchemeEmployed: hl7StringEscaper(
      components[11],
      encodingCharacters
    ),
    identifierTypeCode: hl7StringEscaper(components[12], encodingCharacters),
    assigningFacilityId: parseHierarchicDesignator(
      components[13],
      encodingCharacters
    ),
  };
};

export function parsePersonLocationFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return parsePersonLocation(input, encodingCharacters);
  };
}

export const parsePersonLocation = (
  field: string | undefined,
  encodingCharacters: MSH["encodingCharacters"]
): PersonLocation => {
  const { componentSeparator } = encodingCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};

  return {
    pointOfCare: hl7StringEscaper(components[0], encodingCharacters),
    room: hl7StringEscaper(components[1], encodingCharacters),
    bed: hl7StringEscaper(components[2], encodingCharacters),
    facility: parseHierarchicDesignator(components[3], encodingCharacters),
    locationStatus: hl7StringEscaper(components[4], encodingCharacters),
    personLocationType: hl7StringEscaper(components[5], encodingCharacters),
    building: hl7StringEscaper(components[6], encodingCharacters),
    floor: hl7StringEscaper(components[7], encodingCharacters),
    locationType: hl7StringEscaper(components[8], encodingCharacters),
  };
};

export function hl7StringEscaperFactory(
  encodingCharacters: MSH["encodingCharacters"]
) {
  return function (input: string | undefined) {
    return hl7StringEscaper(input, encodingCharacters);
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
  if (input == null) return undefined;
  const {
    escapeCharacter,
    repetitionSeparator,
    fieldSeparator,
    componentSeparator,
    subComponentSeparator,
  } = encodingCharacters;
  return input
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
}

const hl7ElementMapperDebug = utilDebug.extend("hl7ElementMapper");

/**
 * Takes an array of string an maps in order definition and returns an object
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
 * // San Francisco would not be mapped since there is no forth key in the definition
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
  definition: { [P in keyof K]: ((element: string) => K[P]) | K[P] },
  options?: {
    rootName?: string;
  }
): K {
  const rootName = options?.rootName ?? "UNK";
  const debug = hl7ElementMapperDebug.extend(rootName);
  let item: any = {};
  let keys = [...Object.keys(definition)];
  for (const ind in elements) {
    const elementPath = rootName.concat(
      "-",
      (parseInt(ind, 10) + 1).toFixed(0)
    );
    const key = keys[ind];
    const val = elements[ind];
    if (key == null) {
      debug(
        "%s Has No Corresponding Key in the definition will return a partial object",
        elementPath
      );
      return item;
    }
    let res = definition[key as keyof K];
    if (typeof res === "function") item[key] = res(val);
    else item[key] = res;
    debug("%s => %O", elementPath, item[key]);
  }
  return item as K;
}
