import {
  CodedElement,
  DriversLicenseNumber,
  ExtendedAddress,
  ExtendedCompositeIdNumberAndName,
  ExtendedCompositeIdWithCheckDigit,
  ExtendedPersonName,
  ExtendedTelecommunicationNumber,
  FinancialClass,
  HierarchicDesignator,
  PersonLocation,
} from "./DataTypes";
import { MessageEvents } from "./MessageEvents";
import { MessageTypes } from "./MessageTypes";

/** The ACC segment contains patient information relative to an accident in which the patient has been involved.
 */
export type ACC = {
  accidentDateTime?: string;
  accidentCode?: CodedElement;
  accidentLocation?: string;
  autoAccidentState?: string;
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
};

/** The ADD segment is used to define the continuation of the prior segment in a continuation message.  See Section 2.23.2, “Continuation messages and segments,” for details.
 */
export type ADD = {};

/** The AIG segment contains information about various kinds of resources (other than those with specifically defined segments in this chapter) that can be scheduled.  Resources included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Resources not controlled by a schedule are not identified on a schedule request using this segment.  Resources described by this segment are general kinds of resources, such as equipment, that are identified with a simple identification code.
 */
export type AIG = {};

/** The AIL segment contains information about location resources (meeting rooms, operating rooms, examination rooms, or other locations) that can be scheduled.  Resources included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Resources not controlled by a schedule are not identified on a schedule request using this segment.  Location resources are identified with this specific segment because of the specific encoding of locations used by the HL7 specification.
 */
export type AIL = {};

/** The AIP segment contains information about the personnel types that can be scheduled.  Personnel included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Personnel not controlled by a schedule are not identified on a schedule request using this segment.  The kinds of personnel described on this segment include any healthcare provider in the institution controlled by a schedule (for example: technicians, physicians, nurses, surgeons, anesthesiologists, or CRNAs).
 */
export type AIP = {};

/** The AIS segment contains information about various kinds of services that can be scheduled.  Services included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application.  Services not controlled by a schedule are not identified on a schedule request using this segment.
 */
export type AIS = {};

/** The AL1 segment contains patient allergy information of various types.  Most of this information will be derived from user-defined tables.  Each AL1 segment describes a single patient allergy.
 */
export type AL1 = {};

/** The APR segment contains parameters and preference specifications used for requesting appointments in the SRM message.  It allows placer applications to provide coded parameters and preference indicators to the filler application, to help determine when a requested appointment should be scheduled.  An APR segment can be provided in conjunction with either the ARQ segment or any of the service and resource segments (AIG, AIS, AIP, and AIL).  If an APR segment appears in conjunction with an ARQ segment, its parameters and preference indicators pertain to the schedule request as a whole.  If the APR segment appears with any of the service and resource segments, then its parameters and preferences apply only to the immediately preceding service or resource
 */
export type APR = {};

/** The ARQ segment defines a request for the booking of an appointment.  It is used in transactions sent from an application acting in the role of a placer.
 */
export type ARQ = {};

/** This segment represents an authorization or a pre-authorization for a referred procedure or requested service by the payor covering the patient’s health care.
 */
export type AUT = {};

/** The BHS segment defines the start of a batch.
 */
export type BHS = {};

/** The BLG segment is used to provide billing information, on the ordered service, to the filling application.
 */
export type BLG = {};

/** The BTS segment defines the end of a batch.
 */
export type BTS = {};

/** The CDM segment contains the fields for identifying anything which is charged to patient accounts, including procedures, services, supplies.  It is intended to be used to maintain a list of valid chargeable utilization items.  Its purpose is to keep billing codes synchronized between HIS, Patient Accounting, and other departmental systems.  It is not intended to completely support materials management, inventory, or complex pricing structures for which additional complex fields would be required.  Given an identifying charge code, the associated fields in the charge description master file will provide basic pricing and billing data.  All the additional information necessary for patient accounting systems to do billing and claims is not intended to be included in this segment; those should be part of insurance or billing profile tables.* 
* 
* 
* 
The CDM segment contains the fields which, for one chargeable item, remain the same across facilities, departments, and patient types.  The following PRC segment contains the fields which, for the same chargeable item, vary depending upon facility or department or patient type.
 */
