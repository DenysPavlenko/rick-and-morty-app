import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  data: null,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...initialState,
        loading: true,
      };
    case 'SUCCESS':
      return {
        ...initialState,
        data: action.payload,
      };
    case 'FAILURE':
      return {
        ...initialState,
        error: action.payload,
      };
    default:
      return state;
  }
};

const useHttp = (service) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchData = useCallback(async (params) => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await service(params);
      dispatch({ type: 'SUCCESS', payload: data });
    } catch (e) {
      dispatch({ type: 'FAILURE', payload: e.message });
    }
  }, []);

  return {
    fetchData,
    loading: state.loading,
    data: state.data,
    error: state.error,
  };
};

export default useHttp;
