import { useRouteError } from "react-router-dom";

export function ErrorBoundary() {
  const error = useRouteError();

  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
    if (typeof error === "string") return error;
    return "Неизвестная ошибка";
  }

  return (
    <div>
      <h1>Ошибка!</h1>
      <p>{getErrorMessage(error)}</p>
    </div>
  );
}
