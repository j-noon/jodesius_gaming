document.addEventListener('DOMContentLoaded', function() {
    // Delete button functionality (unchanged)
    document.getElementById('delete-last-btn')?.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        if (confirm('Are you sure you want to delete this comment?')) {
            const formData = new FormData();
            formData.append('csrfmiddlewaretoken', document.querySelector('[name=csrfmiddlewaretoken]').value);
            formData.append('comment_id', commentId);
            
            fetch('/delete-comment/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                },
            })
            .then(response => {
                if (response.redirected) {
                    window.location.href = response.url;
                }
            })
            .catch(error => console.error('Delete error:', error));
        }
    });

    // Edit button functionality (modified to remove the prompt text)
    document.getElementById('edit-last-btn')?.addEventListener('click', function() {
        const commentId = this.getAttribute('data-comment-id');
        const textInput = document.getElementById('id_text');
        
        if (!textInput) return;
        
        // Removed the "Please edit here>> " line completely
        textInput.value = ""; // Now just clears the field
        textInput.focus();
        
        // Set up edit mode
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