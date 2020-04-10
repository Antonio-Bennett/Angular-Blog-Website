import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  tags: Array<string>;

  constructor(private posts: PostService) { }

  ngOnInit(): void {
    this.posts.getTags().subscribe(data => this.tags = data);
  }

}
