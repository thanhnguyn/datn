# Hướng Dẫn Cài Đặt Dự Án

Dự án này bao gồm ba phần chính: **admin**, **client**, và **server**. Để cài đặt và chạy dự án, bạn có thể làm theo các bước dưới đây.

## 1. Giải Nén File ZIP

Trước tiên, giải nén file ZIP mà bạn đã nhận được từ người gửi hoặc tải về máy tính của mình. Bạn sẽ nhận được một thư mục chứa ba thư mục con: `admin`, `client`, và `server`.

### Các bước giải nén:
- **Windows**: Nhấp chuột phải vào file ZIP và chọn "Extract All..." để giải nén.
- **Mac**: Nhấp chuột phải vào file ZIP và chọn "Open With" -> "Archive Utility" để giải nén.
- **Linux**: Sử dụng lệnh `unzip` trong terminal hoặc công cụ giải nén mặc định.

Sau khi giải nén, bạn sẽ thấy các thư mục: `admin`, `client`, và `server` trong thư mục giải nén.

## 2. Cài Đặt Các Phụ Thuộc (Dependencies)

Sau khi giải nén xong, bạn cần cài đặt các phụ thuộc cho từng thư mục: **admin**, **client**, và **server**. Mỗi thư mục có một file `package.json` riêng biệt, vì vậy cần phải cài đặt các dependencies cho từng thư mục.

### 2.1 Cài Đặt Cho Thư Mục Admin

Mở terminal hoặc command prompt và di chuyển vào thư mục `admin`, sau đó chạy lệnh cài đặt:

```bash
cd path/to/unzipped/folder/admin
npm install
````

Lệnh này sẽ cài đặt tất cả các package cần thiết được liệt kê trong `package.json` của thư mục `admin`.

### 2.2 Cài Đặt Cho Thư Mục Client

Di chuyển vào thư mục `client` và cài đặt các phụ thuộc:

```bash
cd ../client
npm install
```

### 2.3 Cài Đặt Cho Thư Mục Server

Cuối cùng, di chuyển vào thư mục `server` và cài đặt các phụ thuộc:

```bash
cd ../server
npm install
```

## 3. Chạy Dự Án

Sau khi đã cài đặt xong các phụ thuộc cho tất cả các thư mục, bạn có thể chạy từng phần của dự án.

### 3.1 Chạy Server

Di chuyển vào thư mục `server` và chạy server:

```bash
cd server
nodemon
```

Server sẽ bắt đầu chạy và có thể được truy cập từ địa chỉ được cấu hình (`http://localhost:8000`).

### 3.2 Chạy Client

Di chuyển vào thư mục `client` và chạy ứng dụng frontend:

```bash
cd ../client
npm run dev
```

Ứng dụng frontend sẽ bắt đầu chạy và có thể được truy cập từ địa chỉ mặc định (ví dụ: `http://localhost:5173`).

### 3.3 Chạy Admin

Di chuyển vào thư mục `admin` và chạy ứng dụng admin:

```bash
cd ../admin
npm run dev
```

Ứng dụng admin sẽ bắt đầu chạy và có thể được truy cập từ địa chỉ mặc định (ví dụ: `http://localhost:5174`).

## 4. Cài Đặt Các File `.env` (Môi Trường)

Để giúp việc cấu hình và cài đặt dự án dễ dàng hơn, tôi đã cài sẵn các file `.env` trong mỗi thư mục (`admin`, `client`, và `server`). Các file `.env` này chứa các biến môi trường cần thiết, chẳng hạn như các cấu hình về **cổng máy chủ**, **URL API**, **key bảo mật**, và **các thông số khác** mà ứng dụng cần để hoạt động chính xác.