import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { environment } from "src/environments/environment";
import { DynamicResponseModel, ResponseMessage } from "../models/response.model";
import { BookResponse, CreateBookRequest, UpdateBookRequest } from "../models/book.model";

@Injectable({
  providedIn: "root",
})
export class BookService {
  private apiUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  /** 🟩 Lấy danh sách tất cả sách */
  getBooks(
    page: number = 1,
    pageSize: number = 10,
    name?: string,
    categoryId?: number | string
  ): Observable<DynamicResponseModel<BookResponse>> {
    let params = new HttpParams().set("page", page).set("pageSize", pageSize);

    if (name && name.trim() !== "") {
      params = params.set("name", name);
    }
    if (categoryId && categoryId !== "") {
      params = params.set("categoryId", categoryId);
    }

    return this.http.get<DynamicResponseModel<BookResponse>>(this.apiUrl, { params });
  }

  /** 🟨 Lấy chi tiết một cuốn sách */
  getBookById(id: number): Observable<BookResponse> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((res) => {
        if (res.result && res.value) {
          return res.value as BookResponse;
        } else {
          throw new Error(res.message || "Không tìm thấy sách");
        }
      })
    );
  }

  /** 🟦 Thêm mới sách */
  createBook(data: CreateBookRequest): Observable<any> {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.unitPrice) formData.append("unitPrice", data.unitPrice.toString());
    if (data.stock) formData.append("stock", data.stock.toString());
    if (data.status) formData.append("status", data.status.toString());
    if (data.image) formData.append("image", data.image);
    if (data.categoryId)
      formData.append("categoryId", data.categoryId.toString());

    return this.http.post(this.apiUrl, formData);
  }

  /** 🟧 Cập nhật sách */
  updateBook(
    id: number,
    data: UpdateBookRequest
  ): Observable<any> {
    const formData = new FormData();

    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.unitPrice !== undefined)
      formData.append("unitPrice", data.unitPrice.toString());
    if (data.stock !== undefined)
      formData.append("stock", data.stock.toString());
    if (data.status !== undefined)
      formData.append("status", data.status.toString());
    if (data.image instanceof File) formData.append("image", data.image);
    if (data.categoryId)
      formData.append("categoryId", data.categoryId.toString());

    return this.http.patch(`${this.apiUrl}/${id}`, formData);
  }

  /** 🟥 Xóa sách */
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
