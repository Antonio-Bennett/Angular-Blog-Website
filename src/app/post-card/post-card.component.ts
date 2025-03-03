import { Component, OnInit, Input } from '@angular/core';
import { BlogPost } from '../blogPost';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input() post: BlogPost;

  constructor() { }

  ngOnInit(): void {
  }

}
