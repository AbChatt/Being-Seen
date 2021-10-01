const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  property: Y
): obj is X & Record<Y, unknown> => {
  return obj.hasOwnProperty(property);
};

export default hasOwnProperty;
