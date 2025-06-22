import { CommentService } from '../../comment.service';
import { UserComment } from './../../lib/interfaces';
import { Component, Input } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';

@Component({
  selector: 'app-comment',
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() commentData!: UserComment;

  constructor(private commentService: CommentService) { }

  likeComment() {
    console.log('ser')
    this.commentService.likeComment(this.commentData.id)
  }

  deleteComment() {
    this.commentService.removeComment(this.commentData.id)
  }


  getRelativeTime(date: Date): string {
    return formatDistanceToNow(date, { addSuffix: true });
  }

}