export type CDM = {};

/** The Clinical Study Master (CM0) segment contains the information about the study itself.  The sending application study number for each patient is sent in the CSR segment.  The optional CM0 enables information about the study at the sending application that may be useful to the receiving systems.  All of the fields in the segment describe the study status at the sending facility unless otherwise agreed upon
 */
export type CM0 = {};

/** Each Clinical Study Phase Master (CM1) segment contains the  information about one phase of a study identified in the preceding CM0.  This is an optional structure to be used if the study has more than one treatment or evaluation phase within it.  The identification of study phases that the patient enters are sent in the CSP segment: sequence 2.  The CM1 segment describes the phase in general for the receiving system.
 */
export type CM1 = {};

/** The Clinical Study Schedule Master (CM2) contains the  information about the scheduled time points for study or phase-related treatment or evaluation events.  The fact that a patient has data satisfying a scheduled time point is sent in the CSS segment, sequence 2.  The CM2 segment describes the scheduled time points in general.
 */
export type CM2 = {};

/** The CSP segment contains information on a patient’s status for a particular phase of the study. This segment is optional and is useful when a study has different evaluation intervals within it. (See Section 7.5.1.2, “phase of a clinical trial.”) The CSP segment is implemented on a study-specific basis for messaging purposes. The fact that the patient has entered a phase of the study that represents a certain treatment approach may need to be messaged to other systems, like pharmacy, nursing, or order entry. It is also important to sponsors and data management centers for tracking patient progress through the study and monitoring the data schedule defined for each phase. It may subsume OBR and OBX segments that follow it to indicate that these data describe the phase
 */
export type CSP = {};

/** The CSR segment will contain fundamental administrative and regulatory information required to document a patient’s enrollment on a clinical trial.  This segment is all that is required if one needs to message another system that an enrollment has taken place, i.e., from clinical trials to pharmacy, accounting, or order entry systems.  The CSR segment may also be used to identify that OBR, OBX, RXA, and RXR segments that follow represent data applicable to the identified study
 */
export type CSR = {};

/** The Clinical Study Data Schedule (CSS) segment is optional depending on whether messaging of study data needs to be linked to the scheduled data time points for the study.  (See Section 7.5.1.3, “data schedule.”)  The CSS segment enables communication of data schedules and adherence that ranges from the basic to the elaborate.  Use of the segment must be planned for each implementation.  Each CSS segment will subsume observation and drug administration segments that follow, indicating that they satisfy this scheduled time point
 */
export type CSS = {};

/** The CTD segment may identify any contact personnel  associated with a patient referral message and its related transactions.  The CTD segment will be paired with a PRD segment.  The PRD segment contains data specifically focused on provider information in a referral.  While it is important in an inter-enterprise transaction to transmit specific information regarding the providers involved (referring and referred-to), it may also be important to identify the contact personnel associated with the given provider.  For example, a provider receiving a referral may need to know the office manager or the billing person at the institution of the provider who sent the referral.  This segment allows for multiple contact personnel to be associated with a single provider.
 */
export type CTD = {};

/** The CTI segment is an optional segment that contains information to identify the clinical trial, phase and time point with which an order or result is associated
 */
export type CTI = {};

/** The disability segment contains information related to the disability of a person.  This segment was created instead of adding disability attributes to each segment that contains a person (to which disability may apply).  This is an optional segment that can be used to send disability information about a person already defined by the Patient Administration Chapter.  The disabled person code and identifier allow for the association of the disability information to the person.
 */
export type DB1 = {};

