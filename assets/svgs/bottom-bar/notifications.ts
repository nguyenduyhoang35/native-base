export const IconNotifications = (
  isActive: boolean,
  colorActive: string,
  colorDeactive?: string,
) => {
  const stroke = isActive ? colorActive : colorDeactive || '#65676b';
  if (!isActive) {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.5 17.5V11C5.5 7.41015 8.41015 4.5 12 4.5C15.5899 4.5 18.5 7.41015 18.5 11V17.5H5.5Z" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M3.5 17.5H20.5" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round"/>
<path d="M10 20.5C10 21.6046 10.8954 22.5 12 22.5C13.1046 22.5 14 21.6046 14 20.5" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round"/>
<path d="M12 2V4" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round"/>
</svg>`;
  }
  return `<svg width="26" height="26" viewBox="0 0 24 24" fill="${colorActive}" xmlns="http://www.w3.org/2000/svg">
<path d="M12 2C12.5523 2 13 2.44772 13 3V4.07089C16.3923 4.55612 19 7.47353 19 11V17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18C3 17.4477 3.44772 17 4 17H5V11C5 7.47353 7.60771 4.55612 11 4.07089V3C11 2.44772 11.4477 2 12 2Z" />
<path d="M10 20.5C10 21.6046 10.8954 22.5 12 22.5C13.1046 22.5 14 21.6046 14 20.5H10Z" />
</svg>`;
};
