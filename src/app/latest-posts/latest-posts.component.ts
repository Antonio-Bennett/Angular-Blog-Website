import { Component, OnInit } from '@angular/core';
import { BlogPost } from '../blogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-latest-posts',
  templateUrl: './latest-posts.component.html',
  styleUrls: ['./latest-posts.component.css']
})
export class LatestPostsComponent implements OnInit {

  posts: Array<BlogPost>;

  constructor(private allPosts: PostService) { }

  ngOnInit(): void {
    this.allPosts.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0, 3));
  }

}
