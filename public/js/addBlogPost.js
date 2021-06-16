async function newBlogHandler(event) {
  event.preventDefault();

  const subject = document.querySelector('input[name="post-subject"]').value;
  const description = document.querySelector('input[name="post-desc"]').value;

  const response = await fetch(`/api/blogs`, {
    method: 'POST',
    body: JSON.stringify({
      subject,
      description
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#newBlogPost').addEventListener('submit', newBlogHandler);
