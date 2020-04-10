import { Component, OnInit } from '@angular/core';
import { BlogPost } from 'src/app/blogPost';
import { PostService } from '../post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-data',
  templateUrl: './post-data.component.html',
  styleUrls: ['./post-data.component.css']
})
export class PostDataComponent implements OnInit {

  querySub;
  post: BlogPost;
  commentName: string;
  commentText: string;

  constructor(private posts: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.querySub = this.route.params.subscribe(params => {
      this.posts.getPostbyId(params['id']).subscribe(data => {
        this.post = data;
        this.post.views += 1;
        this.posts.updatePostById(this.post._id, this.post).subscribe();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.querySub) {
      this.querySub.unsubscribe();
    }
  }

  submitComment() {
    const obj = {
      author: this.commentName,
      comment: this.commentText,
      date: new Date().toLocaleDateString()
    };

    this.post.comments.push(obj);
    this.posts.updatePostById(this.post._id, this.post).subscribe(() => {
      this.commentName = null;
      this.commentText = null;
    });
  }

}
