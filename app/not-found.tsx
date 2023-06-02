import React from "react";
import EmptyState from "./components/EmtyState";

const NotFound: React.FC = () => {
  return (
    <EmptyState title="Page not found" subtitle="Try to visit main page" />
  );
};

export default NotFound;
