import { Injectable } from '@nestjs/common';
import axios from 'axios';
import cheerio from 'cheerio';

@Injectable()
export class ParserService {
  private async getHTML(url: string) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  async parseUsers() {
    const $ = await this.getHTML(process.env.JET_UP_URL_TEAM_PAGE);

    const users = [];
    $('.user-name').each((i, elem) => {
      users.push($(elem).text());
    });

    return users;
  }
}
