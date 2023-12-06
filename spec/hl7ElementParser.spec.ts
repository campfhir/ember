import "mocha";
import { expect, should } from "chai";

import { hl7ElementMapper } from "../src/v2.8";
should();

describe("Given an ADT AO4", () => {
  const adt = `MSH|^~\\&|MESA_ADT|XYZ_ADMITTING|iFW|ZYX_HOSPITAL|||ADT^A04|103102|P|2.4||||||8859/1^8859/2^8859/3||
EVN||200007010800||||200007010800
PID|||583295^^^ADT1||DOE^JANE||19610615|M||2106-3|123 MAIN \\T\\ CLARK STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434~(919)277-3114||S||PATID12345001^2^M10|123456789|9-87654^NC
NTE|1|Patient|Patient Loves Chocolate~Patient Has a Best Friend
NTE|2|Doctor|This patient needs a wheelchair
PD1|||Test Health Facility^^13838|||||||||
NK1|1|BATES^RONALD^L|SPO|||||20011105
NK1|2|BATES^JUDY^L|SISTER|||||20011105
PV1||E||||||5101^NELL^FREDERICK^P^^DR|||||||||||V1295^^^ADT1|||||||||||||||||||||||||200007010800||||||||
PV2|||^ABDOMINAL PAIN
OBX|1|HD|SR Instance UID||1.123456.2.2000.31.2.1||||||F||||||
AL1|1||^PENICILLIN||PRODUCES HIVES~RASH
AL1|2||^CAT DANDER
DG1|001|I9|1550|MAL NEO LIVER, PRIMARY|19880501103005|F||
PR1|2234|M11|111^CODE151|COMMON PROCEDURES|198809081123
ROL|45^RECORDER^ROLE MASTER LIST|AD|CP|KATE^SMITH^ELLEN|199505011201
GT1|1122|1519|BILL^GATES^A
IN1|001|A357|1234|BCMD|||||132987
IN2|ID1551001|SSN12345678`;

  it("Parse Segments", () => {
    const adtMessage = hl7ElementMapper(adt.split("\n"), {
      MSH: (segment) => segment,
      EVN: (seg) => seg,
      PID: (seg) => seg,
      NTE1: (seg) => seg,
      NTE2: (seg) => seg,
      pd1: (seg) => seg,
    });
    expect(adtMessage.pd1).to.equal(
      "PD1|||Test Health Facility^^13838|||||||||"
    );
  });
});
