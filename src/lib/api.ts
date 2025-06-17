function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}

async function getWallData() {
  try {
    const response = await fetch(`${getApiUrl()}/wall/movies`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export { getWallData };