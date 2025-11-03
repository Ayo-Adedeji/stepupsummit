import fetch from "node-fetch";

// Dummy references / test data
const testTicketReference = "TEST_REF_TICKET_123";
const testSponsorshipReference = "TEST_REF_SPONSOR_123";

const testTicketData = {
  name: "John Doe",
  email: "johndoe@example.com",
  ticketType: "VIP (Early Bird)",
  amount: 50000,
  reference: testTicketReference,
  ticketId: "TICKET-12345",
};

const testSponsorshipData = {
  fullName: "Jane Sponsor",
  email: "jane.sponsor@example.com",
  phone: "08012345678",
  companyName: "ACME Ltd",
  designation: "CEO",
  companyWebsite: "https://acme.com",
  sponsorshipInterest: "Platinum",
  message: "Excited to support!",
  reference: testSponsorshipReference,
};

const BASE_URL = "http://localhost:5000";

async function testTicketVerification() {
  console.log("\n--- Testing Ticket Verification ---");
  const res = await fetch(`${BASE_URL}/api/tickets/verify-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference: testTicketReference }),
  });
  const data = await res.json();
  console.log("Response:", data);
}

async function testTicketEmail() {
  console.log("\n--- Testing Ticket Confirmation Email ---");
  const res = await fetch(`${BASE_URL}/api/tickets/send-confirmation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testTicketData),
  });
  const data = await res.json();
  console.log("Response:", data);
}

async function testSponsorshipVerification() {
  console.log("\n--- Testing Sponsorship Verification ---");
  const res = await fetch(`${BASE_URL}/api/sponsorship/verify-payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reference: testSponsorshipReference }),
  });
  const data = await res.json();
  console.log("Response:", data);
}

async function testSponsorshipEmail() {
  console.log("\n--- Testing Sponsorship Email ---");
  const res = await fetch(`${BASE_URL}/api/sponsorship/send-sponsorship`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(testSponsorshipData),
  });
  const data = await res.json();
  console.log("Response:", data);
}

async function runTests() {
  await testTicketVerification();
  await testTicketEmail();
  await testSponsorshipVerification();
  await testSponsorshipEmail();
  console.log("\n✅ All tests completed!");
}

runTests().catch(console.error);
