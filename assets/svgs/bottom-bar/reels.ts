export const IconReels = (
  isActive: boolean,
  colorActive: string,
  colorDeactive?: string,
) => {
  const stroke = isActive ? colorActive : colorDeactive || '#65676b';
  if (!isActive) {
    return `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="3" y="3" width="18" height="18" rx="4" stroke="${stroke}" stroke-width="1.8"/>
<path d="M3 8H21" stroke="${stroke}" stroke-width="1.8"/>
<path d="M8 3L8 8" stroke="${stroke}" stroke-width="1.8"/>
<path d="M16 3L16 8" stroke="${stroke}" stroke-width="1.8"/>
<path d="M10.5 12L15 14.5L10.5 17V12Z" fill="${stroke}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/>
</svg>`;
  }
  return `<svg width="26" height="26" viewBox="0 0 24 24" fill="${colorActive}" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM10.5 9.5C10.0833 9.25 9.5 9.55 9.5 10.05V15.95C9.5 16.45 10.0833 16.75 10.5 16.5L15 14C15.4167 13.75 15.4167 13.25 15 13L10.5 9.5Z" />
</svg>`;
};
