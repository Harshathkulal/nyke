// ErrorPage.tsx
import React from "react";

interface ErrorPageProps {
  message: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center text-center p-8 bg-red-50 rounded-lg border border-red-200">
      <h2 className="text-xl text-red-600 font-semibold">{message}</h2>
    </div>
  );
};

export default ErrorPage;
