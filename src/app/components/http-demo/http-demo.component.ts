import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

@Component({
  selector: 'app-http-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './http-demo.component.html',
  styleUrl: './http-demo.component.scss'
})
export class HttpDemoComponent {
  private http = inject(HttpClient);
  
  // Using JSONPlaceholder API for demo
  private apiUrl = 'https://jsonplaceholder.typicode.com';
  
  // State
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  selectedPost = signal<Post | null>(null);
  
  // Form data for POST/PUT
  newPost = signal({ title: '', body: '', userId: 1 });

  constructor() {
    this.loadPosts();
  }

  // GET Request
  loadPosts(): void {
    this.loading.set(true);
    this.error.set(null);
    
    this.http.get<Post[]>(`${this.apiUrl}/posts`)
      .pipe(
        retry(2), // Retry failed requests 2 times
        catchError(this.handleError.bind(this))
      )
      .subscribe({
        next: (data) => {
          this.posts.set(data.slice(0, 10)); // Limit to 10 posts
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message);
        }
      });
  }

  // GET Single Post
  getPost(id: number): void {
    this.loading.set(true);
    this.http.get<Post>(`${this.apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (post) => {
          this.selectedPost.set(post);
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message);
        }
      });
  }

  // Form field update helper
  updateNewPostField(field: string, value: any): void {
    this.newPost.update(post => ({
      ...post,
      [field]: value
    }));
  }

  // POST Request
  createPost(): void {
    if (!this.newPost().title || !this.newPost().body) return;
    
    this.loading.set(true);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    this.http.post<Post>(`${this.apiUrl}/posts`, this.newPost(), { headers })
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (post: any) => {
          this.posts.update(posts => [post, ...posts]);
          this.newPost.set({ title: '', body: '', userId: 1 });
          this.loading.set(false);
          alert('Post created successfully!');
        },
        error: (err: any) => {
          this.loading.set(false);
          this.error.set(err.message);
        }
      });
  }

  // PUT Request (Update)
  updatePost(id: number): void {
    this.loading.set(true);
    const updatedPost = { ...this.selectedPost()!, title: 'Updated Title', body: 'Updated Body' };
    
    this.http.put<Post>(`${this.apiUrl}/posts/${id}`, updatedPost)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: (post: any) => {
          this.posts.update(posts => {
            const index = posts.findIndex((p: any) => p.id === id);
            if (index > -1) {
              const updated = [...posts];
              updated[index] = post;
              return updated;
            }
            return posts;
          });
          this.selectedPost.set(post);
          this.loading.set(false);
          alert('Post updated successfully!');
        },
        error: (err: any) => {
          this.loading.set(false);
          this.error.set(err.message);
        }
      });
  }

  // DELETE Request
  deletePost(id: number): void {
    if (!confirm('Are you sure you want to delete this post?')) return;
    
    this.loading.set(true);
    this.http.delete(`${this.apiUrl}/posts/${id}`)
      .pipe(catchError(this.handleError.bind(this)))
      .subscribe({
        next: () => {
          this.posts.update(posts => posts.filter((p: any) => p.id !== id));
          if (this.selectedPost()?.id === id) {
            this.selectedPost.set(null);
          }
          this.loading.set(false);
          alert('Post deleted successfully!');
        },
        error: (err: any) => {
          this.loading.set(false);
          this.error.set(err.message);
        }
      });
  }

  // Error Handler
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}

