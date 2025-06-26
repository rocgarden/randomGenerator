import React, {useContext, useReducer, createContext, useState} from 'react';
import {reducer, ACTIONS, initialState} from '../components/NamesReducer';

const NameListContext = createContext();

export const NameListProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [name, setName] = useState('');
  const [groupCount, setGroupCount] = useState(0);
  const [groupNames, setGroupNames] = useState([]);
  
  const setGameMode = gameMode =>
    dispatch({type: ACTIONS.GAME_MODE, payload: gameMode});


  const handleAddName = () => {
    if (name.trim() != '') {
      dispatch({type: ACTIONS.ADD_NAME, payload: name});
      setName('');
    }
  };

  const handleShuffleNames = () => {
    dispatch({type: ACTIONS.SHUFFLE_NAMES});
  };

  const handleCreatePairs = () => {
    dispatch({type: ACTIONS.CREATE_PAIRS});
  };

  const handleDeleteName = nameToDelete => {
    dispatch({type: ACTIONS.DELETE_NAME, payload: nameToDelete});
  };

  const handleCreateGroups = () => {
    dispatch({type: ACTIONS.CREATE_GROUPS, payload: {groupCount}});
  };
  const handleSetGroupNames = names => {
    // Dispatch to set custom group names
    dispatch({type: ACTIONS.SET_GROUP_NAMES, payload: {groupNames: names}});
  };

  // Function to clear all names and groups
  const handleClearNames = () => {
    dispatch({type: ACTIONS.CLEAR}); // Dispatch the CLEAR action
  };

  const clearGameMode = () => dispatch({type: ACTIONS.CLEAR_GAME_MODE});
  const resetAll = () => dispatch({type: ACTIONS.RESET_ALL});

  return (
    <NameListContext.Provider
      value={{
        state,
        handleAddName,
        handleShuffleNames,
        handleCreatePairs,
        handleDeleteName,
        handleCreateGroups,
        handleSetGroupNames,
        handleClearNames,
        name,
        setName,
        groupCount,
        setGroupCount,
        groupNames,
        setGroupNames,
        setGameMode, // expose game mode setter
        clearGameMode,
        resetAll,
      }}>
      {children}
    </NameListContext.Provider>
  );
};
//custom Hook for names useContext
export const useNameList = () => {
  return useContext(NameListContext);
};
