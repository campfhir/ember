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
  MessageSegments,
  SegmentHeaders,
} from "../../../typings";
import {
  CodedElement,
  ExtendedAddress,
  ExtendedCompositeIdWithCheckDigit,
  ExtendedPersonName,
  HeaderResults,
  HierarchicDesignator,
} from "../../../typings";

export const parseExtendedAddress = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): ExtendedAddress => {
  const { componentSeparator } = controlCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    streetAddress: hl7StringEscaper(component[0], controlCharacters),
    otherDesignation: hl7StringEscaper(component[1], controlCharacters),
    city: hl7StringEscaper(component[2], controlCharacters),
    stateOrProvince: hl7StringEscaper(component[3], controlCharacters),
    zipOrPostalCode: hl7StringEscaper(component[4], controlCharacters),
    country: hl7StringEscaper(component[5], controlCharacters),
    addressType: hl7StringEscaper(component[6], controlCharacters),
    otherGeographicDesignation: hl7StringEscaper(
      component[7],
      controlCharacters
    ),
    countyParishCode: hl7StringEscaper(component[8], controlCharacters),
    censusTract: hl7StringEscaper(component[9], controlCharacters),
  };
};

export const parseDriversLicenseNumber = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): DriversLicenseNumber => {
  if (field == null) return {};
  const { componentSeparator } = controlCharacters;
  const components = field.split(componentSeparator);
  return {
    driversLicenseNumber: hl7StringEscaper(components[0], controlCharacters),
    issuingStateProvinceCounty: hl7StringEscaper(
      components[1],
      controlCharacters
    ),
    expirationDate: hl7StringEscaper(components[2], controlCharacters),
  };
};

export const parseExtendedTelecommunicationNumber = (
  field: string,
  controlCharacters: MSH["controlCharacters"]
): ExtendedTelecommunicationNumber => {
  const { componentSeparator } = controlCharacters;
  const component = field.split(componentSeparator);
  if (component == null) return {};
  return {
    telephoneNumber: hl7StringEscaper(component[0], controlCharacters),
    telecommunicationUseCode: hl7StringEscaper(
      component[1],
      controlCharacters
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
      controlCharacters
    ) as "BP" | "CP" | "FX" | "Internet" | "MD" | "PH" | "X.400" | undefined,
    emailAddress: hl7StringEscaper(component[3], controlCharacters),
    countryCode: component[4],
    areaCityCode: component[5],
    extension: component[7],
    anyText: component[8],
  };
};

export const parseExtendPersonName = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): ExtendedPersonName => {
  const { componentSeparator } = controlCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    familyName: hl7StringEscaper(component[0], controlCharacters),
    givenName: hl7StringEscaper(component[1], controlCharacters),
    middleInitialOrName: hl7StringEscaper(component[2], controlCharacters),
    suffix: hl7StringEscaper(component[3], controlCharacters),
    prefix: hl7StringEscaper(component[4], controlCharacters),
    degree: hl7StringEscaper(component[5], controlCharacters),
    nameTypeCode: hl7StringEscaper(component[6], controlCharacters) as
      | "A"
      | "C"
      | "D"
      | "L"
      | "M"
      | "O"
      | undefined,
    nameRepresentationCode: hl7StringEscaper(
      component[7],
      controlCharacters
    ) as "A" | "I" | "P" | undefined,
  };
};

export const parseCodedElement = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): CodedElement => {
  const { componentSeparator } = controlCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    identifier: hl7StringEscaper(component[0], controlCharacters),
    text: hl7StringEscaper(component[1], controlCharacters),
    nameOfCodingSystem: hl7StringEscaper(component[2], controlCharacters),
    alternateIdentifier: hl7StringEscaper(component[3], controlCharacters),
    alternateText: hl7StringEscaper(component[4], controlCharacters),
    nameOfAlternateCodingSystem: hl7StringEscaper(
      component[5],
      controlCharacters
    ),
  };
};

export const parseJobCodeClass = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): JobCodeClass => {
  const { componentSeparator } = controlCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};

  return {
    jobCode: hl7StringEscaper(component[0], controlCharacters),
    jobClass: hl7StringEscaper(component[1], controlCharacters),
  };
};

export const parseExtendedCompositeNameAndIdForOrganizations = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): ExtendedCompositeNameAndIdForOrganizations => {
  const { componentSeparator } = controlCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    organizationName: hl7StringEscaper(component[0], controlCharacters),
    organizationNameTypeCode: hl7StringEscaper(component[1], controlCharacters),
    idNumber: component[2] ? parseInt(component[2], 10) : undefined,
    checkDigit: hl7StringEscaper(component[3], controlCharacters),
    codeIdentifyingTheCheckDigitSchemeEmployed: hl7StringEscaper(
      component[4],
      controlCharacters
    ),
    assigningAuthority: parseHierarchicDesignator(
      component[5],
      controlCharacters
    ),
    identifierTypeCode: hl7StringEscaper(component[6], controlCharacters),
    assigningFacilityId: parseHierarchicDesignator(
      component[7],
      controlCharacters
    ),
  };
};