/** The DG1 segment contains patient diagnosis information of various types, for example, admitting,  primary, etc.  The DG1 segment is used to send multiple diagnoses (for example, for medical records encoding).  It is also used when the FT1-19-diagnosis does not provide sufficient information for a billing system.  This diagnosis coding should be distinguished from the clinical problem segment used by caregivers to manage the patient (see Chapter 12, Patient Care).  Coding methodologies are also defined.
 */
export type DG1 = {};

/** The DRG segment contains diagnoses-related grouping information of various types.  The DRG segment is used to send the DRG information, for example, for billing and medical records encoding
 */
export type DRG = {};

/** The DSC segment is used in the continuation protocol
 */
export type DSC = {};

/** The DSP segment is used to contain data that has been preformatted by the sender for display.  The semantic content of the data is lost; the data is simply treated as lines of text
 */
export type DSP = {};

/** The EQL segment is used to define queries using select statements based on the query language of choice (e.g., SQL).  Refer to the functional chapters for the lists of HL7-defined EQL select statements
 */
export type EQL = {};

/** The ERQ segment is used to issue queries where the desired response is formatted as an event replay response message.  This enables the querying application to request detailed event data from an application that supports this feature, such that it may no longer be necessary for it to capture and store all event information at the time of the original trigger event.
 */
export type ERQ = {};

/** The ERR segment is used to add error comments to acknowledgment messages.
 */
export type ERR = {};

/** The EVN segment is used to communicate necessary trigger event information to receiving applications.  Valid event types for all chapters are contained in HL7 table 0003 - Event type.
 */
export type EVN = {
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
  eventReasonCode?: string;
  operatorId?: ExtendedCompositeIdNumberAndName;
  eventOccurred?: string;
};

/**
 */
export type FAC = {};

/** The FHS segment is used to head a file (group of batches) as defined in Section 2.23.3, “HL7 batch protocol.”
 */
export type FHS = {};

/** The FT1 segment contains the detail data necessary to post charges, payments, adjustments, etc. to patient accounting records.
 */
export type FT1 = {};

/** The FTS segment defines the end of a file.
 */
export type FTS = {};

/** The goal detail segment contains the data necessary to add, update, correct, and delete the goals for an individual* 
* 
* 
* 
The business and/or application must assume responsibility for maintaining knowledge about data ownership, versioning, and/or audit trail control (for purposes of data integrity).  It is also their responsibility to represent the appropriate version of that data.
 */
export type GOL = {};

/** The GT1 segment contains guarantor (e.g., the person or the organization with financial responsibility for payment of a patient account) data for patient and insurance billing applications.
 */
export type GT1 = {};

/** The IN1 segment contains insurance policy coverage information necessary to produce properly pro-rated and patient and insurance bills.
 */
export type IN1 = {};

/** The IN2 segment contains additional insurance policy coverage and benefit information necessary for proper billing and reimbursement.  Fields used by this segment are defined by HCFA or other regulatory agencies.
 */
export type IN2 = {};

/** The IN3 segment contains additional insurance information for certifying the need for patient care.  Fields used by this segment are defined by HCFA, or other regulatory agencies.
 */
export type IN3 = {};

/** The optional LCC segment identifies how a patient location room can be billed by a certain department.  A department can use different charge codes for the same room or bed, so there can be multiple LCC segments following an LDP segment
 */
export type LCC = {};

/** The LCH segment is used to identify location characteristics which determine which patients will be assigned to the room or bed.  It contains the location characteristics of the room or bed identified in the preceding LOC segment. There should be one LCH segment for each attribute.* 
* 
* 
* 
When the LCH segment appears immediately following the LOC segment, it communicates characteristics which are the same across multiple departments that may use the same room.  When the LCH segment appears immediately following the LDP segment, it communicates characteristics which differ for different departments that may use the same room.  For example, the following characteristics are more likely to vary by which department is using the room:  teaching, gender, staffed, set up, overflow, whereas the other characteristics are likely to remain the same
 */
