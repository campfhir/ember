export type CodedElement = {
  identifier?: string;
  text?: string;
  nameOfCodingSystem?: string;
  alternateIdentifier?: string;
  alternateText?: string;
  nameOfAlternateCodingSystem?: string;
};

export type HierarchicDesignator = {
  namespaceId?: string;
  universalId?: string;
  /**
   * Common Code Values
   *
   *
   * | Code   | Value                                                                                                                                                                                                                                                                                          |
   * | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | DNS    | An Internet dotted name. Either in ASCII or as integers                                                                                                                                                                                                                                        |
   * | GUID   | Same as UUID                                                                                                                                                                                                                                                                                   |
   * | HCD    | The CEN Healthcare Coding Scheme Designator. (Identifiers used in DICOM follow this assignment scheme.)                                                                                                                                                                                        |
   * | HL7    | Reserved for future HL7 registration schemes                                                                                                                                                                                                                                                   |
   * | ISO    | An International Standards Organization Object Identifier                                                                                                                                                                                                                                      |
   * | L      | These are reserved for locally defined coding schemes                                                                                                                                                                                                                                          |
   * | M      | These are reserved for locally defined coding schemes                                                                                                                                                                                                                                          |
   * | N      | These are reserved for locally defined coding schemes                                                                                                                                                                                                                                          |
   * | Random | Usually a base64 encoded string of random bits. The uniqueness depends on the length of the bits. Mail systems often generate ASCII string "unique names," from a combination of random bits and system names. Obviously, such identifiers will not be constrained to the base64 character set |
   * | UUID   | The DCE Universal Unique Identifier                                                                                                                                                                                                                                                            |
   * | x400   | An X.400 MHS format identifier                                                                                                                                                                                                                                                                 |
   * | x500   | An X.500 directory name                                                                                                                                                                                                                                                                        |
   *
   */
  universalIdType?: string;
};

export type ExtendedCompositeIdNumberAndName = {
  idNumber?: string;
  familyName?: string;
  givenName?: string;
  middleInitialOrName?: string;
  suffix?: string;
  prefix?: string;
  degree?: string;
  sourceTable?: string;
  assigningAuthority?: HierarchicDesignator;
  /**
   * Common Code Values
   *
   * | Code | Value        | Comments                                               |
   * | ---- | ------------ | ------------------------------------------------------ |
   * | A    | Alias Name   |                                                        |
   * | C    | Adopted Name |                                                        |
   * | D    | Display Name |                                                        |
   * | L    | Legal Name   | The legal name is the same as the current married name |
   * | M    | Maiden Name  |                                                        |
   * | O    | Other        |                                                        |
   */
  nameType?: string;
  identifierCheckDigit?: string;
  /**
   * Common Code Values
   *
   * | Code | Value            |
   * | ---- | ---------------- |
   * | M10  | Mod 10 algorithm |
   * | M11  | Mod 11 algorithm |
   */
  codeIdentifyingTheCheckDigitSchemeEmployed?: string;
  /**
   * | VALUE | DESCRIPTION                   |
   * | ----- | ----------------------------- |
   * | AM    | American Express              |
   * | AN    | Account number                |
   * | BR    | Birth registry number         |
   * | DI    | Diners Club card              |
   * | DL    | Drivers license number        |
   * | DN    | Doctor number                 |
   * | DS    | Discover Card                 |
   * | EI    | Employee number               |
   * | EN    | Employer number               |
   * | GI    | Guarantor internal identifier |
   * | GN    | Guarantor external identifier |
   * | MA    | Medicaid number               |
   * | MC    | Medicare number               |
   * | MR    | Medical record number         |
   * | MS    | MasterCard                    |
   * | PI    | Patient internal identifier   |
   * | PT    | Patient external identifier   |
   * | RR    | Railroad Retirement number    |
   * | SS    | Social Security number        |
   * | VN    | Visit number                  |
   * | VS    | VISA                          |
   * | XX    | Organization Identifier       |
   */
  identifierTypeCode?: string;
  assigningFacilityId?: HierarchicDesignator;
};

