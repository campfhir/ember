import {
  CodedWithExceptions,
  DriversLicenseNumber,
  EntityIdentifier,
  ExtendedAddress,
  ExtendedCompositeIdNumberAndNameForPerson,
  ExtendedCompositeIdWithCheckDigit,
  ExtendedCompositeNameAndIdForOrganizations,
  ExtendedPersonName,
  ExtendedTelecommunicationNumber,
  FinancialClass,
  HierarchicDesignator,
  JobCodeClass,
  PersonLocation,
} from "./DataTypes";
import { MessageEvents } from "./MessageEvents";
import { MessageTypes } from "./MessageTypes";

/** The ACC segment contains patient information relative to an accident in which the patient has been involved.
 */
export type MessageSegments = {
  /**
   * This segment was created to communicate patient abstract information used for billing and reimbursement purposes. Abstract is a condensed form of medical history created for analysis, care planning, etc.
   */
  ABS: {};
  /**
   * The ACC segment contains patient information relative to an accident in which the patient has been involved.
   */
  ACC: {
    accidentDateTime?: string;
    accidentCode?: CodedWithExceptions;
    accidentLocation?: string;
    autoAccidentState?: CodedWithExceptions;
    /**
     * Common values
     *
     * | Code | Values |
     * | ---- | ------ |
     * | Y    | Yes    |
     * | N    | No     |
     */
    accidentJobRelatedIndicator?: string;
    /**
     * Common values
     *
     * | Code | Values |
     * | ---- | ------ |
     * | Y    | Yes    |
     * | N    | No     |
     */
    accidentDeathIndicator?: string;
    enteredBy?: ExtendedCompositeIdNumberAndNameForPerson;
    accidentDescription?: string;
    broughtInBy?: string;
    /**
     * Common Values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    policeNotifiedIndicator?: string;
    accidentAddress?: ExtendedAddress;
    degreeOfPatientLiability?: EntityIdentifier[];
  };

  /** The ADD segment is used to define the continuation of the prior segment in a continuation message.  See Section 2.23.2, “Continuation messages and segments,” for details.
   */
  ADD: {
    addendumContinuationPointer?: string;
  };

  /** The AIG segment contains information about various kinds of resources (other than those with specifically defined segments in this chapter) that can be scheduled.  Resources included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Resources not controlled by a schedule are not identified on a schedule request using this segment.  Resources described by this segment are general kinds of resources, such as equipment, that are identified with a simple identification code.
   */
  AIG: {};

  /** The AIL segment contains information about location resources (meeting rooms, operating rooms, examination rooms, or other locations) that can be scheduled.  Resources included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Resources not controlled by a schedule are not identified on a schedule request using this segment.  Location resources are identified with this specific segment because of the specific encoding of locations used by the HL7 specification.
   */
  AIL: {};

  /** The AIP segment contains information about the personnel types that can be scheduled.  Personnel included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Personnel not controlled by a schedule are not identified on a schedule request using this segment.  The kinds of personnel described on this segment include any healthcare provider in the institution controlled by a schedule (for example: technicians, physicians, nurses, surgeons, anesthesiologists, or CRNAs).
   */
  AIP: {};

  /** The AIS segment contains information about various kinds of services that can be scheduled.  Services included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Services not controlled by a schedule are not identified on a schedule request using this segment.
   */
  AIS: {};

  /** The AL1 segment contains patient allergy information of various types.  Most of this information will be derived from user-defined tables.  Each AL1 segment describes a single patient allergy.
   */
  AL1: {
    setId: string;
    /**
     * Common Values
     *
     * | Code |	Description                    |
     * | ---- | ------------------------------ |
     * | DA   |	Drug allergy	                 |
     * | FA   |	Food allergy	                 |
     * | MA	  | Miscellaneous allergy	         |
     * | MC   |	Miscellaneous contraindication |
     */
    allergyType?: string;
    allergyCode: CodedWithExceptions;
    /**
     * Common Values
     *
     * | Code |	Description |
     * | ---- | ----------- |
     * | MI   |	Mild        |
     * | MO   |	Moderate	  |
     * | SV	  | Severe      |
     */
    allergySeverity?: string;
    allergyReaction?: string;
    identificationDate?: string;
  };

  /** The APR segment contains parameters and preference specifications used for requesting appointments in the SRM message.  It allows placer applications to provide coded parameters and preference indicators to the filler application, to help determine when a requested appointment should be scheduled.  An APR segment can be provided in conjunction with either the ARQ segment or any of the service and resource segments (AIG, AIS, AIP, and AIL).  If an APR segment appears in conjunction with an ARQ segment, its parameters and preference indicators pertain to the schedule request as a whole.  If the APR segment appears with any of the service and resource segments, then its parameters and preferences apply only to the immediately preceding service or resource
   */
  APR: {};

  /** The ARQ segment defines a request for the booking of an appointment.  It is used in transactions sent from an application acting in the role of a placer.
   */
  ARQ: {};
  /**
   * The ARV segment is used to communicate the requested/required type of access restrictions from system to system, at both the person/patient and the encounter/visit level.
   *
   * Examples:
   * A person/patient may have the right to object to any or all of his/her information to be disclosed. In addition, the patient may request that protected information not be disclosed to family members or friends who may be involved in their care or for notification purposes.
   *
   * A realm or organization may have certain privacy policies.
   *
   * A patient may have the right to opt out of being included on facility directories.
   * In an international context, a physician may be culturally obligated to protect the patient's privacy.
   *
   * Any "opt-in" or "opt-out" restrictions are communicated in ARV-3 - Access Restriction Value. This segment replaces PD1-12 and PV2-22, which have been deprecated in V2.6. The ARV segment is optional and is sent after the PID/PD1 segments to describe access restrictions associated with the person/patient. The ARV segment is optional and is sent after the PV1/PV2 segments to describe access restrictions associated with that specific encounter.
   *
   * Usage Notes:
   *
   * The individual system security may want to utilize the Access Restriction Value along with the Access Restriction Reason (and/or with the Confidentiality Code from another segment, e.g., OM1-30 or other data) in order to implement the appropriate type of protection for the person, patient, visit and/or visit data. Each system has the flexibility to incorporate/map the access values into their security system appropriately; the actual implementation for access to protected data is determined by the individual system. The Access Restriction Values supported by an enterprise/system would be defined and determined by that organization.
   *
   * It is expected that these access restriction values would be utilized in combination with other system security information (e.g., patient locations, user department, caregiver-patient relationships, other access restriction parameters) to determine user access.
   *
   * System implementers should carefully control access to the restriction codes and values, as they themselves hold sensitive information.
   */
  ARV: {
    setId?: number;
    accessRestrictionActionCode?: CodedWithExceptions;
  };

  /** This segment represents an authorization or a pre-authorization for a referred procedure or requested service by the payor covering the patient’s health care.
   */
  AUT: {};

  /** The BHS segment defines the start of a batch.
   */
  BHS: {};

  /** The BLG segment is used to provide billing information, on the ordered service, to the filling application.
   */
  BLG: {};

  /** The BTS segment defines the end of a batch.
   */
  BTS: {};

  /** The CDM segment contains the fields for identifying anything which is charged to patient accounts, including procedures, services, supplies.  It is intended to be used to maintain a list of valid chargeable utilization items.  Its purpose is to keep billing codes synchronized between HIS, Patient Accounting, and other departmental systems.  It is not intended to completely support materials management, inventory, or complex pricing structures for which additional complex fields would be required.  Given an identifying charge code, the associated fields in the charge description master file will provide basic pricing and billing data.  All the additional information necessary for patient accounting systems to do billing and claims is not intended to be included in this segment; those should be part of insurance or billing profile tables.* 
  * 
  * 
  * 
  The CDM segment contains the fields which, for one chargeable item, remain the same across facilities, departments, and patient types.  The following PRC segment contains the fields which, for the same chargeable item, vary depending upon facility or department or patient type.
   */
  CDM: {};

  /** The Clinical Study Master (CM0) segment contains the information about the study itself.  The sending application study number for each patient is sent in the CSR segment.  The optional CM0 enables information about the study at the sending application that may be useful to the receiving systems.  All of the fields in the segment describe the study status at the sending facility unless otherwise agreed upon
   */
  CM0: {};

  /** Each Clinical Study Phase Master (CM1) segment contains the  information about one phase of a study identified in the preceding CM0.  This is an optional structure to be used if the study has more than one treatment or evaluation phase within it.  The identification of study phases that the patient enters are sent in the CSP segment: sequence 2.  The CM1 segment describes the phase in general for the receiving system.
   */
  CM1: {};

  /** The Clinical Study Schedule Master (CM2) contains the  information about the scheduled time points for study or phase-related treatment or evaluation events.  The fact that a patient has data satisfying a scheduled time point is sent in the CSS segment, sequence 2.  The CM2 segment describes the scheduled time points in general.
   */
  CM2: {};

  /** The CSP segment contains information on a patient’s status for a particular phase of the study. This segment is optional and is useful when a study has different evaluation intervals within it. (See Section 7.5.1.2, “phase of a clinical trial.”) The CSP segment is implemented on a study-specific basis for messaging purposes. The fact that the patient has entered a phase of the study that represents a certain treatment approach may need to be messaged to other systems, like pharmacy, nursing, or order entry. It is also important to sponsors and data management centers for tracking patient progress through the study and monitoring the data schedule defined for each phase. It may subsume OBR and OBX segments that follow it to indicate that these data describe the phase
   */
  CSP: {};

  /** The CSR segment will contain fundamental administrative and regulatory information required to document a patient’s enrollment on a clinical trial.  This segment is all that is required if one needs to message another system that an enrollment has taken place, i.e., from clinical trials to pharmacy, accounting, or order entry systems.  The CSR segment may also be used to identify that OBR, OBX, RXA, and RXR segments that follow represent data applicable to the identified study
   */
  CSR: {};

  /** The Clinical Study Data Schedule (CSS) segment is optional depending on whether messaging of study data needs to be linked to the scheduled data time points for the study.  (See Section 7.5.1.3, “data schedule.”)  The CSS segment enables communication of data schedules and adherence that ranges from the basic to the elaborate.  Use of the segment must be planned for each implementation.  Each CSS segment will subsume observation and drug administration segments that follow, indicating that they satisfy this scheduled time point
   */
  CSS: {};

  /** The CTD segment may identify any contact personnel  associated with a patient referral message and its related transactions.  The CTD segment will be paired with a PRD segment.  The PRD segment contains data specifically focused on provider information in a referral.  While it is important in an inter-enterprise transaction to transmit specific information regarding the providers involved (referring and referred-to), it may also be important to identify the contact personnel associated with the given provider.  For example, a provider receiving a referral may need to know the office manager or the billing person at the institution of the provider who sent the referral.  This segment allows for multiple contact personnel to be associated with a single provider.
   */
  CTD: {};

  /** The CTI segment is an optional segment that contains information to identify the clinical trial, phase and time point with which an order or result is associated
   */
  CTI: {};

  /** The disability segment contains information related to the disability of a person.  This segment was created instead of adding disability attributes to each segment that contains a person (to which disability may apply).  This is an optional segment that can be used to send disability information about a person already defined by the Patient Administration Chapter.  The disabled person code and identifier allow for the association of the disability information to the person.
   */
  DB1: {
    setId: string;
    /**
     * Common Values
     *
     * | Code | Description      |
     * | ---- | ---------------- |
     * | AP   | Associated Party |
     * | GT   | Guarantor        |
     * | IN   | Insured          |
     * | PT   | Patient          |
     */
    disabledPersonCode?: string;
    disabledPersonIdentifier?: ExtendedCompositeIdWithCheckDigit[];
    /**
     * Common Values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    disabledIndicator?: string;
    disabledStartDate?: string;
    disabledEndDate?: string;
    disabilityReturnToWorkDate?: string;
    disabilityUnableToWorkDate?: string;
  };

  /** The DG1 segment contains patient diagnosis information of various types, for example, admitting,  primary, etc.  The DG1 segment is used to send multiple diagnoses (for example, for medical records encoding).  It is also used when the FT1-19-diagnosis does not provide sufficient information for a billing system.  This diagnosis coding should be distinguished from the clinical problem segment used by caregivers to manage the patient (see Chapter 12, Patient Care).  Coding methodologies are also defined.
   */
  DG1: {};

  /** The DRG segment contains diagnoses-related grouping information of various types.  The DRG segment is used to send the DRG information, for example, for billing and medical records encoding
   */
  DRG: {};

  /** The DSC segment is used in the continuation protocol
   */
  DSC: {};

  /** The DSP segment is used to contain data that has been preformatted by the sender for display.  The semantic content of the data is lost; the data is simply treated as lines of text
   */
  DSP: {};

  /** The EQL segment is used to define queries using select statements based on the query language of choice (e.g., SQL).  Refer to the functional chapters for the lists of HL7-defined EQL select statements
   */
  EQL: {};

  /** The ERQ segment is used to issue queries where the desired response is formatted as an event replay response message.  This enables the querying application to request detailed event data from an application that supports this feature, such that it may no longer be necessary for it to capture and store all event information at the time of the original trigger event.
   */
  ERQ: {};

  /** The ERR segment is used to add error comments to acknowledgment messages.
   */
  ERR: {};

  /** The EVN segment is used to communicate necessary trigger event information to receiving applications.  Valid event types for all chapters are contained in HL7 table 0003 - Event type.
   */
  EVN: {
    eventTypeCode?: MessageEvents;
    recordedDateTime: string;
    dateTimePlannedEvent?: string;
    /**
     * Common Code Values
     *
     * |Code | Description       |
     * | --- | ----------------- |
     * | 01  | Patient request   |
     * | 02  | Physician order   |
     * | 03  | Census management |
     */
    eventReasonCode?: CodedWithExceptions;
    operatorId?: ExtendedCompositeIdNumberAndNameForPerson[];
    eventOccurred?: string;
    eventFacility?: HierarchicDesignator;
  };

  /**
   */
  FAC: {};

  /** The FHS segment is used to head a file (group of batches) as defined in Section 2.23.3, “HL7 batch protocol.”
   */
  FHS: {};

  /** The FT1 segment contains the detail data necessary to post charges, payments, adjustments, etc. to patient accounting records.
   */
  FT1: {};

  /** The FTS segment defines the end of a file.
   */
  FTS: {};

  /** The goal detail segment contains the data necessary to add, update, correct, and delete the goals for an individual* 
  * 
  * 
  * 
  The business and/or application must assume responsibility for maintaining knowledge about data ownership, versioning, and/or audit trail control (for purposes of data integrity).  It is also their responsibility to represent the appropriate version of that data.
   */
  GOL: {};

  /** The GT1 segment contains guarantor (e.g., the person or the organization with financial responsibility for payment of a patient account) data for patient and insurance billing applications.
   */
  GT1: {};

  /** The IN1 segment contains insurance policy coverage information necessary to produce properly pro-rated and patient and insurance bills.
   */
  IN1: {};

  /** The IN2 segment contains additional insurance policy coverage and benefit information necessary for proper billing and reimbursement.  Fields used by this segment are defined by HCFA or other regulatory agencies.
   */
  IN2: {};

  /** The IN3 segment contains additional insurance information for certifying the need for patient care.  Fields used by this segment are defined by HCFA, or other regulatory agencies.
   */
  IN3: {};

  /** The optional LCC segment identifies how a patient location room can be billed by a certain department.  A department can use different charge codes for the same room or bed, so there can be multiple LCC segments following an LDP segment
   */
  LCC: {};

  /** The LCH segment is used to identify location characteristics which determine which patients will be assigned to the room or bed.  It contains the location characteristics of the room or bed identified in the preceding LOC segment. There should be one LCH segment for each attribute.* 
  * 
  * 
  * 
  When the LCH segment appears immediately following the LOC segment, it communicates characteristics which are the same across multiple departments that may use the same room.  When the LCH segment appears immediately following the LDP segment, it communicates characteristics which differ for different departments that may use the same room.  For example, the following characteristics are more likely to vary by which department is using the room:  teaching, gender, staffed, set up, overflow, whereas the other characteristics are likely to remain the same
   */
  LCH: {};

  /** The LDP segment identifies how a patient location room is being used by a certain department.  Multiple departments can use the same patient location, so there can be multiple LDP segments following an LOC segment.  There must be at least one LDP segment for each LOC segment.  This is not intended to include any current occupant information
   */
  LDP: {};

  /** The LOC segment can identify any patient location referenced by information systems.  This segment gives physical set up information about the location.  This is not intended to include any current occupant or current use information.  There should be one LOC segment for each patient location.  If desired, there can also be one LOC segment for each nursing unit and room.
   */
  LOC: {};

  /** The LRL segment is used identify one location’s relationship to another location, the nearest lab, pharmacy, etc.
   */
  LRL: {};

  /** The MFA segment contains the following fields as defined in Figure 8-3 - MFA attributes.
   */
  MFA: {};

  /**
   */
  MFE: {};

  /**
   */
  MFI: {};

  /** The MRG segment provides receiving applications with information necessary to initiate the merging of patient data as well as groups of records.  It is intended that this segment be used throughout the Standard to allow the merging of registration, accounting, and clinical records within specific applications* 
  * 
  * 
  * 
  Segment notes:  MRG merge patient information * 
  * 
  The assigning facility ID, the fourth component of the patient identifiers, is an HD data type that is uniquely associated with the facility that originally assigned the number.  A given institution, or group of intercommunicating institutions, should establish a list of facilities that may be potential assignors of patient identification (and other important identification) numbers.  The list will be one of the institution’s master dictionary lists.  Since third parties (other than the assignors of patient identification numbers) may send or receive HL7 messages containing patient identification numbers, the assigning facility ID in the patient identification numbers may not be the same as those of the sending and receiving systems identified in the MSH.  The assigning facility ID must be unique across applications at a given site.  This field is required in HL7 implementations that have more than a single Patient Administration application assigning such numbers
   */
  MRG: {};

  /** The MSA segment contains information sent while acknowledging another message.
   */
  MSA: {};

  /** The MSH segment defines the intent, source, destination, and some specifics of the syntax of a message
   */
  MSH: {
    fieldSeparator: string;
    encodingCharacters: {
      fieldSeparator: string;
      componentSeparator: string;
      subComponentSeparator: string;
      repetitionSeparator: string;
      escapeCharacter: string;
    };
    sendingApplication?: HierarchicDesignator;
    sendingFacility?: HierarchicDesignator;
    receivingApplication?: HierarchicDesignator;
    receivingFacility?: HierarchicDesignator;
    dateTimeOfMessage?: string;
    security?: string;
    message: {
      type?: MessageTypes;
      event?: MessageEvents;
    };
    messageControlId: string;
    processing: {
      /**
       * Common values
       *
       * | Code | Values        |
       * | ---- | ------------- |
       * | D    | Debug         |
       * | T    | Test/Training |
       * | P    | Production    |
       */
      id?: string;
      /**
       * Common values
       *
       * | Code        | Values                                                 |
       * | ----------- | ------------------------------------------------------ |
       * | a           | Archive                                                |
       * | i           | Initial load                                           |
       * | Not Present | Not present (the default, meaning current  processing) |
       * | r           | Restore from archive                                   |
       */
      mode?: string;
    };
    /**
     * Version of HL7 message
     *
     * 2.x[.x][A]
     *
     * @example
     * "2.0" | "2.0D" | "2.1" | "2.2" | "2.3" | "2.3.1"
     *
     */
    versionId: string;
    sequenceNumber?: number;
    continuationPointer?: string;
    /**
     * Common values
     *
     * | Code | Values                       |
     * | ---- | ---------------------------- |
     * | AL   | Always                       |
     * | ER   | Error/reject conditions only |
     * | NE   | Never                        |
     * | SU   | Successful completion only   |
     */
    acceptAcknowledgementType?: string;
    /**
     * Common values
     *
     * | Code | Values                       |
     * | ---- | ---------------------------- |
     * | AL   | Always                       |
     * | ER   | Error/reject conditions only |
     * | NE   | Never                        |
     * | SU   | Successful completion only   |
     */
    applicationAcknowledgementType?: string;
    /**
     * Common values
     *
     * ISO-3166 values
     *
     * @example
     * "US" | "USA" | 840
     *
     * | English short name (using Title Case) | Alpha-2 Code | Alpha-3 Code | Numeric Code |
     * | ------------------------------------- | ------------ | ------------ | ------------ |
     * | Canada                                | CA           | CAN          | 124          |
     * | Mexico                                | MX           | MEX          | 484          |
     * | United States of America              | US           | USA          | 840          |
     *
     */
    countryCode?: string;
    /**
     * This field contains the character set for the entire message.
     * Refer to HL7 table 0211 - Alternate character sets for valid values
     *
     * Common Code Values
     *
     * | Code       | Description                                                                             |
     * | ---------- | --------------------------------------------------------------------------------------- |
     * | 8859/1     | The printable characters from the ISO 8859/1 Character set                              |
     * | 8859/2     | The printable characters from the ISO 8859/2 Character set                              |
     * | 8859/3     | The printable characters from the ISO 8859/3 Character set                              |
     * | 8859/4     | The printable characters from the ISO 8859/4 Character set                              |
     * | 8859/5     | The printable characters from the ISO 8859/5 Character set                              |
     * | 8859/6     | The printable characters from the ISO 8859/6 Character set                              |
     * | 8859/7     | The printable characters from the ISO 8859/7 Character set                              |
     * | 8859/8     | The printable characters from the ISO 8859/8 Character set                              |
     * | 8859/9     | The printable characters from the ISO 8859/9 Character set                              |
     * | ASCII      | The printable 7-bit ASCII character set. (This is the default if this field is omitted) |
     * | JAS2020    | A subset of ISO2020 used for most Kanji transmissions                                   |
     * | JIS X 0202 | ISO 2022 with escape sequences for Kanji                                                |
     * | UNICODE    | The world wide character standard from ISO/IEC 10646-1-1993[3]                          |
     *
     */
    characterSet?: string[];
    principalLanguageOfMessage?: CodedWithExceptions;
    alternateCharacterSetHandlingScheme?: string;
    messageProfileIdentifier?: EntityIdentifier[];
    sendingResponsibleOrganization?: ExtendedCompositeNameAndIdForOrganizations;
    receivingResponsibleOrganization?: ExtendedCompositeNameAndIdForOrganizations;
    sendingNetworkAddress?: HierarchicDesignator;
    receivingNetworkAddress?: HierarchicDesignator;
  };

  /** The NCK segment is used to allow the various systems on the network to synchronize their system clocks (system date and time).
   */
  NCK: {};

  /** The NK1 segment contains information about the patient’s other related parties.  Any associated parties may be identified.  Utilizing NK1-1-set ID, multiple NK1 segments can be sent to patient accounts
   */
  NK1: {
    setID: string;
    name?: ExtendedPersonName[];
    relationship?: CodedWithExceptions;
    address?: ExtendedAddress[];
    phoneNumber?: ExtendedTelecommunicationNumber[];
    businessPhoneNumber?: ExtendedTelecommunicationNumber[];
    contactRole?: CodedWithExceptions;
    startDate?: string;
    endDate?: string;
    associatedPartiesJobTitle?: string;
    jobAssociatedPartiesCodeClass?: JobCodeClass;
    associatedPartiesEmployeeNumber?: ExtendedCompositeIdWithCheckDigit;
    organizationName?: ExtendedCompositeNameAndIdForOrganizations[];
    maritalStatus?: string;
    sex?: string;
    dateOfBirth?: string;
    livingDependency?: string[];
    ambulatoryStatus?: string[];
    citizenship?: string[];
    primaryLanguage?: CodedWithExceptions;
    livingArrangement?: string;
    publicityIndicator?: CodedWithExceptions;
    protectionIndicator?: string;
    studentIndicator?: string;
    religion?: string;
    mothersMaidenName?: ExtendedPersonName;
    nationalityCode?: CodedWithExceptions;
    ethnicGroup?: string;
    contactReason?: CodedWithExceptions[];
    contactPersonName?: ExtendedPersonName[];
    contactPersonTelephoneNumber?: ExtendedTelecommunicationNumber[];
    contactPersonAddress?: ExtendedAddress[];
    associatedPartyIdentifiers?: ExtendedCompositeIdWithCheckDigit[];
    jobStatus?: string;
    race?: string;
    handicap?: string;
    contactPersonSocialSecurityNumber?: string;
  };

  /** The NPU segment allows the updating of census (bed status) data without sending patient-specific data.  An example might include changing the status of a bed from “housekeeping” to “unoccupied.”
   */
  NPU: {};

  /** The NSC segment can be used to request the start-up, shut-down, and/or migration (to a different cpu or file-server/file-system) of a particular application. It can also be used in an unsolicited update from one system to another to announce the start-up, shut-down, or migration of an application.
   */
  NSC: {};

  /** The NST segment allows network statistical information to be passed between the various systems on the network.  Some fields in this segment refer to portions of lower level protocols; they contain information that can be used by network management applications monitoring the state of various network links
   */
  NST: {};

  /**
   * The NTE segment is defined here for inclusion in messages defined in other chapters. It is commonly used for sending notes and comments.
   * The technical committees define the meaning of the NTE segments within the context of the messages in their chapters. For each NTE, the description
   * in the message attribute table should include an indication of the segment associated with the NTE, for example "Notes and Comments for the PID".
   */
  NTE: {
    setId?: string;
    sourceOfComment?: string;
    comment?: string[];
    commentType?: CodedWithExceptions;
    enteredBy?: ExtendedCompositeIdNumberAndNameForPerson;
    enteredDateTime?: string;
    effectiveStartDate?: string;
    expirationDate?: string;
  };

  /** The Observation Request (OBR) segment is used to transmit information specific to an order for a diagnostic study or observation, physical exam, or assessment.  * 
  * 
  * 
  * 
  The Observation Request segment defines the attributes of a particular request for diagnostic services (e.g., laboratory, EKG) or clinical observations (e.g., vital signs or physical exam).  When a placer requests a given set of observations, always include an order segment.  For lab tests, the information in the order segment usually applies to a single specimen.  However, there is not a one-to-one relationship between specimen and tests ordered.  Different test batteries will usually require their own order segments even when they can be performed on a single specimen.  In this case, the specimen information must be duplicated in each of the order segments that employ that specimen.  For other diagnostic studies, e.g., chest X-ray, a separate order segment will usually be generated for each diagnostic study
   */
  OBR: {};

  /** The OBX segment is used to transmit a single observation or observation fragment.  It represents the smallest indivisible unit of a report.*
   *
   *
   *
   * Its principal mission is to carry information about observations in report messages.  But the OBX can also be part of an observation order (see Section 4.2, “Order Message Definitions”).  In this case, the OBX carries clinical information needed by the filler to interpret the observation the filler makes.
   * For example, an OBX is needed to report the inspired oxygen on an order for a blood oxygen to a blood gas lab, or to report the menstrual phase information which should be included on an order for a pap smear to a cytology lab.  Appendix 7A includes codes for identifying many of pieces of information needed by
   * observation producing services to properly interpret a test result.  OBX is also found in other HL7 messages that need to include patient clinical information.
   */
  OBX: {
    setId?: string;
    /**
     * Common Values
     *
     * | Code | Description                                          |
     * | ---- | ---------------------------------------------------- |
     * | AD   | Address                                              |
     * | CE   | Coded Entry                                          |
     * | CF   | Coded Element With Formatted Values                  |
     * | CK   | Composite ID With Check Digit                        |
     * | CN   | Composite ID And Name                                |
     * | CP   | Composite Price                                      |
     * | CX   | Extended Composite ID With Check Digit               |
     * | DT   | Date                                                 |
     * | ED   | Encapsulated Data                                    |
     * | FT   | Formatted Text (Display)                             |
     * | ID   | Coded Value                                          |
     * | MO   | Money                                                |
     * | NM   | Numeric                                              |
     * | PN   | Person Name                                          |
     * | RP   | Reference Pointer                                    |
     * | SN   | Structured Numeric                                   |
     * | ST   | String Data.                                         |
     * | TM   | Time                                                 |
     * | TN   | Telephone Number                                     |
     * | TS   | Time Stamp (Date & Time)                             |
     * | TX   | Text Data (Display)                                  |
     * | XAD  | Extended Address                                     |
     * | XCN  | Extended Composite Name And Number For Persons       |
     * | XON  | Extended Composite Name And Number For Organizations |
     * | XPN  | Extended Person Name                                 |
     * | XTN  | Extended Telecommunications Number                   |
     *
     */
    valueType?: string;
    observationIdentifier: CodedWithExceptions;
    observationSubId?: string;
    observationValue?: string[];
    units?: CodedWithExceptions;
    referenceRange?: string;
    /**
     * Spec limits repeatability to 5 sub components
     *
     * Common Values
     *
     * | Code | Description                                                                               |
     * | ---- | ----------------------------------------------------------------------------------------- |
     * | <    | Below absolute low-off instrument scale                                                   |
     * | >    | Above absolute high-off instrument scale                                                  |
     * | A    | Abnormal (applies to non-numeric results)                                                 |
     * | AA   | Very abnormal (applies to non-numeric units, analogous to panic limits for numeric units) |
     * | B    | Better--use when direction not relevant                                                   |
     * | D    | Significant change down                                                                   |
     * | H    | Above high normal                                                                         |
     * | HH   | Above upper panic limits                                                                  |
     * | I    | Intermediate. Indicates for microbiology susceptibilities only.                           |
     * | L    | Below low normal                                                                          |
     * | LL   | Below lower panic limits                                                                  |
     * | MS   | Moderately susceptible. Indicates for microbiology susceptibilities only.                 |
     * | N    | Normal (applies to non-numeric results)                                                   |
     * | null | No range defined, or normal ranges don't apply                                            |
     * | R    | Resistant. Indicates for microbiology susceptibilities only.                              |
     * | S    | Susceptible. Indicates for microbiology susceptibilities only.                            |
     * | U    | Significant change up                                                                     |
     * | VS   | Very susceptible. Indicates for microbiology susceptibilities only.                       |
     * | W    | Worse--use when direction not relevant                                                    |
     */
    abnormalFlags?: string[];
    probability?: number;
    /**
     *
     * Common Values
     *
     * | Code | Description                 |
     * | ---- | --------------------------- |
     * | A    | An age-based population     |
     * | N    | None - generic normal range |
     * | R    | A race-based population     |
     * | S    | A sex-based population      |
     *
     */
    natureOfAbnormalTest?: string[];
    /**
     * Common Values
     *
     * | Code | Description                                                                                                                                           |
     * | ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
     * | C    | Record coming over is a correction and thus replaces a final result                                                                                   |
     * | D    | Deletes the OBX record                                                                                                                                |
     * | F    | Final results; Can only be changed with a corrected result.                                                                                           |
     * | I    | Specimen in lab; results pending                                                                                                                      |
     * | P    | Preliminary results                                                                                                                                   |
     * | R    | Results entered -- not verified                                                                                                                       |
     * | S    | Partial results                                                                                                                                       |
     * | U    | Results status change to final without retransmitting results already sent as ‘preliminary.’ E.g., radiology changes status from preliminary to final |
     * | W    | Post original as wrong, e.g., transmitted for wrong patient                                                                                           |
     * | X    | Results cannot be obtained for this observation                                                                                                       |
     *
     */
    observationResultStatus: string;
    dateLastObservationNormalValue?: string;
    userDefinedAccessChecks?: string;
    dateTimeOfTheObservation?: string;
    producersId?: string;
    responsibleObserver?: ExtendedCompositeIdNumberAndNameForPerson;
    observationMethod?: CodedWithExceptions[];
  };

  /** The ORC sequence items of interest to ODS are ORC-1-order control,ORC-2-placer order number, ORC-3filler order number, ORC-7-quantity/timing, ORC-9-date/time of transaction, ORC-10-entered by, and ORC-11-verified by.  For ORC-1-order control, the values may be New (NW), Cancel (CA), Discontinue Order Request (DC), Change (XO), Hold Order Request (HD), and Release Previous Hold (RL).  The HD and RL codes could stop service for a specified length of time.  ORC-4-quantity/timing should be used to specify whether an order is continuous or for one service period only.  It is also useful for supplements which are part of a diet but only delivered, say, every day at night.
   */
  ODS: {};

  /** This segment addresses tray instructions.  These are independent of diet codes, supplements, and preferences and therefore get separate order numbers
   */
  ODT: {};

  /** The OM1 segment contains the attributes that apply to the definition of most observations.  This segment also contains the field attributes that specify what additional segments might also be defined for this observation
   */
  OM1: {};

  /** This segment contains the attributes of observations with continuous values (including those with data types of numeric, date, or time stamp).  It can be applied to observation batteries of type A and C (see OM119-nature of test/observation).
   */
  OM2: {};

  /** This segment applies to free text and other non-numeric data t
   */
  OM3: {};

  /** This segment applies to observations/batteries that require a specimen for their performance.  When an observation or battery requires multiple specimens for their performance (e.g., creatinine clearance requires a 24-hour urine specimen and a serum specimen), multiple segments may be included, one for each specimen type.
   */
  OM4: {};

  /** This segment contains the information about batteries and supersets (a nature code of F, P or S, as described in OM1-18-nature of test/observation).
   */
  OM5: {};

  /** This segment contains the information about quantities that are derived from one or more other quantities or direct observations by mathematical or logical means
   */
  OM6: {};

  /** The Common Order segment (ORC) is used to transmit fields that are common to all orders (all types of services that are requested).  The ORC segment is required in the Order (ORM) message.  ORC is mandatory in Order Acknowledgment (ORR) messages if an order detail segment is present, but is not required otherwise.* 
  * 
  * 
  * 
  If details are needed for a particular type of order segment (e.g., Pharmacy, Dietary), the ORC must precede any order detail segment (e.g., RXO, ODS).  In some cases, the ORC may be as simple as the string ORC|OK|<placer order number>|<filler order number>|<cr>. * 
  * 
  * 
  * 
  If details are not needed for the order, the order detail segment may be omitted.  For example, to place an order on hold, one would transmit an ORC with the following fields completed: ORC-1-order control with a value of HD, ORC-2-placer order number, and ORC-3-filler order number,
   */
  ORC: {};

  /**
   * The PCR segment is used to communicate a potential or suspected relationship between a product (drug or device) or test and an event with detrimental effect on a patient.
   * This segment identifies a potential causal relationship between the product identified in this segment and the event identified in the PEO segment.
   *
   * More than one PCR segment can be included in the message if more than one product is possibly causally related to the event.
   */
  PCR: {};

  /** The patient additional demographic segment contains demographic information
   *  that is likely to change about the patient.
   */
  PD1: {
    /**
     * Common codes
     *
     * | Code | Description                  |
     * | ---- | ---------------------------- |
     * | CB   | Common Bath                  |
     * | D    | Spouse Dependent             |
     * | M    | Medical Supervision Required |
     * | WU   | Walk up                      |
     */
    livingDependency?: string;
    /**
     * Common codes
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | A    | Alone       |
     * | F    | Family      |
     * | I    | Institution |
     * | R    | Relative    |
     * | S    | Spouse Only |
     * | U    | Unknown     |
     */
    livingArrangement?: string;
    patientPrimaryFacility?: ExtendedCompositeNameAndIdForOrganizations[];
    patientPrimaryCareProviderNameAndIdNumber?: ExtendedCompositeIdNumberAndNameForPerson[];
    /**
     * Common codes
     *
     * | Code | Description       |
     * | ---- | ----------------- |
     * | F    | Full-time student |
     * | N    | Not a student     |
     * | P    | Part-time student |
     */
    studentStatus?: string;
    handicap?: string;
    /**
     * Common Values
     *
     * | Code | Description                                                             |
     * | ---- | ----------------------------------------------------------------------- |
     * | F    | Yes, patient has a living will but it is not on file                    |
     * | I    | No, patient does not have a living will but information was provided    |
     * | N    | No, patient does not have a living will and no information was provided |
     * | U    | Unknown                                                                 |
     * | Y    | Yes, patient has a living will                                          |
     */
    livingWill?: string;
    /**
     * Common Values
     *
     * | Code | Description                                                          |
     * | ---- | -------------------------------------------------------------------- |
     * | F    | Yes, patient is a donor, but card is not on file                     |
     * | I    | No, patient does not have a living will but information was provided |
     * | U    | Unknown                                                              |
     * | Y    | Yes, patient is a donor and card is on file                          |
     */
    organDonor?: string;
    /**
     * Common Values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    separateBill?: string;
    duplicatePatient?: ExtendedCompositeIdWithCheckDigit[];
    publicityIndicator?: CodedWithExceptions;
    /**
     * Common Values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    protectionIndicator?: string;
    protectionIndicatorEffectiveDate?: string;
    placeOfWorship?: ExtendedCompositeNameAndIdForOrganizations[];
    advanceDirectiveCode?: CodedWithExceptions[];
    immunizationRegistryStatus?: CodedWithExceptions;
    immunizationRegistryStatusEffectiveDate?: string;
    publicityCodeEffectiveDate?: string;
    militaryBranch?: CodedWithExceptions;
    militaryRankGrade?: CodedWithExceptions;
    militaryStatus?: CodedWithExceptions;
    advanceDirectiveLastVerifiedDate?: string;
  };
  /**
   * This segment carries information on a patient's death and possible autopsy.
   */
  PDA: {};
  /**
   */
  PDC: {};

  /**
   *  Details related to a particular clinical experience or event are embodied in the PEO segment.  This segment can be used to characterize an event which might be attributed to a product to which the patient was exposed.
   *
   * Products with a possible causal relationship to the observed experience are described in the following PCR (possible causal relationship) segments.  The message format was designed to be robust and includes many optional elements which may not be required
   * for a particular regulatory purpose but allow a complete representation of the drug experience if needed.*
   *
   *
   *
   * A PEX message can contain multiple PEO segments if the patient experienced more than one event but must contain at least one PEO segment.
   */
  PEO: {};

  /**
   */
  PES: {};

  /**
   * The PID segment is used by all applications as the primary means of communicating patient identification information.
   * This segment contains permanent patient identifying and demographic information that, for the most part, is not likely to change frequently.
   *
   * **Usage notes:** PID patient identification
   *
   * The assigning facility ID, the fourth component of the patient identifiers, is a string of up to
   * six characters that is uniquely associated with the facility that originally assigned the number.
   * A given institution, or group of intercommunicating institutions, should establish a list of facilities
   * that may be potential assignors of patient identification (and other important identification) numbers.
   * The list will be one of the institution’s master dictionary lists.
   * Since third parties (other than the assignors of patient identification numbers)
   * may send or receive HL7 messages containing patient identification numbers,
   * the assigning facility ID in the patient identification
   * numbers may not be the same as the sending and receiving systems identified in the MSH.
   * The assigning facility ID must be unique across applications at a given site.  This field is required in HL7
   * implementations that have more than a single Patient Administration application assigning such numbers.
   */
  PID: {
    /**
     * PID-1
     */
    setId?: number;
    /**
     * PID-2
     */
    externalPatientId?: ExtendedCompositeIdWithCheckDigit;
    /**
     * PID-3
     */
    internalPatientId: ExtendedCompositeIdWithCheckDigit[];
    /**
     * PID-4
     */
    alternatePatientId?: ExtendedCompositeIdWithCheckDigit[];
    /**
     * PID-5
     */
    patientName: ExtendedPersonName[];
    /**
     * PID-6
     */
    mothersMaidenName?: ExtendedPersonName;
    /**
     * PID-7
     */
    dateOfBirth?: string;
    /**
     * PID-8
     *
     * Common code values:
     * | Code |Value    |
     * | ---- | ------- |
     * | F    | Female  |
     * | M    | Male    |
     * | O    | Other   |
     * | U    | Unknown |
     */
    sex?: string;
    /**
     * PID-9
     */
    patientAlias?: ExtendedPersonName[];
    /**
     * PID-10
     */
    patientRace?: string;
    /**
     * PID-11
     */
    patientAddress?: ExtendedAddress[];
    /**
     * PID-12
     */
    countyCode?: string;
    /**
     * PID-13
     */
    homePhoneNumber?: ExtendedTelecommunicationNumber[];
    /**
     * PID-14
     */
    businessPhoneNumber?: ExtendedTelecommunicationNumber[];
    /**
     * PID-15
     */
    primaryLanguage?: CodedWithExceptions;
    /**
     * PID-16
     *
     * Common code values:
     * | Code | Value    |
     * | ---- | -------- |
     * | A    | Annulled |
     * | D    | Divorced |
     * | M    | Married  |
     * | S    | Single   |
     * | W    | Widowed  |
     */
    maritalStatus?: string;
    /**
     * PID-17
     */
    religion?: string;
    /**
     * PID-18
     */
    patientAccountNumber?: ExtendedCompositeIdWithCheckDigit;
    /**
     * PID-19
     */
    patientSocialSecurityNumber?: string;
    /**
     * PID-20
     */
    driversLicenseNumber?: DriversLicenseNumber;
    /**
     * PID-21
     */
    mothersIdentifier?: CodedWithExceptions[];
    /**
     * PID-22
     */
    ethnicGroup?: string;
    /**
     * PID-23
     */
    birthPlace?: string;
    /**
     * PID-24
     *
     * Common values
     *
     * | Code | Values |
     * | ---- | ------ |
     * | Y    | Yes    |
     * | N    | No     |
     */
    multipleBirthIndicator?: string;
    /**
     * PID-25
     */
    birthOrder?: number;
    /**
     * PID-26
     */
    citizenship?: string[];
    /**
     * PID-27
     */
    veteransMilitaryStatus?: CodedWithExceptions;
    /**
     * PID-28
     */
    nationality?: CodedWithExceptions;
    /**
     * PID-29
     */
    patientDeathDateAndTime?: string;
    /**
     * PID-30
     *
     * Common values
     *
     * | Code | Values |
     * | ---- | ------ |
     * | Y    | Yes    |
     * | N    | No     |
     */
    patientDeathIndicator?: string;
    /**
     * PID-31
     *
     * Common values
     *
     * | Code | Values |
     * | ---- | ------ |
     * | Y    | Yes    |
     * | N    | No     |
     */
    identityUnknownIndicator?: string;
    /**
     * PID-32
     *
     * Common Values
     * | Code | Description                            |
     * | ---- | -------------------------------------- |
     * | AL   |	Patient/Person Name is an Alias        |
     * | UA   |	Unknown/Default Address	               |
     * | UD	  | Unknown/Default Date of Birth	         |
     * | US   |	Unknown/Default Social Security Number |
     */
    identityReliabilityCode?: CodedWithExceptions[];
    /**
     * PID-33
     */
    lastUpdateDateTime?: string;
    /**
     * PID-34
     */
    lastUpdateFacility?: HierarchicDesignator;
    /**
     * PID-35
     */
    taxonomicClassificationCode?: CodedWithExceptions;
    /**
     * PID-36
     */
    breedCode?: CodedWithExceptions;
    /**
     * PID-37
     */
    strain?: string;
    /**
     * PID-38
     *  Spec specifies 2 repetitions
     */
    productionClassCode?: CodedWithExceptions[];
    /**
     * PID-39
     */
    tribalCitizenship?: CodedWithExceptions[];
    /**
     * PID-40
     */
    patientTelecommunicationInformation?: ExtendedTelecommunicationNumber[];
  };

  /**
   * The PR1 segment contains information relative to various types of procedures that can be performed on a patient.  The PR1 segment can be used to send procedure information, for example: Surgical, Nuclear Medicine, X-ray with contrast, etc.
   *
   * The PR1 segment is used to send multiple procedures, for example, for medical records encoding or for billing systems.
   */
  PR1: {};

  /**
   * The PRA segment adds detailed medical practitioner information to the personnel identified by the STF segment.  A PRA segment may optionally follow an STF segment.  A PRA segment must always have been preceded by a corresponding STF segment.
   * The PRA segment may also be used for staff who work in healthcare who are not practitioners, but need to be certified, e.g., “medical records staff.”
   */
  PRA: {};

  /** The problem detail segment contains the data necessary to add, update, correct, and delete the problems of a given individual.* 
  * 
  * 
  * 
  The business and/or application must assume the responsibility for maintaining knowledge about data ownership, versioning, and/or audit trail control (for purposes of data integrity).  It is also their responsibility to represent the appropriate version of that data.
   */
  PRB: {};

  /**
   * The PRC segment contains the  pricing information for the preceding CDM segment’s chargeable item.  It contains the fields which, for the same chargeable item, might vary depending upon facility or department or patient type.
   * The preceding CDM segment contains the fields which, for one chargeable item, remain the same across facilities, departments, and patient types
   */
  PRC: {};

  /**
   * This segment will be employed as part of a patient referral message and its related transactions.  The PRD segment contains data specifically focused on a referral, and it is inter-enterprise in nature.
   * The justification for this new segment comes from the fact that we are dealing with referrals that are external to the facilities that received them.  Therefore, using a segment such as the current PV1 would be inadequate
   * for all the return information that may be required by the receiving facility or application.  In addition, the PV1 does not always provide information sufficient to enable the external facility to make a complete identification of the referring entity.
   * The information contained in the PRD segment will include the referring provider, the referred-to provider, the referred-to location or service, and the referring provider clinic address.
   */
  PRD: {};

  /**
   */
  PSH: {};

  /** The pathway segment contains the data necessary to add, update, correct, and delete from the record pathways that are utilized to address an individual’s health care
   */
  PTH: {};

  /** The PV1 segment is used by Registration/Patient Administration applications to communicate information on
   * a visit-specific basis.  This segment can be used to send multiple-visit statistic records to the same patient
   * account or single-visit records to more than one account.  Individual sites must determine the use for this segment.
   *
   *
   * PV1 usage notes:
   *
   * The facility (servicing) ID, the optional fourth component of each patient location field, is a string
   * of up to six characters that is uniquely associated with the facility containing the location.  A given institution,
   * or group of intercommunicating institutions, should establish a list of facilities that may be
   * potential assignors of patient locations. The list will be one of the institution’s master
   * dictionary lists.  Since third parties other than the assignors of patient locations may send or receive HL7
   * messages containing patient locations, the facility ID in the patient location may not be the same as that implied
   * by the sending and receiving systems identified in the MSH.  The facility ID must be unique across facilities at a
   * given site.  This field is required for HL7 implementations that have more than a single facility with bed locations,
   * since the same `<nurse unit>^<room>^<bed>` combination may exist at more than one facility.
   */
  PV1: {
    setId?: number;
    /**
     * Common code values
     *
     * | Code | Value             |
     * | ---- | ----------------- |
     * | B    | Obstetrics        |
     * | E    | Emergency         |
     * | I    | Inpatient         |
     * | O    | Outpatient        |
     * | P    | Preadmit          |
     * | R    | Recurring patient |
     */
    patientClass: string;
    assignedPatientLocation?: PersonLocation;
    /**
     * Common code values
     *
     * | Code | Value              |
     * | ---- | ------------------ |
     * | A    | Accident           |
     * | E    | Emergency          |
     * | L    | Labor and Delivery |
     * | R    | Routine            |
     */
    admissionType?: string;
    preadmitNumber?: CodedWithExceptions;
    priorPatientLocation?: PersonLocation;
    attendingDoctor?: ExtendedCompositeIdNumberAndNameForPerson[];
    referringDoctor?: ExtendedCompositeIdNumberAndNameForPerson[];
    consultingDoctor?: ExtendedCompositeIdNumberAndNameForPerson[];
    hospitalService?: string;
    temporaryLocation?: PersonLocation;
    preadmitTestIndicator?: string;
    /**
     * Common Code Values
     *
     * | Code | Value       |
     * | ---- | ----------- |
     * | R    | Readmission |
     */
    readmissionIndicator?: string;
    admitSource?: string;
    /**
     * Common Code Values:
     *
     * | Code | Value                                     |
     * | ---- | ----------------------------------------- |
     * | A0   | No functional limitations                 |
     * | A1   | Ambulates with assistive device           |
     * | A2   | Wheelchair/stretcher bound                |
     * | A3   | Comatose; non-responsive                  |
     * | A4   | Disoriented                               |
     * | A5   | Vision impaired                           |
     * | A6   | Hearing impaired                          |
     * | A7   | Speech impaired                           |
     * | A8   | Non-English speaking                      |
     * | A9   | Functional level unknown                  |
     * | B1   | Oxygen therapy                            |
     * | B2   | Special equipment (tubes, IVs, catheters) |
     * | B3   | Amputee                                   |
     * | B4   | Mastectomy                                |
     * | B5   | Paraplegic                                |
     * | B6   | Pregnant                                  |
     *
     */
    ambulatoryStatus?: string[];
    vipIndicator?: string;
    admittingDoctor?: ExtendedCompositeIdNumberAndNameForPerson[];
    patientType?: string;
    visitNumber?: ExtendedCompositeIdWithCheckDigit;
    financial?: FinancialClass[];
    chargePriceIndicator?: string;
    courtesyCode?: string;
    creditRating?: string;
    contractCode?: string[];
    contractEffectiveDate?: string[];
    contractAmount?: number[];
    contractPeriod?: number[];
    interestCode?: string;
    transferToBadDebtCode?: string;
    transferToBadDebtDate?: string;
    badDebtAgencyCode?: string;
    badDebtTransferAmount?: number;
    badDebRecoveryAmount?: number;
    deleteAccountIndicator?: string;
    deleteAccountDate?: string;
    dischargeDisposition?: string;
    dischargedTo?: DischargeLocation;
    dietType?: string;
    servicingFacility?: string;
    /**
     * Common Code Values:
     *
     * | Code | Value        |
     * | ---- | ------------ |
     * | C    | Closed       |
     * | H    | Housekeeping |
     * | I    | Isolated     |
     * | K    | Contaminated |
     * | O    | Occupied     |
     * | U    | Unoccupied   |
     *
     */
    bedStatus?: string;
    accountStatus?: string;
    pendingLocation?: PersonLocation;
    priorTemporaryLocation?: PersonLocation;
    admitDateTime?: string;
    dischargeDateTime?: string;
    currentPatientBalance?: number;
    totalCharges?: number;
    totalAdjustments?: number;
    totalPayments?: number;
    alternateVisitId?: ExtendedCompositeIdWithCheckDigit;
    visitIndicator?: string;
    otherHealthcareProvider?: ExtendedCompositeIdNumberAndNameForPerson[];
    serviceEpisodeDescription?: string;
    serviceEpisodeIdentifier?: ExtendedCompositeIdWithCheckDigit;
  };

  /** The PV2 segment is a continuation of visit-specific information contained on the PV1 segment
   */
  PV2: {
    priorPendingLocation?: PersonLocation;
    accommodationCode?: CodedWithExceptions;
    admitReason?: CodedWithExceptions;
    transferReason?: CodedWithExceptions;
    patientValuables?: string[];
    patientValuablesLocation?: string;
    visitUserCode?: string;
    expectedAdmitDate?: string;
    expectedDischargeDate?: string;
    estimatedLengthOfInpatientStay?: number;
    actualLengthOfInpatientStay?: number;
    visitDescription?: string;
    referralSourceCode?: ExtendedCompositeIdNumberAndNameForPerson;
    previousServiceDate?: string;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    employmentIllnessRelatedIndicator?: string;
    /**
     * Common values
     *
     * | Code | Description                                                                     |
     * | ---- | ------------------------------------------------------------------------------- |
     * | D    | The visit is marked for deletion and the user cannot enter new data against it. |
     * | I    | The visit is marked inactive and the user cannot enter new data against it.     |
     * | P    | Marked for purge. User is no longer able to update the visit.                   |
     */
    purgeStatusCode?: string;
    purgeStatusDate?: string;
    specialProgramCode?: string;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    retentionIndicator?: string;
    expectedNumberOfInsurancePlans?: number;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    visitPublicityCode?: string;
    visitProtectionIndicator?: string;
    clinicOrganizationName?: ExtendedCompositeNameAndIdForOrganizations[];
    patientStatusCode?: string;
    visitPriorityCode?: string;
    previousTreatmentDate?: string;
    expectedDischargeDisposition?: string;
    signatureOnFileDate?: string;
    firstSimilarIllnessDate?: string;
    patientChargeAdjustmentCode?: string;
    recurringServiceCode?: string;
    billingMediaCode?: string;
    expectedSurgeryDateTime?: string;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    militaryPartnershipCode?: string;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    militaryNonAvailabilityCode?: string;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    newbornBabyIndicator?: string;
    /**
     * Common values
     *
     * | Code | Description |
     * | ---- | ----------- |
     * | Y    | Yes         |
     * | N    | No          |
     */
    babyDetainedIndicator?: string;
  };

  /** The QAK segment contains information sent with responses to a query.
   */
  QAK: {};

  /** The QRD segment is used to define a query
   */
  QRD: {};

  /** The QRF segment is used with the QRD segment to further refine the content of an original style query
   */
  QRF: {};

  /**
   * The RDF segment defines the content of the row data segments (RDT) in the Tabular Data Response Message (TBR).  It is used in two ways:*
   *
   *
   * - As an optional segment in the SPQ message (Stored Procedure Request) or the VQQ (Virtual Table Query) message, this segment can be used to limit the number of columns returned and to specify what column positions the fields occupy (where supported,
   * these features can be used to override the defaults for the particular query).  If omitted, all fields defined for the query are returned in their default column order. *
   *
   *  - As a required segment on the tabular data response message (TBR), this segment defines the contents of the table row data (RDT) segments that follow.
   */
  RDF: {};

  /** The RDT segment contains the row data of the tabular data response message (TBR
   */
  RDT: {};

  /** This segment represents information that may be useful when sending referrals from the referring provider to the referred-to provider.
   */
  RF1: {};

  /**
   * The RGS segment is used to identify relationships between resources identified for a scheduled event.  This segment can be used, on a site specified basis, to identify groups of resources that are used together within a scheduled event,
   * or to describe some other relationship between resources.  To specify related groups of resources within a message, begin each group with an RGS segment, and then follow that RGS with one or more of the Appointment Information segments (AIG, AIL, AIS, or AIP). *
   *
   * If a message does not require any grouping of resources, then specify a single RGS in the message, and follow it with all of the Appointment Information segments for the scheduled event.   (At least one RGS segment is required in each message — even if no grouping of
   * resources is required — to allow parsers to properly understand the message.)
   */
  RGS: {};

  /**
   * The role segment contains the data necessary to add, update, correct, and delete from the record persons involved, as well as their functional involvement with the activity being transmitted.
   * In general, the ROL segment is used to describe a person playing a particular role within the context of the message. In PM, for example, in the Grant Certificate/Permission message (B07), the ROL segment is used to describe the roles a person may perform pertinent to the certificate in the message.
   *
   * The positional location of the ROL segment in ADT and Finance messages indicates the relationship.
   *
   * When the segment is used following the `IN3` segment, and the role-ROL value is PP or FHCP, the PP or FHCP is related to the health plan.
   *
   * When the segment is used following the `PID` segment, and the role-ROL value is PP or FHCP, the PP or FHCP is related to the person.
   *
   * When the segment is used following the `PV2` segment, and the role-ROL value is PCP or FHCP, the PP or FHCP is related to the patient visit.
   *
   */
  ROL: {};

  /** RQ1 contains additional detail for each nonstock requisitioned item.  This segment definition is paired with a preceding RQD segment.
   */
  RQ1: {};

  /** RQD contains the detail for each requisitioned item.
   */
  RQD: {};

  /** The ORC must have the filler order number and the order control code RE.  As a site-specific variant, the RXO and associated RXCs and/or the RXE (and associated RXCs) may be present if the receiving application needs any of their data.  The RXA carries the administration data.
   */
  RXA: {};

  /**
   * If the drug or treatment ordered with the RXO segment is a compound drug OR an IV solution, AND there is not a coded value for the Universal Service ID which specifies the components (base and all additives),
   * then the components (the base and additives) are specified by two or more RXC segments.  The policy of the pharmacy or treatment application on substitutions at the RXC level is identical to that for the RXO level.
   */
  RXC: {};

  /**
   */
  RXD: {};

  /**
   *  The RXE segment details the pharmacy or treatment  application’s encoding of the order.  It also contains several pharmacy-specific order status fields, such as RXE-16-number of refills remaining,
   * RXE-17-number of refills/doses dispensed, RXE-18-date/time of most recent refill/dose, and RXE-19-total daily dose.*
   *
   *
   *
   * Note that ORC-7-quantity/timing has a different meaning from RXE-1-quantity/timing and RXG-3quantity/timing.  The pharmacy or treatment department has the “authority” (and/or necessity) to schedule dispense/give events.
   * Hence, the pharmacy or treatment department has the responsibility to encode this scheduling information in RXE-1-quantity/timing and RXG-3-quantity/timing.  ORC-7-quantity/timing does not change: it always specifies the requested give/dispense schedule of the original order
   */
  RXE: {};

  /**
   */
  RXG: {};

  /** This is the “master” pharmacy/treatment order segment.  It contains order data not specific to components or additives.  Unlike the OBR, it does not contain status fields or other data that are results-only.* 
  * 
  * 
  * 
  It can be used for any type of pharmacy order, including inpatient (unit dose and compound unit dose), outpatient, IVs, and hyperalimentation IVs (nutritional IVs), as well as other nonpharmacy treatments, e.g., respiratory therapy, oxygen, and metabolites.  * 
  * 
  * 
  * 
  In addition to the pharmaceutical information, this segment contains additional data such as provider and text comments. * 
  * 
  * 
  * 
  A quantity/timing field is not needed in the RXO segment.  The ORC segment contains the requested ORC7-quantity/timing of the original order which does not change as the order is encoded, dispensed, or administered.
   */
  RXO: {};

  /**
   * The Pharmacy/Treatment Route segment contains the alternative combination of route, site, administration device, and administration method that are prescribed.  The pharmacy, treatment staff and/or nursing staff has a choice between the routes based on either their professional
   * judgment or administration instructions provided by the physician.
   */
  RXR: {};

  /** The SCH segment contains general information about the scheduled appointment
   */
  SCH: {};
  /**
   * This segment provides additional information about the software product(s) used as a Sending Application. The primary purpose of this segment is for diagnostic use. There may be additional uses per site-specific agreements.
   *
   * Implementers are encouraged to use message profile identifiers (as found in 2.14.9.21, "MSH-21 Message Profile Identifier (EI) 01598") to control the behavior of the receiving application rather than relying on application or version information in the SFT segment.
   *
   * For example, if software product A has versions 9 and 10 deployed in different Enterprise locations, the fact that they use different message types, segments, or fields should be reflected via their message profiles (see section 2B, "Conformance Using Message Profiles").
   * If there is an upgrade from version 10 to 10.1, this would be reflected in the SFT segment, but changes to the message contents should be reflected via a new/different conformance profile.
   *
   * Use Case: An external application has been customized to communicate with a centralized patient drug history system. However, due to certain, known characteristics of the external software package, the centralized system must modify its behavior in order to process transactions correctly.
   * In one example, the external application may have multiple versions in production. As such, the centralized application will need to know the name of the Software Vendor Organization, the Software Release Number, the Software Product Name, and the Software Binary ID so that it can correctly
   * identify the software submitting the transaction and modify its behavior appropriately.
   *
   * While preparing a transaction for submission to a centralized system the sending application specifies its Software Install Date and its configuration settings (Software Product Information).
   * While processing the transaction, the centralized system encounters an error. Upon examination of the error, install date and configuration of the software that sent the message, helpdesk staff are able to determine the sending application has not been updated to reflect recent application changes.
   *
   * Use Case: In circumstances where a message is manipulated or modified by multiple systems, a repetition of this segment may be appended by each system.
   */
  SFT: {
    /**
     * Organization identification information for the software vendor that created this transaction. The purpose of this field, along with the remaining fields in this segment,
     * is to provide a more complete picture of applications that are sending HL7 messages. The Software Vendor Organization field would allow the identification of the vendor who is responsible for maintaining the application.
     */
    vendorOrganization: ExtendedCompositeNameAndIdForOrganizations;
    /**
     * Latest software version number of the sending system that has been compliance tested and accepted. Software Certified Version or Release Number helps to provide a complete picture of the application that is sending/receiving HL7 messages.
     * Versions are important in identifying a specific 'release' of an application. In some situations, the receiving application validates the Software Certified Version or Release Number against a list of "certified" versions/releases of the particular software to determine
     * if the sending application adheres to specific business rules required by the receiving application.
     *
     * Alternatively, the software may perform different processing depending on the version of the sending software
     */
    certifiedVersionOrReleaseNumber: string;
    /**
     * The name of the software product that submitted the transaction. A key component in the identification of an application is its Software Product Name. This is a key piece of information in identifying an application.
     */
    productName: string;
    /**
     * Issued by a vendor for each unique software version instance to distinguish between like versions of the same software e.g., a checksum.
     *
     * Software Binary Ids are issued for each unique software version instance. As such, this information helps to differentiate between differing versions of the same software. Identical Primary IDs indicate that the software is identical at the binary level (configuration settings may differ).
     */
    binaryId: string;
    /**
     * Software identification information that can be supplied by a software vendor with their transaction. Might include configuration settings, etc.
     *
     * This field would contain any additional information an application provides with the transaction it has submitted. This information could be used for diagnostic purposes and provides greater flexibility in identifying a piece of software. Possibilities include setup or configuration parameter information.
     *
     * This field should not be sent unless performing diagnostics.
     */
    productInformation?: string;
    /**
     * Date the submitting software was installed at the sending site.
     *
     * A Software Install Date on its own can often provide key information about the behavior of the application, and is necessary to provide a complete picture of the sending application.
     */
    installDate?: string;
  };

  /** The SPR segment is used to issue queries using stored procedure calls.  Refer to the functional chapters for the lists of HL7-defined stored procedure names, input parameters and output tables
   */
  SPR: {};

  /** The STF segment can identify any personnel referenced by information systems.  These can be providers, staff, system users, and referring agents.  In a network environment, this segment can be used to define personnel to other applications; for example, order entry clerks, insurance verification clerks, admission clerks, as well as provider demographics. MFE-4-primary key value is used to link all the segments pertaining to the same master file entry.  Therefore, in the MFE segment, MFE-4-primary key value must be filled in.  Other segments may follow the STF segment to provide data for a particular type of staff member. The PRA segment (practitioner) is one such.  It may optionally follow the STF segment in order to add practitioner-specific data. Other segments may be defined as needed.
   */
  STF: {};

  /** The TXA segment contains information specific to a transcribed document but does not include the text of the document.  The message is created as a result of a document status change.  This information is used to update other healthcare systems to identify reports that are available in the transcription system.  By maintaining the TXA message information in these systems, the information is available when constructing queries to the transcription system requesting the full document text.
   */
  TXA: {};

  /**
   * This optional segment provides user authentication credentials, a Kerberos Service Ticket or SAML assertion, to be used by the receiving system to obtain user identification data. Refer to HL7 Table 0615 - User Authentication Credential Type Code. It is to be used in when the receiving application system requires the sending system to provide end-user identification for accountability or access control in interactive applications. Since user authentication implementations often limit the time period for validity of the session authentication credentials, this segment is not intended for use in non-interactive applications.
   *
   * It is possible that various user authentication credential standards' data may be communicated. Kerberos and SAML are two such standards. A user authentication credential is an encapsulated data (ED type) element, as defined by standards, with no HL7-relevant structure.
   *
   * Note: The UAC segment is defined for use within simple protocols, such as MLLP, that do not have user authentication semantics. Implementations that use WSDL/SOAP, or similar protocols, to envelope HL7 should employ the user authentication semantics and data structures available within the scope of those protocols rather than the UAC segment.
   *
   * If the receiving system accepts the user credentials in the UAC segment, no specific acknowledgement is required. However, if the receiving system detects an error while processing the UAC segment, its acknowledgment message shall report it to the sender via an MSA and ERR segment pair:
   * - The ERR-3 (error code) field value is 207 to signify an application error
   * - The ERR-7 (diagnostic information) field reports the specific error. Examples of possible errors are:
   * - User credentials expected but not provided
   * - User credentials invalid
   * - User credentials expired
   * - User credentials from an unknown or untrusted source
   * - User unknown
   * - User not allowed to create or access data on the receiving system.
   * - User not allowed to initiate a processing function on the receiving system.
   *
   * When an MSA and ERR segment pair is reported to the sender, an application data response shall not occur. In such cases it is correct to assume that the sending application's user is not authorized to get the data.
   *
   * The processing rules for the ERR segment are outside of HL7's scope.
   */
  UAC: {
    credentialTypeCode: CodedWithExceptions;
    credential: CodedWithExceptions;
  };

  /** The UB1 segment contains the data necessary to complete UB82 bills.  Only UB82 fields that do not exist in other HL7 defined segments appear in this segment.  Patient Name and Date of Birth are required for UB82 billing; however, they are included in the PID segment and therefore do not appear here.
   */
  UB1: {};

  /** The UB2 segment contains data necessary to complete UB92 bills.  Only UB92 fields that do not exist in other HL7 defined segments appear in this segment.  Just as with the UB82 billing, Patient Name and Date of Birth are required; they are included in the PID segment and therefore do not appear here.  When the field locators are different on the UB92, as compared to the UB82, the element is listed with its new location in parentheses  (  ).
   */
  UB2: {};

  /** The URD segment is used in sending unsolicited updates about orders and results.  It’s purpose is similar to that of the QRD segment, but from the results/unsolicited update point of view.  Some of the fields have parallels in the QRD segment
   */
  URD: {};

  /** The URS segment is identical with the QRF segment, except that if the name of any field contains Query (of QRY), this word has been changed to Results (see URS-5-R/U other results subject definition).
   */
  URS: {};

  /** The variance segment contains the data necessary to describes differences that may have occurred at the time when a healthcare event was documented.
   */
  VAR: {};

  /** The VTQ segment is used to define queries that are responded to with the Tabular Data Message (TBR).  The VTQ query message is an alternate method to the EQQ query message that some systems may find easier to implement, due to its use of HL7 delimiters that separate components of the selection definition, and its limited selection criteria.  Queries involving complex selection criteria (nested operators, etc.) may need to be formatted as an EQL segment. * 
  * 
  * 
  * 
  As with the other query methods, the functional chapters define specific queries supported as VTQ messages.  Refer to these functional chapters for the lists of HL7-defined virtual tables, selection lists and criteria
   */
  VTQ: {};
};

export type SegmentHeaders = keyof MessageSegments;
export type ABS = MessageSegments["ABS"];
export type ACC = MessageSegments["ACC"];
export type ADD = MessageSegments["ADD"];
export type AIG = MessageSegments["AIG"];
export type AIL = MessageSegments["AIL"];
export type AIP = MessageSegments["AIP"];
export type AIS = MessageSegments["AIS"];
export type AL1 = MessageSegments["AL1"];
export type APR = MessageSegments["APR"];
export type ARQ = MessageSegments["ARQ"];
export type ARV = MessageSegments["ARV"];
export type AUT = MessageSegments["AUT"];
export type BHS = MessageSegments["BHS"];
export type BLG = MessageSegments["BLG"];
export type BTS = MessageSegments["BTS"];
export type CDM = MessageSegments["CDM"];
export type CM0 = MessageSegments["CM0"];
export type CM1 = MessageSegments["CM1"];
export type CM2 = MessageSegments["CM2"];
export type CSP = MessageSegments["CSP"];
export type CSR = MessageSegments["CSR"];
export type CSS = MessageSegments["CSS"];
export type CTD = MessageSegments["CTD"];
export type CTI = MessageSegments["CTI"];
export type DB1 = MessageSegments["DB1"];
export type DG1 = MessageSegments["DG1"];
export type DRG = MessageSegments["DRG"];
export type DSC = MessageSegments["DSC"];
export type DSP = MessageSegments["DSP"];
export type EQL = MessageSegments["EQL"];
export type ERQ = MessageSegments["ERQ"];
export type ERR = MessageSegments["ERR"];
export type EVN = MessageSegments["EVN"];
export type FAC = MessageSegments["FAC"];
export type FHS = MessageSegments["FHS"];
export type FT1 = MessageSegments["FT1"];
export type FTS = MessageSegments["FTS"];
export type GOL = MessageSegments["GOL"];
export type GT1 = MessageSegments["GT1"];
export type IN1 = MessageSegments["IN1"];
export type IN2 = MessageSegments["IN2"];
export type IN3 = MessageSegments["IN3"];
export type LCC = MessageSegments["LCC"];
export type LCH = MessageSegments["LCH"];
export type LDP = MessageSegments["LDP"];
export type LOC = MessageSegments["LOC"];
export type LRL = MessageSegments["LRL"];
export type MFA = MessageSegments["MFA"];
export type MFE = MessageSegments["MFE"];
export type MFI = MessageSegments["MFI"];
export type MRG = MessageSegments["MRG"];
export type MSA = MessageSegments["MSA"];
export type MSH = MessageSegments["MSH"];
export type NCK = MessageSegments["NCK"];
export type NK1 = MessageSegments["NK1"];
export type NPU = MessageSegments["NPU"];
export type NSC = MessageSegments["NSC"];
export type NST = MessageSegments["NST"];
export type NTE = MessageSegments["NTE"];
export type OBR = MessageSegments["OBR"];
export type OBX = MessageSegments["OBX"];
export type ODS = MessageSegments["ODS"];
export type ODT = MessageSegments["ODT"];
export type OM1 = MessageSegments["OM1"];
export type OM2 = MessageSegments["OM2"];
export type OM3 = MessageSegments["OM3"];
export type OM4 = MessageSegments["OM4"];
export type OM5 = MessageSegments["OM5"];
export type OM6 = MessageSegments["OM6"];
export type ORC = MessageSegments["ORC"];
export type PCR = MessageSegments["PCR"];
export type PD1 = MessageSegments["PD1"];
export type PDA = MessageSegments["PDA"];
export type PDC = MessageSegments["PDC"];
export type PEO = MessageSegments["PEO"];
export type PES = MessageSegments["PES"];
export type PID = MessageSegments["PID"];
export type PR1 = MessageSegments["PR1"];
export type PRA = MessageSegments["PRA"];
export type PRB = MessageSegments["PRB"];
export type PRC = MessageSegments["PRC"];
export type PRD = MessageSegments["PRD"];
export type PSH = MessageSegments["PSH"];
export type PTH = MessageSegments["PTH"];
export type PV1 = MessageSegments["PV1"];
export type PV2 = MessageSegments["PV2"];
export type QAK = MessageSegments["QAK"];
export type QRD = MessageSegments["QRD"];
export type QRF = MessageSegments["QRF"];
export type RDF = MessageSegments["RDF"];
export type RDT = MessageSegments["RDT"];
export type RF1 = MessageSegments["RF1"];
export type RGS = MessageSegments["RGS"];
export type ROL = MessageSegments["ROL"];
export type RQ1 = MessageSegments["RQ1"];
export type RQD = MessageSegments["RQD"];
export type RXA = MessageSegments["RXA"];
export type RXC = MessageSegments["RXC"];
export type RXD = MessageSegments["RXD"];
export type RXE = MessageSegments["RXE"];
export type RXG = MessageSegments["RXG"];
export type RXO = MessageSegments["RXO"];
export type RXR = MessageSegments["RXR"];
export type SCH = MessageSegments["SCH"];
export type SFT = MessageSegments["SFT"];
export type SPR = MessageSegments["SPR"];
export type STF = MessageSegments["STF"];
export type TXA = MessageSegments["TXA"];
export type UAC = MessageSegments["UAC"];
export type UB1 = MessageSegments["UB1"];
export type UB2 = MessageSegments["UB2"];
export type URD = MessageSegments["URD"];
export type URS = MessageSegments["URS"];
export type VAR = MessageSegments["VAR"];
export type VTQ = MessageSegments["VTQ"];
