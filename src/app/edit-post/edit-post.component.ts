import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogPost } from 'src/app/blogPost';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  blogPost: BlogPost;
  tags: string;

  constructor(private posts: PostService, private route: ActivatedRoute, private navRoute: Router) { }

  ngOnInit(): void {
    this.posts.getPostbyId(this.route.snapshot.params['id']).subscribe(data => {
      this.blogPost = data;
      this.tags = this.blogPost.tags.toString();
    });
  }

  onSubmit() {
    this.blogPost.tags = this.tags.split(',').map(tag => tag.trim());
    this.posts.updatePostById(this.blogPost._id, this.blogPost).subscribe(() => {
      this.navRoute.navigate(['admin']);
    });
  }

  deletePost() {
    this.posts.deletePostById(this.blogPost._id).subscribe(() => {
      this.navRoute.navigate(['admin']);
    });
  }

}