export type ExtendedCompositeIdWithCheckDigit = {
  id?: string;
  checkDigit?: string;
  /**
   * Common Code Values
   *
   * | Code | Value            |
   * | ---- | ---------------- |
   * | M10  | Mod 10 algorithm |
   * | M11  | Mod 11 algorithm |
   */
  codeIdentifyingTheCheckDigitSchemeEmployed?: string;
  assigningAuthority?: HierarchicDesignator;
  /**
   * | Code | Value                         |
   * | ---- | ----------------------------- |
   * | AM   | American Express              |
   * | AN   | Account number                |
   * | BR   | Birth registry number         |
   * | DI   | Diners Club card              |
   * | DL   | Drivers license number        |
   * | DN   | Doctor number                 |
   * | DS   | Discover Card                 |
   * | EI   | Employee number               |
   * | EN   | Employer number               |
   * | GI   | Guarantor internal identifier |
   * | GN   | Guarantor external identifier |
   * | MA   | Medicaid number               |
   * | MC   | Medicare number               |
   * | MR   | Medical record number         |
   * | MS   | MasterCard                    |
   * | PI   | Patient internal identifier   |
   * | PT   | Patient external identifier   |
   * | RR   | Railroad Retirement number    |
   * | SS   | Social Security number        |
   * | VN   | Visit number                  |
   * | VS   | VISA                          |
   * | XX   | Organization Identifier       |
   */
  identifierTypeCode?: string;
  assigningFacility?: HierarchicDesignator;
};

export type DischargeLocation = {
  location?: string;
  effectiveDate?: string;
};

export type FinancialClass = {
  class?: string;
  effectiveDate?: string;
};

export type ExtendedPersonName = {
  familyName?: string;
  givenName?: string;
  middleInitialOrName?: string;
  suffix?: string;
  prefix?: string;
  degree?: string;
  /**
   * Common Code Values
   *
   * | Code | Value        | Comments                                               |
   * | ---- | ------------ | ------------------------------------------------------ |
   * | A    | Alias Name   |                                                        |
   * | C    | Adopted Name |                                                        |
   * | D    | Display Name |                                                        |
   * | L    | Legal Name   | The legal name is the same as the current married name |
   * | M    | Maiden Name  |                                                        |
   * | O    | Other        |                                                        |
   */
  nameTypeCode?: string;
  /**
   * Common code values
   *
   * | Code | Description                                      |
   * | ---- | ------------------------------------------------ |
   * | A    | Alphabetic (i.e., Default or some single-byte)   |
   * | I    | Ideographic (i.e., Kanji)                        |
   * | P    | Phonetic (i.e., ASCII, Katakana, Hiragana, etc.) |
   */
  nameRepresentationCode?: string;
};

export type ExtendedAddress = {
  streetAddress?: string;
  otherDesignation?: string;
  city?: string;
  stateOrProvince?: string;
  zipOrPostalCode?: string;
  country?: string;
  /**
   * Common Code Values:
   *
   * | Code | Value                |
   * | ---- | -------------------- |
   * | B    | Business             |
   * | C    | Current or Temporary |
   * | F    | Country of Origin    |
   * | H    | Home                 |
   * | M    | Mailing              |
   * | O    | Office               |
   * | P    | Permanent            |
   */
  addressType?: string;
  otherGeographicDesignation?: string;
  countyParishCode?: string;
  censusTract?: string;
};

export type ExtendedTelecommunicationNumber = {
  telephoneNumber?: string;
  /**
   * | Code | Value                    |
   * | ---- | ------------------------ |
   * | ASN  | Answering Service Number |
   * | BPN  | Beeper Number            |
   * | EMR  | Emergency Number         |
   * | NET  | Network (email) Address  |
   * | ORN  | Other Residence Number   |
   * | PRN  | Primary Residence Number |
   * | VHN  | Vacation Home Number     |
   * | WPN  | Work Number              |
   */
  telecommunicationUseCode?: string;
  /**
   * | Code     | Value                                                             |
   * | -------- | ----------------------------------------------------------------- |
   * | B        | Beeper                                                            |
   * | C        | Cell Phone                                                        |
   * | F        | Fax                                                               |
   * | Internet | Internet Address: Use Only If TelecommunicationUse Code Is NET    |
   * | M        | Modem                                                             |
   * | P        | Telephone                                                         |
   * | X.400    | X.400 email address: Use Only If TelecommunicationUse Code Is Net |
   */
  telecommunicationEquipmentType?: string;
  emailAddress?: string;
  countryCode?: string;
  areaCityCode?: string;
  phoneNumber?: string;
  extension?: string;
  anyText?: string;
};

export type DriversLicenseNumber = {
  driversLicenseNumber?: string;
  issuingStateProvinceCounty?: string;
  expirationDate?: string;
};

export type PersonLocation = {
  pointOfCare?: string;
  room?: string;
  bed?: string;
  facility?: HierarchicDesignator;
  locationStatus?: string;
  personLocationType?: string;
  building?: string;
  floor?: string;
  locationType?: string;
};
