import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/blogPost';
import { PostService } from '../post.service';
import { Router, Event, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-footer-posts',
  templateUrl: './footer-posts.component.html',
  styleUrls: ['./footer-posts.component.css']
})
export class FooterPostsComponent implements OnInit {

  posts: Array<BlogPost>;

  constructor(private allPosts: PostService, private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
      this.allPosts.getPosts(1, null, null).subscribe(data => this.posts = data.slice(0, 3));
      }
    });
  }

}
