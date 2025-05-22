import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  create(createBookInput: CreateBookInput): Promise<Book> {
    const book = this.bookRepo.create(createBookInput);
    return this.bookRepo.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepo.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async update(id: number, input: UpdateBookInput): Promise<Book> {
    const book = await this.bookRepo.findOneBy({ id });
    if (!book) throw new NotFoundException('Book not found');
    Object.assign(book, input);
    return this.bookRepo.save(book);
  }

  async remove(id: number): Promise<Book> {
    const book = await this.findOne(id);
    return this.bookRepo.remove(book);
  }
}
