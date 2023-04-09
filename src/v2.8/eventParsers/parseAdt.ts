import type { WrappedResult, MessageSegments } from "../../../typings";

import { ADT_A04 } from "../../../typings/v2.8";
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
import { getSegmentHeader } from "../utils";

export const parseAdt = (
  msh: MessageSegments["MSH"],
  segments: string[]
): WrappedResult<ADT_A04> => {
  if (msh.message.event === "A04") return parseAdt_A04(msh, segments);
  return { ok: false, err: new Error("Not Implemented") };
};

export function parseAdt_A04(
  msh: MessageSegments["MSH"],
  segments: string[]
): WrappedResult<ADT_A04> {
  const hl7Message: Partial<ADT_A04> = {
    messageHeader: msh,
  };
  const errors: Error[] = [];
  const warnings: Error[] = [];
  for (let ind = 0; ind < segments.length - 1; ind++) {
    let segment = segments[ind];
    const res = getSegmentHeader(segment);
    if (!res.ok) continue;
    const { header, fieldString } = res.val;
    if (header === "PID") {
      const pid = parsePID(fieldString, msh.encodingCharacters);
      hl7Message.patientIdentification = pid;
      continue;
    } else if (header === "PV1") {
      const pv1 = parsePV1(fieldString, msh.encodingCharacters);
      hl7Message.patientVisit = pv1;
      continue;
    } else if (header === "EVN") {
      const evn = parseEVN(fieldString, msh.encodingCharacters);
      hl7Message.eventType = evn;
      continue;
    } else if (header === "NK1") {
      const nk1 = parseNK1(fieldString, msh.encodingCharacters);
      if (hl7Message.nextOfKin == null) {
        hl7Message.nextOfKin = [nk1];
        continue;
      }
      hl7Message.nextOfKin.push(nk1);
      continue;
    } else if (header === "PD1") {
      const pd1 = parsePD1(fieldString, msh.encodingCharacters);
      hl7Message.patientDemographics = pd1;
      continue;
    } else if (header === "AL1") {
      const al1 = parseAL1(fieldString, msh.encodingCharacters);
      if (hl7Message.patientAllergyInformation == null) {
        hl7Message.patientAllergyInformation = [al1];
        continue;
      }
      hl7Message.patientAllergyInformation.push(al1);
      continue;
    } else if (header === "ACC") {
      const acc = parseACC(fieldString, msh.encodingCharacters);
      hl7Message.accident = acc;
      continue;
    } else if (header === "OBX") {
      const obx = parseOBX(fieldString, msh.encodingCharacters);
      if (hl7Message.observation == null) {
        hl7Message.observation = [obx];
        continue;
      }
      hl7Message.observation.push(obx);
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
