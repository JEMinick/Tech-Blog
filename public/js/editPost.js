async function editBlogHandler(event) {
  event.preventDefault();

  const title = document.querySelector('input[name="post-title"]').value.trim();
  const content = document.querySelector('input[name="content"]').value.trim();
  console.log( "Subject:" );
  console.log(title);
  console.log( "Description:" );
  console.log(content);

  console.log( `\n${window.location.toString()}\n` );

  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  console.log( `Update BLOG [#${id}]...` );

  const response = await fetch(`/dashboard/update/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      post_id: id,
      subject: title,
      description: content
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

}

document.querySelector('#save-post-btn').addEventListener('click', editBlogHandler);
