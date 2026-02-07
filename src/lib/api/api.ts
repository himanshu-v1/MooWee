function getApiUrl() {
  console.log('API URL:', () => {
    return process.env.NEXT_PUBLIC_SERVER_URL ? 'Prod URL' : 'Local URL';
  });
  return process.env.NEXT_PUBLIC_SERVER_URL || process.env.NEXT_PUBLIC_API_URL;
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

async function getWallTvData() {
  try {
    const response = await fetch(`${getApiUrl()}/wall/tv`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getMovieData({id}: { id?: string}) {
  try {
    const response = await fetch(`${getApiUrl()}/direct/${id}`);
    if(response.status === 204) {
      throw new Error('Invalid Id', {cause: { status: 204 }});
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

async function getTvData({id}: { id?: string}) {
  try {
    const response = await fetch(`${getApiUrl()}/directtv/${id}`);
    if(response.status === 204) {
      throw new Error('Invalid Id', {cause: { status: 204 }});
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export { getWallData, getMovieData, getWallTvData, getTvData };