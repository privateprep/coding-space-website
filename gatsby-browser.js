export const shouldUpdateScroll = ({ routerProps }) => {
  const disableScrollUpdate = routerProps?.location?.state?.disableScrollUpdate || false;
  return !disableScrollUpdate
}
