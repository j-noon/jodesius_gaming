from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages  # ← Add this
from .models import Comment
from .forms import CommentForm


@login_required
def home(request):
    comments = Comment.objects.all().order_by('-created_at')
    if request.method == 'POST':
        form = CommentForm(request.POST)
        if form.is_valid():
            comment = form.save(commit=False)
            comment.user = request.user
            comment.save()
            messages.success(request, f"Thank you for your comment, {request.user.username}!")  # ← Add this
            return redirect('home')
    else:
        form = CommentForm()
    return render(request, 'home/index.html', {'comments': comments, 'form': form})


@login_required
def delete_comment(request, comment_id):
    comment = get_object_or_404(Comment, id=comment_id, user=request.user)
    comment.delete()
    return redirect('home')