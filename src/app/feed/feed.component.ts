import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

export interface IPost {
  id: number;
  name: string;
  username: string;
  text: string;
  dateTime: string;
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit, OnDestroy {
  id: number = 1;
  caracteres: number = 130;
  caracteresRestantes: number = 130;
  subs: Subscription | undefined;
  profileForm = this.fb.group({
    tweet: ['', [Validators.required, Validators.maxLength(130)]],
  });
  posts!: IPost[];

  constructor(private fb: FormBuilder, private modalService: NgbModal) {}

  ngOnInit() {
    this.posts = [];
    this.updateFeed();
    if (this.posts?.length) this.id = this.posts.length + 1;
    this.subs = this.profileForm
      .get('tweet')
      ?.valueChanges.subscribe((text) => {
        if (text) this.caracteresRestantes = this.caracteres - text?.length;
      });
  }

  open(post: IPost) {
    this.modalService
      .open(ModalComponent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then((result) => {
        if (result)
          this.posts = this.posts.filter((item) => item.id != post.id);
      },
			() => {});
  }

  onSubmit() {
    const newId = this.id++;
    const post: IPost = {
      id: newId,
      name: 'Lucas Vinicios',
      username: 'lucasviniciosfs',
      text: this.profileForm.get('tweet')?.value as string,
      dateTime: new Date().getTime().toString(),
    };
    this.posts.reverse().push(post);
    localStorage.setItem('posts', JSON.stringify(this.posts));
    this.updateFeed();
    this.profileForm.reset()
  }

  updateFeed() {
    this.posts = [];
    let storage: IPost[] = JSON.parse(localStorage.getItem('posts') as string);
    storage?.reverse().forEach((post) => {
      this.posts.push(post);
    });
  }

  ngOnDestroy(): void {
    this.subs?.unsubscribe();
  }
}