export const parseExtendedCompositeIdWithCheckDigit = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): ExtendedCompositeIdWithCheckDigit => {
  const { componentSeparator } = controlCharacters;
  const component = field?.split(componentSeparator);
  if (component == null) return {};
  return {
    id: hl7StringEscaper(component[0], controlCharacters),
    checkDigit: hl7StringEscaper(component[1], controlCharacters),
    codeIdentifyingTheCheckDigitSchemeEmployed: hl7StringEscaper(
      component[2],
      controlCharacters
    ),
    assigningAuthority: parseHierarchicDesignator(
      component[3],
      controlCharacters
    ),

    identifierTypeCode: hl7StringEscaper(component[4], controlCharacters),
    assigningFacility: parseHierarchicDesignator(
      component[5],
      controlCharacters
    ),
  };
};

export const parseHierarchicDesignator = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): HierarchicDesignator => {
  const { componentSeparator } = controlCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  return {
    namespaceId: hl7StringEscaper(components[0], controlCharacters),
    universalId: hl7StringEscaper(components[1], controlCharacters),
    universalIdType: hl7StringEscaper(components[2], controlCharacters),
  };
};

export const getSegmentHeader = (
  segment: string
): WrappedResult<HeaderResults> => {
  const header = segment.substring(0, 3) as SegmentHeaders;
  if (header.length < 3)
    return {
      ok: false,
      err: new Error("Header is not 3 characters in length"),
    };
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
  )
    return { ok: false, err: new Error("Not a valid HL7 header") };

  return {
    ok: true,
    val: { header, fieldString: segment.substring(3) },
    warnings: [],
  };
};

export const parseFinancial = (
  field: string,
  controlCharacters: MSH["controlCharacters"]
): FinancialClass => {
  const { componentSeparator } = controlCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};
  return {
    class: hl7StringEscaper(components[0], controlCharacters),
    effectiveDate: hl7StringEscaper(components[1], controlCharacters),
  };
};

export const parseDischargeToLocation = (
  field: string,
  controlCharacters: MSH["controlCharacters"]
): DischargeLocation => {
  const { componentSeparator } = controlCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};

  return {
    location: hl7StringEscaper(components[0], controlCharacters),
    effectiveDate: hl7StringEscaper(components[1], controlCharacters),
  };
};

export const parseExtendedCompositeIdNumberAndName = (
  field: string,
  controlCharacters: MSH["controlCharacters"]
): ExtendedCompositeIdNumberAndName => {
  const { componentSeparator } = controlCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};

  return {
    idNumber: hl7StringEscaper(components[0], controlCharacters),
    familyName: hl7StringEscaper(components[1], controlCharacters),
    givenName: hl7StringEscaper(components[2], controlCharacters),
    middleInitialOrName: hl7StringEscaper(components[3], controlCharacters),
    suffix: hl7StringEscaper(components[4], controlCharacters),
    prefix: hl7StringEscaper(components[5], controlCharacters),
    degree: hl7StringEscaper(components[6], controlCharacters),
    sourceTable: hl7StringEscaper(components[7], controlCharacters),
    assigningAuthority: parseHierarchicDesignator(
      components[8],
      controlCharacters
    ),
    nameType: hl7StringEscaper(components[9], controlCharacters),
    identifierCheckDigit: hl7StringEscaper(components[10], controlCharacters),
    codeIdentifyingTheCheckDigitSchemeEmployed: hl7StringEscaper(
      components[11],
      controlCharacters
    ),
    identifierTypeCode: hl7StringEscaper(components[12], controlCharacters),
    assigningFacilityId: parseHierarchicDesignator(
      components[13],
      controlCharacters
    ),
  };
};

export const parsePersonLocation = (
  field: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): PersonLocation => {
  const { componentSeparator } = controlCharacters;
  const components = field?.split(componentSeparator);
  if (components == null) return {};

  return {
    pointOfCare: hl7StringEscaper(components[0], controlCharacters),
    room: hl7StringEscaper(components[1], controlCharacters),
    bed: hl7StringEscaper(components[2], controlCharacters),
    facility: parseHierarchicDesignator(components[3], controlCharacters),
    locationStatus: hl7StringEscaper(components[4], controlCharacters),
    personLocationType: hl7StringEscaper(components[5], controlCharacters),
    building: hl7StringEscaper(components[6], controlCharacters),
    floor: hl7StringEscaper(components[7], controlCharacters),
    locationType: hl7StringEscaper(components[8], controlCharacters),
  };
};

export function hl7StringEscaper(
  input: string,
  controlCharacters: MSH["controlCharacters"]
): string;
export function hl7StringEscaper(
  input: undefined,
  controlCharacters: MSH["controlCharacters"]
): undefined;
export function hl7StringEscaper(
  input: string | undefined,
  controlCharacters: MSH["controlCharacters"]
): string | undefined {
  if (input == null) return undefined;
  const {
    escapeCharacter,
    repetitionSeparator,
    fieldSeparator,
    componentSeparator,
    subComponentSeparator,
  } = controlCharacters;
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

/**
 *
 * @param str Takes some array strings and maps to an object
 * @param def for each item in the array we map to a key and parse the string with the provided function of the template key
 * @returns A mapped object from an array
 */
export function hl7ElementMapper<K extends object>(
  str: string[],
  def: { [P in keyof K]: ((element: string) => K[P]) | K[P] }
): K {
  let item: any = {};
  let keys = [...Object.keys(def)];
  for (const ind in str) {
    const key = keys[ind];
    const val = str[ind];
    if (key == null) return item;
    let res = def[key as keyof K];
    if (typeof res === "function") item[key] = res(val);
    else item[key] = res;
  }
  return item as K;
}
