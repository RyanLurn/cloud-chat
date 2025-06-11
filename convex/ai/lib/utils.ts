function hasDelimiter(response: string) {
  return (
    response.includes("\n") ||
    response.includes(".") ||
    response.includes("?") ||
    response.includes("!") ||
    response.includes(",") ||
    response.length > 100
  );
}

export { hasDelimiter };