export type LCH = {};

/** The LDP segment identifies how a patient location room is being used by a certain department.  Multiple departments can use the same patient location, so there can be multiple LDP segments following an LOC segment.  There must be at least one LDP segment for each LOC segment.  This is not intended to include any current occupant information
 */
export type LDP = {};

/** The LOC segment can identify any patient location referenced by information systems.  This segment gives physical set up information about the location.  This is not intended to include any current occupant or current use information.  There should be one LOC segment for each patient location.  If desired, there can also be one LOC segment for each nursing unit and room.
 */
export type LOC = {};

/** The LRL segment is used identify one location’s relationship to another location, the nearest lab, pharmacy, etc.
 */
export type LRL = {};

/** The MFA segment contains the following fields as defined in Figure 8-3 - MFA attributes.
 */
export type MFA = {};

/**
 */
export type MFE = {};

/**
 */
export type MFI = {};

/** The MRG segment provides receiving applications with information necessary to initiate the merging of patient data as well as groups of records.  It is intended that this segment be used throughout the Standard to allow the merging of registration, accounting, and clinical records within specific applications* 
* 
* 
* 
Segment notes:  MRG merge patient information * 
* 
The assigning facility ID, the fourth component of the patient identifiers, is an HD data type that is uniquely associated with the facility that originally assigned the number.  A given institution, or group of intercommunicating institutions, should establish a list of facilities that may be potential assignors of patient identification (and other important identification) numbers.  The list will be one of the institution’s master dictionary lists.  Since third parties (other than the assignors of patient identification numbers) may send or receive HL7 messages containing patient identification numbers, the assigning facility ID in the patient identification numbers may not be the same as those of the sending and receiving systems identified in the MSH.  The assigning facility ID must be unique across applications at a given site.  This field is required in HL7 implementations that have more than a single Patient Administration application assigning such numbers
 */
export type MRG = {};

/** The MSA segment contains information sent while acknowledging another message.
 */
export type MSA = {};

/** The MSH segment defines the intent, source, destination, and some specifics of the syntax of a message
 */
