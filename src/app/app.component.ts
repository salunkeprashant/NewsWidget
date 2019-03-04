import { Component } from '@angular/core';
import { ApiService } from './service/api.service';
import { environment } from '../environments/environment';
import { NgbModal, NgbModalRef, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
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
  showIframe: boolean = false;
  url: any;

  constructor(apiService: ApiService, modalService: NgbModal, public sanitizer: DomSanitizer) {
    this.apiService = apiService;
    this.modalService = modalService;
  }

  ngOnInit() {
    this.getTopNews();
  }

  openmodal(content, news): void {
    this.news = news;
    this.showIframe = true;
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(news.url);

    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };

    this.modalRef = this.modalService.open(content, ngbModalOptions);
  }

  closeModal(): void {
    this.showIframe = false;
    this.modalRef.close();
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
