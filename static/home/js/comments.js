document.addEventListener('DOMContentLoaded', function() {
    // Delete button functionality
    document.getElementById('delete-last-btn')?.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        if (confirm('Are you sure you want to delete this comment?')) {
            // Get the CSRF token from the existing form
            const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            
            // Create form data
            const formData = new FormData();
            formData.append('csrfmiddlewaretoken', csrfToken);
            formData.append('comment_id', commentId);
            
            // Send the request
            fetch('/delete-comment/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;  // Follow the redirect
                }
            })
            .catch(error => console.error('Error:', error));
        }
    });

    // Edit button functionality (unchanged)
    document.getElementById('edit-last-btn')?.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        const commentText = document.querySelector(`.single-comment[data-comment-id="${commentId}"] .comment-text`).textContent;
        document.getElementById('id_text').value = commentText;
        
        let editInput = document.getElementById('edit_comment_id');
        if (!editInput) {
            editInput = document.createElement('input');
            editInput.type = 'hidden';
            editInput.name = 'edit_comment_id';
            editInput.id = 'edit_comment_id';
            document.getElementById('comment-form').appendChild(editInput);
        }
        editInput.value = commentId;
        
        document.getElementById('comment-btn').textContent = 'Update Comment';
    });
});