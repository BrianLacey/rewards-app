export const getAllRewards = async (data) => {
  try {
    const response = await fetch(
      "http://localhost:8080/api/rewards/calculate-all",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e.message);
  }
};

export const getThreeMonthRewards = async (data, startMonth, startYear) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/rewards/calculate-quarterly?startMonth=${parseInt(startMonth)}&startYear=${parseInt(startYear)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (e) {
    console.error(e.message);
  }
};
