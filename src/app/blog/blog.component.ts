import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogPost } from 'src/app/blogPost';
import { PostService } from '../post.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blogPosts: Array<BlogPost>;
  page = 1;
  tag: string = null;
  category: string = null;
  querySub;

  constructor(private posts: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.queryParams.subscribe(params => {

      if (params['tag']) {
        this.tag = params['tag'];
        this.category = null;
        console.log('in');
      } else {
        this.tag = null;
      }

      if (params['category']) {
        this.category = params['category'];
        this.tag = null;
      } else {
        this.category = null;
      }

      this.getPage(+params['page'] || 1);
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  getPage(num: number) {
    this.posts.getPosts(num, this.tag, this.category).subscribe(posts => {
      if (posts.length > 0) {
        this.blogPosts = posts;
        this.page = num;
      }
    });
  }

}
