export type CodedElement = {
  identifier?: string;
  text?: string;
  nameOfCodingSystem?: string;
  alternateIdentifier?: string;
  alternateText?: string;
  nameOfAlternateCodingSystem?: string;
};

export type ExtendedCompositeNameAndIdForOrganizations = {
  organizationName?: string;
  /**
   * | Code | Description                 |
   * | ---- | --------------------------- |
   * | A    | Alias name                  |
   * | D    | Display name                |
   * | L    | Legal name                  |
   * | SL   | Stock exchange listing name |
   */
  organizationNameTypeCode?: string;
  /**
   * @deprecated v2.7
   */
  idNumber?: number;
  /**
   * @deprecated v2.8
   */
  checkDigit?: string;
  /**
   *
   * @deprecated v2.8
   *
   * Common values
   *
   * | Code | Value            |
   * | ---- | ---------------- |
   * | M10  | Mod 10 algorithm |
   * | M11  | Mod 11 algorithm |
   */
  checkDigitScheme?: string;
  assigningAuthority?: HierarchicDesignator;
  /**
   * Common values
   *
   * | Value | Description                   |
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
  assigningFacility?: HierarchicDesignator;
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
  organizationIdentifier?: string;
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

export type CodedWithExceptions = {
  identifier?: string;
  text?: string;

  /**
   * Common Values
   *
   * | Code                 | Description                                                                                                                                      |
   * | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
   * | 99zzz                | Local general code where z is an alphanumeric character                                                                                          |
   * | ACR                  | American College of Radiology finding codes                                                                                                      |
   * | ALPHAID2006          | German Alpha-ID v2006                                                                                                                            |
   * | ALPHAID2007          | German Alpha-ID v2007                                                                                                                            |
   * | ALPHAID2008          | German Alpha-ID v2008                                                                                                                            |
   * | ALPHAID2009          | German Alpha-ID v2009                                                                                                                            |
   * | ALPHAID2010          | German Alpha-ID v2010                                                                                                                            |
   * | ALPHAID2011          | German Alpha-ID v2011                                                                                                                            |
   * | ANS+                 | HL7 set of units of measure                                                                                                                      |
   * | ART                  | WHO Adverse Reaction Terms                                                                                                                       |
   * | AS4                  | ASTM E1238/ E1467 Universal                                                                                                                      |
   * | AS4E                 | AS4 Neurophysiology Codes                                                                                                                        |
   * | ATC                  | American Type Culture Collection                                                                                                                 |
   * | C4                   | CPT-4                                                                                                                                            |
   * | CAPECC               | College of American Pathologists Electronic Cancer Checklist                                                                                     |
   * | CAS                  | Chemical abstract codes                                                                                                                          |
   * | CCC                  | Clinical Care Classification system                                                                                                              |
   * | CD2                  | CDT-2 Codes                                                                                                                                      |
   * | CDCA                 | CDC Analyte Codes                                                                                                                                |
   * | CDCEDACUITY          | CDC Emergency Department Acuity                                                                                                                  |
   * | CDCM                 | CDC Methods/Instruments Codes                                                                                                                    |
   * | CDCOBS               | CDC BioSense RT observations (Census) - CDC                                                                                                      |
   * | CDCPHINVS            | CDC PHIN Vocabulary Coding System                                                                                                                |
   * | CDCREC               | Race & Ethnicity - CDC                                                                                                                           |
   * | CDS                  | CDC Surveillance                                                                                                                                 |
   * | CE (obsolete)        | CEN ECG diagnostic codes                                                                                                                         |
   * | CLP                  | CLIP                                                                                                                                             |
   * | CPTM                 | CPT Modifier Code                                                                                                                                |
   * | CST                  | COSTART                                                                                                                                          |
   * | CVX                  | CDC Vaccine Codes                                                                                                                                |
   * | DCM                  | DICOM Controlled Terminology                                                                                                                     |
   * | E                    | EUCLIDES                                                                                                                                         |
   * | E5                   | Euclides quantity codes                                                                                                                          |
   * | E6                   | Euclides Lab method codes                                                                                                                        |
   * | E7                   | Euclides Lab equipment codes                                                                                                                     |
   * | ENZC                 | Enzyme Codes                                                                                                                                     |
   * | EPASRS               | EPA SRS                                                                                                                                          |
   * | FDAUNII              | Unique Ingredient Identifier (UNII)                                                                                                              |
   * | FDDC                 | First DataBank Drug Codes                                                                                                                        |
   * | FDDX                 | First DataBank Diagnostic Codes                                                                                                                  |
   * | FDK                  | FDA K10                                                                                                                                          |
   * | FIPS5_2              | FIPS 5-2 (State)                                                                                                                                 |
   * | FIPS6_4              | FIPS 6-4 (County)                                                                                                                                |
   * | GDRG2004             | G-DRG German DRG Codes v2004                                                                                                                     |
   * | GDRG2005             | G-DRG German DRG Codes v2005                                                                                                                     |
   * | GDRG2006             | G-DRG German DRG Codes v2006                                                                                                                     |
   * | GDRG2007             | G-DRG German DRG Codes v2007                                                                                                                     |
   * | GDRG2008             | G-DRG German DRG Codes v2008                                                                                                                     |
   * | GDRG2009             | G-DRG German DRG Codes v2009                                                                                                                     |
   * | GMDC2004             | German Major Diagnostic Codes v2004                                                                                                              |
   * | GMDC2005             | German Major Diagnostic Codes v2005                                                                                                              |
   * | GMDC2006             | German Major Diagnostic Codes v2006                                                                                                              |
   * | GMDC2007             | German Major Diagnostic Codes v2007                                                                                                              |
   * | GMDC2008             | German Major Diagnostic Codes v2008                                                                                                              |
   * | GMDC2009             | German Major Diagnostic Codes v2009                                                                                                              |
   * | HB                   | HIBCC                                                                                                                                            |
   * | HCPCS                | CMS (formerly HCFA) Common Procedure Coding System                                                                                               |
   * | HCPT                 | Health Care Provider Taxonomy                                                                                                                    |
   * | HHC                  | Home Health Care                                                                                                                                 |
   * | HI                   | Health Outcomes                                                                                                                                  |
   * | HL7nnnn              | HL7 Defined Codes where nnnn is the HL7 table number                                                                                             |
   * | HOT                  | Japanese Nationwide Medicine Code                                                                                                                |
   * | HPC                  | CMS (formerly HCFA )Procedure Codes (HCPCS)                                                                                                      |
   * | I10                  | ICD-10                                                                                                                                           |
   * | I10G2004             | ICD 10 Germany 2004                                                                                                                              |
   * | I10G2005             | ICD 10 Germany 2005                                                                                                                              |
   * | I10G2006             | ICD 10 Germany 2006                                                                                                                              |
   * | I10P                 | ICD-10 Procedure Codes                                                                                                                           |
   * | I9                   | ICD9                                                                                                                                             |
   * | I9C                  | ICD-9CM                                                                                                                                          |
   * | I9CDX                | ICD-9CM Diagnosis codes                                                                                                                          |
   * | I9CP                 | ICD-9CM Procedure codes                                                                                                                          |
   * | IBT                  | ISBT                                                                                                                                             |
   * | IBTnnnn              | ISBT 128 codes where nnnn specifies a specific table within ISBT 128.                                                                            |
   * | IC2                  | ICHPPC-2                                                                                                                                         |
   * | ICD10AM              | ICD-10 Australian modification                                                                                                                   |
   * | ICD10CA              | ICD-10 Canada                                                                                                                                    |
   * | ICD10GM2007          | ICD 10 Germany v2007                                                                                                                             |
   * | ICD10GM2008          | ICD 10 Germany v2008                                                                                                                             |
   * | ICD10GM2009          | ICD 10 Germany v2009                                                                                                                             |
   * | ICD10GM2010          | ICD 10 Germany v2010                                                                                                                             |
   * | ICD10GM2011          | ICD 10 Germany v2011                                                                                                                             |
   * | ICDO                 | International Classification of Diseases for Oncology                                                                                            |
   * | ICDO2                | International Classification of Disease for Oncology Second Edition                                                                              |
   * | ICDO3                | International Classification of Disease for Oncology Third Edition                                                                               |
   * | ICS                  | ICCS                                                                                                                                             |
   * | ICSD                 | International Classification of Sleep Disorders                                                                                                  |
   * | ISO                  | ISO 2955.83 (units of measure) with HL7 extensions                                                                                               |
   * | ISO3166_1            | ISO 3166-1 Country Codes                                                                                                                         |
   * | ISO3166_2            | ISO 3166-2 Country subdivisions                                                                                                                  |
   * | ISO4217              | ISO4217 Currency Codes                                                                                                                           |
   * | ISO639               | ISO 639 Language                                                                                                                                 |
   * | ISOnnnn (deprecated) | ISO Defined Codes where nnnn is the ISO table number                                                                                             |
   * | ITIS                 | Integrated Taxonomic Information System                                                                                                          |
   * | IUPC                 | IUPAC/IFCC Component Codes                                                                                                                       |
   * | IUPP                 | IUPAC/IFCC Property Codes                                                                                                                        |
   * | JC10                 | JLAC/JSLM, nationwide laboratory code                                                                                                            |
   * | JC8                  | Japanese Chemistry                                                                                                                               |
   * | JJ1017               | Japanese Image Examination Cache                                                                                                                 |
   * | L                    | Local general code                                                                                                                               |
   * | LB                   | Local billing code                                                                                                                               |
   * | LN                   | Logical Observation Identifier Names and Codes (LOINCÂ®)                                                                                         |
   * | MCD                  | Medicaid                                                                                                                                         |
   * | MCR                  | Medicare                                                                                                                                         |
   * | MDC                  | Medical Device Communication                                                                                                                     |
   * | MDDX                 | Medispan Diagnostic Codes                                                                                                                        |
   * | MEDC                 | Medical Economics Drug Codes                                                                                                                     |
   * | MEDR                 | Medical Dictionary for Drug Regulatory Affairs (MEDDRA)                                                                                          |
   * | MEDX                 | Medical Economics Diagnostic Codes                                                                                                               |
   * | MGPI                 | Medispan GPI                                                                                                                                     |
   * | MVX                  | CDC Vaccine Manufacturer Codes                                                                                                                   |
   * | NAICS                | Industry (NAICS)                                                                                                                                 |
   * | NCPDPnnnnsss         | NCPDP code list for data element nnnn [as used in segment sss]                                                                                   |
   * | NDA                  | NANDA                                                                                                                                            |
   * | NDC                  | National drug codes                                                                                                                              |
   * | NDFRT                | NDF-RT (Drug Classification)                                                                                                                     |
   * | NIC                  | Nursing Interventions Classification                                                                                                             |
   * | NIP001               | Source of Information (Immunization)                                                                                                             |
   * | NIP002               | Substance refusal reason                                                                                                                         |
   * | NIP004               | Vaccination - Contraindications, Precautions, and Immunities                                                                                     |
   * | NIP007               | Vaccinated at location (facility)                                                                                                                |
   * | NIP008               | Vaccine purchased with (Type of funding)                                                                                                         |
   * | NIP009               | Reported adverse event previously                                                                                                                |
   * | NIP010               | VAERS Report type                                                                                                                                |
   * | NND                  | Notifiable Event (Disease/Condition) Code List                                                                                                   |
   * | NPI                  | National Provider Identifier                                                                                                                     |
   * | NUBC                 | National Uniform Billing Committee                                                                                                               |
   * | NULLFL               | Null Flavor                                                                                                                                      |
   * | O301                 | German Procedure Codes                                                                                                                           |
   * | O3012004             | OPS Germany v2004                                                                                                                                |
   * | O3012005             | OPS Germany v2005                                                                                                                                |
   * | O3012006             | OPS Germany v2006                                                                                                                                |
   * | OHA                  | Omaha System                                                                                                                                     |
   * | OPS2007              | OPS Germany v2007                                                                                                                                |
   * | OPS2008              | OPS Germany v2008                                                                                                                                |
   * | OPS2009              | OPS Germany v2009                                                                                                                                |
   * | OPS2010              | OPS Germany v2010                                                                                                                                |
   * | OPS2011              | OPS Germany v2011                                                                                                                                |
   * | PHINQUESTION         | CDC Public Health Information Network (PHIN) Question                                                                                            |
   * | PLR                  | CDC PHLIP Lab result codes that are not covered in SNOMED at the time of this implementation                                                     |
   * | PLT                  | CDC PHLIP Lab test codes, where LOINC concept is too broad or not yet available, especially as needed for ordering and or lab to lab reporting ) |
   * | POS                  | POS Codes                                                                                                                                        |
   * | RC                   | Read Classification                                                                                                                              |
   * | RXNORM               | RxNorm                                                                                                                                           |
   * | SCT                  | SNOMED Clinical Terms                                                                                                                            |
   * | SCT2                 | SNOMED Clinical Terms alphanumeric codes                                                                                                         |
   * | SDM                  | SNOMED- DICOM Microglossary                                                                                                                      |
   * | SIC                  | Industry (SIC)                                                                                                                                   |
   * | SNM                  | Systemized Nomenclature of Medicine (SNOMED)                                                                                                     |
   * | SNM3                 | SNOMED International                                                                                                                             |
   * | SNT                  | SNOMED topology codes (anatomic sites)                                                                                                           |
   * | SOC                  | Occupation (SOC 2000)                                                                                                                            |
   * | UB04FL14             | Priority (Type) of Visit                                                                                                                         |
   * | UB04FL15             | Point of Origin                                                                                                                                  |
   * | UB04FL17             | Patient Discharge Status                                                                                                                         |
   * | UB04FL31             | Occurrence Code                                                                                                                                  |
   * | UB04FL35             | Occurrence Span                                                                                                                                  |
   * | UB04FL39             | Value Code                                                                                                                                       |
   * | UC                   | UCDS                                                                                                                                             |
   * | UCUM                 | UCUM code set for units of measure(from Regenstrief)                                                                                             |
   * | UMD                  | MDNS                                                                                                                                             |
   * | UML                  | Unified Medical Language                                                                                                                         |
   * | UPC                  | Universal Product Code                                                                                                                           |
   * | UPIN                 | UPIN                                                                                                                                             |
   * | USPS                 | United States Postal Service                                                                                                                     |
   * | W1                   | WHO record # drug codes (6 digit)                                                                                                                |
   * | W2                   | WHO record # drug codes (8 digit)                                                                                                                |
   * | W4                   | WHO record # code with ASTM extension                                                                                                            |
   * | WC                   | WHO ATC                                                                                                                                          |
   * | X12Dennnn            | ASC X12 Code List nnnn                                                                                                                           |
   *
   *
   *
   */
  nameOfCodingSystem?: string;
  alternateIdentifier?: string;
  alternateText?: string;
  nameOfAlternateCodingSystem?: string;
  codingSystemVersionId?: string;
  alternateCodingSystemVersionId?: string;
  originalText?: string;
  secondAlternateIdentifier?: string;
  secondAlternateText?: string;
  nameOfSecondAlternateCodingSystem?: string;
  secondAlternateCodingSystemVersionId?: string;
  codingSystemOID?: string;
  valueSetOID?: string;
  valueSetVersionId?: string;
  alternateCodingSystemOID?: string;
  alternateValueSetOID?: string;
  alternateValueSetVersionId?: string;
  secondAlternateCodingSystemOID?: string;
  secondAlternateValueSetOID?: string;
  secondAlternateValueSetVersionId?: string;
};

