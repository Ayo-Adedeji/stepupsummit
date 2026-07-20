import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const VerifyTicket = () => {
  const { qrId } = useParams();
  const [status, setStatus] = useState("loading");
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if (!qrId) {
      setStatus("error");
      return;
    }

    const fetchTicket = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const res = await axios.post(`${baseUrl}/api/verify-ticket`, { qrId });

        const data = res.data;
        setTicket(data);

        if (data.status === "VERIFIED") {
          setStatus("success");
        } else if (data.status === "ALREADY_USED") {
          setStatus("used");
        } else if (data.status === "TOO_EARLY") {
          setStatus("too_early");
        } else if (data.status === "EXPIRED") {
          setStatus("expired");
        } else {
          setStatus("error");
        }
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    fetchTicket();
  }, [qrId]);

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
          ❌ Invalid ticket
        </p>
        <p className="text-gray-500">
          Please confirm your ticket reference or contact support.
        </p>
      </div>
    );

  if (status === "used")
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-yellow-50 border border-yellow-300 shadow-md rounded-2xl p-8 w-[90%] max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-yellow-600">
            ⚠️ Ticket Already Used
          </h2>
          <p className="text-gray-700 mb-4">
            This ticket has already been checked in. Please confirm with the
            event staff if this is unexpected.
          </p>
          {ticket && (
            <div className="text-left space-y-2">
              <p><span className="font-semibold">Name:</span> {ticket.name}</p>
              <p><span className="font-semibold">Ticket Type:</span> {ticket.ticketType}</p>
            </div>
          )}
        </div>
      </div>
    );

  if (status === "too_early")
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <div className="bg-white border border-blue-300 shadow-md rounded-2xl p-8 w-[90%] max-w-md">
          <div className="mb-4 inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-wide text-amber-700 border border-amber-300">
            🧪 Test Mode — Event Not Started Yet
          </div>
          <h2 className="text-2xl font-bold mb-2 text-blue-600">⏰ Pre-Event Scan</h2>
          <p className="text-gray-500 text-sm mb-6">
            {ticket?.message || "The event hasn't started yet, but this QR code is valid."}
          </p>
          {ticket && (
            <div className="text-left space-y-2 bg-gray-50 rounded-xl p-4">
              <p><span className="font-semibold">Name:</span> {ticket.name}</p>
              <p><span className="font-semibold">Ticket Type:</span> {ticket.ticketType}</p>
              <p><span className="font-semibold">QR ID:</span> <span className="font-mono text-xs">{ticket.qrId || qrId}</span></p>
            </div>
          )}
          <p className="mt-4 text-xs text-gray-400">This screen will show ✅ Verified on event day when scanning begins.</p>
        </div>
      </div>
    );

  if (status === "expired")
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-red-50 border border-red-300 shadow-md rounded-2xl p-8 w-[90%] max-w-md">
          <h2 className="text-3xl font-bold mb-4 text-red-600">
            ❌ Ticket Expired
          </h2>
          <p className="text-gray-700">
            This ticket has expired. Please contact support.
          </p>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-[90%] max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-green-600">
          ✅ Ticket Verified
        </h2>
        {ticket && (
          <div className="text-left space-y-2">
            <p><span className="font-semibold">Name:</span> {ticket.name}</p>
            <p><span className="font-semibold">Ticket Type:</span> {ticket.ticketType}</p>
          </div>
        )}
        <p className="mt-6 text-green-700 font-medium">
          Welcome to Step-Up Summit 3.0 🎉
        </p>
      </div>
    </div>
  );
};

export default VerifyTicket;
