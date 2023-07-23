const logout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // If logout is successful, redirect the browser to the homepage
    document.location.replace('/');
  } else {
    // Display an alert with the error message if logout fails
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
