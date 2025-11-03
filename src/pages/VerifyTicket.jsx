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
          `https://api.stepupsummit.org/api/tickets/verify-ticket?ref=${reference}`
        );
        setTicket(res.data);
        setStatus("success");
      } catch (err) {
        setStatus("error");
      }
    };

    fetchTicket();
  }, [reference]);

  if (status === "loading")
    return <p className="text-center mt-20">Verifying your ticket...</p>;

  if (status === "error")
    return (
      <p className="text-center mt-20 text-red-500">
        ❌ Invalid or expired ticket reference.
      </p>
    );

  return (
    <div className="max-w-lg mx-auto text-center mt-20">
      <h2 className="text-2xl font-bold mb-3 text-green-600">✅ Ticket Verified</h2>
      <p>
        Name: <b>{ticket.fullName}</b>
      </p>
      <p>
        Email: <b>{ticket.email}</b>
      </p>
      <p>
        Ticket Type: <b>{ticket.ticketType}</b>
      </p>
      <p>
        Reference: <b>{reference}</b>
      </p>
    </div>
  );
};

export default VerifyTicket;
