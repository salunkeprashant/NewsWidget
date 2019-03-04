import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { environment } from '../environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  apiService: ApiService;
  modalService: NgbModal;
  modalRef: NgbModalRef;

  newsArticles: Array<any>;
  filteredArticles: Array<any>;
  newsSources: Array<any>;
  news: any;

  constructor(apiService: ApiService, modalService: NgbModal, public sanitizer: DomSanitizer) {
    this.apiService = apiService;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.getTopNews();
  }

  openmodal(content, news): void {
    this.news = news;
    this.modalRef = this.modalService.open(content, {
      size: 'lg'
    });
  }

  protected getTopNews() {
    var topHeadlineUrl = `top-headlines?language=${environment.languageKey}&apiKey=${environment.apiKey}`;
    this.apiService.get(topHeadlineUrl).subscribe(result => {
      this.newsArticles = this.filteredArticles = result.articles;
      this.newsSources = this.newsArticles.map(x => x.source.name).filter((value, index, self) => self.indexOf(value) === index);;
    });
  }

  public showAllNews() {
    this.filteredArticles = this.newsArticles;
  }

  public changeSource(sourceName: string) {
    this.filteredArticles = this.newsArticles.filter(x => x.source.name == sourceName);
  }
}
