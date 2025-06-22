import { Component } from '@angular/core';
import { AddUpdateCommentComponent } from './components/add-update-comment/add-update-comment.component';
import { CommonModule } from '@angular/common';
import { TabsCategoryComponent } from './components/tabs-category/tabs-category.component';
import { CommentComponent } from './components/comment/comment.component';

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
      this.filterComments()
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

  filterComments() {
    const searchValue = this.searchInput.toLowerCase();

    let filteredComments = this.initialCommentData;

    switch (this.selectedTab) {
      case "LIKED":
        filteredComments = filteredComments.filter(comment => comment.isLiked);
        break;
      case "DISLIKED":
        filteredComments = filteredComments.filter(comment => !comment.isLiked);
        break;
    }

    this.commentsData = filteredComments.filter(comment =>
      comment.name.toLowerCase().includes(searchValue) ||
      comment.comment.toLowerCase().includes(searchValue)
    );
  }

  changeSearchInput() {
    this.filterComments();
  }

  setTab(selectedTab: string) {
    this.selectedTab = selectedTab;
    this.filterComments();
  }

}
