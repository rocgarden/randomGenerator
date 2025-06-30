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

// export const getRandomRoles = roles => {
//   const shuffled = shuffleArray(roles);
//   return [shuffled[0], shuffled[1]];
// };


//generateScene and roles

export const generateSceneAssignments = (names, sceneData) => {
  const scene = sceneData[Math.floor(Math.random() * sceneData.length)];
  const shuffledNames = shuffleArray(names);
  const shuffledRoles = shuffleArray(scene.roles);

  const leaderRole = shuffledRoles[0];
  const repeatedRoles = shuffledRoles.slice(1);

  const assignments = shuffledNames.map((name, index) => {
    let role;
    if (index === 0) {
      role = leaderRole;
    } else {
      const repeatIndex = (index - 1) % repeatedRoles.length;
      const baseRole = repeatedRoles[repeatIndex];
      const suffix = Math.floor((index - 1) / repeatedRoles.length) + 1;
      role = {
        ...baseRole,
        name: `${baseRole.name} ${suffix > 1 ? suffix : ''}`.trim(),
      };
    }
    return {name, role};
  });

  return {scene, assignments};
};

