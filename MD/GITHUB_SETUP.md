# 🚀 Push to GitHub - Hướng Dẫn Chi Tiết

## Bước 1: Tạo Repository trên GitHub

1. Vào https://github.com/new
2. Điền thông tin:
   - **Repository name**: `student-management-app`
   - **Description**: `Student Management System - React + FastAPI`
   - **Visibility**: Chọn `Public` hoặc `Private`
   - **Don't initialize** với README/gitignore (vì bạn đã có rồi)
3. Click **"Create repository"**

Sau đó, bạn sẽ thấy URL repository, ví dụ:
```
https://github.com/YOUR_USERNAME/student-management-app.git
```

---

## Bước 2: Setup Git Locally (Trên Máy Tính)

### Bước 2a: Kiểm tra Git đã cài chưa
```bash
git --version
```

Nếu chưa cài, tải từ: https://git-scm.com/download/win

### Bước 2b: Cấu hình Git (Lần đầu tiên)
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Bước 2c: Chuyển vào folder project
```bash
cd d:\student-management-app
```

---

## Bước 3: Khởi Tạo Git Repository

```bash
# Khởi tạo git
git init

# Thêm tất cả files (.gitignore sẽ tự loại bỏ những file cần thiết)
git add .

# Xem files sẽ được commit
git status

# Commit lần đầu tiên
git commit -m "Initial commit: Student Management System MVP + Extended Features"
```

---

## Bước 4: Kết Nối với GitHub

Thay `YOUR_USERNAME` bằng tên GitHub của bạn:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/student-management-app.git
git push -u origin main
```

**Nếu hệ thống yêu cầu authentication:**
- Windows: Một cửa sổ sẽ hiện ra, đăng nhập GitHub
- Hoặc: Dùng Personal Access Token (PAT)

---

## Hướng Dẫn Chi Tiết Từng Lệnh

### Lệnh 1: Git Init
```bash
git init
```
**Kết quả**: Tạo folder `.git` (ẩn) để tracking changes

### Lệnh 2: Git Add
```bash
git add .
```
**Kết quả**: Thêm tất cả files vào staging area
- Files trong `.gitignore` sẽ bị bỏ qua tự động

### Lệnh 3: Git Status
```bash
git status
```
**Kết quả**: Hiển thị:
- ✅ Files sẽ được commit
- ❌ Files bị loại bỏ
- ❓ Files chưa tracked

### Lệnh 4: Git Commit
```bash
git commit -m "Initial commit: Student Management System"
```
**Kết quả**: Lưu snapshot của project với message

### Lệnh 5: Git Branch
```bash
git branch -M main
```
**Kết quả**: Đổi tên branch thành `main` (GitHub mặc định)

### Lệnh 6: Git Remote
```bash
git remote add origin https://github.com/YOUR_USERNAME/student-management-app.git
```
**Kết quả**: Kết nối folder local với GitHub repository

### Lệnh 7: Git Push
```bash
git push -u origin main
```
**Kết quả**: Đẩy code lên GitHub
- `-u` có nghĩa là set `main` làm upstream

---

## Toàn Bộ Commands (Copy-Paste)

```bash
# 1. Vào folder project
cd d:\student-management-app

# 2. Khởi tạo git
git init

# 3. Thêm tất cả files
git add .

# 4. Kiểm tra (optional)
git status

# 5. Commit lần đầu
git commit -m "Initial commit: Student Management System (MVP + Extended Features)"

# 6. Đổi branch name thành main
git branch -M main

# 7. Kết nối GitHub (THAY: YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/student-management-app.git

# 8. Push lên GitHub
git push -u origin main
```

---

## ✅ Verify - Kiểm Tra Thành Công

Sau khi push xong:
1. Vào https://github.com/YOUR_USERNAME/student-management-app
2. Bạn sẽ thấy:
   - ✅ Tất cả files và folders
   - ✅ Your commit message
   - ✅ File counts

---

## 🔄 Commit Thêm Lần Sau

Sau khi push lần đầu, mỗi lần muốn commit:

```bash
# 1. Thêm files thay đổi
git add .

# 2. Commit với message
git commit -m "Describe your changes"

# 3. Push lên GitHub
git push origin main
```

---

## ❌ Troubleshooting

### Lỗi: "fatal: not a git repository"
→ Chạy `git init` trước

### Lỗi: "fatal: destination path already exists"
→ Bạn đã chạy `git init` rồi, skip bước này

### Lỗi: "Permission denied (publickey)"
→ Setup SSH key hoặc xử lý authentication

**Giải pháp**: Dùng HTTPS thay vì SSH:
```bash
git remote set-url origin https://github.com/YOUR_USERNAME/student-management-app.git
```

### Lỗi: "Author identity unknown"
→ Chạy:
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

---

## 📝 README cho GitHub (Optional)

Nếu muốn README tốt hơn trên GitHub, bạn có thể:
1. Copy nội dung từ `README.md` của bạn
2. Thêm GitHub badge, live demo link
3. Commit và push lại

---

## 🎯 Cuối Cùng

Repository của bạn sẽ có:
- ✅ Tất cả source code
- ✅ Tất cả documentation
- ✅ .gitignore (không upload node_modules, venv, .db)
- ✅ Professional structure
- ✅ Ready to share!

---

**Xong! Giờ bạn có repository on GitHub! 🎉**

Muốn share link, bạn chỉ cần copy:
```
https://github.com/YOUR_USERNAME/student-management-app
```

---

## 💡 Mẹo GitHub

### 1. Xem Commits
```bash
git log --oneline
```

### 2. Xem Remote Config
```bash
git remote -v
```

### 3. Create Branch (Optional)
```bash
git checkout -b feature/new-feature
git push origin feature/new-feature
```

### 4. Xem Differences
```bash
git diff
```

### 5. Undo Last Commit (Nếu cần)
```bash
git reset --soft HEAD~1
```

---

**Cần giúp gì khác không? 😊**
