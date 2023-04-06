/**
 * @param childType = child.type, where child is an element in children
 * @returns the child component's name / tag
 */
export const getChildTypeName = (
  childType: string | React.JSXElementConstructor<unknown>
) => {
  if (typeof childType === "string") {
    return childType;
  } else if ("displayName" in childType) {
    return childType.displayName;
  }
  return undefined;
};
