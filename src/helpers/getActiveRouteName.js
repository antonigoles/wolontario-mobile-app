export function getActiveRouteName(state) {
    if (!state || typeof state.index !== 'number') {
      return 'Unknown';
    }
  
    const route = state.routes[state.index];
  
    if (route.state) {
      return getActiveRouteName(route.state);
    }
  
    return route.name;
  }
  