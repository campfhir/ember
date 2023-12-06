import type { WrappedResult, MessageSegments } from "../../../typings";

import { ADT_A04, HL7Message, MSH } from "../../../typings/v2.8";
import {
  parsePID,
  parsePV1,
  parseEVN,
  parseNK1,
  parsePD1,
  parseAL1,
  parseACC,
  parseOBX,
} from "../segmentParsers";
import { parseARV } from "../segmentParsers/parseARV";
import { parseNTE } from "../segmentParsers/parseNTE";
import { parseSFT } from "../segmentParsers/parseSFT";
import { parseUAC } from "../segmentParsers/parseUAC";
import { getSegmentHeader } from "../utils";

export function parseAdt(
  msh: MessageSegments["MSH"],
  segments: string[]
): WrappedResult<ADT_A04> {
  if (msh.message.event === "A04") {
    return parseAdt_A04(msh, segments);
  }
  // @ts-ignore Some implementations use the format with ADT_{event_type} format
  if (msh.message.event === "ADT_A04") {
    return parseAdt_A04(msh, segments);
  }
  return { ok: false, err: new Error("Not Implemented") };
}
/**
 * This function mutates the HL7 by appending the note depending on the preceding segment
 *
 *
 * @param noteSegment
 * @param previousSegment
 * @param hl7Message
 * @returns
 */
function appendNote(opt: {
  noteSegment: string;
  encodingCharacters: MSH["encodingCharacters"];
  previousSegment: keyof MessageSegments | null;
  hl7Message: Partial<HL7Message>;
}): void {
  const { noteSegment, encodingCharacters, previousSegment, hl7Message } = opt;
  const nte = parseNTE(noteSegment, encodingCharacters);
  if (previousSegment == null) {
    return;
  }
  if (previousSegment === "PID") {
    if (hl7Message.patientIdentification == null) {
      console.warn(
        "The patient identification was not defined so the comment cannot be appended"
      );
      return;
    }
    hl7Message.patientIdentification.comments.push(nte);
    return;
  }

  if (previousSegment === "OBX") {
    if (hl7Message.observations == null) {
      console.log(
        "The observations property was not defined so the comment cannot be appended"
      );
      return;
    }
    const observation = hl7Message.observations.pop();
    if (observation == null) {
      console.warn(
        "For this message there are no observation values to append this note to"
      );
      return;
    }
    observation.comments.push(nte);
    hl7Message.observations.push(observation);
  }

  return;
}

export function parseAdt_A04(
  msh: MessageSegments["MSH"],
  segments: string[]
): WrappedResult<ADT_A04> {
  const hl7Message: Partial<ADT_A04> = {
    messageHeader: msh,
  };
  const errors: Error[] = [];
  const warnings: Error[] = [];
  let previousSegment: keyof MessageSegments | null = null;
  for (let ind = 0; ind < segments.length - 1; ind++) {
    let segment = segments[ind];
    const res = getSegmentHeader(segment);
    if (!res.ok) continue;
    const { header, fieldString } = res.val;
    const encodingCharacters = msh.encodingCharacters;
    if (header === "PID") {
      const pid = parsePID(fieldString, {
        encodingCharacters,
      });
      hl7Message.patientIdentification = pid;
      previousSegment = "PID";
      continue;
    } else if (header === "PV1") {
      const pv1 = parsePV1(fieldString, encodingCharacters);
      hl7Message.patientVisit = pv1;
      previousSegment = "PV1";
      continue;
    } else if (header === "EVN") {
      const evn = parseEVN(fieldString, encodingCharacters);
      hl7Message.eventType = evn;
      previousSegment = "EVN";
      continue;
    } else if (header === "NK1") {
      const nk1 = parseNK1(fieldString, encodingCharacters);
      if (hl7Message.nextOfKin == null) {
        hl7Message.nextOfKin = [];
      }
      hl7Message.nextOfKin.push(nk1);
      previousSegment = "NK1";
      continue;
    } else if (header === "PD1") {
      const pd1 = parsePD1(fieldString, encodingCharacters);
      hl7Message.patientDemographics = pd1;
      previousSegment = "PD1";
      continue;
    } else if (header === "AL1") {
      const al1 = parseAL1(fieldString, encodingCharacters);
      if (hl7Message.patientAllergyInformation == null) {
        hl7Message.patientAllergyInformation = [];
      }
      hl7Message.patientAllergyInformation.push(al1);
      previousSegment = "AL1";
      continue;
    } else if (header === "ACC") {
      const acc = parseACC(fieldString, encodingCharacters);
      hl7Message.accident = acc;
      previousSegment = "ACC";
      continue;
    } else if (header === "OBX") {
      const obx = parseOBX(fieldString, encodingCharacters);
      if (hl7Message.observations == null) {
        hl7Message.observations = [];
      }
      previousSegment = "OBX";
      hl7Message.observations.push(obx);
      continue;
    } else if (header === "SFT") {
      const sft = parseSFT(fieldString, encodingCharacters);
      if (hl7Message.software == null) {
        hl7Message.software = [];
      }
      hl7Message.software.push(sft);
      previousSegment = "SFT";
      continue;
    } else if (header === "UAC") {
      const uac = parseUAC(fieldString, encodingCharacters);
      hl7Message.userAuthentication = uac;
      previousSegment = "UAC";
      continue;
    } else if (header === "ARV") {
      const arv = parseARV(fieldString, encodingCharacters);
      if (hl7Message.patientAccessRestriction == null) {
        hl7Message.patientAccessRestriction = [];
      }
      hl7Message.patientAccessRestriction.push(arv);
      previousSegment = "ARV";
    } else if (header === "NTE") {
      appendNote({
        noteSegment: fieldString,
        hl7Message: hl7Message as HL7Message,
        previousSegment,
        encodingCharacters,
      });
      continue;
    }
  }
  const a04 = hl7Message as ADT_A04;

  if (a04.messageHeader == null) {
    errors.push(new Error("Undefined Message Header MSH"));
  }
  if (a04.patientIdentification == null) {
    errors.push(new Error("Undefined Patient Identification PID"));
  }
  if (a04.patientVisit == null) {
    errors.push(new Error("Undefined Patient Visit PV1"));
  }
  if (a04.eventType == null) {
    errors.push(new Error("Undefined Event Type EVN"));
  }
  if (errors.length > 0) {
    const mainError = Object.assign(
      {},
      new Error("Invalid A04 message type")
    ) as Error & { otherErrors: undefined | Error[] };
    mainError.otherErrors = errors;
    return {
      ok: false,
      val: hl7Message,
      err: mainError,
    };
  }
  return { ok: true, val: a04 as ADT_A04, warnings };
}
