export function trimString(string, limit) {
  return string.slice(0, limit);
}

export function getToastObject(title, description, status, duration) {
  return {
    title,
    description,
    status,
    duration,
    isClosable: true,
  };
}
export function getRequestHeader(token) {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}
