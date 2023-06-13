"use client";

import { useEffect } from "react";
import EmptyState from "./components/EmtyState";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState
      title="Something went wrong"
      subtitle="Contact us and show error details"
    />
  );
};

export default ErrorState;
