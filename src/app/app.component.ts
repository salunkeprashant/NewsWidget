// app.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

interface Source {
  id: string | null;
  name: string;
}

interface Article {
  source: Source;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  articles: Article[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  private apiUrl = 'https://newsapi.org/v2/top-headlines?language=en&apiKey=d948c11e91b04de9bbcd5bb0065a395c';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNews();
  }

  private fetchNews(): void {
    this.http.get<NewsResponse>(this.apiUrl).pipe(
      catchError(error => {
        this.errorMessage = 'Failed to load news data.';
        this.loading = false;
        return throwError(() => new Error(error));
      })
    ).subscribe({
      next: (data) => {
        this.articles = data.articles;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching news:', error);
        this.errorMessage = 'Failed to load news data.';
        this.loading = false;
      }
    });
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/placeholder.jpg';
  }
}
