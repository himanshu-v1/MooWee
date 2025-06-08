function getApiUrl() {
  return process.env.REACT_APP_API_URL;
}

async function getWallData() {
    const response = await fetch(`${getApiUrl()}/wall`);
    const data = await response.json();
    return data;
}

export { getWallData };