export type ExtendedCompositeIdNumberAndNameForPerson = {
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
   * Common values
   *
   * | Code | Value            |
   * | ---- | ---------------- |
   * | M10  | Mod 10 algorithm |
   * | M11  | Mod 11 algorithm |
   */
  codeIdentifyingTheCheckDigitSchemeEmployed?: string;
  /**
   * Common values
   *
   * | Value | Description                   |
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

export type EntityIdentifier = {
  entityIdentifier?: string;
  namespaceId?: string;
  universalId?: string;
  /**
   * Common Code Values
   *
   *
   * | Code   | Value                                                                                                                                                                                                                                                                                          |
   * | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | CLIA   | Clinical Laboratory Improvement Amendments. Allows for the ability to designate organization identifier as a "CLIA" assigned number (for labs)                                                                                                                                                 |
   * | CLIP   |                                                                                                                                                                                                                                                                                                |
   * | DNS    | An Internet dotted name. Either in ASCII or as integers                                                                                                                                                                                                                                        |
   * | EUI64  | IEEE 64-bit Extended Unique Identifier is comprised of a 24-bit company identifier and a 40-bit instance identifier. The value shall be formatted as 16 ASCII HEX digits, for example, "AABBCC1122334455". The 24-bit company identifier, formally known as                                    |
   * | GUID   | Same as UUID                                                                                                                                                                                                                                                                                   |
   * | HCD    | The CEN Healthcare Coding Scheme Designator. (Identifiers used in DICOM follow this assignment scheme.)                                                                                                                                                                                        |
   * | HL7    | Reserved for future HL7 registration schemes                                                                                                                                                                                                                                                   |
   * | ISO    | An International Standards Organization Object Identifier                                                                                                                                                                                                                                      |
   * | L      | These are reserved for locally defined coding schemes                                                                                                                                                                                                                                          |
   * | M      | These are reserved for locally defined coding schemes                                                                                                                                                                                                                                          |
   * | N      | These are reserved for locally defined coding schemes                                                                                                                                                                                                                                          |
   * | Random | Usually a base64 encoded string of random bits. The uniqueness depends on the length of the bits. Mail systems often generate ASCII string "unique names," from a combination of random bits and system names. Obviously, such identifiers will not be constrained to the base64 character set |
   * | URI    | Uniform Resource Identifier                                                                                                                                                                                                                                                                    |
   * | UUID   | The DCE Universal Unique Identifier, in accordance with RFC 4122. Recommended format is 32 hexadecimal digits separated by hyphens, in the digit grouping 8-4-4-4-12	                                                                                                                         |
   * | x400   | An X.400 MHS format identifier                                                                                                                                                                                                                                                                 |
   * | x500   | An X.500 directory name                                                                                                                                                                                                                                                                        |
   *
   */
  universalIdType?: string;
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

export type JobCodeClass = {
  jobCode?: string;
  jobClass?: string;
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
  addressRepresentationCode?: string;
  addressValidityRange?: string;
  effectiveDate?: string;
  expirationDate?: string;
  expirationReason?: string;
  temporaryIndicator?: string;
  badAddressIndicator?: string;
  addressUage?: string;
  addressee?: string;
  comment?: string;
  preferenceOrder?: number;
  protectionCode?: CodedWithExceptions;
  addressIdentifier?: EntityIdentifier;
};

export type ExtendedTelecommunicationNumber = {
  /**
   * @deprecated as of 2.3
   */
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
   *
   * @required v2.7
   *
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
  communicationAddress?: string;
  countryCode?: string;
  areaCityCode?: string;
  phoneNumber?: string;
  extension?: string;
  anyText?: string;
  extensionPrefix?: string;
  speedDialCode?: string;
  unformattedTelephoneNumber?: string;
  effectiveStartDate?: string;
  expirationDate?: string;
  /**
   * Common Values
   *
   * | Code | Description          |
   * | ---- | -------------------- |
   * | C    | Corrected            |
   * | E    | Added in error       |
   * | M    | Moved                |
   * | N    | No longer in service |
   * | R    | On request           |
   *
   */
  expirationReason?: string;
  protectionCode?: CodedWithExceptions;
  sharedTelecommunicationIdentifier?: EntityIdentifier;
  preferenceOrder?: number;
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
