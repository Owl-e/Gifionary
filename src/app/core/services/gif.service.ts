import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GifKey } from '../../shared/models/gif-key';

@Injectable()
export class GifService {
  private readonly GIFFILEPATH: string = '../../../assets/gifs.json';
  private gifsMap!: Observable<{key: string, urls: string[]}[]>;

  constructor(private http: HttpClient) {
    this.gifsMap = this.http.get<{key: string, urls: string[]}[]>(this.GIFFILEPATH);
  }

  public getRandomGif(key: GifKey): Observable<string> {
    return this.gifsMap.pipe(
      map((gifs) => gifs.filter(gif => gif.key === key).reduce((p, c) => {
        p.urls.forEach(url => c.urls.push(url));
        return c;
      })),
      map((gifs) => gifs.urls[Math.floor(Math.random() * gifs.urls.length)])
    );
  }
}
