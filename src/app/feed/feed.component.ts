import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface IPost{
  id: number,
  name: string,
  text: string,
  dateTime: string
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  id: number = 1;
  profileForm = this.fb.group({
    tweet: [ '', [Validators.required, Validators.maxLength(130)]],
  });
  posts!: IPost[];


  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  ngOnInit(){
    this.posts = [];
    this.updateFeed();
    if(this.posts?.length)
      this.id = this.posts.length;
  }

	open(content: any, post: IPost) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				if(result)
          this.posts = this.posts.filter(item => item.id != post.id)
			}
		);
	}

  trackByFn(index: number, item: IPost) {
    return index;
  }

  onSubmit(){
    const post: IPost = {
      id: this.id++,
      name: 'Lucas Vinicios',
      text: this.profileForm.get('tweet')?.value as string,
      dateTime: new Date().toString()
    }
    this.posts.push(post)
    localStorage.setItem('posts', JSON.stringify(this.posts))
    this.updateFeed();
  }

  updateFeed(){
    this.posts = [];
    let storage: IPost[] = JSON.parse(localStorage.getItem('posts') as string);
    storage.forEach(post => {
      this.posts.push(post)
    });
  }
}
