export const IconFriends = (
  isActive: boolean,
  colorActive: string,
  colorDeactive?: string,
) => {
  const stroke = isActive ? colorActive : colorDeactive || '#65676b';
  if (!isActive) {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="8" r="3.5" stroke="${stroke}" stroke-width="1.8"/>
<circle cx="17" cy="9" r="2.5" stroke="${stroke}" stroke-width="1.8"/>
<path d="M2.5 19C2.5 16.5 5 14.5 9 14.5C13 14.5 15.5 16.5 15.5 19V20H2.5V19Z" stroke="${stroke}" stroke-width="1.8" stroke-linejoin="round"/>
<path d="M16 14.5C18.5 14.7 21.5 16 21.5 18.5V19.5H17" stroke="${stroke}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  }
  return `<svg width="26" height="26" viewBox="0 0 24 24" fill="${colorActive}" xmlns="http://www.w3.org/2000/svg">
<circle cx="9" cy="8" r="4" />
<circle cx="17" cy="9" r="3" />
<path d="M2 19.5C2 16.5 5 14 9 14C13 14 16 16.5 16 19.5V20.5H2V19.5Z" />
<path d="M16.5 14.2C19.5 14.5 22 16.3 22 18.5V20H17V19.5C17 17.5 16 15.5 16.5 14.2Z" />
</svg>`;
};
