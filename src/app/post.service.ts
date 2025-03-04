import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/blogPost';
import { HttpClient } from '@angular/common/http';

const perPage = 6;

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`https://blog-api-web422.herokuapp.com/api/posts?page=1&perPage=${Number.MAX_SAFE_INTEGER}`);
  }

  getPosts(page, tag, category): Observable<BlogPost[]> {

    if (tag != null && category == null) {
      return this.http.get<BlogPost[]>(`https://blog-api-web422.herokuapp.com/api/posts?page=${page}&perPage=${perPage}
      &tag=${tag}`);
    } else if (tag == null && category != null) {
      return this.http.get<BlogPost[]>(`https://blog-api-web422.herokuapp.com/api/posts?page=${page}&perPage=${perPage}
      &category=${category}`);
    } else if (tag != null && category != null) {
      return this.http.get<BlogPost[]>(`https://blog-api-web422.herokuapp.com/api/posts?page=${page}&perPage=${perPage}
      &tag=${tag.substr(1)}&category=${category}`);
    } else {
      return this.http.get<BlogPost[]>(`https://blog-api-web422.herokuapp.com/api/posts?page=${page}&perPage=${perPage}`);
    }
  }

  getPostbyId(id): Observable<BlogPost> {
    return this.http.get<BlogPost>(`https://blog-api-web422.herokuapp.com/api/posts/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get('https://blog-api-web422.herokuapp.com/api/categories');
  }

  getTags(): Observable<string[]> {
    return this.http.get<string[]>('https://blog-api-web422.herokuapp.com/api/tags');
  }

  newPost(data: BlogPost): Observable<any> {
    return this.http.post<any>(`https://blog-api-web422.herokuapp.com/api/posts`, data);
  }

  updatePostById(id: string, data: BlogPost): Observable<any> {
    return this.http.put<any>(`https://blog-api-web422.herokuapp.com/api/posts/${id}`, data);
  }

  deletePostById(id: string): Observable<any> {
    return this.http.delete<any>(`https://blog-api-web422.herokuapp.com/api/posts/${id}`);
  }
}