export type MSH = {
  controlCharacters: {
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
  principalLanguageOfMessage?: CodedElement;
};

/** The NCK segment is used to allow the various systems on the network to synchronize their system clocks (system date and time).
 */
export type NCK = {};

/** The NK1 segment contains information about the patient’s other related parties.  Any associated parties may be identified.  Utilizing NK1-1-set ID, multiple NK1 segments can be sent to patient accounts
 */
export type NK1 = {};

/** The NPU segment allows the updating of census (bed status) data without sending patient-specific data.  An example might include changing the status of a bed from “housekeeping” to “unoccupied.”
 */
export type NPU = {};

/** The NSC segment can be used to request the start-up, shut-down, and/or migration (to a different cpu or file-server/file-system) of a particular application. It can also be used in an unsolicited update from one system to another to announce the start-up, shut-down, or migration of an application.
 */
export type NSC = {};

/** The NST segment allows network statistical information to be passed between the various systems on the network.  Some fields in this segment refer to portions of lower level protocols; they contain information that can be used by network management applications monitoring the state of various network links
 */
export type NST = {};

/** The NTE segment is defined here for inclusion in messages defined in other chapters.  It is a common format for sending notes and comments
 */
export type NTE = {};

/** The Observation Request (OBR) segment is used to transmit information specific to an order for a diagnostic study or observation, physical exam, or assessment.  * 
* 
* 
* 
The Observation Request segment defines the attributes of a particular request for diagnostic services (e.g., laboratory, EKG) or clinical observations (e.g., vital signs or physical exam).  When a placer requests a given set of observations, always include an order segment.  For lab tests, the information in the order segment usually applies to a single specimen.  However, there is not a one-to-one relationship between specimen and tests ordered.  Different test batteries will usually require their own order segments even when they can be performed on a single specimen.  In this case, the specimen information must be duplicated in each of the order segments that employ that specimen.  For other diagnostic studies, e.g., chest X-ray, a separate order segment will usually be generated for each diagnostic study
 */
export type OBR = {};

/** The OBX segment is used to transmit a single observation or observation fragment.  It represents the smallest indivisible unit of a report.* 
* 
* 
* 
Its principal mission is to carry information about observations in report messages.  But the OBX can also be part of an observation order (see Section 4.2, “Order Message Definitions”).  In this case, the OBX carries clinical information needed by the filler to interpret the observation the filler makes.  For example, an OBX is needed to report the inspired oxygen on an order for a blood oxygen to a blood gas lab, or to report the menstrual phase information which should be included on an order for a pap smear to a cytology lab.  Appendix 7A includes codes for identifying many of pieces of information needed by observation producing services to properly interpret a test result.  OBX is also found in other HL7 messages that need to include patient clinical information.
 */
export type OBX = {};

/** The ORC sequence items of interest to ODS are ORC-1-order control,ORC-2-placer order number, ORC-3filler order number, ORC-7-quantity/timing, ORC-9-date/time of transaction, ORC-10-entered by, and ORC-11-verified by.  For ORC-1-order control, the values may be New (NW), Cancel (CA), Discontinue Order Request (DC), Change (XO), Hold Order Request (HD), and Release Previous Hold (RL).  The HD and RL codes could stop service for a specified length of time.  ORC-4-quantity/timing should be used to specify whether an order is continuous or for one service period only.  It is also useful for supplements which are part of a diet but only delivered, say, every day at night.
 */
export type ODS = {};

/** This segment addresses tray instructions.  These are independent of diet codes, supplements, and preferences and therefore get separate order numbers
 */
export type ODT = {};

/** The OM1 segment contains the attributes that apply to the definition of most observations.  This segment also contains the field attributes that specify what additional segments might also be defined for this observation
 */
export type OM1 = {};

/** This segment contains the attributes of observations with continuous values (including those with data types of numeric, date, or time stamp).  It can be applied to observation batteries of type A and C (see OM119-nature of test/observation).
 */
export type OM2 = {};

/** This segment applies to free text and other non-numeric data t
 */
export type OM3 = {};

/** This segment applies to observations/batteries that require a specimen for their performance.  When an observation or battery requires multiple specimens for their performance (e.g., creatinine clearance requires a 24-hour urine specimen and a serum specimen), multiple segments may be included, one for each specimen type.
 */
export type OM4 = {};

/** This segment contains the information about batteries and supersets (a nature code of F, P or S, as described in OM1-18-nature of test/observation).
 */
export type OM5 = {};

/** This segment contains the information about quantities that are derived from one or more other quantities or direct observations by mathematical or logical means
 */
export type OM6 = {};

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
export type ORC = {};

/** The PCR segment is used to communicate a potential or suspected relationship between a product (drug or device) or test and an event with detrimental effect on a patient.  This segment identifies a potential causal relationship between the product identified in this segment and the event identified in the PEO segment.* 
* 
* 
* 
More than one PCR segment can be included in the message if more than one product is possibly causally related to the event.
 */
export type PCR = {};

/** The patient additional demographic segment contains demographic information that is likely to change about the patient.
 */
export type PD1 = {};

/**
 */
export type PDC = {};

/** Details related to a particular clinical experience or event are embodied in the PEO segment.  This segment can be used to characterize an event which might be attributed to a product to which the patient was exposed.   Products with a possible causal relationship to the observed experience are described in the following PCR (possible causal relationship) segments.  The message format was designed to be robust and includes many optional elements which may not be required for a particular regulatory purpose but allow a complete representation of the drug experience if needed.* 
* 
* 
* 
A PEX message can contain multiple PEO segments if the patient experienced more than one event but must contain at least one PEO segment.
 */
export type PEO = {};

/**
 */
export type PES = {};

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
export type PID = {
  setId?: number;
  externalPatientId?: ExtendedCompositeIdWithCheckDigit;
  internalPatientId: ExtendedCompositeIdWithCheckDigit[];
  alternatePatientId?: ExtendedCompositeIdWithCheckDigit[];
  patientName: ExtendedPersonName[];
  mothersMaidenName?: ExtendedPersonName;
  dateOfBirth?: string;
  /**
   * Common code values:
   * | Code |Value    |
   * | ---- | ------- |
   * | F    | Female  |
   * | M    | Male    |
   * | O    | Other   |
   * | U    | Unknown |
   */
  sex?: string;
  patientAlias?: ExtendedPersonName[];
  patientRace?: string;
  patientAddress?: ExtendedAddress[];
  countyCode?: string;
  homePhoneNumber?: ExtendedTelecommunicationNumber[];
  businessPhoneNumber?: ExtendedTelecommunicationNumber[];
  primaryLanguage?: CodedElement;
  /**
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
  religion?: string;
  patientAccountNumber?: ExtendedCompositeIdWithCheckDigit;
  patientSocialSecurityNumber?: string;
  driversLicenseNumber?: DriversLicenseNumber;
  mothersIdentifier?: CodedElement[];
  ethnicGroup?: string;
  birthPlace?: string;
  /**
   * Common values
   *
   * | Code | Values |
   * | ---- | ------ |
   * | Y    | Yes    |
   * | N    | No     |
   */
  multipleBirthIndicator?: string;
  birthOrder?: number;
  citizenship?: string[];
  veteransMilitaryStatus?: CodedElement;
  nationalityCode?: CodedElement;
  patientDeathDateAndTime?: string;
  /**
   * Common values
   *
   * | Code | Values |
   * | ---- | ------ |
   * | Y    | Yes    |
   * | N    | No     |
   */
  patientDeathIndicator?: string;
};

/** The PR1 segment contains information relative to various types of procedures that can be performed on a patient.  The PR1 segment can be used to send procedure information, for example: Surgical, Nuclear Medicine, X-ray with contrast, etc.   The PR1 segment is used to send multiple procedures, for example, for medical records encoding or for billing systems.
 */
export type PR1 = {};

/** The PRA segment adds detailed medical practitioner information to the personnel identified by the STF segment.  A PRA segment may optionally follow an STF segment.  A PRA segment must always have been preceded by a corresponding STF segment.  The PRA segment may also be used for staff who work in healthcare who are not practitioners, but need to be certified, e.g., “medical records staff.”
 */
export type PRA = {};

/** The problem detail segment contains the data necessary to add, update, correct, and delete the problems of a given individual.* 
* 
* 
* 
The business and/or application must assume the responsibility for maintaining knowledge about data ownership, versioning, and/or audit trail control (for purposes of data integrity).  It is also their responsibility to represent the appropriate version of that data.
 */
export type PRB = {};

/** The PRC segment contains the  pricing information for the preceding CDM segment’s chargeable item.  It contains the fields which, for the same chargeable item, might vary depending upon facility or department or patient type.  The preceding CDM segment contains the fields which, for one chargeable item, remain the same across facilities, departments, and patient types
 */
export type PRC = {};

/** This segment will be employed as part of a patient referral message and its related transactions.  The PRD segment contains data specifically focused on a referral, and it is inter-enterprise in nature.  The justification for this new segment comes from the fact that we are dealing with referrals that are external to the facilities that received them.  Therefore, using a segment such as the current PV1 would be inadequate for all the return information that may be required by the receiving facility or application.  In addition, the PV1 does not always provide information sufficient to enable the external facility to make a complete identification of the referring entity.  The information contained in the PRD segment will include the referring provider, the referred-to provider, the referred-to location or service, and the referring provider clinic address.
 */
export type PRD = {};

/**
 */
export type PSH = {};

/** The pathway segment contains the data necessary to add, update, correct, and delete from the record pathways that are utilized to address an individual’s health care
 */
export type PTH = {};

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
export type PV1 = {
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
  preadmitNumber?: CodedElement;
  priorPatientLocation?: PersonLocation;
  attendingDoctor?: ExtendedCompositeIdNumberAndName[];
  referringDoctor?: ExtendedCompositeIdNumberAndName[];
  consultingDoctor?: ExtendedCompositeIdNumberAndName[];
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
  admittingDoctor?: ExtendedCompositeIdNumberAndName[];
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
  otherHealthcareProvider?: ExtendedCompositeIdNumberAndName[];
};

/** The PV2 segment is a continuation of visit-specific information contained on the PV1 segment
 */
export type PV2 = {};

/** The QAK segment contains information sent with responses to a query.
 */
export type QAK = {};

/** The QRD segment is used to define a query
 */
export type QRD = {};

/** The QRF segment is used with the QRD segment to further refine the content of an original style query
 */
export type QRF = {};

/** The RDF segment defines the content of the row data segments (RDT) in the Tabular Data Response Message (TBR).  It is used in two ways:* 
* 
 * 
* 
- As an optional segment in the SPQ message (Stored Procedure Request) or the VQQ (Virtual Table Query) message, this segment can be used to limit the number of columns returned and to specify what column positions the fields occupy (where supported, these features can be used to override the defaults for the particular query).  If omitted, all fields defined for the query are returned in their default column order. * 
* 
- As a required segment on the tabular data response message (TBR), this segment defines the contents of the table row data (RDT) segments that follow.
 */
export type RDF = {};

/** The RDT segment contains the row data of the tabular data response message (TBR
 */
export type RDT = {};

/** This segment represents information that may be useful when sending referrals from the referring provider to the referred-to provider.
 */
export type RF1 = {};

/** The RGS segment is used to identify relationships between resources identified for a scheduled event.  This segment can be used, on a site specified basis, to identify groups of resources that are used together within a scheduled event, or to describe some other relationship between resources.  To specify related groups of resources within a message, begin each group with an RGS segment, and then follow that RGS with one or more of the Appointment Information segments (AIG, AIL, AIS, or AIP). * 
* 
If a message does not require any grouping of resources, then specify a single RGS in the message, and follow it with all of the Appointment Information segments for the scheduled event.   (At least one RGS segment is required in each message — even if no grouping of resources is required — to allow parsers to properly understand the message.)
 */
export type RGS = {};

/** The role segment contains the data necessary to add, update, correct, and delete from the record persons involved, as well as their functional involvement with the activity being transmitted
 */
export type ROL = {};

/** RQ1 contains additional detail for each nonstock requisitioned item.  This segment definition is paired with a preceding RQD segment.
 */
export type RQ1 = {};

/** RQD contains the detail for each requisitioned item.
 */
export type RQD = {};

/** The ORC must have the filler order number and the order control code RE.  As a site-specific variant, the RXO and associated RXCs and/or the RXE (and associated RXCs) may be present if the receiving application needs any of their data.  The RXA carries the administration data.
 */
export type RXA = {};

/** If the drug or treatment ordered with the RXO segment is a compound drug OR an IV solution, AND there is not a coded value for the Universal Service ID which specifies the components (base and all additives), then the components (the base and additives) are specified by two or more RXC segments.  The policy of the pharmacy or treatment application on substitutions at the RXC level is identical to that for the RXO level.
 */
export type RXC = {};

/**
 */
export type RXD = {};

/** The RXE segment details the pharmacy or treatment  application’s encoding of the order.  It also contains several pharmacy-specific order status fields, such as RXE-16-number of refills remaining, RXE-17-number of refills/doses dispensed, RXE-18-date/time of most recent refill/dose, and RXE-19-total daily dose.* 
* 
* 
* 
Note that ORC-7-quantity/timing has a different meaning from RXE-1-quantity/timing and RXG-3quantity/timing.  The pharmacy or treatment department has the “authority” (and/or necessity) to schedule dispense/give events.  Hence, the pharmacy or treatment department has the responsibility to encode this scheduling information in RXE-1-quantity/timing and RXG-3-quantity/timing.  ORC-7-quantity/timing does not change: it always specifies the requested give/dispense schedule of the original order
 */
export type RXE = {};

/**
 */
export type RXG = {};

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
export type RXO = {};

/** The Pharmacy/Treatment Route segment contains the alternative combination of route, site, administration device, and administration method that are prescribed.  The pharmacy, treatment staff and/or nursing staff has a choice between the routes based on either their professional judgment or administration instructions provided by the physician.
 */
export type RXR = {};

/** The SCH segment contains general information about the scheduled appointment
 */
export type SCH = {};

/** The SPR segment is used to issue queries using stored procedure calls.  Refer to the functional chapters for the lists of HL7-defined stored procedure names, input parameters and output tables
 */
export type SPR = {};

/** The STF segment can identify any personnel referenced by information systems.  These can be providers, staff, system users, and referring agents.  In a network environment, this segment can be used to define personnel to other applications; for example, order entry clerks, insurance verification clerks, admission clerks, as well as provider demographics. MFE-4-primary key value is used to link all the segments pertaining to the same master file entry.  Therefore, in the MFE segment, MFE-4-primary key value must be filled in.  Other segments may follow the STF segment to provide data for a particular type of staff member. The PRA segment (practitioner) is one such.  It may optionally follow the STF segment in order to add practitioner-specific data. Other segments may be defined as needed.
 */
export type STF = {};

/** The TXA segment contains information specific to a transcribed document but does not include the text of the document.  The message is created as a result of a document status change.  This information is used to update other healthcare systems to identify reports that are available in the transcription system.  By maintaining the TXA message information in these systems, the information is available when constructing queries to the transcription system requesting the full document text.
 */
export type TXA = {};

/** The UB1 segment contains the data necessary to complete UB82 bills.  Only UB82 fields that do not exist in other HL7 defined segments appear in this segment.  Patient Name and Date of Birth are required for UB82 billing; however, they are included in the PID segment and therefore do not appear here.
 */
export type UB1 = {};

/** The UB2 segment contains data necessary to complete UB92 bills.  Only UB92 fields that do not exist in other HL7 defined segments appear in this segment.  Just as with the UB82 billing, Patient Name and Date of Birth are required; they are included in the PID segment and therefore do not appear here.  When the field locators are different on the UB92, as compared to the UB82, the element is listed with its new location in parentheses  (  ).
 */
export type UB2 = {};

/** The URD segment is used in sending unsolicited updates about orders and results.  It’s purpose is similar to that of the QRD segment, but from the results/unsolicited update point of view.  Some of the fields have parallels in the QRD segment
 */
export type URD = {};

/** The URS segment is identical with the QRF segment, except that if the name of any field contains Query (of QRY), this word has been changed to Results (see URS-5-R/U other results subject definition).
 */
export type URS = {};

/** The variance segment contains the data necessary to describes differences that may have occurred at the time when a healthcare event was documented.
 */
export type VAR = {};

/** The VTQ segment is used to define queries that are responded to with the Tabular Data Message (TBR).  The VTQ query message is an alternate method to the EQQ query message that some systems may find easier to implement, due to its use of HL7 delimiters that separate components of the selection definition, and its limited selection criteria.  Queries involving complex selection criteria (nested operators, etc.) may need to be formatted as an EQL segment. * 
* 
* 
* 
As with the other query methods, the functional chapters define specific queries supported as VTQ messages.  Refer to these functional chapters for the lists of HL7-defined virtual tables, selection lists and criteria
 */
export type VTQ = {};