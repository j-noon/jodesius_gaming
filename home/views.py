from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponseForbidden, JsonResponse
from django.views.decorators.http import require_POST
from .models import Comment
from .forms import CommentForm


@login_required
def home(request):
    comments = Comment.objects.all().order_by('-created_at')
    last_user_comment = Comment.objects.filter(user=request.user).order_by('-created_at').first()

    if request.method == 'POST':
        # Check if we're editing an existing comment
        if 'edit_comment_id' in request.POST:
            comment = get_object_or_404(Comment, id=request.POST['edit_comment_id'])
            if comment.user != request.user:
                return HttpResponseForbidden("You can only edit your own comments.")

            form = CommentForm(request.POST, instance=comment)
            if form.is_valid():
                form.save()
                messages.success(request, "Comment updated successfully!")
                return redirect('home')
        else:
            # Creating a new comment
            form = CommentForm(request.POST)
            if form.is_valid():
                comment = form.save(commit=False)
                comment.user = request.user
                comment.save()
                messages.success(request, f"Thank you for your comment, {request.user.username}!")
                return redirect('home')
    else:
        form = CommentForm()

    return render(request, 'home/index.html', {
        'comments': comments,
        'form': form,
        'last_user_comment': last_user_comment
    })


@login_required
@require_POST
def delete_comment(request):
    comment_id = request.POST.get('comment_id')
    comment = get_object_or_404(Comment, id=comment_id)

    if comment.user != request.user:
        return HttpResponseForbidden("You can only delete your own comments.")

    comment.delete()
    messages.success(request, "Comment deleted successfully.")
    return redirect('home')
