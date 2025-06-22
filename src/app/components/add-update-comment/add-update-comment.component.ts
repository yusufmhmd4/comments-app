import { CommentService } from './../../comment.service';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { v4 as uuid } from "uuid"
import { UserComment } from '../../lib/interfaces';

@Component({
  selector: 'app-add-update-comment',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-update-comment.component.html',
  styleUrl: './add-update-comment.component.css'
})
export class AddUpdateCommentComponent {

  constructor(private commentService: CommentService) { }

  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>()
  commentName: string = "Add Comment"
  name: string = ""
  requiredName: boolean = false;
  comment: string = ""


  closeModalDialog() {
    this.closeDialog.emit()
  }

  addNewComment() {
    if (!this.name) {
      this.requiredName = true
    } else {
      const newComment: UserComment = {
        id: uuid(),
        name: this.name,
        comment: this.comment,
        isLiked: false,
        datePosted: new Date()
      }
      this.commentService.addComment(newComment)
      this.closeModalDialog()
    }

  }

  onBlur() {
    if (!this.name) {
      this.requiredName = true
    } else {
      this.requiredName = false
    }
  }

}
