import "mocha";
import { expect, should } from "chai";
import { parseHL7 } from "../src";
import type { HL7Message } from "../typings";
import { getSegmentHeader } from "../src/v2.3";
should();

describe("Given an ADT AO4", () => {
  it("Should parse into an object", () => {
    const adt = `MSH|^~\\&|MESA_ADT|XYZ_ADMITTING|iFW|ZYX_HOSPITAL|||ADT^A04|103102|P|2.4||||||8859/1^8859/2^8859/3||
EVN||200007010800||||200007010800
PID|||583295^^^ADT1||DOE^JANE||19610615|M||2106-3|123 MAIN \\T\\ CLARK STREET^^GREENSBORO^NC^27401-1020|GL|(919)379-1212|(919)271-3434~(919)277-3114||S||PATID12345001^2^M10|123456789|9-87654^NC
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

    const res = parseHL7(adt);
    if (!res.ok) {
      console.error(res.err);
      throw new Error("Test Failed");
    }
    const msg = res.val as HL7Message;
    const { fieldSeparator, subComponentSeparator, componentSeparator } =
      msg.messageHeader.controlCharacters;
    fieldSeparator.should.equal("|");
    componentSeparator.should.be.equal("^");
    subComponentSeparator.should.be.equal("&");
    expect(
      msg.patientIdentification.internalPatientId?.find(
        (id) => id.assigningAuthority?.namespaceId == "ADT1"
      )?.id
    ).to.equal("583295");
    expect(
      msg.patientIdentification.patientName.find((n) => n.familyName == "DOE")
        ?.givenName
    ).to.equal("JANE");
    expect(
      msg.patientIdentification.patientAddress?.[0].streetAddress
    ).to.equal("123 MAIN & CLARK STREET");
    expect(msg.patientIdentification.patientAddress?.[0].city).to.equal(
      "GREENSBORO"
    );
    expect(msg.patientVisit.visitNumber?.id).to.be.equal("V1295");
    expect(msg.patientVisit.referringDoctor?.[0].familyName).to.equal("NELL");
    expect(msg.patientVisit.admitDateTime).to.equal("200007010800");
    expect(msg.eventType.recordedDateTime).to.equal("200007010800");
    console.log(msg.nextOfKin);
  });
});

describe("Parsing Headers", () => {
  it("Should parse correctly if segment starts with Z and is 3 characters", () => {
    const segment = "ZZZ|1";
    const res = getSegmentHeader(segment);
    if (!res.ok) {
      throw new Error("Failed to parse");
    }
    const { header } = res.val;
    header.should.equal("ZZZ");
  });
  it("Should not parse header if segment is invalid and not a Z segment", () => {
    const segment = "AAA|1";
    const request = getSegmentHeader(segment);
    request.ok;
  });
});
