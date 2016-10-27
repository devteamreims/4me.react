export const SELECT_TAB = 'arcid/resultTabs/SELECT_TAB';

function selectTab(tab) {
  return {
    type: SELECT_TAB,
    tab,
  };
}

export function showResults() {
  return selectTab('results');
}

export function showHistory() {
  return selectTab('history');
}
