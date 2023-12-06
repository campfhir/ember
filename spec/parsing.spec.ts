import "mocha";
import { expect, should } from "chai";
import { parseHL7 } from "../src";
import type { HL7Message } from "../typings";
import { getSegmentHeader } from "../src/v2.8";
import fs from "node:fs";
should();

describe("Given an ADT AO4", () => {
  it("Should parse into an object", () => {
    const adt = fs.readFileSync(
      `${process.cwd()}/spec/v2.8/hl7-fragments/adt_a04.hl7`,
      {
        encoding: "ascii",
      }
    );

    const res = parseHL7(adt);
    if (!res.ok) {
      console.error(res.err);
      throw new Error("Test Failed");
    }
    const msg = res.val as HL7Message;
    const { fieldSeparator, subComponentSeparator, componentSeparator } =
      msg.messageHeader.encodingCharacters;
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
    expect(msg.patientIdentification.comments).to.exist;
    console.log(msg.patientIdentification.comments);
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
    expect(
      msg.patientDemographics?.patientPrimaryFacility?.[0].organizationName
    ).to.equal("Test Health Facility");
    expect(
      msg.patientDemographics?.patientPrimaryFacility?.[0].idNumber
    ).to.equal(13838);
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
