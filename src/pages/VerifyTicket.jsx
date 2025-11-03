import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const VerifyTicket = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState("loading");
  const [ticket, setTicket] = useState(null);
  const reference = params.get("ref");

  useEffect(() => {
    if (!reference) {
      setStatus("error");
      return;
    }

    const fetchTicket = async () => {
      try {
        const res = await axios.get(
          `https://api.stepupsummit.org/api/tickets/verify?ref=${reference}`
        );
        setTicket(res.data);
        setStatus("success");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    fetchTicket();
  }, [reference]);

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-600">Verifying your ticket...</p>
      </div>
    );

  if (status === "error")
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-red-500 text-xl font-semibold mb-2">
          ❌ Invalid or expired ticket reference
        </p>
        <p className="text-gray-500">
          Please confirm your ticket reference or contact support.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-green-600">
          ✅ Ticket Verified
        </h2>
        <div className="text-left space-y-2">
          <p>
            <span className="font-semibold">Name:</span> {ticket.fullName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {ticket.email}
          </p>
          <p>
            <span className="font-semibold">Ticket Type:</span>{" "}
            {ticket.ticketType}
          </p>
          <p>
            <span className="font-semibold">Reference:</span> {reference}
          </p>
        </div>
        <p className="mt-6 text-green-700 font-medium">
          Welcome to StepUp Summit 🎉
        </p>
      </div>
    </div>
  );
};

export default VerifyTicket;
