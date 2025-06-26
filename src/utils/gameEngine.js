// Fisher-Yates shuffle
export const shuffleArray = array => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

// /src/utils/gameEngine.js

export const getRandomDuelers = (names) => {
  const [dueler1, dueler2] = shuffleArray(names).slice(0, 2);
  return [dueler1, dueler2];
};

export const getRandomRoles = (roles) => {
  const [role1, role2] = shuffleArray(roles).slice(0, 2);
  return [role1, role2];
};
