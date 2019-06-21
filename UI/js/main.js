const topNav = document.querySelector('#top-nav-bar');
const displayTabs = () => {
  if (topNav.className === 'topnav') {
    topNav.className += ' responsive';
  } else {
    topNav.className = 'topnav';
  }
};

topNav.addEventListener('click', displayTabs);
