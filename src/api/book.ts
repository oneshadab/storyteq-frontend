import dataset from '@/data/dataset'

export type Book = {
  title: string
  author: string
} 

// To simulate API calls
export async function searchBooks(searchTerm: string): Promise<Book[]> {
  return dataset.books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()))
}
