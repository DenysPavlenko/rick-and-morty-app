import checkPropTypes from 'check-prop-types';

export const findByTestAtt = (wrapper, val) =>
  wrapper.find(`[data-test="${val}"]`);

export const checkProps = (component, expectedProps) => {
  const propsErr = checkPropTypes(
    component.propTypes,
    expectedProps,
    'props',
    component.name
  );
  return propsErr;
};
