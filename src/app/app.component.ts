import { Component, OnInit } from '@angular/core';
import { SearchData } from './models/searchData';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data: Array<any>;
  totalRecords: string;
  page: Number = 1;
  categories: Array<string>;
  textToSearch: string;
  email: string;
  searchData: SearchData;

  constructor(private dataService: DataService){
    this.data = new Array<any>();
  }

  ngOnInit() {
    this.getListCategories();
  }

  search(text : string) {
    this.dataService.getDataByText(text).subscribe( (data) => {
      this.data = data.result;
      this.totalRecords = data.total;
      this.saveSearch(data);
    });
  }

  saveSearch(data : any){
    this.searchData = new SearchData();
    this.searchData.TextSearched = this.textToSearch;
    this.searchData.Email = this.email;
    this.searchData.ResultNumber = data.total;
    this.dataService.saveSearch(this.searchData).subscribe( data => {
      console.log(data);
    })
  }

  getListCategories() {
    this.dataService.getListCategories().subscribe( (data) => {
      this.categories = data;
    });
  }

  categoryUpdated(category : string) {
    this.dataService.getDataByCategory(category).subscribe( (data) => {
      this.data[0] = data;
      this.totalRecords = '1';
    });
  }

}
