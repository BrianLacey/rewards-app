export const getAllRewards = async () => {
  try {
    const response = await fetch("http://localhost:8080");
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e.message);
  }
};
