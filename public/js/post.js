// Function to handle comment submission for a blog post
const commentFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the comment form
    const commentText = document.querySelector('#comment-text').value.trim();
    const postId = event.target.getAttribute('data-id');
  
    if (commentText && postId) {
      // Send a POST request to the create comment API endpoint
      const response = await fetch(`/api/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ text: commentText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // If comment submission is successful, reload the page to display the new comment
        document.location.reload();
      } else {
        alert('Failed to submit comment');
      }
    }
  };
  
  // Function to handle updating a blog post
  const updateFormHandler = async (event) => {
    event.preventDefault();
  
    // Collect values from the update form
    const updatedTitle = document.querySelector('#update-title').value.trim();
    const updatedContent = document.querySelector('#update-content').value.trim();
    const postId = event.target.getAttribute('data-id');
  
    if (updatedTitle && updatedContent && postId) {
      // Send a PUT request to the update post API endpoint
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // If post update is successful, redirect the browser to the updated post page
        document.location.replace(`/post/${postId}`);
      } else {
        alert('Failed to update post');
      }
    }
  };
  
  // Function to handle deleting a blog post
  const deleteButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const postId = event.target.getAttribute('data-id');
  
      // Send a DELETE request to the delete post API endpoint
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // If post deletion is successful, redirect the browser to the dashboard page
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  // Add event listeners for comment submission, update form submission, and delete button click
  document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
  document.querySelector('.update-form').addEventListener('submit', updateFormHandler);
  document.querySelector('.delete-button').addEventListener('click', deleteButtonHandler);
  