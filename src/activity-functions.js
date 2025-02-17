export function prefix(location, ...prefixes) {
  return prefixes.some(prefix => location.href.indexOf(`${location.origin}/${prefix}`) !== -1);
}

export function nav() {
  // The nav is always active
  return true;
}

export function angular(location) {
  return prefix(location, 'angular');
}

export function react(location) {
  return prefix(location, 'react');
}

export function vue(location) {
  return prefix(location, 'vue');
}
