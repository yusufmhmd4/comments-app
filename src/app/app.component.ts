import { Component } from '@angular/core';
import { AddUpdateCommentComponent } from './components/add-update-comment/add-update-comment.component';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TabsCategoryComponent } from './components/tabs-category/tabs-category.component';
import { CommentComponent } from './components/comment/comment.component';

import DummyData from "./lib/dummyData.json"
import { FormsModule } from '@angular/forms';
import { CommentService } from './comment.service';
import { UserComment } from './lib/interfaces';

@Component({
  selector: 'app-root',
  imports: [AddUpdateCommentComponent, TabsCategoryComponent, CommentComponent, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


  constructor(private commentService: CommentService) {
  }

  ngOnInit() {
    this.getCommentData()
    this.commentService.getAllComments()
  }

  getCommentData() {
    this.commentService.getAllComments().subscribe((data: UserComment[]) => {
      this.commentsData = data
      this.initialCommentData = data
      console.log(data)
    })
  }

  title = 'comments-app';

  initialCommentData: UserComment[] = []
  commentsData: UserComment[] = []

  showAddComment: boolean = false;
  searchInput: string = ""
  selectedTab: string = "ALL"

  addCommentButtonClick() {
    this.showAddComment = !this.showAddComment
  }

  closeDialog() {
    this.showAddComment = false
  }

  changeSearchInput() {
    this.commentsData = this.initialCommentData.filter((comment: UserComment) => comment.name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()) || comment.comment.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase()))
  }


  setTab(selectedTab: string) {
    this.selectedTab = selectedTab
    switch (this.selectedTab) {
      case "ALL":
        this.commentsData = this.initialCommentData
        break;
      case "LIKED":
        this.commentsData = this.initialCommentData.filter(comment => comment.isLiked)
        break;
      case "DISLIKED":
        this.commentsData = this.initialCommentData.filter(comment => !comment.isLiked)
        break;
      default:
        break;
    }
  }
}
