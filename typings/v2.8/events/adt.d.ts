import {
  MSH,
  EVN,
  PID,
  PD1,
  NK1,
  PV1,
  PV2,
  DB1,
  OBX,
  AL1,
  DG1,
  DRG,
  GT1,
  ACC,
  UB1,
  UB2,
  ROL,
  IN1,
  IN2,
  IN3,
  SFT,
  UAC,
  ARV,
  NTE,
} from "../MessageSegments";

export type ADT_A04 = {
  messageHeader: MSH;
  software?: SFT[];
  userAuthentication?: UAC;
  eventType: EVN;
  patientIdentification: PID;
  patientNotes?: NTE[];
  patientDemographics?: PD1;
  patientAccessRestriction?: ARV[];
  patientRole?: ROL[];
  nextOfKin?: NK1[];
  patientVisit: PV1;
  patientVisitAdditionInformation?: PV2;
  encounterVisitRestriction?: ARV[];
  encounterRole?: ROL[];
  disability?: DB1[];
  observation?: OBX[];
  patientAllergyInformation?: AL1[];
  diagnosis?: DG1[];
  diagnosisRelatedGroup?: DRG;
  procedures?: {
    procedure: PR1;
    roles?: ROL[];
  }[];
  guarantor?: GT1[];
  insurances?: {
    insurance: IN1;
    insuranceAdditionalInfo?: IN2;
    insuranceAdditionalInfoCertification?: IN3;
  }[];
  accident?: ACC;
  UB1?: UB1;
  UB2?: UB2;
};
