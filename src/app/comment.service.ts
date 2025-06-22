import { Injectable } from '@angular/core';
import { UserComment } from './lib/interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor() {
    const storedComments = localStorage.getItem("commentData");
    if (storedComments) {
      this.commentsList = JSON.parse(storedComments);
      this.commentSubject.next(this.commentsList); // emit loaded data
    }
  }

  commentsList: UserComment[] = []

  commentSubject: BehaviorSubject<UserComment[]> = new BehaviorSubject<UserComment[]>(this.commentsList);

  addComment(comment: UserComment): void {
    this.commentsList.push(comment)
    this.commentSubject.next(this.commentsList)
    localStorage.setItem("commentData", JSON.stringify(this.commentsList))
  }

  getAllComments(): Observable<UserComment[]> {
    return this.commentSubject.asObservable()
  }

  likeComment(commentId: string): void {
    const comment = this.commentsList.find(comment => comment.id === commentId)
    if (comment) {
      comment.isLiked = !comment.isLiked
    }
    this.commentSubject.next(this.commentsList)
    localStorage.setItem("commentData", JSON.stringify(this.commentsList))
  }

  removeComment(commentId: string): void {
    this.commentsList = this.commentsList.filter(comment => comment.id !== commentId)
    this.commentSubject.next(this.commentsList)
    localStorage.setItem("commentData", JSON.stringify(this.commentsList))
  }

}
