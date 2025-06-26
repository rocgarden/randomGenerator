export const ACTIONS = {
  ADD_NAME: 'add-name',
  SHUFFLE_NAMES: 'shuffle-names',
  CREATE_PAIRS: 'create-pairs',
  DELETE_NAME: 'delete-name',
  CREATE_GROUPS: 'create-groups',
  SET_GROUP_NAMES: 'set_group_names',
  CLEAR: 'clear', // New action to clear all names and groups
  GAME_MODE: 'game-mode',
  CLEAR_GAME_MODE: 'clear-game-mode',
  RESET_ALL: 'reset-all',
};

export const initialState = {
  names: [],
  shuffledNames: [],
  namePairs: [],
  nameGroups: [],
  groups: [], //store groups
  groupNames: [], //store group names
  gameMode: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_NAME:
      return {
        ...state,
        names: [...state.names, action.payload],
        shuffledNames: [...state.shuffledNames], //use to keep list of names unchanged
      };

    case ACTIONS.SHUFFLE_NAMES:
      const shuffled = [...state.names];
      console.log(shuffled);

      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return {
        ...state,
        shuffledNames: shuffled,
      };

    case ACTIONS.CREATE_PAIRS:
      const shuffle = state.shuffledNames.slice();
      console.log(shuffle);
      let pairs = [];
      for (let i = 0; i < shuffle.length; i += 2) {
        if (i + 1 < shuffle.length) {
          pairs.push([shuffle[i], shuffle[i + 1]]);
        } else {
          pairs.push([shuffle[i], 'No Pair']); // odd number array
        }
      }
      return {
        ...state,
        namePairs: pairs,
      };

    case ACTIONS.DELETE_NAME:
      return {
        ...state,
        names: state.names.filter(name => name !== action.payload), //remove name from original list
        shuffledNames: state.shuffledNames.filter(
          name => name !== action.payload,
        ), //remove name from list of shuffled names
        namePairs: state.namePairs.filter(
          pair => !pair.includes(action.payload),
        ), //remove name from existing pair set
      };

    // case ACTIONS.CREATE_GROUPS:
    //   const shuffledForGroups = [...state.shuffledNames];
    //   const groupCount = action.payload.groupCount;
    //   const groups = [];
    //   const groupSize = Math.floor(shuffledForGroups.length / groupCount);
    //   let remainder = shuffledForGroups.length % groupCount;
    //   for (let i = 0; i < groupCount; i++) {
    //     const currentGroupSize = groupSize + (remainder > 0 ? 1 : 0);
    //     groups.push(shuffledForGroups.splice(0, currentGroupSize));
    //     remainder--;
    //   }
    //   return {
    //     ...state,
    //     nameGroups: groups,
    //   };
    case ACTIONS.CREATE_GROUPS:
      // Create groups based on the specified count
      const numGroups = action.payload.groupCount;
      const groups = Array.from({length: numGroups}, () => []);
      let currentIndex = 0;

      // Distribute names into groups
      state.names.forEach(name => {
        groups[currentIndex].push(name);
        currentIndex = (currentIndex + 1) % numGroups;
      });

      return {
        ...state,
        groups,
      };

    case ACTIONS.SET_GROUP_NAMES:
      // Set custom group names
      return {
        ...state,
        groupNames: action.payload.groupNames,
      };

    case ACTIONS.CLEAR:
      return initialState; // Reset state to initial values

    case ACTIONS.GAME_MODE:
      return {...state, gameMode: action.payload}; // <-- new!

    case ACTIONS.CLEAR_GAME_MODE:
      return {...state, gameMode: null};

    case ACTIONS.RESET_ALL:
      return initialState; // Reset state to initial values

      // return {...state, initialState};

    default:
      return state;
  }
};
